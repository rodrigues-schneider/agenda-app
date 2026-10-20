import { StyleSheet, Text, View } from "react-native";
import { fonts, colors } from "../constants/themes";

type CustonButtonProps = {
  text: string;
  textColor?: string;
};

export default function CustonButton({ text, textColor }: CustonButtonProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    height: "12%",
    backgroundColor: colors.Primary,
    borderRadius: "5%",
    shadowColor: colors.Foreground,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },

  text: {
    fontFamily: fonts.MEDIUM,
    color: colors.Background,
  },
});
