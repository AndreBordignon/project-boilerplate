import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest } from '../types'

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido' })
    }

    const [, token] = authHeader.split(' ')

    if (!token) {
      return res.status(401).json({ message: 'Token inválido' })
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret'
    ) as { userId: string }

    req.userId = decoded.userId

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado' })
  }
}
