import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ItemScreen = () => {
  const route = useRoute();
  const item =  route.params.item;
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack(); // Navigate back when the back button is pressed
  };
  let d = "lopsume focsum shit happens this is cool "

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Item Details</Text>
      </View>

      {/* Item Details */}
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.img }} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Price: ${item.price}</Text>
        <Text style={styles.itemDescription}>{d}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db', // Header background color
    paddingVertical: 10,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    padding: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  itemPrice: {
    fontSize: 18,
    color: '#e74c3c', // Price text color
    marginTop: 5,
  },
  itemDescription: {
    fontSize: 16,
    marginTop: 10,
  },
});

