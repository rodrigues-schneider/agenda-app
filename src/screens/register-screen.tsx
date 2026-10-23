import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  Header,
  CustonButton,
  CustonInput,
  CustonDropdown,
} from "../components";
import { Background } from "../constants";
import { usePlannerData } from "../contexts";

export default function RegisterScreen() {
  const { categories } = usePlannerData();

  const [selectedCategory, setSelectedCategory] = useState("");

  const dropdownLabelArray: string[] = [];

  categories.forEach((category) =>
    dropdownLabelArray.push(category.category_name),
  );

  return (
    <Background>
      <Header title="Nova Tarefa" subtitle="Registre a nova atividade" />
      <View style={{ flex: 1 }}>
        <CustonInput label="Nome da tarefa" />
        <CustonInput label="Data" />
        <CustonInput label="Horário" />
        <CustonDropdown
          label="Categoria (Opcional)"
          labelArray={dropdownLabelArray}
          value={selectedCategory}
          onChange={(text) => setSelectedCategory(text)}
        />
        <CustonInput label="Local (Opcional)" />
        <CustonInput label="Descrição (Opcional)" />
      </View>

      <CustonButton text="Salvar Atividade" icon="check" />
    </Background>
  );
}
