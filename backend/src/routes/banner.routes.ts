import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { uploadBanner } from "../middlewares/uploadBanner.js";

const prisma = new PrismaClient();
const router = Router();

router.post(
  "/banners",
  uploadBanner.single("image"),
  async (req, res) => {
    try {
      const { title, linkUrl } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "Imagem é obrigatória" });
      }

      const banner = await prisma.banner.create({
        data: {
          title,
          linkUrl,
          imageUrl: `/uploads/banners/${req.file.filename}`
        }
      });

      res.status(201).json(banner);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao criar banner" });
    }
  }
);

router.get("/banners", async (req, res) => {
  try {
    const { title, isActive } = req.query;

    const banners = await prisma.banner.findMany({
      where: {
        ...(title && {
          title: {
            contains: title,
            mode: "insensitive"
          }
        }),
        ...(isActive !== undefined && {
          isActive: isActive === "true"
        })
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json(banners);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar banners" });
  }
});

export default router;
