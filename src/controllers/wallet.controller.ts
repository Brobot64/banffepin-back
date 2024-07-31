import { Request, Response } from 'express';
import {
  createWallet,
  getWalletByUserId,
  updateWalletBalance,
  deductWalletBalance
} from '../services/wallet';

export const createWalletController = async (req: Request, res: Response) => {
  try {
    const wallet = await createWallet(req.body.userId);
    res.status(201).json(wallet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getWalletController = async (req: Request, res: Response) => {
  try {
    const wallet = await getWalletByUserId(req.params.userId);
    res.status(200).json(wallet);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const updateWalletController = async (req: Request, res: Response) => {
  try {
    const wallet = await updateWalletBalance(req.params.userId, req.body.amount);
    res.status(200).json(wallet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deductWalletController = async (req: Request, res: Response) => {
  try {
    const wallet = await deductWalletBalance(req.params.userId, req.body.amount);
    res.status(200).json(wallet);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
