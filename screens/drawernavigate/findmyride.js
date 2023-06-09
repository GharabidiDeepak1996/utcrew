import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import * as Location from "expo-location";

import { axiosPost } from "../../apis/useAxios";

const FindMyRide = () => {
  const [isSelected, setSelection] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [nearestAirportCode, setNearestAirportCode] = useState("");

  async function getAirportCode() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    axiosPost("Common/GetNearestAirportCodeV1", {
      Latitude: location.coords.latitude,
      Longitude: location.coords.longitude,
    }).then((response) => {
      const { IsSuccess, NearestAirport } = { ...response };
      if (IsSuccess) {
        setNearestAirportCode(NearestAirport.NearestAirportCode);
        //call jobList for respective airport.
        getCrewAirline();

        //   {
        //     "StartDate":"06/09/2023",
        //     "EndDate":"06/10/2023",
        //     "AirportCode":"JFK",
        //     "UserId":5589,
        //     "UserName":"Delta",
        //     "AirlineCode":"DL" its will get in login
        // }
      }
    });
  }
  async function getCrewAirline() {
    axiosPost("Airlines/GetCrewAirlines", {
      Latitude: location.coords.latitude,
      Longitude: location.coords.longitude,
    });
  }
  useEffect(() => {
    getAirportCode();
  }, []);
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      {/* First Row */}
      <View style={{ width: "100%", height: 46, backgroundColor: "#191919" }}>
        <Text
          style={{
            height: "100%",
            color: "white",
            textAlign: "left",
            paddingVertical: 10,
            paddingLeft: 16,
          }}
        >
          Enter Flight # or Ride Id or Name
        </Text>
      </View>
      {/* Second Row */}
      <View
        style={{
          flexDirection: "column",
          marginVertical: 10,
          marginHorizontal: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{
              flex: 1,
              height: 46,
              borderRadius: 10,
              backgroundColor: "#171717",
              paddingHorizontal: 12,
              marginRight: 10,
              color: "white",
            }}
            cursorColor={"red"}
            placeholderTextColor={"#828282"}
            placeholder="Enter Flight # or Ride ID or Name"
            underlineColorAndroid="transparent"
            onTouchStart={() => {
              setShouldShow(!shouldShow);
            }}
            keyboardType="visible-password"
          />
          <TouchableOpacity
            style={{
              alignSelf: "center",
            }}
          >
            <Ionicons name="search-outline" size={24} color="#828282" />
          </TouchableOpacity>
        </View>
        {/* show/ hide components */}
        {shouldShow ? (
          <View style={{ marginTop: 14 }}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "white",
                  borderRadius: 4,
                  alignSelf: "center",
                  marginRight: 10,
                }}
              />
              <Text style={{ color: "white" }}>Flight Number e.g.</Text>
              <Text style={{ color: "red" }}> AA100 or 100 or AA 100</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "white",
                  borderRadius: 4,
                  alignSelf: "center",
                  marginRight: 10,
                }}
              />
              <Text style={{ color: "white" }}>
                Ride ID/ Confirmation #e.g.
              </Text>
              <Text style={{ color: "red" }}> 4212000</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: "white",
                  borderRadius: 4,
                  alignSelf: "center",
                  marginRight: 10,
                }}
              />
              <Text style={{ color: "white" }}>Name e.g.</Text>
              <Text style={{ color: "red" }}> John</Text>
            </View>
          </View>
        ) : null}
      </View>

      {/* Third Row */}
      <View
        onTouchStart={() => {
          setShouldShow(false);
        }}
        style={{ width: "100%", height: 46, backgroundColor: "#191919" }}
      >
        <Text
          style={{
            height: "100%",
            color: "white",
            textAlign: "left",
            paddingVertical: 10,
            paddingLeft: 16,
          }}
        >
          OR Select Airport & Flight #
        </Text>
      </View>
      {/* Container Airline filter*/}
      <View
        style={{
          flex: 1,
          marginTop: 14,
          marginHorizontal: 18,
        }}
      >
        <Text style={{ color: "#828282", fontSize: 16 }}>Airport</Text>
        <TextInput
          style={{
            height: 46,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: "#828282",
            paddingHorizontal: 12,
            marginTop: 6,
            color: "white",
          }}
          underlineColorAndroid="transparent"
          value={nearestAirportCode}
        />
        <View style={{ flexDirection: "row", marginTop: 12 }}>
          {/* RadioButton1 */}
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
            }}
          >
            <RadioButton
              value="yesterday"
              status={isSelected === "yesterday" ? "checked" : "unchecked"}
              onPress={() => {
                setSelection("yesterday");
              }}
              color="red"
            />
            <Text style={{ color: "#828282" }}>Yesterday</Text>
          </View>
          {/* RadioButton2 */}
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
            }}
          >
            <RadioButton
              value="today"
              status={isSelected === "today" ? "checked" : "unchecked"}
              onPress={() => {
                setSelection("today");
              }}
              color="red"
            />
            <Text style={{ color: "#828282" }}>Today</Text>
          </View>
          {/* RadioButton3 */}
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
            }}
          >
            <RadioButton
              value="tomorrow"
              status={isSelected === "tomorrow" ? "checked" : "unchecked"}
              onPress={() => {
                setSelection("tomorrow");
              }}
              color="red"
            />
            <Text style={{ color: "#828282" }}>Tomorrow</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default FindMyRide;
