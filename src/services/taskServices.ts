import { randomUUID } from "node:crypto";
import { TaskDataTypes } from "../validations/taskSchema";
import { appError } from "../errors/appError";

export type CreateTaskDataType = TaskDataTypes & { id_user: string };

type Repository = {
  createTask(data: CreateTaskDataType): Promise<{} | undefined>;
  updateTask(data: CreateTaskDataType): Promise<{} | undefined>;
  getTask(id: string): Promise<{id_user: string} | undefined>;
  deleteTask(id: string): Promise<{} | undefined>;
};

export const taskServices = {
  async create(data: CreateTaskDataType, repository: Repository) {
    try {
      const { title, description, date, status, id_user } = data;

      const task = {
        id: randomUUID(),
        title,
        description,
        date,
        status,
        id_user,
      };

      const taskCreated = await repository.createTask(task);      
      return taskCreated;
    } catch (error) {
      throw error;
    }
  },
  async update(id:string, data: CreateTaskDataType, repository: Repository) {
    try {
      const { title, description, date, status, id_user } = data;

      const task = {
        id,
        title,
        description,
        date,
        status,
        id_user,
      };

      const userTask = await repository.getTask(id);

      if(!userTask) throw appError("task not found!", (404));

      if(userTask.id_user != id_user) {
        throw appError ("user not autorized to update!", 401);
      }

      const taskUpdated = await repository.updateTask(task);      
      return taskUpdated;
    } catch (error) {
      throw error;
    }
  },

  async delete(taskID:string, userID: string, repository: Repository) {
    try {
      const userTask = await repository.getTask(taskID);

      if(!userTask) throw appError("task not found!", (404));

      if(userTask.id_user != userID) {
        throw appError ("user not autorized to delete!", 401);
      }

      const taskDelete = await repository.deleteTask(taskID); 
      
      if(!taskDelete) throw appError("task not deleted", 500);
    } catch (error) {
      throw error;
    }
  },
};
