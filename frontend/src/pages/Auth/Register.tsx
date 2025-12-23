import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem')
      return
    }
    console.log('Register:', formData)
    // Aqui você adicionará a integração com o backend
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-8 py-8">
      <div className="w-full max-w-form card">
        <h1 className="text-3xl font-bold text-center text-text-primary mb-8">Cadastro</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Nome Completo"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Telefone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <Input
            label="Senha"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            label="Confirmar Senha"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button type="submit" fullWidth className="mt-4">
            Cadastrar
          </Button>
        </form>

        <p className="text-center mt-6 text-text-secondary">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}
