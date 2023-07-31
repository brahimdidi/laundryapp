import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity } from "../redux/CartReducer";
import { decrementProductQuantity, incrementProductQuantity } from "../redux/ProductReducer";

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const addItemToCart = () => {
    dispatch(addToCart(item));
    dispatch(incrementProductQuantity(item));
  };
  const decrement = () => {
    dispatch(decrementQuantity(item));
    dispatch(decrementProductQuantity(item));
  };
  const increment = () => {
    dispatch(addToCart(item));
    dispatch(incrementProductQuantity(item));
  };

  return (
    <View>
      <Pressable style={styles.productContainer}>
        <View>
          <Image source={{ uri: item.img }} style={{ width: 70, height: 70 }} />
        </View>
        <View>
          <Text style={styles.productName}>{item.name}</Text>
          <Text>$ {item.price}</Text>
        </View>

        {cart.find((product) => product.id === item.id) ? (
          <Pressable style={styles.cardIncludesPressable}>
            <Pressable 
            onPress={decrement}
            style={styles.cardIncludesPressableChild}>
              <Text style={styles.cardIncludesPressableChildText}>-</Text>
            </Pressable>
            <Pressable>
              <Text
                style={{
                  fontSize: 20,
                  color: "#088f8f",
                  paddingHorizontal: 8,
                  fontWeight: "600",
                }}
              >
                {item.quantity}
              </Text>
            </Pressable>
            <Pressable 
             onPress={increment}
             style={styles.cardIncludesPressableChild}>
              <Text style={styles.cardIncludesPressableChildText}>+</Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable onPress={addItemToCart} style={{ width: 80 }}>
            <Text style={styles.buyBtn}>Add </Text>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  productName: {
    fontSize: 16,
    fontWeight: "500",
    width: 84,
    marginBottom: 7,
  },
  productPrice: {
    fontSize: 15,
    color: "gray",
    width: 60,
  },
  buyBtn: {
    borderColor: "gray",
    borderRadius: 4,
    borderWidth: 0.8,
    marginVertical: 10,
    color: "#088F8F",
    textAlign: "center",
    padding: 5,
  },
  productContainer: {
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 14,
  },
  cardIncludesPressable: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cardIncludesPressableChild: {
    width: 30,
    height: 30,
    borderRadius: 13,
    borderColor: "#BEBEBE",
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignContent: "center",
  },
  cardIncludesPressableChildText: {
    fontSize: 20,
    color: "#088F8F",
    textAlign: "center",
    fontWeight: "600",
    paddingHorizontal: 6,
  },
});
