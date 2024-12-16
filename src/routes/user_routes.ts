import { Router } from "express";
import { getAllSignup, login, SignUP } from "../controllers/user_controller";

const router = Router();

// Define your routes
router.post("/new", SignUP);
router.get("/getall", getAllSignup);
router.post("/login", login);

export default router;
