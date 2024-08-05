import jwt from "jsonwebtoken";
import apiKeyModel from "../models/apikey";
import { Response, Request, NextFunction } from "express";
import { detokenizeUser } from "../utils/encryptions";

export const authenticatejWT = async (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Authentication token required' });
    }

    try {
        // @ts-ignore
        const decoded = await detokenizeUser(token);
        // @ts-ignore
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
    
}


export const authenticateApiKey = async (req: Request, res: Response, next: NextFunction)  => {
    const apiKey = req.header('x-api-key');
    
    if (!apiKey) {
      return res.status(401).json({ message: 'API key required' });
    }
  
    try {
      const keyRecord = await apiKeyModel.findOne({ key: apiKey }).populate('user');
      if (!keyRecord) {
        return res.status(401).json({ message: 'Invalid API key' });
      }

    //   @ts-ignore
      req.user = keyRecord.user;
      next();
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  };

