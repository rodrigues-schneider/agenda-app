export interface Task {
  id: number | null;
  name: string;
  date: string | null;
  hour: string | null;
  category?: string | null;
  description?: string | null;
  place?: string | null;
}

//Objeto para enviar dados para o database
export type CreateTaskDTO = Omit<Task, "id">;
