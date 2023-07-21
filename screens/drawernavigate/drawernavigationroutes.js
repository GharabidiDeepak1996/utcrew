import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons, Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";

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
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "black",
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "gray",
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
          fontFamily: "Roboto-Medium",
        },
      }}
      initialRouteName="Findmyride"
    >
      <Drawer.Screen
        name="Find My Ride"
        component={FindMyRideScreenStack}
        options={{
          headerTitleStyle: { color: "red" },
          drawerIcon: ({ focused, size, color }) => (
            <Entypo name="location-pin" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={FeedbackScreenStack}
        options={{
          headerTitleStyle: { color: "red" },
          drawerIcon: ({ focused, size, color }) => (
            <MaterialIcons name="feedback" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={FeedbackScreenStack}
        options={{
          headerTitleStyle: { color: "red" },
          drawerIcon: ({ focused, size, color }) => (
            <AntDesign name="infocirlce" size={24} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen name="Logout" component={feedbackScreenStack} /> */}

      {/* <Drawer.Screen name="Selectedride" component={SelectedRideStack} /> */}
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
  console.log("params546", route.params);

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
function FeedbackScreenStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FeedBack"
        component={FeedBack}
        options={{
          headerTitle: "Feedback",
          headerTitleAlign: "left",
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),

          headerStyle: {
            backgroundColor: "gray", //Set Header color
          },
          headerTintColor: "white", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
          //title: "FeedBack", //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

export default DrawerNavigationRoutes;
