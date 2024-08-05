import { Router } from "express";
import { addTransactPin, checkTransactionPin, createAccount, getUserInfo, signInAccount } from "../controllers/account.controller";
import { authenticatejWT } from "../middleware/middlies";

const router = Router();

router.post('/signup', createAccount);
router.post('/signin', signInAccount);
router.get('/userinfo/:token', getUserInfo);
router.get('/pin/check/:user', checkTransactionPin);
router.post('/pin/set', authenticatejWT, addTransactPin);

export default router;
