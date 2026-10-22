import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { DbManager, PlannerTask, TaskCategory, Place } from "../services/";

type PlannerContextProps = {
  children: ReactNode;
};

interface PlannerContextData {
  tasks: PlannerTask[];
  categories: TaskCategory[];
  dates: string[];
  places: Place[];
  dbLoaded: boolean;
  updateContextLists: () => Promise<void>;
}

//Cria um contexto à partir dos dados do database
export const PlannerContext = createContext<PlannerContextData | undefined>(
  undefined,
);

//Prove os dados para o Planner
export default function PlannerContextProvider({
  children,
}: PlannerContextProps) {
  const [dbLoaded, setDbLoaded] = useState(false);

  const [tasks, setTasks] = useState<PlannerTask[]>([]);
  const [categories, setCategories] = useState<TaskCategory[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);

  const updateContextLists = async () => {
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
        await updateContextLists();
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
        updateContextLists,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
}

export const usePlannerData = () => {
  const context = useContext(PlannerContext);

  if (!context) {
    throw new Error(
      "'usePlannerData' deve ser usado dentro de 'PlannerContextProvider'.",
    );
  }

  return context;
};
