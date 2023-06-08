import React from "react";
import { Text, View } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import NavigationDrawerStructure from "./navigationdrawerstructure";
import NavigationDrawerProfileStructure from "./navigationdrawerprofilestructure";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import FindMyRide from "../drawernavigate/findmyride";
import FeedBack from "./feedback";
import About from "./about";
import LogOut from "./logout";

function DrawerNavigationRoutes() {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: "#e91e63",
        itemStyle: { marginVertical: 5 },
      }}
      drawerContent={NavigationDrawerProfileStructure}
      //screenOptions={{ headerShown: false }}
      initialRouteName="findmyride"
    >
      <Drawer.Screen
        name="findmyride"
        options={{ drawerLabel: "Find My Ride" }}
        component={findMyRideScreenStack}
      />
      <Drawer.Screen
        name="feedback"
        options={{ drawerLabel: "Feedback" }}
        component={feedbackScreenStack}
      />
      <Drawer.Screen
        name="about"
        options={{ drawerLabel: "About" }}
        component={secondScreenStack}
      />
      <Drawer.Screen
        name="logout"
        options={{ drawerLabel: "Logout" }}
        component={secondScreenStack}
      />
    </Drawer.Navigator>
  );
}

function findMyRideScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="FindMyRide">
      <Stack.Screen
        name="FindMyRide"
        component={FindMyRide}
        options={{
          title: "Find My Ride", //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#307ecc", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function feedbackScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="FeedBack"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: "#f4511e", //Set Header color
        },
        headerTintColor: "#fff", //Set Header text color
        headerTitleStyle: {
          fontWeight: "bold", //Set Header text style
        },
      }}
    >
      <Stack.Screen
        name="FeedBack"
        component={FeedBack}
        options={{
          title: "FeedBack", //Set Header Title
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: "About", //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

export default DrawerNavigationRoutes;
