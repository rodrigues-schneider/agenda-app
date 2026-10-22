import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { fonts, colors } from "../constants/themes";
import {
  FontAwesomeIconName,
  FontAwesome,
} from "@react-native-vector-icons/fontawesome";

type CustonButtonProps = TouchableOpacityProps & {
  text: string;
  textColor?: string;
  icon?: FontAwesomeIconName;
};

export default function CustonButton({
  text,
  textColor,
  icon,
  onPress,
}: CustonButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && <FontAwesome name={icon} style={styles.icon} />}
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: 350,
    height: 50,
    backgroundColor: colors.Primary,
    borderRadius: 10,
    shadowColor: colors.Foreground,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },

  text: {
    fontSize: 20,
    fontFamily: fonts.MEDIUM,
    color: colors.Background,
  },

  icon: {
    fontSize: 20,
    transform: [{ translateY: 1 }],
  },
});
