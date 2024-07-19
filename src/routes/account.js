"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_controller_1 = require("../controllers/account.controller");
const router = (0, express_1.Router)();
router.post('/signup', account_controller_1.createAccount);
router.post('/signin', account_controller_1.signInAccount);
router.get('/userinfo/:token', account_controller_1.getUserInfo);
exports.default = router;
