import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { authService } from '@/services/authService'
import { useAuthStore } from '@/store/authStore'

// Schema de validação com Zod
const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .regex(/^[0-9\s\-\(\)]+$/, 'Telefone inválido'),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),
  confirmPassword: z
    .string()
    .min(1, 'Confirmação de senha é obrigatória')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function Register() {
  const navigate = useNavigate()
  const setUser = useAuthStore((store) => store.setUser)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await authService.register(data)
      setUser(response.user)
      navigate('/painel-adm')
    } catch (error: any) {
      // Define erro no formulário se a API retornar erro
      setError('root', {
        message: error.message || 'Erro ao criar conta. Tente novamente.'
      })
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-8 py-8">
      <div className="w-full max-w-form card">
        <h1 className="text-3xl font-bold text-center text-text-primary mb-8">
          Cadastro
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Erro geral do formulário */}
          {errors.root && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.root.message}
            </div>
          )}

          <div>
            <Input
              label="Nome Completo"
              type="text"
              {...register('name')}
              error={errors.name?.message}
            />
          </div>

          <div>
            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
          </div>

          <div>
            <Input
              label="Telefone"
              type="tel"
              placeholder="(00) 00000-0000"
              {...register('phone')}
              error={errors.phone?.message}
            />
          </div>

          <div>
            <Input
              label="Senha"
              type="password"
              {...register('password')}
              error={errors.password?.message}
            />
          </div>

          <div>
            <Input
              label="Confirmar Senha"
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            className="mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>

        <p className="text-center mt-6 text-text-secondary">
          Já tem uma conta?{' '}
          <Link
            to="/login"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}