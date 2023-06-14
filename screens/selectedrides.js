import React from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SelectedRides = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <View style={{ backgroundColor: "gray", height: "30%", padding: 10 }}>
        <Text style={{ color: "white" }}>Tuesday, June 13,2023</Text>
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons name="flight" color={"red"} size={18} />
          <View>
            <Text>DL 556</Text>
            <Text>DL - Delta Air Lines</Text>
          </View>
          <Text>John F kennedy International Airport</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text>Flight Time</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>23:58</Text>
              <Text>Check status</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                flex: 1,
                alignSelf: "flex-end",
              }}
            >
              NA
            </Text>
          </View>
        </View>
        <View
          style={{ height: 45, backgroundColor: "yellow", borderRadius: 6 }}
        >
          <Text
            style={{
              backgroundColor: "red",
              flex: 1,
              textAlignVertical: "center",
            }}
          >
            Check for live status 30 mins prior to pick-up time
          </Text>
        </View>
      </View>

      {/* JobList  */}
      <View
        style={{
          backgroundColor: "gray",
          borderRadius: 12,
          marginHorizontal: 6,
          marginVertical: 12,
          padding: 12,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text>PU Time</Text>
            <Text>01:00</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderRadius: 4,
                backgroundColor: "white",
                padding: 2,
                height: 6,
                width: 6,
              }}
            />
            <View
              style={{
                borderRadius: 4,
                backgroundColor: "white",
                padding: 2,
                height: 6,
                width: 6,
              }}
            />
            <View
              style={{
                borderRadius: 4,
                backgroundColor: "white",
                padding: 2,
                height: 6,
                width: 6,
              }}
            />
            <View
              style={{
                borderRadius: 4,
                backgroundColor: "white",
                padding: 2,
                height: 6,
                width: 6,
              }}
            />
            <View
              style={{
                borderRadius: 4,
                backgroundColor: "white",
                padding: 2,
                height: 6,
                width: 6,
              }}
            />
            <View
              style={{
                borderRadius: 4,
                backgroundColor: "white",
                padding: 2,
                height: 6,
                width: 6,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Text>Exp.Do Time</Text>
            <Text>NA</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}></View>
      </View>
    </View>
  );
};

export default SelectedRides;
