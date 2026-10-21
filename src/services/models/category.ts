export interface Category {
  id: number | null;
  name: string;
  color: string;
}

//Objeto para enviar dados para o database
export type CreateCategoryDTO = Omit<Category, "id">;
