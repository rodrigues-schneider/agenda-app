export interface Checklist {
  id: number | null;
  tasks: string[];
  date?: string;
  local?: string;
}

export type CreateChecklistDTO = Omit<Checklist, "id">;
