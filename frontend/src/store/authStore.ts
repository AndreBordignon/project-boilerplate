import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
      
      logout: async () => {
        // Chama o backend para limpar o cookie
        await fetch('/api/logout', {
          method: 'POST',
          credentials: 'include' // Importante para enviar cookies
        })
        
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage',
      // Persiste apenas o user, não o token
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
)