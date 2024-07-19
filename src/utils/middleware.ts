import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import { detokenizeUser } from "./encryptions";
dotenv.config();



export const getAuth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    // Check for predefined token (AUTH_TKN environment variable)
    if (process.env.AUTH_TKN && token === process.env.AUTH_TKN) {
    //   @ts-ignore
      req.user = { 
        name: "Weverefy",
        artist: "Gunna 😊😉"
      };
      next();
    } else {
      if (!token) return res.sendStatus(401); // Unauthorized
  
      try {
        const user = await detokenizeUser(token as string);
        if (!user) return res.sendStatus(403); // Forbidden
  
        // @ts-ignore 
        req.user = user;
        next();
      } catch (error) {
        console.error('Error verifying JWT token:', error);
        return res.sendStatus(401);
      }
    }
  };
  