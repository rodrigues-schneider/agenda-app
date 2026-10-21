import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { fonts, colors } from "./src/constants/themes";
import { DbManager, Task } from "./src/services";

import { Routes } from "./src/routes/";

export default function App() {
  const [fontsLoaded] = useFonts({
    [fonts.LIGHT]: require("./src/assets/fonts/AsapSharp_Condensed-Light.ttf"),
    [fonts.MEDIUM]: require("./src/assets/fonts/AsapSharp_Condensed-Medium.ttf"),
    [fonts.SEMIBOLD]: require("./src/assets/fonts/AsapSharp_Condensed-SemiBold.ttf"),
    [fonts.BOLD]: require("./src/assets/fonts/AsapSharp_Condensed-Bold.ttf"),
  });

  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    initializeAndLoadDB();
  }, []);

  async function initializeAndLoadDB() {
    const db = await DbManager.initDB();
    setTasks(db.getAllTasks());
    setCategories(db.getAllCategories());
    setDates(db.getAllDates());
  }

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.Primary} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
