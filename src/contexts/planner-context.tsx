import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { DbManager, Task, Category, Date, Place } from "../services/";

type PlannerContextProps = {
  children: ReactNode;
};

interface PlannerContextData {
  tasks: Task[];
  categories: Category[];
  dates: Date[];
  places: Place[];
  dbLoaded: boolean;
  refreshLists: () => Promise<void>;
}

//Cria um contexto à partir dos dados do database
export const PlannerContext = createContext<PlannerContextData | undefined>(
  undefined,
);

//Prove os dados para o Planner
const PlannerContextProvider = ({ children }: PlannerContextProps) => {
  const [dbLoaded, setDbLoaded] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);

  const refreshLists = async () => {
    const db = await DbManager.initDB();

    setTasks([...db.getAllTasks()]);
    setCategories([...db.getAllCategories()]);
    setDates([...db.getAllDates()]);
    setPlaces([...db.getAllPlaces()]);
  };

  //Carrega o DB
  useEffect(() => {
    async function initializeDB() {
      try {
        await refreshLists();
        setDbLoaded(true);
      } catch (error) {
        console.error("Erro ao inicializar banco de dados: ", error);
      }
    }

    initializeDB();
  }, []);

  return (
    <PlannerContext.Provider
      value={{
        tasks,
        categories,
        dates,
        places,
        dbLoaded,
        refreshLists,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
};

export default PlannerContextProvider;

export const useDb = () => useContext(PlannerContext);
