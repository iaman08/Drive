import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import folderRoutes from "./routes/folder.routes";
import fileRoutes from "./routes/file.routes";

import { errorHandler } from "./middleware/error";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",    authRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api/files",   fileRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is running on: http://localhost:${PORT}`);
} )