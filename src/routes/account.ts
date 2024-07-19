import { Router } from "express";
import { createAccount, getUserInfo, signInAccount } from "../controllers/account.controller";

const router = Router();

router.post('/signup', createAccount);
router.post('/signin', signInAccount);
router.get('/userinfo/:token', getUserInfo);

export default router;
