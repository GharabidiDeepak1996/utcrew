import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  CheckBox,
} from "react-native";
import { RadioButton } from "react-native-paper";

const Registration = () => {
  const [isSelected, setSelection] = useState(false);

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
          </View>
        </View>

        {/* Second row */}
        <Text style={{ color: "gray" }}>Official Airline Email Only</Text>
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

        {/* Third Row */}
        <Text style={{ color: "gray" }}>Airline</Text>
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
              onPress={() => setSelection("first")}
              color="red"
            />
            <Text style={{ color: "white" }}>Flight Crew</Text>
          </View>
          <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
            <RadioButton
              value="second"
              status={isSelected === "second" ? "checked" : "unchecked"}
              onPress={() => setSelection("second")}
              color="red"
            />
            <Text style={{ color: "white" }}>Cabin Crew</Text>
          </View>
        </View>
        {/* Fifth Row */}
        <Text style={{ color: "gray" }}>Password</Text>
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
        {/* Sixth Row */}
        <Text style={{ color: "gray" }}>Re-type Password</Text>
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
});
export default Registration;
