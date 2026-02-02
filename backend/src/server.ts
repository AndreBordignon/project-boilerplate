import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
import { errorHandler } from './middlewares/errorHandler'
import bannerRoutes from "./routes/banner.routes.js";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middlewares
// Configuração de CORS mais permissiva para desenvolvimento
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Em desenvolvimento, permite qualquer origem localhost (HTTP ou HTTPS)
    if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
      // Permite localhost em qualquer porta, HTTP ou HTTPS
      if (!origin || 
          origin.startsWith('http://localhost') || 
          origin.startsWith('https://localhost') ||
          origin.startsWith('http://127.0.0.1') ||
          origin.startsWith('https://127.0.0.1')) {
        callback(null, true)
        return
      }
    }
    
    // Em produção, usa a lista de origens permitidas
    const allowedOrigins = process.env.CORS_ORIGIN 
      ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
      : []
    
    // Se não há origens configuradas e não há origin na requisição (ex: Postman), permite
    if (!origin && allowedOrigins.length === 0) {
      callback(null, true)
      return
    }
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api', routes)
app.use('/api', bannerRoutes)

// Error handler (must be last)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
})
