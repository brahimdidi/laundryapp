import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { EvilIcons } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/ProductReducer";
import { useNavigation } from "@react-navigation/core";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import GetContacts from "../components/GetContacts";
import Menu from "../components/Menu";
import { proceedToPickUpContainer } from "../styles";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [displaycurrentAddress, setDisplaycurrentAddress] = useState(
    "we are loading location"
  );
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // set products based on whether the user is searching or not

  const originalProductsArray = useSelector((state) => state.product.product);
  if (searchQuery.length > 0) {
    products = searchProducts(originalProductsArray, searchQuery);
  } else {
    products = originalProductsArray;
  }

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
    // console.log("getCurrentLocation");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setDisplaycurrentAddress("Permission to access location was denied");
      Alert.alert("Permission denied", "allow the app to use location", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => {} },
      ]);
    }

    let { coords } = await Location.getCurrentPositionAsync();
    // console.log("coords", coords);
    // post location to firebase
    const docRef = await addDoc(collection(db, "locations"), {
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    // console.log("location written with ID: ", docRef.id);

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      // console.log("response", response);

      for (let item of response) {
        let address = `${item.name}, ${item.region}, ${item.postalCode}, ${item.country}`;
        setDisplaycurrentAddress(address);
        // break;
      }
    }
  };
  const fetchProducts = async () => {
    // fetch products from firebase
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push(doc.data());
    });
    dispatch(setProducts(products));
  };
  

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  return (
    <>
      <GetContacts />
      <ScrollView style={{ marginTop: 50 }}>
        {/* location and profile  */}
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <EvilIcons name="location" size={34} color="#fd5c63" />
          <View>
            <Text style={{ fontSize: 23, fontWeight: "500" }}>Home</Text>
            <Text>{displaycurrentAddress}</Text>
          </View>
        </View>
        <Pressable
          style={{ marginLeft: "auto", marginRight: 7 }}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={require("../assets/user.png")}
          />
        </Pressable>
        {/* search bar */}

        <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.9,
            borderColor: "#c0c0c0",
            borderRadius: 7,
          }}
        >
          <TextInput
            style={{ flex: 1 }} // Take up 100% of the available space
            placeholder="Search"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              searchProducts(originalProductsArray, text);
            }}
          />

          {/* if checkbar isn't empty, render the clear icon */}
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery("")}>
              <EvilIcons
                style={{ padding: 5 }}
                name="close"
                size={34}
                color="black"
              />
            </Pressable>
          )}
        </View>

        {/* this should disapear when the user is searching */}
        {searchQuery.length === 0 && (
          <>
            <Carousel />
            <Services />
          </>
        )}

        {/* render all product  */}
        {/* render loading when products are being fethed */}

        {products.length === 0 && searchQuery.length === 0 ? (
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : (
          products.map((product, index) => (
            <Product key={index} item={product} />
          ))
        )}
      </ScrollView>
      {(total > 0 && searchQuery.length === 0) && (
         <Menu text= "Proceed to pick up" onPress={() => navigation.navigate('PickUp')} />
      )}
    </>
  );
};

export default HomeScreen;

// search products method
const searchProducts = (products, text) => {
  const filteredProducts = products.filter((product) => {
    const productLowercase = product.name.toLowerCase();
    const searchTermLowercase = text.toLowerCase();
    return productLowercase.includes(searchTermLowercase);
  });
  return filteredProducts;
};
