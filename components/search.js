import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { axiosGet, axiosPost } from "../apis/useAxios";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

const Search = ({ route, navigation }) => {
  //const navigation = useNavigation();
  const [animating, setAnimating] = useState(true);
  const { id } = route.params;
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    if (id == 0) {
      getAirLineData();
    } else if (id == 1) {
      getAirPort();
    } else if (id == 2) {
      getAirPort();
    }
  }, []);

  async function getAirLineData() {
    const airLineData = await axiosGet("Common/GetAirline");
    setFilteredDataSource(airLineData.Airline);
    setMasterDataSource(airLineData.Airline);
  }

  async function getAirPort() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});

    const airPortList = await axiosPost("Common/GetAirportV3", {
      Latitude: location.coords.latitude,
      Longitude: location.coords.longitude,
    });

    if (airPortList.IsSuccess) {
      setAnimating(false);
      setFilteredDataSource(airPortList.Airport);
      setMasterDataSource(airPortList.Airport);
    } else {
      setAnimating(false);
    }
  }

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource

      // const newData = masterDataSource.filter((item)=> {
      //   const itemData = item.Name ? item.Name.toUpperCase() : "".toUpperCase();
      //   const textData = text.toUpperCase();
      //   return itemData.indexOf(textData) > -1;
      // });

      //OR

      const newData = masterDataSource.filter(function (item) {
        //const itemData = item.Code ? item.Code.toUpperCase() : "".toUpperCase();
        if (id == 0) {
          const itemData = item.Name
            ? item.Name.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        } else {
          const itemData = item.Code
            ? item.Code.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
        return null;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View
        style={{
          flexDirection: "row",
          paddingLeft: 20,
          position: "relative",
          alignItems: "center",
        }}
      >
        <MaterialIcons name="flight" color={"gray"} size={18} />
        <Text
          style={styles.itemStyle}
          onPress={() => {
            //0 - for registration, 1 - for findmyride , 2 - feedback
            if (id == 0) {
              navigation.navigate("registration", {
                airlineId: item.Id,
                airlineName: item.Name,
              });
            } else if (id == 1) {
              navigation.navigate("FindMyRide", {
                airportId: item.Id,
                airportCode: item.Code,
                airportName: item.Name,
              });
            } else if (id == 2) {
              navigation.navigate("FeedBack", {
                airportId: item.Id,
                airportCode: item.Code,
                airportName: item.Name,
              });
            }

            //getItem(item)
          }}
        >
          {/* {item.id}
        {"."} */}
          {item.Name.toUpperCase()}
        </Text>
      </View>
    );
  };
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
  const getItem = (item) => {
    // Function for click on an item
    alert("Id : " + item.id + " Title : " + item.title);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search"
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
        <ActivityIndicator
          animating={animating}
          color="white"
          size="large"
          //style={styles.activityIndicator}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  itemStyle: {
    color: "white",
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    marginHorizontal: 18,
    marginVertical: 22,
    paddingLeft: 20,
    borderRadius: 10,
    // borderColor: "#009688",
    // borderWidth: 1,
    backgroundColor: "gray",
  },
});
export default Search;
