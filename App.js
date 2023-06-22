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
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackVehicle from "./screens/mapview";

export default function App() {
  const [isLogged, setIslogged] = useState(undefined);
  const [user, setUser] = useState(undefined);

  //Checking if user is already logged in or not!
  const checkUser = async () => {
    try {
      const authUser = await AsyncStorage.getItem("isIntroRead");
      const isLogged = await AsyncStorage.getItem("isLogged");
      setUser(authUser);
      setIslogged(isLogged);
    } catch (e) {
      setUser(null);
      setIslogged(null);
    }
  };

  const Auth = ({ route }) => {
    console.log(isLogged);

    const { isSlide } = route?.params || {};
    return (
      <Stack.Navigator>
        {user || isSlide ? (
          isLogged ? (
            <Stack.Screen
              name="DrawerNavigationRoutes"
              component={DrawerNavigationRoutes}
              // Hiding header for Navigation Drawer
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="registration"
                component={Registration}
                options={{
                  title: "Registration",
                  headerStyle: {
                    backgroundColor: "black", //Set Header color
                  },
                  headerTintColor: "gray", //Set Header text color
                  headerTitleStyle: {
                    fontWeight: "bold", //Set Header text style
                  },
                  // headerTitleAlign: "center", //Header title on center
                  // headerShadowVisible: false, //set Header shadowvisible gone
                }}
              />
            </>
          )
        ) : (
          <Stack.Screen
            name="introslider"
            component={IntroSlider}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    );
  };
  useEffect(() => {
    checkUser();
  }, []);

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

        <Stack.Screen name="search" component={Search} />
        <Stack.Screen name="trackVehicle" component={TrackVehicle} />
        {/* <Stack.Screen
          name="selectedrides"
          component={SelectedRides}
          options={{ headerShown: true }}
        /> */}

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
