import { Router } from "express";
import { taskControllers } from "../controllers/taskControllers";
import { authMiddleware } from "../middlewares/authMiddlaware";

export const taskRoutes = Router();

taskRoutes.post("/task", authMiddleware, taskControllers.create);


