import { Router } from "express";
import { resendNewToken, sendToken, verifySentToken } from "../controllers/token.controller";

const router = Router();

router.post('/', sendToken);
router.post('/verify/:phone/:token', verifySentToken);
router.get('/:phone', resendNewToken);

export default router;



