import React, { useEffect } from "react";
import { ImageBackground, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      //Add slider screen
      navigation.navigate("introslider");
    }, 3000);
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
