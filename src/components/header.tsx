import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../constants";

type HeaderProps = {
  title: string;
  subtitle?: string;
};

const formatedDate = () => {
  return Intl.DateTimeFormat("pt-BR", { dateStyle: "full" }).format(new Date());
};

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle ?? formatedDate()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 2,
    margin: 10,
  },
  title: {
    fontFamily: fonts.SEMIBOLD,
    fontSize: 25,
    color: colors.Secondary,
  },
  subtitle: {
    fontFamily: fonts.LIGHT,
    fontSize: 15,
    color: "#000000",
  },
});
