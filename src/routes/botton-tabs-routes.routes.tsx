import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen, CalendarScreen, RegisterScreen } from "../screens";

const { Navigator, Screen } = createBottomTabNavigator();

export default function BottonTabsRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={HomeScreen} />

      <Screen name="Register" component={RegisterScreen} />

      <Screen name="Calendar" component={CalendarScreen} />
    </Navigator>
  );
}
