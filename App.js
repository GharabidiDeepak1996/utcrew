import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigationRoutes from "./screens/drawernavigate/drawernavigationroutes";

import IntroSlider from "./screens/introslider";
import SplashScreen from "./screens/splashscreen";
import LoginScreen from "./screens/login";
import Registration from "./screens/registration";
import Search from "./components/search";
import SelectedRides from "./screens/selectedrides";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splashscreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="splashscreen" component={SplashScreen} />

        <Stack.Screen name="introslider" component={IntroSlider} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="registration" component={Registration} />
        <Stack.Screen name="search" component={Search} />
        <Stack.Screen name="selectedrides" component={SelectedRides} />

        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
