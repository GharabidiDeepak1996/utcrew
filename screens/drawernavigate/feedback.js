import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { RadioButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

const FeedBack = ({ navigation, route }) => {
  const today = new Date();

  const startDate = getFormatedDate(
    today.setDate(today.getDate()),
    "YYYY/MM/DD"
  );
  const [isSelected, setSelection] = useState(false);
  const { airportId, airportCode, airportName } = route?.params || {};
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(startDate);
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const starImageFilled =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png";
  const starImageCorner =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png";

  function handleOnPress() {
    setOpen(!open);
  }
  function handleChange(propDate) {
    setDate(propDate);
    setOpen(!open);
  }

  renderHeader = () => (
    //header,panelHeader,panelHandel
    <View
      style={{
        backgroundColor: "fffff",
        shadowColor: "#333333",
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: 40,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#00000040",
            marginBottom: 10,
          }}
        />
      </View>
    </View>
  );

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
      }}
    >
      <ScrollView>
        <View style={{ marginVertical: 12, marginHorizontal: 18 }}>
          <Text style={{ color: "white", fontSize: 16 }}>
            Please fill out this form to send your feedback.
          </Text>
          {/* ==============Email------- */}
          <Text style={{ color: "gray", marginTop: 10, fontSize: 16 }}>
            Email
          </Text>
          <View
            style={{
              height: 42,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#828282",
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginTop: 4,
              color: "white",
            }}
          >
            <Text
              style={{
                color: "white",
                flex: 1,
                fontSize: 18,
              }}
            >
              DELETA124
            </Text>
          </View>
          {/* ======Airport====== */}
          <Text style={{ color: "gray", marginTop: 10, fontSize: 16 }}>
            Airport
          </Text>
          <TextInput
            style={{
              height: 46,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#828282",
              paddingHorizontal: 12,
              marginTop: 6,
              color: "white",
              fontSize: 18,
            }}
            underlineColorAndroid="transparent"
            value={airportCode}
            onPressIn={() => navigation.push("search", { id: "2" })}
          />
          {/* ======Flight or Ride id====== */}
          <Text style={{ color: "gray", marginTop: 10, fontSize: 16 }}>
            Flight # or Ride Id or Name
          </Text>
          <TextInput
            style={{
              height: 42,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#828282",
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginTop: 4,
              color: "white",
            }}
            selectionColor={"white"}
          />
          {/* ==========Date================= */}
          <Text style={{ color: "gray", marginTop: 10, fontSize: 16 }}>
            Date of service
          </Text>
          <TextInput
            style={{
              height: 42,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#828282",
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginTop: 4,
              color: "white",
              fontSize: 18,
            }}
            value={date}
            caretHidden={true}
            onPressIn={() => {
              handleOnPress();
            }}
          />
          <Modal animationType="slide" transparent={true} visible={open}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 22,
              }}
            >
              <View
                style={{
                  margin: 20,
                  backgroundColor: "white",
                  borderRadius: 20,
                  width: "90%",
                  padding: 35,
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <DatePicker
                  mode="calendar"
                  selected={date}
                  minimumDate={startDate}
                  onDateChange={handleChange}
                />
                <TouchableOpacity onPress={handleOnPress}>
                  <Text>cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* ======Feddback====== */}
          <Text style={{ color: "gray", marginTop: 10, fontSize: 16 }}>
            Type of feedback?
          </Text>
          {/* =====RadioButton====== */}
          <View style={{ flexDirection: "row" }}>
            {/* RadioButton1 */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RadioButton
                value="suggestion"
                status={isSelected === "suggestion" ? "checked" : "unchecked"}
                onPress={async () => {
                  setSelection("suggestion");
                }}
                color="red"
              />
              <Text style={{ color: "white", fontSize: 16 }}>Suggestion</Text>
            </View>
            {/* RadioButton2 */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RadioButton
                value="problems"
                status={isSelected === "problems" ? "checked" : "unchecked"}
                onPress={async () => {
                  setSelection("problems");
                }}
                color="red"
              />
              <Text style={{ color: "white", fontSize: 16 }}>Problems</Text>
            </View>
          </View>
          {/* ======Rating===r */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 16,
            }}
          >
            {maxRating.map((item, key) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.3}
                  key={item}
                  onPress={() => setDefaultRating(item)}
                >
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: "cover",
                      marginLeft: 8,
                    }}
                    source={
                      item <= defaultRating
                        ? { uri: starImageFilled }
                        : { uri: starImageCorner }
                    }
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* ====Command==== */}
          <Text style={{ color: "gray", marginTop: 10, fontSize: 16 }}>
            Comments
          </Text>
          <View
            style={{
              borderRadius: 6,
              borderWidth: 2,
              borderColor: "gray",
              height: 86,
            }}
          >
            <TextInput
              style={{
                paddingHorizontal: 8,
                paddingTop: 5,
                color: "white",
                textAlignVertical: "top",
                flex: 1,
              }}
              placeholder="Describe your suggestion/ problems.Use as much details as you can."
              placeholderTextColor={"gray"}
            />
          </View>
          {/* ====Upload==== */}
          <Text style={{ color: "gray", marginTop: 10, fontSize: 16 }}>
            Upload
          </Text>
          <Text style={{ color: "white", fontSize: 14, marginTop: 8 }}>
            One picture is worth of thousand words!
          </Text>
          <Text style={{ color: "white", fontSize: 14 }}>
            Take a picture of your transportation and send it to us.
          </Text>
          {/* ====Upload photo==== */}

          <View
            style={{
              marginTop: 10,
              width: 70,
              height: 70,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: "gray",
              borderStyle: "dotted",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                console.log("sds");
              }}
            >
              <Ionicons name="add-circle-sharp" size={66} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default FeedBack;
