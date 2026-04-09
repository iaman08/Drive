import {type Request ,type Response ,type NextFunction } from "express";
import { verifyToken } from "../utils/jw";
import type { string } from 'zod';

export interface AuthRequest extends Request {
    userId?: string
}

export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
){

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({
            success: false,
            message: "No token provided"
        })
    }

    const token = authHeader.split(" ")[1];
    if(!token){
        
        return res.status(401).json({
            success: false,
            message: "No token provided"
        })
    }
    try{
     const decoded = verifyToken(token);
     req.userId = decoded.userId;
     next();
    }catch{
        return res.status(401).json({
            success:"false",
            message:"Invalid or expired Token"
        })
    }
}