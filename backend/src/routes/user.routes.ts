import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()
const userController = new UserController()

router.use(authMiddleware) // All user routes require authentication

router.get('/', userController.list)
router.get('/:id', userController.show)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)

export default router
