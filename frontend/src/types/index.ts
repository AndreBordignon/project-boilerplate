export interface User {
  id: string
  name: string
  email: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  createdAt: string
  updatedAt: string
}

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  message: string
  createdAt: string
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}
