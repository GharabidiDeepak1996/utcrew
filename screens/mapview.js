import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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

const TrackVehicle = ({ route, navigation }) => {
  const initialRegion = {
    latitude: 53.3661,
    longitude: 14.5943,
  };
  const [currentLocation, setCurrentLocation] = useState(initialRegion);
  const [vehicleLocation, setVehicleLocation] = useState(initialRegion);
  const [mapRegion, setRegion] = useState(null);
  const [hasLocationPermissions, setLocationPermission] = useState(false);
  // const GOOGLE_MAPS_APIKEY = "AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8";
  const { rideId, userId } = route?.params || {};
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
      const [{ AffiliateName, AffliateId, Latitude, Longitude }] = [
        ...MultipleTrackVehicle,
      ];
      if (IsSuccess) {
        setVehicleLocation({
          longitude: Longitude,
          latitude: Latitude,
        });
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
  }, []);

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
        <Text style={{ marginLeft: 10 }}>Job not started</Text>
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
          flexDirection: "row",
          marginVertical: "100%",
          backgroundColor: "transparent",
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(255,255,255,0.7)",
            paddingHorizontal: 18,
            paddingVertical: 12,
            borderRadius: 20,
          }}
        >
          <Text>Tap on markers to see different callouts</Text>
        </View>
      </View>
      {/* <View style={{ backgroundColor: "black", height: 50, width: "100%" }}>
        <Text>sjggsdg</Text>
      </View> */}
    </View>
  );
};
export default TrackVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // ...StyleSheet.absoluteFillObject,
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
  map: {
    marginTop: 50,
    ...StyleSheet.absoluteFillObject,
  },
});
