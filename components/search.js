import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";
import { axiosGet } from "../apis/useAxios";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const Search = ({ navigation }) => {
  //const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    getAirLineData();
  }, []);

  async function getAirLineData() {
    const airLineData = await axiosGet("Common/GetAirline");
    setFilteredDataSource(airLineData.Airline);
    setMasterDataSource(airLineData.Airline);
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
        const itemData = item.Name ? item.Name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
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
            navigation.navigate("registration", {
              airlineId: item.Id,
              airlineName: item.Name,
            });

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
    <SafeAreaView style={{ flex: 1 }}>
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
            index.toString(), console.log(item);
          }}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
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
