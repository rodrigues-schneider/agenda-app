import { View, Text } from "react-native";
import React from "react";
import { Header, CustonButton, CustonInput } from "../components";
import { Background } from "../constants";

export default function RegisterScreen() {
  return (
    <Background>
      <Header title="Nova Tarefa" subtitle="Registre a nova atividade" />
      <View style={{ flex: 1 }}>
        <CustonInput label="Nome da tarefa" />
        <CustonInput label="Data" />
        <CustonInput label="Horário" />
        <CustonInput label="Categoria (Opcional)" />
        <CustonInput label="Local (Opcional)" />
        <CustonInput label="Descrição (Opcional)" />
      </View>

      <CustonButton text="Salvar Atividade" icon="check" />
    </Background>
  );
}
