import { StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

import { colors, fonts } from "../constants/themes";
import { dbManager } from "../services";

export default function CategoryFilter() {
  const [selected, setSelected] = useState("Todas");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const fetchCategories = await dbManager.getCategories();
      setCategories(["Todas", ...fetchCategories]);
    }
    loadCategories();
  }, []);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ paddingHorizontal: 8, gap: 4 }}
      data={categories}
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
