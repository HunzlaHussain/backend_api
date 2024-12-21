import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { configDotenv } from "dotenv";
configDotenv();
export interface UserPayload {
  userId: number;
  username: string;
}

// console.log("seerkt key", process.env.JWT_SECEKT_KEY);
const Authorization_User = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("token", token);
  if (!token) {
    res.status(403).json({ message: "Token is Required" });
  }

  jwt.verify(
    token as string,
    process.env.JWT_SECEKT_KEY as string,
    (err, decoded) => {
      if (err) {
        return res.status(403).json("Invalid token.");
      }
      req.user = decoded as UserPayload; // Casting the decoded object to the UserPayload interface
      next();
    }
  );
};

export default Authorization_User;
