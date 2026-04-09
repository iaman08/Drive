import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "../utils/r2";
import { prisma } from "../db";
import { type AuthRequest } from "../middleware/auth";
import {type Response } from "express";
import {
    createFileSchema,
    updateFileSchema,
} from "../validators/file.schema";

export async function createFile(req: AuthRequest, res: Response) {
  const result = createFileSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json(result.error.format());
  }

  const file = await prisma.file.create({
    data: {
      ...result.data,
      userId: req.userId!,
    },
  });

  return res.json(file);
}

export async function getFiles(req: AuthRequest, res: Response) {
  const { folderId } = req.query;

  const files = await prisma.file.findMany({
    where: {
      parentFolderId: folderId as string,
      userId: req.userId,
    },
  });

  return res.json(files);
}

export async function updateFile(req: AuthRequest, res: Response) {
  const { id } = req.params;
if(!id){
  return;
}
  const result = updateFileSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error.format());
  }

  const updated = await prisma.file.updateMany({
    where: {
      id:id as string,
      userId: req.userId,
    },
    data: result.data,
  });

  return res.json(updated);
}

export async function deleteFile(req: AuthRequest, res: Response) {
  const { id } = req.params;

  await prisma.file.deleteMany({
    where: {
      id: id as string,
      userId: req.userId,
    },
  });
return res.json({ message: "File deleted" });
}

export async function getPresignedUrl(req:AuthRequest, res:Response){
  try{
      const {fileName, fileType, folderId } = req.body;
      const key = `${req.userId}/${Date.now()} - ${fileName}`;
      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key:key,
        ContentType: fileType,
      });
      const url = await getSignedUrl(r2, command, { expiresIn: 60 });

      return res.json({
        uploadUrl: url,
        key,
      });
  }catch(error){
    return res.status(500).json({ message: "Failed to generate URL"});
  }
}

export async function saveFile(req:AuthRequest, res: Response){
  try{
    const {title, key, folderId, type} = req.body;
    const file = await prisma.file.create({
      data:{
        title,
        url:key,
        type,
        parentFolderId: folderId,
        userId: req.userId,
      }
    });
    return res.json(file);
  }catch(error){
    return res.status(500).json({message: "Failed to save file"});
  }
}