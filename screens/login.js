import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { axiosGet } from "../apis/useAxios";
import * as Location from "expo-location";

const LoginScreen = ({ navigation }) => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [isCheckUserName, setCheckUserName] = useState(false);

  const [password, setPassword] = useState("");
  const [isCheckPassword, setCheckPassword] = useState(false);

  const [errorUserNameText, setUserNameError] = useState("");
  const [errorUserPasswordText, setUserPasswordError] = useState("");

  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleSubmitPress = () => {
    var emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (userName.trim() == "") {
      setUserNameError("Please enter username");
      setCheckUserName(true);
      return false;
    } else if (password.trim() == "") {
      setUserPasswordError("Please enter password");
      setCheckPassword(true);
      return false;
    } else {
      loginApi();
    }
  };

  async function loginApi() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    const getLoginDetails = await axiosGet(
      `User/GetLoginInfoV3/${userName}/${password}/${location.coords.latitude}/${location.coords.longitude}`
    );

    if (getLoginDetails.IsSuccess) {
      //Dashboard.

      navigation.navigate("DrawerNavigationRoutes");
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/bg_background.jpg")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <Image
          source={require("../assets/crew_login_logo.png")}
          style={{
            width: 200,
            height: 100,
            alignSelf: "center",
            marginBottom: 30,
          }}
          resizeMode="contain"
        />
        {/* container */}
        <View
          style={{
            backgroundColor: "black",
            width: 350,
            height: 300,
            alignSelf: "center",
            borderRadius: 12,
            padding: 18,
          }}
        >
          <Text style={{ color: "gray" }}>Username</Text>
          <TextInput
            style={
              isCheckUserName == true ? styles.errorTextInput : styles.textInput
            }
            //value={number}
            keyboardType="visible-password"
            selectionColor={"red"}
            underlineColorAndroid={"transparent"}
            InputProps={{ disableUnderline: true }}
            autoCorrect={false}
            spellCheck={false}
            cursorColor={"red"}
            //placeholder='Email/ Mobile'
            placeholderTextColor={"gary"}
            returnKeyType="next"
            onChangeText={(actualData) => {
              setUserName(actualData), setCheckUserName(false);
            }}
          />
          {isCheckUserName == true ? (
            <Text style={{ color: "red" }}>{errorUserNameText}</Text>
          ) : null}

          <Text style={{ color: "gray" }}>Password</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={
                isCheckPassword == true
                  ? styles.errorTextInput
                  : styles.textInput
              }
              //value={number}
              keyboardType="default"
              underlineColorAndroid={"transparent"}
              autoCorrect={false}
              spellCheck={false}
              secureTextEntry={passwordVisible}
              selectionColor={"red"}
              cursorColor={"red"}
              placeholderTextColor={"gary"}
              returnKeyType="done"
              onChangeText={(actualData) => {
                setPassword(actualData), setCheckPassword(false);
              }}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 25, top: 7 }}
              onPress={() => {
                setPasswordVisible(!passwordVisible);
              }}
            >
              <MaterialCommunityIcons
                name={
                  passwordVisible === false ? "eye-outline" : "eye-off-outline"
                }
                color={"red"}
                size={26}
              />
            </TouchableOpacity>
          </View>
          {isCheckPassword == true ? (
            <Text style={{ color: "red", marginBottom: 12 }}>
              {errorUserPasswordText}
            </Text>
          ) : null}

          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "red",
              padding: 14,
              borderRadius: 6,
              marginBottom: 16,
            }}
            onPress={handleSubmitPress}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Login
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              Don't have an account?
            </Text>
            <Text
              style={{ color: "blue", fontSize: 16 }}
              onPress={() => {
                navigation.navigate("registration");
              }}
            >
              {" "}
              Sign up
            </Text>
          </View>

          <Text style={{ color: "blue", fontSize: 16, alignSelf: "center" }}>
            Forgot password?
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: "100%",
    borderWidth: 2,
    padding: 10,
    borderColor: "gray",
    borderRadius: 8,
    borderBottomWidth: 1,
    marginBottom: 16,
    color: "white",
  },
  errorTextInput: {
    height: 40,
    borderWidth: 2,
    width: "100%",
    padding: 10,
    borderColor: "red",
    borderRadius: 8,
    borderBottomWidth: 1,
  },
});
export default LoginScreen;
