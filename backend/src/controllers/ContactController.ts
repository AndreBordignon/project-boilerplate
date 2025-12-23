import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class ContactController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, phone, message } = req.body

      const contact = await prisma.contact.create({
        data: {
          name,
          email,
          phone,
          message
        }
      })

      // Here you could send an email notification
      // await sendEmailNotification(contact)

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
