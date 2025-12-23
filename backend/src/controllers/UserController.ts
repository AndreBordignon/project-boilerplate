import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../types'

const prisma = new PrismaClient()

export class UserController {
  async list(req: AuthRequest, res: Response) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          createdAt: true,
          updatedAt: true
        }
      })

      res.json(users)
    } catch (error) {
      console.error('List users error:', error)
      res.status(500).json({ message: 'Erro ao listar usuários' })
    }
  }

  async show(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params

      const user = await prisma.user.findUnique({
        where: { id },
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
      console.error('Show user error:', error)
      res.status(500).json({ message: 'Erro ao buscar usuário' })
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params
      const { name, email, phone } = req.body

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { id }
      })

      if (!existingUser) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }

      // Check if email is already taken by another user
      if (email !== existingUser.email) {
        const emailTaken = await prisma.user.findUnique({
          where: { email }
        })

        if (emailTaken) {
          return res.status(400).json({ message: 'Email já está em uso' })
        }
      }

      const user = await prisma.user.update({
        where: { id },
        data: { name, email, phone },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          createdAt: true,
          updatedAt: true
        }
      })

      res.json(user)
    } catch (error) {
      console.error('Update user error:', error)
      res.status(500).json({ message: 'Erro ao atualizar usuário' })
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params

      const user = await prisma.user.findUnique({
        where: { id }
      })

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }

      await prisma.user.delete({
        where: { id }
      })

      res.json({ message: 'Usuário deletado com sucesso' })
    } catch (error) {
      console.error('Delete user error:', error)
      res.status(500).json({ message: 'Erro ao deletar usuário' })
    }
  }
}
