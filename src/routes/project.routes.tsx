import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen, CalendarScreen, RegisterScreen } from "../screens";

const tab = createBottomTabNavigator();

const stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  );
}

function BottonTabsRoutes() {
  return (
    <tab.Navigator screenOptions={{ headerShown: false }}>
      <tab.Screen name="Home" component={HomeScreen} />
      <tab.Screen name="Calendar" component={CalendarScreen} />
    </tab.Navigator>
  );
}

function StackRoutes() {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="Main" component={BottonTabsRoutes} />
      <stack.Screen name="Register" component={RegisterScreen} />
    </stack.Navigator>
  );
}
