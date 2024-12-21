import { create_Course } from "../controllers/course_controller";
import { Router } from "express";
import Authorization_User from "../middleware/authorization"; // Adjust path accordingly

const course_route = Router();

course_route.post("/new", Authorization_User, create_Course);

export default course_route;
