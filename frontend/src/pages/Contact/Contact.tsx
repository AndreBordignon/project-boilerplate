import { useState } from 'react'
import Button from '@/components/common/Button'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Aqui você adicionará a integração com o backend
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-container mx-auto px-8 py-8">
      <h1 className="text-4xl font-bold text-text-primary mb-8">Entre em Contato</h1>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-12">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Informações de Contato</h2>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-text-primary mb-2">Localização 1</h3>
            <p className="text-text-secondary">Endereço completo</p>
            <p className="text-text-secondary">Telefone: (00) 0000-0000</p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-text-primary mb-2">Localização 2</h3>
            <p className="text-text-secondary">Endereço completo</p>
            <p className="text-text-secondary">Telefone: (00) 0000-0000</p>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-text-primary mb-2">Email</h3>
            <p className="text-text-secondary">contato@exemplo.com</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-6">Envie uma Mensagem</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-3 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-3 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Telefone"
              value={formData.phone}
              onChange={handleChange}
              className="px-3 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
            <textarea
              name="message"
              placeholder="Mensagem"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="px-3 py-3 border border-border rounded resize-y focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
            <Button type="submit" fullWidth>
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
