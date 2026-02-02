import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { sendEmail, createAffiliateEmailTemplate } from '../services/emailService'

const prisma = new PrismaClient()

export class ContactController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, phone, message, type = "contact" } = req.body

      const contact = await prisma.contact.create({
        data: {
          name,
          email,
          phone,
          message,
          type,
        }
      })

      // Opção 1: Enviar email usando Nodemailer (descomente para usar)
      
      if (process.env.ADMIN_EMAIL) {
        await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: 'Novo Cadastro de Afiliado',
          html: createAffiliateEmailTemplate({
            name: contact.name,
            email: contact.email,
            phone: contact.phone || '',
            age: req.body.age || 'N/A',
            message: contact.message
          })
        })
      }

      res.status(201).json({
        message: 'Mensagem enviada com sucesso!',
        contact
      })
    } catch (error) {
      console.error('Create contact error:', error)
      res.status(500).json({ message: 'Erro ao enviar mensagem' })
    }
  }
}
