import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Product = ({ item }) => {
  return (
    <View>
      <Pressable
        style={styles.productContainer}
      >
        <View>
          <Image source={{ uri: item.img }} style={{ width: 70, height: 70 }} />
        </View>
        <View>
          <Text style={styles.productName}>{item.name}</Text>
          <Text>$ {item.price}</Text>
        </View>

        <Pressable style={{width: 80}}>
            <Text style={styles.buyBtn}>Add </Text>
        </Pressable>
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

});
