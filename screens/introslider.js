import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
//import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IntroSlider = ({ navigation }) => {
  // const navigation = useNavigation();

  const [showRealApp, setShowRealApp] = useState();
  const [isLogged, setIsLogged] = useState(true);

  const onDone = () => {
    setShowRealApp(true);
    introSliderBoolean(true);
  };

  const onSkip = () => {
    setShowRealApp(true);
    introSliderBoolean(true);
  };

  const introSliderBoolean = async (value) => {
    try {
      await AsyncStorage.setItem("isIntroRead", JSON.stringify(value));
    } catch (error) {
      console.log("AsyncStorage IntroSlider", error);
    }
  };

  AsyncStorage.getItem("isIntroRead", (err, value) => {
    if (value != null) {
      setShowRealApp(true);
    }
  });

  AsyncStorage.getItem("isLogged", (err, value) => {
    if (value) {
      setIsLogged(value);
    } else {
      setIsLogged(false);
    }
  });
  const RenderItem = ({ item }) => {
    const { imagePath, text } = { ...item };
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ width: 240, height: 240 }}
          source={imagePath}
          resizeMode="contain"
        />
        <Text style={{ color: "white", fontSize: 20, top: 30 }}>{text}</Text>
      </View>
    );
  };

  return showRealApp ? (
    isLogged ? (
      navigation.navigate("DrawerNavigationRoutes")
    ) : (
      navigation.navigate("LoginScreen")
    )
  ) : (
    <AppIntroSlider
      data={slider}
      renderItem={RenderItem}
      onDone={onDone}
      showSkipButton={true}
      onSkip={onSkip}
      dotStyle={(style = { backgroundColor: "red" })}
    />
  );
};

const slider = [
  {
    key: "s1",
    text: "Select your flight number or just enter it.",
    imagePath: require("../assets/vector_1.png"),
    // image: {
    //   // uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png",
    //   image: <Image source={require("../assets/vector_2.png")} />,
    // },
    backgroundColor: "black",
  },
  {
    key: "s2",
    text: "Tap to call your driver to the curbside or locate vehicle",
    imagePath: require("../assets/vector_2.png"),
    // image: {
    //   image: <Image source={require("../assets/vector_2.png")} />,
    // },
    backgroundColor: "black",
  },
  {
    key: "s3",
    text: "Get instruction from the transporter view an accurate ETA.",
    imagePath: require("../assets/vector_3.png"),
    // image: {
    //   image: <Image source={require("../assets/vector_3.png")} />,
    // },
    backgroundColor: "black",
  },
];

export default IntroSlider;
