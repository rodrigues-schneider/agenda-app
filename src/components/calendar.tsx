import { StyleSheet, Text, View } from "react-native";
import React, { use, useState } from "react";
import { Calendar, LocaleConfig } from "react-native-calendars";

import { fonts, colors } from "../constants/themes";

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan.",
    "Fev.",
    "Mar.",
    "Abr.",
    "Mai.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Set.",
    "Out.",
    "Nov.",
    "Dez.",
  ],
  dayNames: [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-br";

export default function Calender() {
  const today = new Date();
  const formatedToday = today.toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(formatedToday);

  return (
    <Calendar
      style={{
        alignSelf: "center",
        width: "95%",
        paddingBottom: 5,
      }}
      theme={{
        textSectionTitleColor: "#b6c1cd",
        textSectionTitleDisabledColor: "#d9e1e8",
        selectedDayBackgroundColor: colors.Primary,
        selectedDayTextColor: "#ffffff",

        todayTextColor: colors.Primary,
        dayTextColor: colors.Foreground,
        selectedDotColor: "#ffffff",
        arrowColor: colors.Foreground,
        disabledArrowColor: "#d9e1e8",
        monthTextColor: colors.Primary,
        indicatorColor: colors.Primary,

        textDayFontFamily: fonts.LIGHT,
        textMonthFontFamily: fonts.SEMIBOLD,
        textDayHeaderFontFamily: fonts.BOLD,

        textDayFontSize: 15,
        textMonthFontSize: 18,
        textDayHeaderFontSize: 12,
      }}
      onDayPress={(day) => {
        setSelectedDate(day.dateString);
        console.log("Data Selecionada: " + day);
      }}
      markedDates={{
        [selectedDate]: {
          selected: true,
        },
      }}
    />
  );
}
