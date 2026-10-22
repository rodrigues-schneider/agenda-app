const now = new Date();

//Retorna a data atual no formato "AAAA-MM-DD"
export const today = () =>
  [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
