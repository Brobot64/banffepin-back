import { Router } from 'express';
import {
  createWalletController,
  getWalletController,
  updateWalletController,
  deductWalletController
} from '../controllers/wallet.controller';

const router: Router = Router();

router.post('/wallet', createWalletController);
router.get('/wallet/:userId', getWalletController);
router.put('/wallet/:userId', updateWalletController);
router.post('/wallet/:userId/deduct', deductWalletController);

export default router;
