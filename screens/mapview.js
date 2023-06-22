import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
//import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { axiosPost } from "../apis/useAxios";

const TrackVehicle = ({ route, navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [vehicleLocation, setVehicleLocation] = useState(null);
  const [mapRegion, setRegion] = useState(null);
  const [hasLocationPermissions, setLocationPermission] = useState(false);
  // const GOOGLE_MAPS_APIKEY = "AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8";
  const { rideId, userId } = route?.params || {};

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
        setVehicleLocation(JSON.stringify({ Latitude, Longitude }));
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

      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      setCurrentLocation(JSON.stringify({ latitude, longitude }));

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
      latitude: 18.9352766,
      longitude: 72.8384132,
    },
    {
      latitude: 18.943161386609436,
      longitude: 72.83933396191537,
    },
    currentLocation,
  ]);

  console.log("LocationIdentify", coordinates);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        //region={mapRegion}
        initialRegion={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}

        //onRegionChange={(region) => setRegion(region)}
      />
    </View>
  );
};
export default TrackVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
