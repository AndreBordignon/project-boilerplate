import { Router } from 'express'
import { uploadBanner } from '../middlewares/uploadBanner.js'
import { BannerController } from '../controllers/BannersController'

const router = Router()
const bannerController = new BannerController()

router.post('/banners', uploadBanner.single('image'), (req, res) =>
  bannerController.create(req, res)
)

router.get('/banners', (req, res) => bannerController.getAll(req, res))

router.patch('/banners/:id', uploadBanner.single('image'), (req, res) =>
  bannerController.update(req, res)
)

router.delete('/banners/:id', (req, res) => bannerController.delete(req, res))

export default router