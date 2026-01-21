import { z } from "zod";

export const bannerEditSchema = z.object({
  linkUrl: z
    .string()
    .url("Informe uma URL válida")
    .optional()
    .or(z.literal("")),
  image: z.custom<File | null>().optional()
});
