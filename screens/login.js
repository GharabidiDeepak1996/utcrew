import React from "react";
import {
  View,
  ImageBackground,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

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
            style={{
              height: 40,
              borderWidth: 2,
              padding: 10,
              borderColor: "gray",
              borderRadius: 8,
              borderBottomWidth: 1,
              marginBottom: 16,
            }}
            //onChangeText={onChangeNumber}
            //value={number}
            keyboardType="numeric"
          />

          <Text style={{ color: "gray" }}>Password</Text>
          <TextInput
            style={{
              height: 40,
              borderWidth: 2,
              padding: 10,
              borderColor: "gray",
              borderRadius: 8,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              marginBottom: 16,
            }}
            //onChangeText={onChangeNumber}
            //value={number}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={{
              alignItems: "center",
              backgroundColor: "red",
              padding: 14,
              borderRadius: 6,
              marginBottom: 16,
            }}
            //onPress={onPress}
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

export default LoginScreen;
