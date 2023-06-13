import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { axiosPost, axiosGet } from "../apis/useAxios";
import moment from "moment";
import Search from "../components/search";
import Checkbox from "expo-checkbox";

const Registration = ({ navigation, route }) => {
  // const navigation = useNavigation(); OR
  const { airlineId, airlineName } = route?.params || {};

  const [firstNameTxt, setFirstNameTxt] = useState("");
  const [lastNameTxt, setLastNameTxt] = useState("");
  const [emailTxt, setEmailTxt] = useState("");
  const [airlineTxt, setAirlineTxt] = useState("");
  const [passwordTxt, setPasswordTxt] = useState("");
  const [rePasswordTxt, setRePasswordTxt] = useState("");
  const [ratioBtnValue, setRadioBtnValue] = useState();

  const [errorFirstNameTxt, setFirstNameTxtError] = useState("");
  const [errorLastNameTxt, setLastNameTxtError] = useState("");
  const [errorEmailTxt, setEmailTxtError] = useState("");
  const [errorAirlineTxt, setAirlineTxtError] = useState("");
  const [errorPasswordTxt, setPasswordTxtError] = useState("");
  const [errorRePasswordTxt, setRePasswordTxtError] = useState("");

  const [isCheckPassword, setCheckPassword] = useState(false);
  const [isCheckRePassword, setCheckRePassword] = useState(false);
  const [isCheckFirstName, setCheckFirstName] = useState(false);
  const [isCheckLastName, setCheckLastName] = useState(false);
  const [isCheckEmailId, setCheckEmailID] = useState(false);
  const [isCheckAirline, setCheckAirline] = useState(false);

  const [isSelected, setSelection] = useState(false);
  const [isCheckRadioBtn, setCheckRadioBtn] = useState(false);
  const [crewBtnError, setCrewBtnError] = useState("");

  const [isCheckedBx, setCheckBx] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [rePasswordVisible, setRePasswordVisible] = useState(true);

  const submitRegisterForm = () => {
    // const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (firstNameTxt.length === 0) {
      setFirstNameTxtError("PLease enter first name");
      setCheckFirstName(true);
      return false;
    } else if (lastNameTxt.length === 0) {
      setLastNameTxtError("Please enter last name");
      setCheckLastName(true);
      return false;
    } else if (emailTxt.length === 0) {
      setEmailTxtError("Please enter email Id");
      setCheckEmailID(true);
      return false;
    } else if (reg.test(emailTxt) === false) {
      setEmailTxtError("enter valid email address");
      setCheckEmailID(true);
    } else if (airlineName == undefined) {
      setAirlineTxtError("Please enter airline code");
      setCheckAirline(true);
      return false;
    } else if (isSelected == false) {
      setCrewBtnError("Please select user type flight crew/ cabin crew.");
      setCheckRadioBtn(true);
      return false;
    } else if (passwordTxt.length === 0) {
      setPasswordTxtError("Please enter password");
      setCheckPassword(true);
      return false;
    } else if (rePasswordTxt.length === 0) {
      setRePasswordTxtError("Please enter re-password");
      setCheckRePassword(true);
      return false;
    } else if (passwordTxt != rePasswordTxt) {
      setRePasswordTxtError("Both password should be same.");
      setCheckRePassword(true);
    } else if (isCheckedBx == false) {
      ToastAndroid.show("PLease select term and condition", ToastAndroid.SHORT);
      return false;
    } else {
      registerApi();
      // navigation.navigate("LoginScreen");
    }
  };

  //https://betterprogramming.pub/using-moment-js-in-react-native-d1b6ebe226d4
  const param = {
    User: {
      UserType: { Id: ratioBtnValue }, //must be add --id of radio button
      EmployeeId: "",
      UserName: emailTxt,
      FirstName: firstNameTxt,
      LastName: lastNameTxt,
      Id: "0", //by default
      DateOfHire: moment().format("YYYY-MM-DD hh:mm:ss a"), //current date and time .utcOffset("+05:30") optional
      Password: rePasswordTxt,
      Contact: { Email: emailTxt, Mobile: "" },
      Airline: { Id: airlineId },
    },
  };
  async function registerApi() {
    //404 method was not found
    const getRegisterData = await axiosPost(
      "/User/SaveNewRegistrationV1",
      JSON.stringify(param) //json.string its covert object to json formate.
    );
    if (getRegisterData.IsSuccess) {
      navigation.navigate("LoginScreen");
    } else {
      ToastAndroid.show(getRegisterData.ResponseMessage, ToastAndroid.SHORT);
    }
  }

  useEffect(() => {
    if (airlineName != "") {
      setCheckAirline(false);
    }
  }, [airlineName]);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ padding: 20 }}>
        {/* First row */}
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              marginRight: 4,
            }}
          >
            <Text style={{ color: "gray" }}>First Name</Text>
            <TextInput
              style={
                isCheckFirstName == true
                  ? styles.errorInputText
                  : styles.inputText
              }
              onChangeText={(value) => {
                setFirstNameTxt(value), setCheckFirstName(false);
              }}
              //value={number}
              keyboardType="visible-password"
              autoCorrect={false}
              spellCheck={false}
              cursorColor={"red"}
              returnKeyType="next"
            />
            {isCheckFirstName == true ? (
              <Text style={{ color: "red" }}>{errorFirstNameTxt}</Text>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              marginLeft: 4,
            }}
          >
            <Text style={{ color: "gray" }}>Last Name</Text>
            <TextInput
              style={
                isCheckLastName == true
                  ? styles.errorInputText
                  : styles.inputText
              }
              onChangeText={(value) => {
                setLastNameTxt(value), setCheckLastName(false);
              }}
              keyboardType="visible-password"
              autoCorrect={false}
              spellCheck={false}
              cursorColor={"red"}
              returnKeyType="next"
            />
            {isCheckLastName == true ? (
              <Text style={{ color: "red" }}>{errorLastNameTxt}</Text>
            ) : null}
          </View>
        </View>

        {/* Second row */}
        <Text style={{ color: "gray" }}>Official Airline Email Only</Text>
        <TextInput
          style={
            isCheckEmailId == true ? styles.errorInputText : styles.inputText
          }
          onChangeText={(values) => {
            setEmailTxt(values), setCheckEmailID(false);
          }}
          keyboardType="visible-password"
          autoCorrect={false}
          spellCheck={false}
          cursorColor={"red"}
          returnKeyType="next"
        />
        {isCheckEmailId == true ? (
          <Text style={{ color: "red", marginBottom: 12 }}>
            {errorEmailTxt}
          </Text>
        ) : null}
        {/* Third Row */}
        <Text style={{ color: "gray" }}>Airline</Text>
        <TextInput
          style={
            isCheckAirline == true ? styles.errorInputText : styles.inputText
          }
          // onChangeText={(value) => {
          //   setCheckAirline(false);
          // }}
          onPressIn={() => {
            navigation.navigate("search", { id: "0" });
          }}
          keyboardType="visible-password"
          autoCorrect={false}
          spellCheck={false}
          cursorColor={"red"}
          returnKeyType="next"
          value={airlineName}
        />
        {isCheckAirline == true ? (
          <Text style={{ color: "red", marginBottom: 12 }}>
            {errorAirlineTxt}
          </Text>
        ) : null}
        {/* Fourth Row */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
            }}
          >
            <RadioButton
              value="first"
              status={isSelected === "first" ? "checked" : "unchecked"}
              onPress={() => {
                setSelection("first"),
                  setRadioBtnValue(18),
                  setCheckRadioBtn(false);
              }}
              color="red"
            />
            <Text style={{ color: "white" }}>Flight Crew</Text>
          </View>
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <RadioButton
              value="second"
              status={isSelected === "second" ? "checked" : "unchecked"}
              onPress={() => {
                setSelection("second"),
                  setRadioBtnValue(17),
                  setCheckRadioBtn(false);
              }}
              color="red"
            />
            <Text style={{ color: "white" }}>Cabin Crew</Text>
          </View>
        </View>
        {isCheckRadioBtn == true ? (
          <Text style={{ color: "red", marginBottom: 12 }}>{crewBtnError}</Text>
        ) : null}
        {/* Fifth Row */}
        <Text style={{ color: "gray" }}>Password</Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={
              isCheckPassword == true ? styles.errorInputText : styles.inputText
            }
            onChangeText={(value) => {
              setPasswordTxt(value), setCheckPassword(false);
            }}
            //value={number}
            keyboardType="default"
            secureTextEntry={passwordVisible}
            autoCorrect={false}
            spellCheck={false}
            cursorColor={"red"}
            returnKeyType="next"
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
            {errorPasswordTxt}
          </Text>
        ) : null}
        {/* Sixth Row */}
        <Text style={{ color: "gray" }}>Re-type Password</Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={
              isCheckRePassword == true
                ? styles.errorInputText
                : styles.inputText
            }
            onChangeText={(value) => {
              setRePasswordTxt(value), setCheckRePassword(false);
            }}
            //value={number}
            keyboardType="default"
            secureTextEntry={rePasswordVisible}
            autoCorrect={false}
            spellCheck={false}
            cursorColor={"red"}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 25, top: 7 }}
            onPress={() => {
              setRePasswordVisible(!rePasswordVisible);
            }}
          >
            <MaterialCommunityIcons
              name={
                rePasswordVisible === false ? "eye-outline" : "eye-off-outline"
              }
              color={"red"}
              size={26}
            />
          </TouchableOpacity>
        </View>
        {isCheckRePassword == true ? (
          <Text style={{ color: "red", marginBottom: 12 }}>
            {errorRePasswordTxt}
          </Text>
        ) : null}
        {/* Terms and Condition */}
        <View style={{ flexDirection: "row", marginBottom: 16 }}>
          <Checkbox
            value={isCheckedBx}
            onValueChange={setCheckBx}
            color={"red"}
            // onChange={console.log(isCheckedBx)}
            //style={styles.checkbox}
          />
          <Text style={{ color: "white", marginLeft: 10 }}>
            {" "}
            By using this app, I accept the terms and condition and privacy
            policy
          </Text>
        </View>
        {/* Button */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "red",
            padding: 14,
            borderRadius: 6,
            marginBottom: 16,
          }}
          onPress={submitRegisterForm}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Register Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  inputText: {
    width: "100%",
    height: 40,
    borderWidth: 2,
    padding: 10,
    borderColor: "gray",
    borderRadius: 8,
    borderBottomWidth: 1,
    marginBottom: 16,
    color: "white",
  },
  errorInputText: {
    width: "100%",
    height: 40,
    borderWidth: 2,
    width: "100%",
    padding: 10,
    borderColor: "red",
    borderRadius: 8,
    borderBottomWidth: 1,
    color: "white",
  },
});
export default Registration;
