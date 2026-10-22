export interface Place {
  id: number | null;
  place_name: string;
}

//Objeto para enviar dados para o database
export type CreatePlaceDTO = Omit<Place, "id">;
