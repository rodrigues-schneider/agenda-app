export interface PlannerTask {
  id: number | null;
  name: string;
  date: string | null;
  hour: string | null;
  category?: string | null;
  description?: string | null;
  place?: string | null;
  completed?: boolean;
}

//Objeto para enviar dados para o database
export type CreatePlannerTaskDTO = Omit<PlannerTask, "id">;
