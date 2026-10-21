import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { DbManager } from "../services";

export default function TaskList() {
  const [taskList, setTaskList] = useState<string[]>([]);
  const [taskFilter, setTaskFilter] = useState("");

  return (
    <View>
      <Text>task-list</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
