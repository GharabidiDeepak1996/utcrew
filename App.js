import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IntroSlider from "./screens/introslider";
import SplashScreen from "./screens/splashscreen";
import LoginScreen from "./screens/login";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
