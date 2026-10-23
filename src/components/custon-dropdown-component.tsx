import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { fonts, colors } from "../constants/";

type CustonPickerProps = {
  labelArray: string[];
  valueArray?: string[];
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function CustonDropdownComponent({
  labelArray,
  valueArray,
  label,
  value,
  onChange,
}: CustonPickerProps) {
  const [focused, setFocused] = useState(false);

  let data: string[] = [];

  labelArray.forEach((item, index) => {
    const row = {
      label: item,
      value: valueArray?.[index] ?? item,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>{label}</Text>
      <Dropdown
        style={[
          styles.dropdownStyle,
          { borderColor: focused ? colors.Primary : colors.Border },
        ]}
        data={data}
        value={value}
        labelField="label"
        valueField="value"
        selectedTextStyle={{
          fontFamily: fonts.MEDIUM,
          color: colors.Foreground,
        }}
        inputSearchStyle={{ fontFamily: fonts.LIGHT }}
        placeholderStyle={{ fontFamily: fonts.LIGHT }}
        placeholder="Selecione..."
        searchPlaceholder="Procurar..."
        onChange={(item) => onChange?.(item.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "70%",
    height: 100,
    marginVertical: 10,
  },

  labelStyle: {
    fontFamily: fonts.MEDIUM,
    fontSize: 16,
    color: colors.Secondary,
    paddingHorizontal: 15,
    marginBottom: 5,
  },

  dropdownStyle: {
    height: 50,
    width: 350,
    borderWidth: 1,
    shadowColor: colors.Accent,
    shadowOffset: { height: 2, width: 2 },
    elevation: 5,
  },
});
