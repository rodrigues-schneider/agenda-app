import { FontAwesomeIconName } from "@react-native-vector-icons/fontawesome";
export interface TaskCategory {
  id: number | null;
  category_name: string;
  category_color?: string | null;
  category_icon?: FontAwesomeIconName | null;
}

//Objeto para enviar dados para o database
export type CreateTaskCategoryDTO = Omit<TaskCategory, "id">;
