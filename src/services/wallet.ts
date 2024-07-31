import Wallet from '../models/wallet';

const createWallet = async (userId: string) => {
  try {
    const wallet = new Wallet({ userId });
    return await wallet.save();
  } catch (error: any) {
    throw new Error(`Error creating wallet: ${error.message}`);
  }
};

const getWalletByUserId = async (userId: string) => {
  try {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    return wallet;
  } catch (error: any) {
    throw new Error(`Error getting wallet: ${error.message}`);
  }
};

const updateWalletBalance = async (userId: string, amount: number) => {
    try {
      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        throw new Error('Wallet not found');
      }
      wallet.balance += Number(amount); // Ensure amount is treated as a number
      return await wallet.save();
    } catch (error: any) {
      throw new Error(`Error updating wallet balance: ${error.message}`);
    }
};
  

const deductWalletBalance = async (userId: string, amount: number) => {
  try {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    if (wallet.balance < amount) {
      throw new Error('Insufficient balance');
    }
    wallet.balance -= Number(amount);
    return await wallet.save();
  } catch (error: any) {
    throw new Error(`Error deducting wallet balance: ${error.message}`);
  }
};

export {
  createWallet,
  getWalletByUserId,
  updateWalletBalance,
  deductWalletBalance
};
