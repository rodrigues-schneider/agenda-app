import * as SQLite from "expo-sqlite";
import { Task, Category, Date, Place } from "../";

export class DbManager {
  private static instance: DbManager | null = null;
  private db: SQLite.SQLiteDatabase | null = null;

  private taskList: Task[] = [];
  private categoryList: Category[] = [];
  private dateList: Date[] = [];
  private placeList: Place[] = [];

  //Estrutura singleton: construtor privado e instancia única
  private constructor() {}

  public static async initDB(): Promise<DbManager> {
    if (!DbManager.instance) {
      const instance = new DbManager();
      await instance.setupDatabase();
      DbManager.instance = instance;
    }
    return DbManager.instance;
  }

  //Cria as tabelas
  private async setupDatabase() {
    this.db = await SQLite.openDatabaseAsync("planner.db");

    await this.db.execAsync(`PRAGMA foreign_keys = ON;`);

    await this.db.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS task_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT UNIQUE NOT NULL 
        color TEXT UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS task_places (
        id INTEGER PRIMARY KEY AUTOINCREMENT
        place TEXT UNIQUE NOT NULL
      )      

      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        date TEXT,
        hour TEXT,
        category TEXT,
        description TEXT,
        place TEXT,
        FOREIGN KEY (category) REFERENCES task_categories (category) ON DELETE SET NULL,
        FOREIGN KEY (place) REFERENCES task_places (place) ON DELETE SET NULL

      );            
      `);

    await this.refreshLists();
  }

  //Atualiza as listas de dados
  public async refreshLists() {
    if (!this.db) return;

    this.taskList = await this.db.getAllAsync<Task>(`SELECT * FROM tasks`);

    this.categoryList = await this.db.getAllAsync<Category>(
      `SELECT * FROM task_categories`,
    );

    this.placeList = await this.db.getAllAsync<Place>(
      `SELECT * FROM task_places`,
    );

    this.dateList = await this.db.getAllAsync<Date>(
      `SELECT DISTINCT date FROM tasks WHERE date IS NOT NULL;`,
    );
  }

  //Guarda uma nova task no DB
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

  //Adiciona uma categoria à uma Task e à tabela de categorias, se não existir nela
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

  //Adiciona uma descrição à uma Task
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

  //Associa um local a uma Task
  public async insertPlace(taskId: string, place: string) {
    if (!this.db) throw new Error("Base de dados não inicializada.");

    await this.db.runAsync(
      `
        UPDATE tasks SET place = ? WHERE id = ?;
        `,
      place,
      taskId,
    );
    await this.refreshLists();
  }

  public getAllTasks(): Task[] {
    return this.taskList;
  }

  public getTask(id: number): Task | undefined {
    return this.taskList.find((task) => task.id === id);
  }

  public getAllCategories(): Category[] {
    return this.categoryList;
  }

  public getAllDates(): Date[] {
    return this.dateList;
  }

  public getAllPlaces(): Place[] {
    return this.placeList;
  }
}
