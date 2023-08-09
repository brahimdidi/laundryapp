import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  addToCart,
  decrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import {
  decrementProductQuantity,
  incrementProductQuantity,
  resetProductQuantity,
} from "../redux/ProductReducer";

const CartScreen = () => {
  const route = useRoute();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <>
      <SafeAreaView>
        <View style={{ margin: 10 }}>
          {/* render back button */}
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />
        </View>
        {total === 0 ? (
          <View
            style={{
              marginTop: 100,
              alignItems: "center",
              height: "100%",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>
              Your cart is empty
            </Text>
          </View>
        ) : (
          <>
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              Your Bucket
            </Text>
            {/* list of cart items with option to add or remove quantity */}
            <ScrollView
              style={{
                maxHeight: 300,
                borderRadius: 4,
                backgroundColor: "white",
                marginHorizontal: 10,
                padding: 4,
              }}
            >
              {cart.map((item) => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 10,
                    padding: 6,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "lightgrey",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "bold",
                        marginHorizontal: 10,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 10,
                        gap: 3,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "lightgrey",
                        backgroundColor: "floralwhite",
                        padding: 5,
                      }}
                    >
                      <Ionicons
                        onPress={() => {
                          dispatch(decrementQuantity(item));
                          dispatch(decrementProductQuantity(item));
                        }}
                        name="remove-circle-outline"
                        size={24}
                        color="red"
                      />
                      <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                        {item.quantity}
                      </Text>
                      <Ionicons
                        onPress={() => {
                          dispatch(addToCart(item));
                          dispatch(incrementProductQuantity(item));
                        }}
                        name="add-circle-outline"
                        size={24}
                        color="green"
                      />
                    </View>
                    <Text
                      style={
                        item.price * item.quantity > 999
                          ? {
                              width: 60,
                              fontSize: 17,
                              fontWeight: "bold",
                              color: "#177377",
                            }
                          : {
                              width: 50,
                              fontSize: 17,
                              fontWeight: "bold",
                              color: "#177377",
                            }
                      }
                    >
                      ${item.price * item.quantity}
                    </Text>
                    {/* render remove all items of this type button  */}
                    <Ionicons
                      onPress={() => {
                        dispatch(removeFromCart(item.id));
                        dispatch(resetProductQuantity(item));
                      }}
                      name="trash-outline"
                      size={24}
                      color="red"
                    />
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* render billing details with list of items  */}
            <View
              style={{
                backgroundColor: "white",
                marginHorizontal: 10,
                marginTop: 23,
                padding: 7,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Billing Details
              </Text>
              <View
                style={{ gap: 5, borderRadius: 7, padding: 10, marginTop: 15 }}
              >
                <View style={styles.def}>
                  <Text style={styles.defText}>Number of items</Text>
                  <Text style={styles.defText}>{cart.length}</Text>
                </View>
                <View style={styles.def}>
                  <Text style={styles.defText}>Delivery Charges</Text>
                  <Text
                    style={styles.defTextBlue}
                  >
                    FREE
                  </Text>
                </View>
              </View>
              <View
                style={{
                  padding: 10,
                  borderTopWidth: 1,
                  borderColor: "gray",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.defText}>Date </Text>
                <Text
                  style={styles.defTextBlue}
                >
                  {route.params.selectedDate.slice(0, 15)}
                </Text>
              </View>
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.defText}>Number of days </Text>
                <Text
                  style={styles.defTextBlue}
                >
                  {route.params.numberOfDays}
                </Text>
              </View>
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.defText}>Time of pick up</Text>
                <Text
                  style={{ fontSize: 17, fontWeight: "300", color: "skyblue" }}
                >
                  {route.params.selectedTime}
                </Text>
              </View>

              <View
                style={{
                  padding: 10,
                  borderTopWidth: 1,
                  borderColor: "gray",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 17, fontWeight: "bold", color: "black" }}
                >
                  Total to pay
                </Text>
                <Text
                  style={{ fontSize: 19, fontWeight: "bold", color: "black" }}
                >
                  ${total}
                </Text>
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
      {total > 0 && (
        <Pressable style={styles.proceedToPickUpContainer}>
          <View>
            <Text style={styles.proceedToPickUpText}>
              {cart.length} items | ${total}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              extra charges might apply
            </Text>
          </View>

          <Text style={{ fontSize: 17, fontWeight: "600" }}>Place Order</Text>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;

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
  def: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  defText: { fontSize: 17, fontWeight: "bold", color: "gray" },
  defTextBlue: { fontSize: 17, fontWeight: "bold", color: "skyblue" },
});
