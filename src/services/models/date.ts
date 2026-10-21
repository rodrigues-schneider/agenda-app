export interface Date {
  id: number | null;
  name: string;
}

//Objeto para enviar dados para o database
export type CreateDateDTO = Omit<Date, "id">;
