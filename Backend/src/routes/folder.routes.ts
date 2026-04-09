import { Router } from "express";
import { authMiddleware } from '../middleware/auth';

import {
    createFolder,
    updateFolder,
    deleteFolder,
    getFolders
} from "../controllers/folder.controller";

const router = Router();

router.post( "/", authMiddleware, createFolder);
router.patch("/:id",authMiddleware,updateFolder);
router.delete("/delete/:id", authMiddleware, deleteFolder);
router.get("/", authMiddleware, getFolders);

export default router;

