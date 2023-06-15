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
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="splashscreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        {/* Auth Navigator: Include Login ,welcome and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />

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

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="introslider">
      <Stack.Screen name="introslider" component={IntroSlider} />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="registration" component={Registration} />
      <Stack.Screen name="search" component={Search} />
      <Stack.Screen name="selectedrides" component={SelectedRides} />
    </Stack.Navigator>
  );
};
