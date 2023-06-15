import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { axiosPost } from "../apis/useAxios";

const SplashScreen = () => {
  //state for activity animation
  const [animating, setAnimating] = useState(true);
  const navigation = useNavigation();

  const getAppVersionDetails = async () => {
    try {
      //const rse = await axiosGet('airline/getAirlines/',{airlineCode:'qp'});
      const getAppVerDetails = await axiosPost("/APK/GetAppVersionDetails", {
        AppTypeId: 3,
        DeviceTypeId: 1,
      });

      if (getAppVerDetails.IsSuccess == true) {
        setAnimating(false);
        navigation.navigate("Auth");
      } else {
        console.log("LoginScreen-AppVersionDetails ", "something went wrong.");
      }
      console.log("LoginScreen-AppVersionDetails ", getAppVerDetails.IsSuccess);
    } catch (error) {
      console.log("LoginScreen-AppVersionDetails ", error);
    } finally {
      //setLoading(false);
    }
  };

  useEffect(() => {
    getAppVersionDetails();
    //   setTimeout(() =>{
    //     setAnimating(false)
    //     navigation.navigate("Auth")
    //     //navigation.navigate("LoginScreen")
    // },1000)
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/crew_login_logo.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <ActivityIndicator
          animating={animating}
          color="black"
          size="large"
          //style={styles.activityIndicator}
        />
      </ImageBackground>
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
