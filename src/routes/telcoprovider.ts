import { Router } from "express";
import { addTelcoScron, deleteTelcoProvider, getOneTelcoProvider, getTelcoScron, updateTelcoProvider } from "../controllers/telcoprovider.controller";

const router = Router();

router.post('/telco', addTelcoScron);
router.get('/telco', getTelcoScron);
router.get('/telco/:id', getOneTelcoProvider);
router.put('/telco/:id', updateTelcoProvider);
router.delete('/telco/:id', deleteTelcoProvider);

export default router;