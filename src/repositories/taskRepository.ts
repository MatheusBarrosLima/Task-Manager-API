import { sqliteConnection } from "../databases/sqlite3";
import {
  CreateTaskDataType,
  UserTasksPagination,
} from "../services/taskServices";

export type TaskDataCreate = CreateTaskDataType & { id: string };

export const taskRepository = {
  async createTask(data: TaskDataCreate) {
    try {
      const { id, title, description, date, status, id_user } = data;

      const db = await sqliteConnection();
      const querySQL =
        "INSERT INTO tasks(id, title, description, date, status, id_user) VALUES(?,?,?,?,?,?)";
      await db.run(querySQL, [id, title, description, date, status, id_user]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async getTask(id: string) {
    try {
      const db = await sqliteConnection();

      const querySQL = "SELECT * FROM tasks WHERE id = ?";

      const task = await db.get(querySQL, [id]);

      return task;
    } catch (error) {
      throw error;
    }
  },

  async getTasks(data: UserTasksPagination) {
    try {
      const { userID, limit, offset, filter } = data;

      const db = await sqliteConnection();

      if(filter == "all"){
        const querySQL = 
        `SELECT * FROM tasks 
        WHERE id_user = ?
        ORDER BY created_at DESC
        LIMIT  ? OFFSET  ?
      ;`;

      const tasks = await db.all(querySQL, [userID, limit, offset]);

      return { tasks };
      } else {
        const querySQL = 
        `SELECT * FROM tasks 
        WHERE id_user = ? AND status = ?
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
;`;


      const tasks = await db.all(querySQL, [userID, filter, limit, offset]);

      return { tasks };
      }
    } catch (error) {
      throw error;
    }
  },
  async updateTask(data: TaskDataCreate) {
    try {
      const { id, title, description, date, status, id_user } = data;

      const db = await sqliteConnection();
      const querySQL = `UPDATE tasks
        SET title = ?, description = ?, date = ? , status = ?, id_user = ? 
        WHERE id = ?;
        `;
      await db.run(querySQL, [title, description, date, status, id_user, id]);

      return { id };
    } catch (error) {
      throw error;
    }
  },

  async deleteTask(id: string) {
    try {
      const db = await sqliteConnection();

      const querySQL = "DELETE FROM tasks WHERE id = ?;";

      const taskDelete = await db.run(querySQL, [id]);

      return taskDelete;
    } catch (error) {
      throw error;
    }
  },
};
