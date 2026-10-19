import { View, Text } from "react-native";
import { Categories, Header } from "../components/";

import { Background } from "../constants/styled";

export default function HomeScreen() {
  return (
    <Background>
      <Header title="Tarefas de hoje" />
      <Text>home-screen</Text>
    </Background>
  );
}
