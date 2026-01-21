import { Router } from 'express'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import contactRoutes from './contact.routes'
import bannerRoutes from './banner.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/contact', contactRoutes)
router.use('/banners', bannerRoutes)

export default router
