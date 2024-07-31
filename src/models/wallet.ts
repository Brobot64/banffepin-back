import mongoose, { Document, Schema } from 'mongoose';
import { dbConnect } from './dbConnection';

export interface IWallet extends Document {
  userId: mongoose.Types.ObjectId;
  balance: number;
}

const walletSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'account', required: true },
  balance: { type: Number, default: 0 }
});

const Wallet = dbConnect.model<IWallet>('Wallet', walletSchema);
export default Wallet;
