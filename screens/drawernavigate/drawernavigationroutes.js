import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
import SelectedRides from "../selectedrides";

function DrawerNavigationRoutes({ route, navigation }) {
  //console.log("params", route.params);

  return (
    <Drawer.Navigator
      // drawerContentOptions={{
      //   activeTintColor: "#e91e63",
      //   itemStyle: { marginVertical: 5 },
      // }}
      //drawerContent={(props) => <CustomDrawerContent {...props} />}>
      drawerContent={NavigationDrawerProfileStructure}
      screenOptions={{ headerShown: false }}
      initialRouteName="Findmyride"
    >
      <Drawer.Screen name="Findmyride" component={FindMyRideScreenStack} />
      <Drawer.Screen name="Selectedrides" component={SelectedRideStack} />
      {/* <Drawer.Screen name="feedback" component={feedbackScreenStack} />
      <Drawer.Screen name="about" component={feedbackScreenStack} />
      <Drawer.Screen name="logout" component={feedbackScreenStack} /> */}
    </Drawer.Navigator>
  );
}

function FindMyRideScreenStack({ navigation }) {
  return (
    <Stack.Navigator //initialRouteName="FindMyRide"
    >
      <Stack.Screen
        name="FindMyRide"
        component={FindMyRide}
        options={{
          //title: "Find My Ride", //Set Header Title
          headerTitle: "Find My Ride",
          headerTitleAlign: "center",
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "black", //Set Header color
          },
          headerTintColor: "white", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function SelectedRideStack({ route, navigation }) {
  // console.log("params546", route.params);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SelectedRides"
        component={SelectedRides}
        initialParams={{ ridesDetails: route.params }}
        options={{
          headerTitle: "Select Ride",
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 40,
                marginRight: 18,
              }}
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate("FindMyRide");
              }}
            >
              <Ionicons name="md-arrow-back" size={24} color="white" />
            </TouchableOpacity>
            // <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: "#454545", //Set Header color
          },
          headerTintColor: "white", //Set Header text color
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
