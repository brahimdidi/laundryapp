import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { setPreferences } from "../redux/PreviousPreferencesReducer";
import Menu from "../components/Menu";

const PickUpScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const previousPreferences = useSelector((state) => state.previousPreferences.previousPreferences);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDeliveryDuration, setSelectedDeliveryDuration] = useState("");
  const timesOfPickUp = [
    {
      id: 1,
      time: "8:00 AM",
    },
    {
      id: 2,
      time: "9:00 AM",
    },
    {
      id: 3,
      time: "10:00 AM",
    },
    {
      id: 4,
      time: "11:00 AM",
    },
  ];
  const deliveryDurations = [
    {
      id: 1,
      duration: "1-3 days",
    },
    {
      id: 2,
      duration: "3-5 days",
    },
    {
      id: 3,
      duration: "5-7 days",
    },
  ];
  const proceedToCart = () => {
    if (!selectedDate) {
      Alert.alert("Please select a date");
    } else if (!selectedTime) {
      Alert.alert("Please select a time");
    } else if (!selectedDeliveryDuration) {
      Alert.alert("Please select a delivery duration");
    }
    if (selectedDate && selectedTime && selectedDeliveryDuration) {
      dispatch(setPreferences({ selectedTime, selectedDate: selectedDate.toString(), selectedDeliveryDuration }));
      navigation.replace("Cart", {
        selectedDate: selectedDate.toString(),
        selectedTime,
        numberOfDays : selectedDeliveryDuration,
      });
    }
  }
  useEffect(() => {
    if (previousPreferences.selectedDate) {
      setSelectedDate(new Date(previousPreferences.selectedDate));
      setSelectedTime(previousPreferences.selectedTime);
      setSelectedDeliveryDuration(previousPreferences.selectedDeliveryDuration);
    }
  }, []);
  return (
    <>
      <SafeAreaView>
         <View style={{margin: 10}}>
                    {/* render back button */}
                    <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" />
        </View>
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Adress to be delivered to
        </Text>
        <TextInput
          placeholder="Enter your adress"
          style={{
            borderWidth: 0.7,
            borderRadius: 9,
            borderColor: "gray",
            padding: 40,
            margin: 10,
          }}
        />
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Pick up date
        </Text>
        <HorizontalDatepicker
          mode="gregorian"
          startDate={Date.now()}
          endDate={Date.now() + 1000 * 60 * 60 * 24 * 30}
          initialSelectedDate= {selectedDate}
          onSelectedDateChange={(date) => setSelectedDate(date)}
          selectedItemWidth={170}
          unselectedItemWidth={38}
          itemHeight={38}
          itemRadius={10}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          unselectedItemTextStyle={styles.selectedItemTextStyle}
          selectedItemBackgroundColor="#222831"
          unselectedItemBackgroundColor="#ececec"
          flatListContainerStyle={styles.flatListContainerStyle}
        />

        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Pick up time
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {timesOfPickUp.map((item, index) => (
            <Pressable
              onPress={() =>
                selectedTime === item.time
                  ? setSelectedTime("")
                  : setSelectedTime(item.time)
              }
              key={index}
              style={
                selectedTime === item.time
                  ? {
                      margin: 8,
                      backgroundColor: "black",
                      opacity: 1.5,
                      borderRadius: 7,
                      padding: 10,
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 8,
                      borderColor: "gray",
                      opacity: 0.8,
                      borderRadius: 7,
                      padding: 10,
                      borderWidth: 0.7,
                    }
              }
            >
              <Text
                style={
                  selectedTime === item.time
                    ? { textAlign: "center", marginTop: 5, color: "white" }
                    : { textAlign: "center", marginTop: 5, color: "black" }
                }
              >
                {item.time}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 10 }}>
          Delivery duration
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryDurations.map((item, index) => (
            <Pressable
              onPress={() =>
                selectedDeliveryDuration === item.duration
                  ? setSelectedDeliveryDuration("")
                  : setSelectedDeliveryDuration(item.duration)
              }
              key={index}
              style={
                selectedDeliveryDuration === item.duration
                  ? {
                      margin: 8,
                      backgroundColor: "black",
                      opacity: 1.5,
                      borderRadius: 7,
                      padding: 10,
                      borderWidth: 0.7,
                    }
                  : {
                      margin: 8,
                      borderColor: "gray",
                      opacity: 0.8,
                      borderRadius: 7,
                      padding: 10,
                      borderWidth: 0.7,
                    }
              }
            >
              <Text
                style={
                  selectedDeliveryDuration === item.duration
                    ? { textAlign: "center", marginTop: 5, color: "white" }
                    : { textAlign: "center", marginTop: 5, color: "black" }
                }
              >
                {item.duration}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </SafeAreaView>
      <Menu onPress={proceedToCart} text="proceed to cart" />
    </>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({
  proceedToPickUpContainer: {
    backgroundColor: "#088f8f",
    padding: 10,
    marginTop: "auto",
    marginBottom: 30,
    margin: 15,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  proceedToPickUpText: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  },
});