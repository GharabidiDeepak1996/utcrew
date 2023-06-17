import React from "react";
import { Text, View, Image } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const SelectedRides = () => {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <View
        style={{
          backgroundColor: "#212121",
          paddingHorizontal: 18,
          paddingVertical: 14,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>
          Tuesday, June 13,2023
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 22,
            justifyContent: "space-between",
          }}
        >
          <Image
            source={require("../assets/ico_delta.png")}
            style={{
              width: 46,
              height: 36,
              flex: 0.3,
            }}
            resizeMode="center"
          />

          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={{ color: "white" }}>DL 556</Text>
            <Text style={{ color: "white" }}>DL -ww Delta Air Lines</Text>
          </View>
          <Text
            style={{
              color: "white",
              flex: 1,
              textAlign: "center",
            }}
          >
            John F kennedy International Airport
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 18,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: "gray" }}>Flight Time</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "white", fontWeight: "bold" }}>00:58</Text>
              <Text style={{ color: "#1b9af7", marginLeft: 4 }}>
                {" "}
                Check status
              </Text>
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
                color: "#856404",
                fontSize: 24,
                fontWeight: "900",
              }}
            >
              NA
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 45,
            backgroundColor: "#856404",
            borderRadius: 6,
            marginTop: 14,
          }}
        >
          <Text
            style={{
              flex: 1,
              textAlignVertical: "center",
              paddingHorizontal: 12,
            }}
          >
            Check for live status 30 mins prior to pick-up time
          </Text>
        </View>
      </View>

      {/* JobList  */}
      <View
        style={{
          backgroundColor: "#212121",
          borderRadius: 12,
          marginHorizontal: 6,
          marginVertical: 12,
          padding: 12,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "gray", fontSize: 12 }}>PU Time</Text>
            <Text style={{ color: "white" }}>01:00</Text>
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
                marginRight: 4,
              }}
            />
            <View
              style={{
                borderRadius: 4,
                backgroundColor: "white",
                padding: 2,
                height: 6,
                width: 6,
                marginRight: 4,
              }}
            />
            <View
              style={{
                borderRadius: 4,
                backgroundColor: "white",
                padding: 2,
                height: 6,
                width: 6,
                marginRight: 4,
              }}
            />
            <View
              style={{
                borderRadius: 4,
                backgroundColor: "white",
                padding: 2,
                height: 6,
                width: 6,
                marginRight: 4,
              }}
            />
            <View
              style={{
                borderRadius: 4,
                backgroundColor: "white",
                padding: 2,
                height: 6,
                width: 6,
                marginRight: 4,
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
            <Text style={{ color: "gray" }}>Exp.Do Time</Text>
            <Text style={{ color: "white" }}>NA</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "yellow",
            marginTop: 8,
          }}
        >
          <View style={{ backgroundColor: "brown", flexDirection: "row" }}>
            <Ionicons name="bed" color={"red"} size={18} />
            <Text style={{ color: "white" }}>sdg</Text>
            <Text>more</Text>
          </View>
          <View style={{ backgroundColor: "green", flexDirection: "row" }}>
            <MaterialIcons name="flight-takeoff" color={"red"} size={18} />
            <Text>sdg</Text>
            <Text>more</Text>
          </View>

          <View style={{ backgroundColor: "yellow", flexDirection: "row" }}>
            <MaterialIcons name="flight-takeoff" color={"red"} size={18} />
            <Text>sdg</Text>
            <Text>more</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SelectedRides;
