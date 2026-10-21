export interface Task {
  id: number | null;
  name: string;
  date: string | null;
  hour: string | null;
  category?: string | null;
  description?: string | null;
  local?: string | null;
}

export type CreateTaskDTO = Omit<Task, "id">;
