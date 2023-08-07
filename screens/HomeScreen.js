import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { EvilIcons } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import Product from "../components/Product";
import { services } from "../data/data";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/ProductReducer";
import { useNavigation } from "@react-navigation/core";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart.map((item) => item.price * item.quantity).reduce((a, b) => a + b, 0);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const products = useSelector((state) => state.product.product);
  const [displaycurrentAddress, setDisplaycurrentAddress] = useState(
    "we are loading location"
  );
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert("Location service not enabled", "Pleas enable location", [
        {
          text: "activate location ",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      setLocationServiceEnabled(enabled);
    }
  };
  const getCurrentLocation = async () => {
    console.log("getCurrentLocation");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "allow the app to use location", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    let { coords } = await Location.getCurrentPositionAsync();
    console.log("coords", coords);

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log("response", response);

      for (let item of response) {
        let address = `${item.name}, ${item.region}, ${item.postalCode}, ${item.country}`;
        setDisplaycurrentAddress(address);
        // break;
      }
    }
  };
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (products.length > 0) return;
    dispatch(setProducts(services));
  }, []);

  return (
    <>
    <ScrollView style={{ marginTop: 50 }}>
      {/* location and profile  */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <EvilIcons name="location" size={34} color="#fd5c63" />
        <View>
          <Text style={{ fontSize: 23, fontWeight: "500" }}>Home</Text>
          <Text>{displaycurrentAddress}</Text>
        </View>
      </View>
      <Pressable
        style={{ marginLeft: "auto", marginRight: 7 }}
        onPress={() => console.log("search pressed")}
      >
        <Image
          style={{ width: 40, height: 40, borderRadius: 20 }}
          source={require("../assets/user.png")}
        />
      </Pressable>
      {/* search bar */}
      
      <View style={{
        padding: 10, 
        margin: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 0.9 ,
        borderColor: "#c0c0c0",
        borderRadius: 7,
      }}>
        <TextInput
          style={{ flex: 1 }} // Take up 100% of the available space
          placeholder='search'
        />
        <EvilIcons name="search" size={24} color="black" />
      </View>
   

      {/* carousel */}
      <Carousel />
      {/* services */}
      <Services />
      {/* render all product  */}
      {products.map((product, index) => (
        <Product key={index} item={product} />
      ))}
    </ScrollView>
    {
      total > 0 && (
        <Pressable 
        onPress={() => navigation.navigate("PickUp")}
        style={styles.proceedToPickUpContainer}>
          <View>
            <Text style={styles.proceedToPickUpText}>{cart.length} items | ${total}</Text>
            <Text style={{fontSize: 14, fontWeight: "400", color: "white", marginVertical: 6}}>extra charges might apply</Text>
          </View>
            <Text style={{fontSize: 17, fontWeight: "600"}}>Proceed to pick up</Text>
        </Pressable>
      ) 
    }
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  proceedToPickUpContainer: {
    backgroundColor: "#088f8f",
    padding: 10,
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
  }
});
