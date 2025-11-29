import { z } from "zod"

export const urlSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required!" })
    .max(50, { message: "Title must not exceed 50 characters" }),
  url: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .min(1, { message: "URL is required!" }),
  custom_url: z
    .string()
    .optional()
})
