"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user_controller");
const router = (0, express_1.Router)();
// Define your routes
router.post("/new", user_controller_1.SignUP);
router.get("/getall", user_controller_1.getAllSignup);
router.post("/login", user_controller_1.login);
exports.default = router;
