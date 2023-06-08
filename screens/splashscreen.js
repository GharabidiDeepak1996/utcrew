import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { axiosPost } from "../apis/useAxios";

const SplashScreen = () => {
  const navigation = useNavigation();

  const getAppVersionDetails = async () => {
    try {
      //const rse = await axiosGet('airline/getAirlines/',{airlineCode:'qp'});
      const getAppVerDetails = await axiosPost("/APK/GetAppVersionDetails", {
        AppTypeId: 3,
        DeviceTypeId: 1,
      });

      if (getAppVerDetails.IsSuccess == true) {
        navigation.navigate("introslider");
      } else {
        console.log("LoginScreen-AppVersionDetails ", "something went wrong.");
      }
      console.log("LoginScreen-AppVersionDetails ", getAppVerDetails.IsSuccess);
    } catch (error) {
      console.log("LoginScreen-AppVersionDetailsError ", error);
    } finally {
      //setLoading(false);
    }
  };

  useEffect(() => {
    getAppVersionDetails();
    // setTimeout(() => {
    //   //Add slider screen
    //   navigation.navigate("introslider");
    // }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/crew_login_logo.png")}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
  },
});

export default SplashScreen;
