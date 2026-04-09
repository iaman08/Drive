// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "supersecret" ;

// export function generateToken(userId: String){
//     return jwt.sign({userId},JWT_SECRET,{
//         expiresIn: "7d",
//     });
// }

// export function verifyToken(token: String){
//     return jwt.verify(token,JWT_SECRET) as { userId: string };
// }

import jwt, { type JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

interface TokenPayload extends JwtPayload {
  userId: string;
}

export function generateToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (typeof decoded === "string") {
    throw new Error("Invalid token");
  }

  return decoded as TokenPayload;
}