import axios from 'axios'

// Função para determinar a URL base da API
const getBaseURL = () => {
  // Se há variável de ambiente configurada, usa ela
  const envUrl = import.meta.env.VITE_API_URL
  
  if (envUrl) {
    // Se já tem protocolo, usa como está
    if (envUrl.startsWith('http://') || envUrl.startsWith('https://')) {
      return envUrl
    }
    // Se não tem protocolo, detecta se está em produção
    const isProduction = window.location.protocol === 'https:'
    return `${isProduction ? 'https' : 'http'}://${envUrl}`
  }
  
  // Se está em produção (HTTPS), usa HTTPS
  if (window.location.protocol === 'https:') {
    return 'http://project-boilerplate-api.vercel.app/api'
  }
  
  // Em desenvolvimento local, usa HTTP
  return 'http://localhost:4000/api'
}

const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // Envia cookies automaticamente
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
