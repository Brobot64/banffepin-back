"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_controller_1 = require("../controllers/token.controller");
const router = (0, express_1.Router)();
router.post('/', token_controller_1.sendToken);
router.post('/verify/:phone/:token', token_controller_1.verifySentToken);
router.get('/:phone', token_controller_1.resendNewToken);
exports.default = router;
