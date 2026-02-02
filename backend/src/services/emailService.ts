// Serviço de email usando Nodemailer
// Para usar, instale: npm install nodemailer @types/nodemailer

import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

// Configuração do transporter
// Você pode usar Gmail, SendGrid, Mailgun, ou qualquer SMTP
const createTransporter = () => {
  // Opção 1: Gmail (menos recomendado para produção)
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Use App Password do Gmail
      },
    })
  }

  // Opção 2: SMTP genérico (recomendado)
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true para 465, false para outras portas
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''), // Remove HTML se text não fornecido
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email enviado:', info.messageId)
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    throw error
  }
}

/**
 * Template de email para novo cadastro de afiliado
 */
export function createAffiliateEmailTemplate(data: {
  name: string
  email: string
  phone: string
  age: string
  message: string
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9fafb; padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #4F46E5; }
          .value { margin-top: 5px; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Novo Cadastro de Afiliado</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Nome:</div>
              <div class="value">${data.name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${data.email}</div>
            </div>
            <div class="field">
              <div class="label">Telefone:</div>
              <div class="value">${data.phone}</div>
            </div>
            <div class="field">
              <div class="label">Idade:</div>
              <div class="value">${data.age} anos</div>
            </div>
            <div class="field">
              <div class="label">Mensagem:</div>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p>Este email foi enviado automaticamente pelo sistema de cadastro.</p>
            <p>Data: ${new Date().toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </body>
    </html>
  `
}
