import { View, Text } from "react-native";
import { Categories, Header, CustonButton } from "../components/";

import { Background } from "../constants/styled";

export default function HomeScreen() {
  return (
    <Background>
      <Header title="Tarefas de hoje" />
      <Categories />
      <CustonButton text="Nova Tarefa" />
    </Background>
  );
}
