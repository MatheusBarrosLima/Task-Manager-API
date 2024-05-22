import { Router } from "express";
import { taskControllers } from "../controllers/taskControllers";
import { authMiddleware } from "../middlewares/authMiddlaware";

export const taskRoutes = Router();

taskRoutes.post("/task", authMiddleware, taskControllers.create);
taskRoutes.get("/task", authMiddleware, taskControllers.read);
taskRoutes.put("/task/:taskID", authMiddleware, taskControllers.update);
taskRoutes.delete("/task/:taskID", authMiddleware, taskControllers.delete);


