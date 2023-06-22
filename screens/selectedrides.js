import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { axiosPost } from "../apis/useAxios";
import moment from "moment";

const SelectedRides = ({ route, navigation }) => {
  const [animating, setAnimating] = useState(true);
  const [searchRides, setSearchRides] = useState([]);

  const { ridesDetails } = route.params;
  const {
    airlineCode,
    airlineNo,
    airportCode,
    imei,
    pickupDateTime,
    userId,
    userName,
  } = { ...ridesDetails };

  async function getRideDetails() {
    axiosPost("Search/SearchRidesV1", {
      AirlineNo: airlineNo,
      Imei: "",
      AirportCode: airportCode,
      PickupDateTime: moment(pickupDateTime, "MM/DD/YYYY hh:mm").format(
        "MM/DD/YYYY"
      ),
      UserId: userId,
      UserName: userName,
      AirlineCode: airlineCode,
    }).then((response) => {
      const { IsSuccess, SearchRides } = { ...response };
      if (IsSuccess) {
        setSearchRides([...SearchRides]);
      }
    });
  }

  const Item = ({
    accountName,
    airlineCode,
    airlineImage,
    airlineName,
    airlineNo,
    airportName,
    driverId,
    dropOffLocation,
    flightDateTime,
    icaoFlightCode,
    isRideNotificationSent,
    isVehicleTrack,
    pickupDateTime,
    pickupLocation,
    reservationId,
    rideId,
    rideTypeId,
    tripStatusId,
    vehicleId,
    vehicleNo,
    vehicleType,
    terminal,
    gate,
  }) => (
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
          <Text style={{ color: "white" }}>
            {moment(pickupDateTime, "MM/DD/YYYY hh:mm").format("hh:mm")}
          </Text>
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
          marginTop: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Ionicons name="bed" color={"red"} size={18} />
          <Text
            style={{
              color: "white",

              marginLeft: 8,
            }}
          >
            {" "}
            {pickupLocation}
          </Text>
          <Text style={{ color: "#1b9af7", flex: 1, marginLeft: 12 }}>
            more
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              height: 64,
              width: 1,
              backgroundColor: "white",
              flex: 0,
              marginLeft: 8,
            }}
          ></View>
          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                marginLeft: 16,
                height: 25,
                flexDirection: "row",
              }}
            >
              <Text style={{ color: "gray" }}>Transporter</Text>
              <Text style={{ color: "white", marginLeft: 12 }}>
                {accountName}
              </Text>
              <Text style={{ marginLeft: 12, color: "#1b9af7" }}>more</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 16,
              }}
            >
              <Text style={{ color: "gray" }}>Vehicle Type</Text>
              <Text style={{ color: "white", marginLeft: 10 }}>
                {vehicleType != null ? vehicleType : NA}
              </Text>
              <View
                style={{
                  borderRadius: 4,
                  backgroundColor: "white",
                  marginLeft: 10,
                  alignSelf: "center",
                  padding: 2,
                  height: 6,
                  width: 6,
                }}
              />
              <Text style={{ color: "gray", marginLeft: 10 }}>Vehicle#</Text>
              <Text style={{ color: "white", marginLeft: 10 }}>
                {vehicleNo != null ? vehicleNo : NA}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <MaterialIcons name="flight-takeoff" color={"red"} size={18} />
          <Text style={{ color: "gray", marginLeft: 10 }}>Airport</Text>
          <Text style={{ color: "white", marginLeft: 10 }}>{airlineCode}</Text>
          <View
            style={{
              borderRadius: 4,
              backgroundColor: "white",
              marginLeft: 10,
              alignSelf: "center",
              padding: 2,
              height: 6,
              width: 6,
            }}
          />
          <Text style={{ color: "gray", marginLeft: 10 }}>Terminal#</Text>
          <Text style={{ color: "white", marginLeft: 10 }}>
            {terminal != null ? terminal : NA}
          </Text>
          <View
            style={{
              borderRadius: 4,
              backgroundColor: "white",
              marginLeft: 10,
              alignSelf: "center",
              padding: 2,
              height: 6,
              width: 6,
            }}
          />
          <Text style={{ color: "gray", marginLeft: 10 }}>Gate</Text>
          <Text style={{ color: "white", marginLeft: 10 }}>
            {gate != null ? gate : NA}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={
            isVehicleTrack == false
              ? styles.buttonBdrGrayClr
              : styles.buttonBdrWhiteClr
          }
          onPress={() => {
            if (isVehicleTrack) {
              navigation.navigate("trackVehicle", {
                rideId: rideId,
                userId: userId,
              });
            }
          }}
        >
          <Text
            style={
              isVehicleTrack == false
                ? styles.buttonTxtGrayClr
                : styles.buttonTxtWhiteClr
            }
          >
            Locate ride
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            padding: 10,
            borderRadius: 6,
            borderWidth: 2,
            borderColor: "gray",
            flex: 1,
            marginLeft: 5,
          }}
        >
          <Text style={{ color: "gray" }}>Ride not dispatched</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  useEffect(() => {
    getRideDetails();
  }, []);

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
      <FlatList
        data={searchRides}
        renderItem={({ item }) => (
          <Item
            accountName={item.AccountName}
            airlineCode={item.AirlineCode}
            airlineImage={item.AirlineImage}
            airlineName={item.AirlineName}
            airlineNo={item.AirlineNo}
            airportName={item.AirportName} //formate mm/dd/yyyy
            driverId={item.DriverId}
            dropOffLocation={item.DropoffLocation}
            flightDateTime={item.FlightDateTime}
            icaoFlightCode={item.ICAOFlightCode}
            isRideNotificationSent={item.IsRideNotificationSent}
            isVehicleTrack={item.IsVehicleTrack}
            pickupDateTime={item.PickupDateTime}
            pickupLocation={item.PickupLocation}
            reservationId={item.ReservationId}
            rideId={item.RideId}
            rideTypeId={item.RideTypeId}
            tripStatusId={item.TripStatusId}
            vehicleId={item.VehicleId}
            vehicleNo={item.VehicleNo}
            vehicleType={item.VehicleType}
            terminal={item.Terminal}
            gate={item.Gate}
          />
        )}
        keyExtractor={(item) => item.AirlineNo}
      />
    </View>
  );
};

export default SelectedRides;

const styles = StyleSheet.create({
  buttonBdrGrayClr: {
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "gray",
    flex: 1,
    marginRight: 5,
  },
  buttonBdrWhiteClr: {
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "white",
    flex: 1,
    marginRight: 5,
  },
  buttonTxtGrayClr: {
    color: "gray",
  },
  buttonTxtWhiteClr: {
    color: "white",
  },
});
