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
// Configuração de CORS
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
    
    // Se não há origin na requisição (ex: Postman, mobile apps), permite
    if (!origin) {
      callback(null, true)
      return
    }
    
    // Em produção, se não há origens configuradas, permite mas avisa
    const isProduction = process.env.NODE_ENV === 'production'
    if (isProduction && allowedOrigins.length === 0) {
      console.warn('⚠️  CORS_ORIGIN not configured in production! Allowing all origins (INSECURE). Please set CORS_ORIGIN environment variable.')
      callback(null, true)
      return
    }
    
    // Verifica se a origem está na lista de permitidas
    if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.warn(`CORS blocked origin: ${origin}. Allowed: ${allowedOrigins.join(', ')}`)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  exposedHeaders: ['Authorization'],
  optionsSuccessStatus: 200, // Alguns navegadores legados (IE11) podem ter problemas com 204
  preflightContinue: false,
}

app.use(cors(corsOptions))

// Handle preflight requests explicitly (backup)
app.options('*', cors(corsOptions))
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
