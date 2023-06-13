import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import moment from "moment";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import * as Location from "expo-location";
import { axiosPost } from "../../apis/useAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FindMyRide = ({ navigation, route }) => {
  const { airportId, airportCode, airportName } = route?.params || {};
  const [isSelected, setSelection] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [nearestAirportCode, setNearestAirportCode] = useState("");
  const [crewAirLineScheduledJob, setCrewAirLineScheduledJob] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [airlineCode, setAirLineCode] = useState("");

  async function getAirportCode() {
    var d = new Date();
    var NextDate = new Date(d.getTime() + 1000 * 60 * 60 * 24);
    var date = new Date(NextDate); //tomorrow Date
    setSelection("today");
    setStartDate(d);
    setEndDate(date);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    if (airportCode != undefined) {
      setNearestAirportCode(airportCode);
      getCrewAirline();
    } else {
      axiosPost("Common/GetNearestAirportCodeV1", {
        Latitude: location.coords.latitude,
        Longitude: location.coords.longitude,
      }).then((response) => {
        const { IsSuccess, NearestAirport } = { ...response };
        if (IsSuccess) {
          setNearestAirportCode(NearestAirport.NearestAirportCode);
          //call jobList for respective airport.
          getCrewAirline();
        }
      });
    }
  }
  function getCrewAirline() {
    AsyncStorage.getItem("UserId", (err, val) => {
      setUserId(val);
    });
    AsyncStorage.getItem("FullName", (err, val) => {
      setFullName(val);
    });
    AsyncStorage.getItem("AirlineCode", (err, val) => {
      setAirLineCode(val);
    });

    console.log(
      "ActualDataWhatWreGot",
      moment(startDate, "YYYY-MM-DDTHH:mm:ss.sssZ").format("MM/DD/YYYY"),
      endDate,
      nearestAirportCode,
      userId,
      fullName,
      airlineCode
    );

    axiosPost("Airlines/GetCrewAirlines", {
      StartDate: moment(startDate, "YYYY-MM-DDTHH:mm:ss.sssZ").format(
        "MM/DD/YYYY"
      ),
      EndDate: moment(endDate, "YYYY-MM-DDTHH:mm:ss.sssZ").format("MM/DD/YYYY"),
      AirportCode: nearestAirportCode,
      UserId: userId,
      UserName: fullName,
      AirlineCode: airlineCode,
    }).then((response) => {
      const { IsSuccess, CrewAirlines } = { ...response };
      {
        console.log("findJobLIst", CrewAirlines);
        IsSuccess
          ? setCrewAirLineScheduledJob(CrewAirlines)
          : setCrewAirLineScheduledJob(CrewAirlines);
      }
    });
  }
  const Item = ({ airlineInfo, flightTime }) => (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 8,
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <MaterialIcons name="flight" color={"gray"} size={18} />
        <Text style={styles.title}>{airlineInfo}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <AntDesign name="clockcircle" size={18} color="gray" />
        <Text style={styles.title}>
          {moment(flightTime, "MM/DD/YYYY hh:mm").format("hh:mm")}
        </Text>
      </View>
    </View>
  );
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "gray",
        }}
      />
    );
  };
  // const Item = ({ airlineInfo, flightTime }) => {
  //   // const [
  //   //   {
  //   //     AirlineCode,
  //   //     AirlineInfo,
  //   //     AirlineNumber,
  //   //     FlightTime,
  //   //     IsTrack,
  //   //     PickupTime,
  //   //     RideType,
  //   //     TrackMessage,
  //   //   },
  //   // ] = { ...item };

  //   <View style={styles.item}>
  //     <MaterialIcons name="flight" color={"gray"} size={18} />
  //     <Text style={styles.title}>{airlineInfo}</Text>
  //   </View>;
  // };
  useEffect(() => {
    getAirportCode();
  }, [airportCode]);

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
          onPressIn={() => navigation.navigate("search", { id: "1" })}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 12,
          }}
        >
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
                var d = new Date();
                var previousDate = new Date(d.getTime() - 1000 * 60 * 60 * 24);
                var date = new Date(previousDate); //yesterday Date
                console.log(date);
                setSelection("yesterday");
                setStartDate(date);
                setEndDate(d);
                setNearestAirportCode(nearestAirportCode);
                getCrewAirline();
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
                var d = new Date();
                var NextDate = new Date(d.getTime() + 1000 * 60 * 60 * 24);
                var date = new Date(NextDate); //tomorrow Date
                setSelection("today");
                setStartDate(d);
                setEndDate(date);
                setNearestAirportCode(nearestAirportCode);
                getCrewAirline();
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
                var d = new Date();
                var NextDate = new Date(d.getTime() + 1000 * 60 * 60 * 24);
                var date = new Date(NextDate); //tomorrow Date

                var Next2nextDate = new Date(d.getTime() + 1000 * 60 * 60 * 48);
                var nextDate = new Date(Next2nextDate); //tomorrow Date

                setSelection("tomorrow");
                setStartDate(date);
                setEndDate(nextDate);
                setNearestAirportCode(nearestAirportCode);
                getCrewAirline();
              }}
              color="red"
            />
            <Text style={{ color: "#828282" }}>Tomorrow</Text>
          </View>
        </View>
        {/* CrewAirline List */}
        {crewAirLineScheduledJob?.length == 0 ? (
          <Text style={{ color: "white" }}>No Job found</Text>
        ) : (
          <View //main container
            style={{
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <View
              style={{
                paddingVertical: 12,
                paddingHorizontal: 8,
                backgroundColor: "gray",
              }}
            >
              <Text style={{ color: "white" }}>
                {moment(startDate, "YYYY-MM-DDTHH:mm:ss.sssZ").format(
                  "MM/DD/YYYY"
                )}
              </Text>
            </View>
            <FlatList
              data={crewAirLineScheduledJob}
              // renderItem={({ item }) => <Item data={[item]} />}
              renderItem={({ item }) => (
                <Item
                  airlineInfo={item.AirlineInfo}
                  flightTime={item.FlightTime}
                />
              )}
              ItemSeparatorComponent={ItemSeparatorView}
              keyExtractor={(item) => item.AirlineInfo}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  title: {
    color: "white",
    fontSize: 14,
    marginLeft: 8,
  },
});
export default FindMyRide;
