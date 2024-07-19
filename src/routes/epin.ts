import { Router } from "express";
import { fetchAvailableTelcosWithDenominations, getAllEpins, getEpinByIdController, getEpinBySerialController, getOrdersByIdController, getSoldEpinsController, getUnsoldEpinsController, getVended, getVendedByOrder, placeOrderByUserController } from "../controllers/epin.controller";

const router = Router();

router.get('/', getAllEpins);
router.get('/sold', getSoldEpinsController);
router.get('/unsold', getUnsoldEpinsController);
router.get('/:serial', getEpinBySerialController);
router.get('/id/:id', getEpinByIdController);
router.post('/vend/:user', placeOrderByUserController);
router.get('/vend/:user', getOrdersByIdController);
router.get('/vend/pins/:id', getVended);
router.get('/vend/order/:order', getVendedByOrder);

router.get('/unhinge/check', fetchAvailableTelcosWithDenominations);

export default router;