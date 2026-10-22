import { View, Text } from "react-native";
import React from "react";
import { Calendar } from "react-native-calendars";
import { Header } from "../components";
import { Background } from "../constants";

export default function CalendarScreen() {
  return (
    <Background>
      <Header title="Calendário de tarefas" subtitle="Selecione uma data" />
      <Calendar />
      <Text>calendar-screen</Text>
    </Background>
  );
}
