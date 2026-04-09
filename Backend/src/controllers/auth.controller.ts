import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../db"
import { generateToken } from "../utils/jw"
import { signupSchema, signinSchema } from '../validators/auth.schema';

export async function signup(req: Request, res: Response) {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json(result.error.format);
    }

    const { username, password } = result.data;

    const existingUser = await prisma.user.findUnique({
        where: { username },
    })

    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "Username already taken",
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
        },
    })

    const token = generateToken(user.id);
    return res.json({ token });
}

export async function signin(req: Request, res: Response) {
    const result = signinSchema.safeParse(req.body);
    if (!result.success) {
       return res.status(400).json(result.error.format())
    }

    const { username, password } = result.data!;
    const user = await prisma.user.findUnique({
        where: { username },
    })

    if (!user) {
        return res.status(400).json({
            error: "User not found"
        });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return res.status(400).json({ message: "Wrong password" });
    }
    const token = generateToken(user.id);
    return res.json({ token });
}