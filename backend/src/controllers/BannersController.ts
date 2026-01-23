import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const prisma = new PrismaClient()

export class BannerController {
  async create(req: Request, res: Response) {
    try {
      const { title, linkUrl } = req.body

      if (!req.file) {
        return res.status(400).json({ error: 'Imagem é obrigatória' })
      }

      const banner = await prisma.banner.create({
        data: {
          title,
          linkUrl,
          imageUrl: `${req.file.path}`
        }
      })

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'banners'
      })

      console.log('res',result)

      res.status(201).json(banner)
    } catch (error) {
      console.error('Create banner error:', error)
      res.status(500).json({ error: 'Erro ao criar banner' })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { title, isActive } = req.query

      const banners = await prisma.banner.findMany({
        where: {
          ...(title && {
            title: {
              contains: title as string,
              mode: 'insensitive'
            }
          }),
          ...(isActive !== undefined && {
            isActive: isActive === 'true'
          })
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      res.status(200).json(banners)
    } catch (error) {
      console.error('Get banners error:', error)
      res.status(500).json({ error: 'Erro ao buscar banners' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = String(req.params.id)
      const { title, linkUrl, isActive } = req.body

      if (!id) {
        return res.status(400).json({ error: 'ID inválido' })
      }

      // Verifica se o banner existe
      const bannerExists = await prisma.banner.findUnique({
        where: { id }
      })

      if (!bannerExists) {
        return res.status(404).json({ error: 'Banner não encontrado' })
      }

      // Monta o objeto de atualização apenas com os campos enviados
      const updateData: any = {}

      if (title !== undefined) updateData.title = title
      if (linkUrl !== undefined) updateData.linkUrl = linkUrl
      if (isActive !== undefined) updateData.isActive = isActive === 'true' || isActive === true

      // Se houver uma nova imagem, atualiza a URL
      if (req.file) {
        updateData.imageUrl = `/uploads/banners/${req.file.filename}`
      }

      const banner = await prisma.banner.update({
        where: { id },
        data: updateData
      })

      res.status(200).json(banner)
    } catch (error) {
      console.error('Update banner error:', error)
      res.status(500).json({ error: 'Erro ao atualizar banner' })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = String(req.params.id)

      if (!id) {
        return res.status(400).json({ error: 'ID inválido' })
      }

      await prisma.banner.delete({
        where: { id }
      })

      return res.status(200).json({ success: true })
    } catch (error) {
      console.error('Delete banner error:', error)
      return res.status(500).json({ error: 'Erro ao deletar banner' })
    }
  }
}