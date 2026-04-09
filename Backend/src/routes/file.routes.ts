import { Router } from "express";
import { authMiddleware } from "../middleware/auth";

import {
    createFile,
    getFiles,
    updateFile,
    deleteFile,
    getPresignedUrl,
    saveFile,
} from "../controllers/file.controller";

const router = Router();

router.post("/", authMiddleware, createFile);
router.get("/", authMiddleware, getFiles);
router.patch("/:id", authMiddleware, updateFile);
router.delete("/delete/:id", authMiddleware, deleteFile);
router.post("/presigned-url", authMiddleware, getPresignedUrl);
router.post("/save", authMiddleware,saveFile)
export default router;