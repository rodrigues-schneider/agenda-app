export interface Checklist {
  id: number | null;
  tasks: string[];
  date?: string;
  local?: string;
}

//Objeto para enviar dados para o database
export type CreateChecklistDTO = Omit<Checklist, "id">;
