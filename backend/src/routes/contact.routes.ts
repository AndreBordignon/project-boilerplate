import { Router } from 'express'
import { ContactController } from '../controllers/ContactController'

const router = Router()
const contactController = new ContactController()

router.post('/', contactController.create)

export default router
