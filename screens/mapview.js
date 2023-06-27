import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import MapView, {
  Marker,
  Polyline,
  Callout,
  CalloutSubview,
} from "react-native-maps";
//import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { axiosPost } from "../apis/useAxios";
import { FontAwesome5 } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/Ionicons";
import { checkPluginState } from "react-native-reanimated/lib/reanimated2/core";

const TrackVehicle = ({ route, navigation }) => {
  const initialRegion = {
    latitude: 53.3661,
    longitude: 14.5943,
  };
  const [currentLocation, setCurrentLocation] = useState(initialRegion);
  const [vehicleLocation, setVehicleLocation] = useState(initialRegion);
  const [mapRegion, setRegion] = useState(null);
  const [hasLocationPermissions, setLocationPermission] = useState(false);
  const [tripStatus, setTripStatus] = useState();
  const [driverImage, setDriverImage] = useState();
  const [driverNo, setDriverNo] = useState();
  // const GOOGLE_MAPS_APIKEY = "AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8";
  const { rideId, userId, tripStatusId, vehicleNo, vehicleType, driverName } =
    route?.params || {};
  let iz = {
    latDelta: 0.015,
    longDelta: 0.08,
  };
  let ZOOMS = {
    _latitudeDeltaZOOM_OUT1: iz.latDelta,
    _longitudeDeltaZOOM_OUT1: iz.longDelta,
    _latitudeDeltaZOOM_INITIAL: iz.latDelta * 0.2,
    _longitudeDeltaZOOM_INITIAL: iz.longDelta * 0.2,
    _latitudeDeltaZOOM_IN1: iz.latDelta * 0.1,
    _longitudeDeltaZOOM_IN1: iz.longDelta * 0.1,
  };

  function getTrackVehicleDetails(latitude, longitude) {
    axiosPost("Vehicle/TrackCurrentMultipleVehicleV5", {
      AirlineId: 0,
      AirportId: 0,
      FlightNo: rideId,
      UserId: userId,
      TrackTime: "",
      Latitude: latitude,
      Longitude: longitude,
    }).then((response) => {
      const { IsSuccess, MultipleTrackVehicle } = { ...response };
      const [
        {
          AffiliateName,
          AffliateId,
          Latitude,
          Longitude,
          TripStatus,
          ImageURL,
          DriverMobile,
        },
      ] = [...MultipleTrackVehicle];
      if (IsSuccess) {
        setVehicleLocation({
          longitude: Longitude,
          latitude: Latitude,
        });

        setDriverImage(ImageURL);
        setDriverNo(DriverMobile);
        setTripStatus(TripStatus);
        //setVehicleLocation(JSON.stringify({ Latitude, Longitude }));
      }
    });
  }

  useEffect(() => {
    const getLocationAsync = async () => {
      // let { status } = await Permissions.askAsync(Permissions.LOCATION);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if ("granted" !== status) {
        setCurrentLocation("Permission to access location was denied");
      } else {
        setLocationPermission(true);
      }

      // let {
      //   coords: { latitude, longitude },
      // } = await Location.getCurrentPositionAsync({});

      // setCurrentLocation(JSON.stringify({ latitude, longitude }));
      let location = await Location.getCurrentPositionAsync({});
      const { longitude, latitude } = location.coords;
      // ...location,
      setCurrentLocation({
        longitude: longitude,
        latitude: latitude,
      });
      getTrackVehicleDetails(latitude, longitude);

      //   // Center the map on the location we just fetched.
      //   setRegion({
      //     latitude,
      //     longitude,
      //     latitudeDelta: 0.0922,
      //     longitudeDelta: 0.0421,
      //   });
    };

    getLocationAsync();

    CheckTripStatus();
  }, [tripStatus]);

  debugger;
  function CheckTripStatus() {
    if (tripStatusId == 101) {
      setTripStatus("Job Not Started");
    } else if (tripStatusId == 104) {
      setTripStatus("Driver En Route");
    } else {
      setTripStatus("Error");
    }
  }
  const [coordinates] = useState([
    {
      latitude: 18.943161386609436,
      longitude: 72.83933396191537,
    },
    {
      latitude: 18.943161386609436,
      longitude: 72.83933396191537,
    },
  ]);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#FFD73B",
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <FontAwesome5 name="walking" size={20} color="black" />
        <Text style={{ marginLeft: 10 }}>{tripStatus}</Text>
      </View>
      <MapView
        style={styles.map}
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: ZOOMS._latitudeDeltaZOOM_OUT1,
          longitudeDelta: ZOOMS._latitudeDeltaZOOM_OUT1,
        }}
        //region={mapRegion}
        // initialRegion={{
        //   latitude: currentLocation.latitude,
        //   longitude: currentLocation.longitude,
        //   latitudeDelta: 0.0622,
        //   longitudeDelta: 0.0121,
        // }}

        //onRegionChange={(region) => setRegion(region)}
      >
        <Marker
          title="Your Current Location"
          //description="Web Design and Development"
          pinColor="green"
          //image={require("./assets/icon.png")}
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
        />

        <Marker
          title="Vehicle Location."
          //  description="Web Design and Development"
          image={require("../assets/ic_launcher.png")}
          coordinate={{
            latitude: vehicleLocation.latitude,
            longitude: vehicleLocation.longitude,
          }}
        />
      </MapView>

      <View
        style={{
          justifyContent: "flex-end",
          flex: 1,
          marginBottom: 30,
          width: "100%",
        }}
      >
        <View style={{ marginHorizontal: 20 }}>
          <View
            style={{
              marginBottom: 18,
              backgroundColor: "red",
              height: 90,
              borderRadius: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-around",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Image
                  // source={require('../assets/car_top_view')}
                  source={{
                    uri:
                      driverImage != null
                        ? driverImage
                        : "http://cdn.utwiz.com/DriverImages/blankuser.jpg",
                  }}
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: 400 / 2,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  flex: 2,
                }}
              >
                <Text style={{ color: "white" }}>{driverName}</Text>
                <Text style={{ color: "white" }}>
                  {vehicleNo + "." + vehicleType}{" "}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: "green",
                    borderRadius: 30,
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    console.log("Driver No", "driverNo");
                  }}
                >
                  <MaterialCommunityIcons
                    name={"ios-call"}
                    color={"white"}
                    size={18}
                    style={{ alignSelf: "center" }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            // onPress={() => show()}  styles.bubble,
            style={{
              alignItems: "center",
              backgroundColor: "red",
              paddingVertical: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 20 }}>
              I'm at the pick-up pont !
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default TrackVehicle;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,

    // justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    marginTop: 50,
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    backgroundColor: "transparent",
  },
  bubble: {
    backgroundColor: "rgba(25,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "red",
    paddingVertical: 10,
  },
});
