import {type Response } from "express";
import {type AuthRequest } from "../middleware/auth";
import { createFolderSchema, updateFolderSchema } from "../validators/folder.schema";
import { prisma } from "../db";

export async function createFolder( req: AuthRequest, res: Response){
    const result = createFolderSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json(result.error.format);
    }

    const { title,parentId } = result.data;

    const folder = await prisma.folder.create({
        data: {
            title,
            parentId: parentId || null,
            userId: req.userId!,
        },
    });
    return res.json(folder);
}

export async function getFolders(req: AuthRequest, res: Response){
    const { parentId } = req.query;
    const folders = await prisma.folder.findMany({
        where: { 
            userId: req.userId,
            parentId: parentId? String(parentId):null,}
    });
    return res.json(folders);
}

export async function updateFolder(req: AuthRequest, res: Response){
    const id = req.params.id as string;

    const result = updateFolderSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json(result.error.format());
    }
    const updated = await prisma.folder.updateMany({
        where: {
            id,
            userId: req.userId,
        },
        data: result.data,
    });
    return res.json(updated);
}

export async function deleteFolder( req: AuthRequest, res: Response){
    const { id } = req.params;

    await prisma.folder.deleteMany({
        where: {
            id: id as string,
            userId: req.userId,
        },
    });
    return res.json({ message: "Folder deleted"});
}