import { z } from "zod"

export const createFileSchema = z.object({
    title: z.string().min(1,"File title required"),
    type: z.enum(["Pdf", "Video","pdf"]),
    url: z.string().url("Invalid file URL"),
    parentFolderId: z.string().uuid("nvalid folder ID"),
})

export const updateFileSchema = z.object({
    title: z.string().min(1,"File title required"),
    type: z.enum(["Pdf", "Video"])
})