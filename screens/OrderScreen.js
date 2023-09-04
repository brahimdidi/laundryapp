import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const OrderScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* render back button */}
      <Pressable
        style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        onPress={() => navigation.navigate("Home")}
      >
        <MaterialIcons
          name="arrow-back-ios"
          size={24}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Go back to home
        </Text>
      </Pressable>

      {/* start lottie animation here */}
      <LottieView
        source={require("../assets/thumbs.json")}
        style={{ height: 360, width: 300, alignSelf: "center" }}
        loop={false}
        autoPlay 
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 40,
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        Thank you for your order
      </Text>

      <LottieView
        source={require("../assets/sparkle.json")}
        style={{ position: "absolute", top: 100, alignSelf: "center" }}
        loop={false}
        autoPlay
        speed={0.7}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
