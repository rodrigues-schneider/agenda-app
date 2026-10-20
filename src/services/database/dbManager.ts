import * as SQLite from "expo-sqlite";
import { Task } from "../models/task";

export class dbManager {
  private constructor() {}

  private static async openDB() {
    return await SQLite.openDatabaseAsync("planner.db");
  }

  static async initDB() {
    const db = await this.openDB();

    await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                date TEXT,
                hour TEXT,
                category TEXT,
                description TEXT,
                local TEXT               
                )            
            `);
  }

  static async insertNewTask(name: string, date: string, hour: string) {
    const db = await this.openDB();
    const result = await db.runAsync(
      `
        INSERT INTO tasks (name, date, hour) VALUES (?, ?, ?);
        `,
      name,
      date,
      hour,
    );

    console.log("Tarefa inserida com id: " + result.lastInsertRowId);
  }

  static async getAllTasks() {
    const db = await this.openDB();

    return await db.getAllAsync(`SELECT * FROM tasks;`);
  }

  static async getTask(id: string) {
    const db = await this.openDB();

    return await db.getAllAsync(`SELECT * FROM tasks WHERE id = ?;`, id);
  }

  static async insertCategory(taskId: string, category: string) {
    const db = await this.openDB();
    const result = await db.runAsync(
      `
        UPDATE tasks SET category = ? WHERE id = ?;
        `,
      category,
      taskId,
    );
  }

  static async insertDescription(taskId: string, description: string) {
    const db = await this.openDB();
    const result = await db.runAsync(
      `
        UPDATE tasks SET description = ? WHERE id = ?;
        `,
      description,
      taskId,
    );
  }

  static async insertLocal(taskId: string, local: string) {
    const db = await this.openDB();
    const result = await db.runAsync(
      `
        UPDATE tasks SET local = ? WHERE id = ?;
        `,
      local,
      taskId,
    );
  }

  static async getCategories(): Promise<string[]> {
    const tasks = (await this.getAllTasks()) as any[];

    let categorySet = new Set<string>();

    tasks.forEach((item) => {
      if (item.category) {
        categorySet.add(item.category);
      }
    });
    return Array.from(categorySet);
  }
}
