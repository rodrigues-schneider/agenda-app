import { StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { colors, fonts } from "../constants/themes";

const Categories = ["Tudo", "Trabalho", "Saúde", "Pessoal"]; //Receberá o Array real futuramente

export default function CategoryFilter() {
  const [selected, setSelected] = useState("");

  return (
    <FlatList
      style={{ flexDirection: "row", gap: 3 }}
      data={Categories}
      keyExtractor={(item) => item.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={
            selected === item ? styles.selectedContainer : styles.container
          }
          onPress={() => setSelected(item)}
        >
          <Text style={selected === item ? styles.selectedText : styles.text}>
            {item}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderColor: colors.Secondary,
    borderWidth: 1,
  },

  selectedContainer: {
    borderRadius: 20,
    backgroundColor: colors.Secondary,
  },

  text: {
    color: colors.Secondary,
    fontFamily: fonts.MEDIUM,
  },

  selectedText: {
    fontFamily: fonts.MEDIUM,
    color: colors.Background,
  },
});
