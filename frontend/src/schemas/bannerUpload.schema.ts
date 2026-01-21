import { z } from "zod";

export const bannerUploadSchema = z.object({
  title: z.string().optional(),
  linkUrl: z
    .string()
    .url("Informe uma URL válida")
    .optional()
    .or(z.literal("")),
  image: z
    .custom<File>((file) => file instanceof File, {
      message: "Imagem é obrigatória"
    })
});
