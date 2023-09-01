import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { areYouSure } from '../screens/Reusable';
import { cleanCart } from '../redux/CartReducer';
import { resetProductQuantity } from '../redux/ProductReducer';
import { EvilIcons } from "@expo/vector-icons";

const Menu = ({ text, onPress }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0);

  const emptyCart = async () => {
    const result = await areYouSure("Empty cart", "Are you sure you want to empty your cart?");
    if (result) {
      console.log("empty cart");
      dispatch(cleanCart());
      dispatch(resetProductQuantity());
    } 
  };
  return (
  <View style={styles.proceedToPickUpContainer} >
    <View style={styles.proceedToPickUpHalf}>
      <Text style={styles.proceedToPickUpText}>
        {
          cart.map((item) => item.quantity).reduce((a, b) => a + b, 0)
        } items | ${total}
      </Text>
      <Text
        style={{
          padding: 10,
          borderBottomWidth: 1,
          fontSize: 12,
        }}
      >
        extra charges might apply
      </Text>
    </View>
    <View
      style={ 
      [
        styles.proceedToPickUpHalf,
        { backgroundColor: "grey",borderTopRightRadius: 7, borderBottomRightRadius: 7 }
      ]
      }
      >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          padding: 10,
        }}
        onTouchEnd={onPress}
      >
        <Text style={{ fontSize: 17, fontWeight: "600" }}>
          {text}
        </Text>
      </Pressable>
      <Pressable
        onPress={emptyCart}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          padding: 10,
          backgroundColor: "white",
          borderTopLeftRadius: 7,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "600", color: "red" }}>
          Empty cart
        </Text>
        <EvilIcons
          name="trash"
          size={26}
          color="red"
        />
      </Pressable>
    </View>
  </View>
  )
}
const styles = StyleSheet.create({
  proceedToPickUpContainer : {
    marginBottom: 30,
    margin: 15,
    padding: 0,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#088f8f",
    maxWidth: "95%",
    maxHeight: "18%",
  },
  proceedToPickUpText: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
    padding: 10,
    borderBottomWidth: 1,
  },
  proceedToPickUpHalf: {
    flexDirection: "column",
    flex: 1,
    padding: 1,
    width: "40%",
  },
});

export default Menu;

