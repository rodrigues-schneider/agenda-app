import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { fonts, colors } from "./src/constants/themes";
import { DbManager, Task } from "./src/services";

import { Routes } from "./src/routes/";

export default function App() {
  //Carrega as Fontes
  const [fontsLoaded] = useFonts({
    [fonts.LIGHT]: require("./src/assets/fonts/AsapSharp_Condensed-Light.ttf"),
    [fonts.MEDIUM]: require("./src/assets/fonts/AsapSharp_Condensed-Medium.ttf"),
    [fonts.SEMIBOLD]: require("./src/assets/fonts/AsapSharp_Condensed-SemiBold.ttf"),
    [fonts.BOLD]: require("./src/assets/fonts/AsapSharp_Condensed-Bold.ttf"),
  });

  if (!fontsLoaded || !dbLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.Primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Routes />
    </SafeAreaProvider>
  );
}
