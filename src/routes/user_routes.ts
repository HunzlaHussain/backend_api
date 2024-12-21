import { Router } from "express";
import { getAllSignup, login, SignUP } from "../controllers/user_controller";
import Authorization_User from "../middleware/authorization";

const router = Router();

// Define your routes
router.post("/new", SignUP);
router.get("/getall", Authorization_User, getAllSignup);
router.post("/login", login);

export default router;
