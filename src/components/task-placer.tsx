import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";

import { colors, fonts } from "../constants/themes";

import { usePlannerData } from "../contexts";
import { TaskCategory, PlannerTask, today } from "../services";
import { FontAwesome } from "@react-native-vector-icons/fontawesome";

const TaskContainer = ({ task }: { task: PlannerTask }) => {
  const { categories } = usePlannerData();

  const category: TaskCategory | undefined = categories.find(
    (c) => c.category_name === task.category,
  );

  return (
    <View style={styles.taskContainer}>
      <Text style={{ fontFamily: fonts.BOLD, color: colors.Foreground }}>
        {task.name}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontFamily: fonts.LIGHT, color: colors.Secondary }}>
          {task.hour}
        </Text>
        {category?.category_icon && (
          <FontAwesome name={category?.category_icon} />
        )}
        <Text style={{ color: category?.category_color ?? "#000000" }}>
          {category?.category_name}
        </Text>
      </View>
    </View>
  );
};

export default function CategoryFilter() {
  const { categories, tasks } = usePlannerData();

  const categoryList: string[] = [
    "Todas",
    ...categories.map((c) => c.category_name),
  ];

  const todayTasks = tasks.filter((task) => task.date === today());

  const [selectedFilter, setSelectedFilter] = useState("Todas");
  const [showTasks, setShowTasks] = useState<PlannerTask[]>(todayTasks);

  return (
    <View style={{ flex: 1, paddingVertical: 10 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 10 }}
        contentContainerStyle={{ gap: 5 }}
        data={categoryList}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={
              selectedFilter === item
                ? styles.selectedContainer
                : styles.container
            }
            onPress={() => setSelectedFilter(item)}
          >
            <Text
              style={
                selectedFilter === item ? styles.selectedText : styles.text
              }
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ padding: 10 }}
        contentContainerStyle={{ gap: 5 }}
        data={showTasks}
        keyExtractor={(item) => item.id?.toString() ?? item.name.toString()}
        renderItem={({ item }) => <TaskContainer task={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",

    height: 40,
    width: 100,

    borderRadius: 30,
    borderColor: colors.Secondary,
    borderWidth: 1,
  },

  selectedContainer: {
    justifyContent: "center",
    alignItems: "center",

    height: 40,
    width: 80,

    borderRadius: 30,
    backgroundColor: colors.Secondary,
  },

  text: {
    fontSize: 15,
    color: colors.Secondary,
    fontFamily: fonts.MEDIUM,
  },

  selectedText: {
    fontSize: 15,
    fontFamily: fonts.MEDIUM,
    color: colors.Background,
  },

  taskContainer: {
    justifyContent: "center",
    width: 350,
    height: 100,
  },
});
