import { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { fonts, colors } from "../constants/themes";

export default function CustonInput() {
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput onChangeText={(value) => setText(value)} value={text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    height: "12%",
    borderRadius: "5%",
    borderColor: colors.Border,
    shadowColor: colors.Foreground,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },
});
