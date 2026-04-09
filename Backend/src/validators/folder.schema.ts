import { z } from "zod";

export const createFolderSchema = z.object({
    title: z.string().min(1,"Minimum 1 character is required"),
    parentId: z.string().uuid().nullable().optional()
})

export const updateFolderSchema = z.object({
    title: z.string().min(1,"Minimum 1 character is required")
})