import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AuthRequest } from '../types'

const prisma = new PrismaClient()

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, phone, password } = req.body

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        return res.status(400).json({ message: 'Email já cadastrado' })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          createdAt: true
        }
      })

      // Generate token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      )

      res.status(201).json({ token, user })
    } catch (error) {
      console.error('Register error:', error)
      res.status(500).json({ message: 'Erro ao criar usuário' })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      // Find user
      const user = await prisma.user.findUnique({
        where: { email }
      })

      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' })
      }

      // Check password
      const validPassword = await bcrypt.compare(password, user.password)

      if (!validPassword) {
        return res.status(401).json({ message: 'Credenciais inválidas' })
      }

      // Generate token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      )

      const { password: _, ...userWithoutPassword } = user
      
      res.cookie('token', token, {
        httpOnly: true,      // Não acessível via JavaScript
        secure: true,        // Apenas HTTPS (em produção)
        sameSite: 'strict',  // Proteção CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
        path: '/'
      })
      res.json({ token, user: userWithoutPassword })
    } catch (error) {
      console.error('Login error:', error)
      res.status(500).json({ message: 'Erro ao fazer login' })
    }
  }

  async me(req: AuthRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          createdAt: true,
          updatedAt: true
        }
      })

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }

      res.json(user)
    } catch (error) {
      console.error('Me error:', error)
      res.status(500).json({ message: 'Erro ao buscar usuário' })
    }
  }

  async logout(req: AuthRequest, res: Response) {
    // With JWT, logout is handled on the client side
    // Here you could implement token blacklist if needed
    res.json({ message: 'Logout realizado com sucesso' })
  }
}
