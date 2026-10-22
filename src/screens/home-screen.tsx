import { View, Text } from "react-native";
import { TodayTasks, Header, CustonButton } from "../components/";

import { Background } from "../constants/styled";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NativeStackParamList } from "../routes/project.routes";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  NativeStackParamList,
  "Main"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const goToRegisterScreen = () => {
    navigation.navigate("Register");
  };
  return (
    <Background>
      <Header title="Tarefas de hoje" />
      <TodayTasks />
      <CustonButton
        text="Nova Tarefa"
        icon="plus"
        onPress={goToRegisterScreen}
      />
    </Background>
  );
}
