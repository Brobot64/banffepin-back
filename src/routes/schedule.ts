import { Router } from "express";
import { createNewSchedule, getSchedules, removeSchedule, updateSchedule } from "../controllers/scheduler.controller";

const router = Router();

router.post('/scheduler', createNewSchedule);
router.get('/scheduler', getSchedules);
router.put('/scheduler/:id', updateSchedule);
router.delete('/scheduler/:id', removeSchedule);

export default router;