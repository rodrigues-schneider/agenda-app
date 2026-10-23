import { TaskCategory } from "./models/category";

const now = new Date();

//Retorna a data atual no formato "AAAA-MM-DD"
export const today = () =>
  [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

export const categoryHandler = (
  categories: TaskCategory[],
  categoryName: string,
): TaskCategory | undefined =>
  categories.find((category) => category.category_name === categoryName);

export const hourList = (selectedDate: string) => {
  let selectableHours: string[] = [];

  const currentDate = today();

  if (selectedDate < currentDate) {
    return selectableHours;
  }

  let startMinutes = 0;

  if (selectedDate === currentDate) {
    const now = new Date();

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    startMinutes = (Math.floor(currentMinutes / 30) + 1) * 30;
  }

  for (let m = startMinutes; m < 24 * 60; m += 30) {
    const hour = Math.floor(m / 60);
    const minutes = Math.floor(m % 60);

    selectableHours.push(
      String(hour).padStart(2, "0") + ":" + String(minutes).padStart(2, "0"),
    );
  }
  return selectableHours;
};
