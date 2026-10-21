import * as SQLite from "expo-sqlite";
import { Task } from "../models/task";

export class DbManager {
  private static instance: DbManager | null = null;
  private db: SQLite.SQLiteDatabase | null = null;

  private taskList: Task[] = [];
  private categoryList: string[] = [];
  private dateList: string[] = [];

  private constructor() {}

  public static async initDB(): Promise<DbManager> {
    if (!DbManager.instance) {
      const instance = new DbManager();
      await instance.setupDatabase();
      DbManager.instance = instance;
    }
    return DbManager.instance;
  }

  private async setupDatabase() {
    this.db = await SQLite.openDatabaseAsync("planner.db");

    await this.db.execAsync(`PRAGMA foreign_keys = ON;`);

    await this.db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS task_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT UNIQUE NOT NULL 
      );

      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        date TEXT,
        hour TEXT,
        category TEXT,
        description TEXT,
        local TEXT,
        FOREIGN KEY (category) REFERENCES task_categories (category) ON DELETE SET NULL
      );            
      `);

    await this.refreshLists();
  }

  public async refreshLists() {
    if (!this.db) return;

    this.taskList = await this.db.getAllAsync<Task>(`SELECT * FROM tasks`);

    const categories = (await this.db.getAllAsync(
      `SELECT category FROM task_categories;`,
    )) as { category: string }[];
    this.categoryList = categories.map((c) => c.category);

    const dates = (await this.db.getAllAsync(
      `SELECT DISTINCT date FROM tasks WHERE date IS NOT NULL;`,
    )) as { date: string }[];
    this.dateList = dates.map((d) => d.date);
  }

  public async insertNewTask(name: string, date: string, hour: string) {
    if (!this.db) throw new Error("Base de dados não inicializada.");

    const result = await this.db.runAsync(
      `
        INSERT INTO tasks (name, date, hour) VALUES (?, ?, ?);
        `,
      name,
      date,
      hour,
    );
    await this.refreshLists();

    console.log("Tarefa inserida com id: " + result.lastInsertRowId);
  }

  public async insertCategory(taskId: string, category: string) {
    if (!this.db) throw new Error("Base de dados não inicializada.");

    await this.db.runAsync(
      `
      INSERT OR IGNORE INTO task_categories (category) VALUES (?);
      `,
      category,
    );

    await this.db.runAsync(
      `
        UPDATE tasks SET category = ? WHERE id = ?;
        `,
      category,
      taskId,
    );
    await this.refreshLists();
  }

  public async insertDescription(taskId: string, description: string) {
    if (!this.db) throw new Error("Base de dados não inicializada.");

    await this.db.runAsync(
      `
        UPDATE tasks SET description = ? WHERE id = ?;
        `,
      description,
      taskId,
    );
    await this.refreshLists();
  }

  public async insertLocal(taskId: string, local: string) {
    if (!this.db) throw new Error("Base de dados não inicializada.");

    await this.db.runAsync(
      `
        UPDATE tasks SET local = ? WHERE id = ?;
        `,
      local,
      taskId,
    );
    await this.refreshLists();
  }

  public getAllTasks(): Task[] {
    return this.taskList;
  }

  public getTask(id: number) {
    return this.taskList.find((task) => task.id === id);
  }

  public getAllCategories(): string[] {
    return this.categoryList;
  }

  public getAllDates(): string[] {
    return this.dateList;
  }
}
