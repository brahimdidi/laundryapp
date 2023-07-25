import { Alert, Pressable, StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect , useState } from 'react'
import * as Location from 'expo-location';
import { EvilIcons } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import Product from '../components/Product';

const HomeScreen = () => {
  // mock data
  const products = [
    {
      id: 1,
      name: "T-shirt",
      img: "https://source.unsplash.com/featured/300x269",
      price: 20,
    },
    {
      id: 2,
      name: "shoes",
      img: "https://source.unsplash.com/featured/300x270",
      price: 25,
    },
    {
      id: 3,
      name: "jeans",
      img: "https://source.unsplash.com/featured/300x271",
      price: 15,
    },
    {
      id: 4,
      name: "jacket",
      img: "https://source.unsplash.com/featured/300x272",
      price: 15,
    },
    {
      id: 5,
      name: "cap",
      img: "https://source.unsplash.com/featured/300x277 ",
      price: 15,
    },
    {
      id: 6,
      name: "socks",
      img: "https://source.unsplash.com/featured/300x274",
      price: 15,
    },
    {
      id: 7,
      name: "shorts",
      img: "https://source.unsplash.com/featured/300x275",
      price: 15,
    },

  ];

    const [displaycurrentAddress, setDisplaycurrentAddress] = useState('we are loading location');
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);

    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert('Location service not enabled', 
            'Pleas enable location', [
                {
                  text: 'activate location ',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
          
        } else { 
            setLocationServiceEnabled(enabled);
        };
    };
    const getCurrentLocation = async () => {
        console.log("getCurrentLocation");
        let { status } = await Location.requestForegroundPermissionsAsync(); 
        if (status !== 'granted') {
            Alert.alert('Permission denied', 
            'allow the app to use location', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);

        };
        let { coords } = await Location.getCurrentPositionAsync();
        console.log("coords",coords);

        if (coords) {
            const { latitude, longitude } = coords;
            let response = await Location.reverseGeocodeAsync({ latitude, longitude });
            console.log("response",response);
            
            for (let item of response) {
                let address = `${item.name}, ${item.region}, ${item.postalCode}, ${item.country}`;
                setDisplaycurrentAddress(address);
                // break;
            } 
        };
          
        }
    useEffect(() => {
     checkIfLocationEnabled();
     getCurrentLocation();
    }, []);


  return (
    <ScrollView style={{marginTop: 50 }}>
      {/* location and profile  */}
        <View style={{flexDirection: "row", alignItems: "center", padding: 10}}>
            <EvilIcons name="location" size={34} color="#fd5c63" />
            <View>
             <Text style={{fontSize: 23, fontWeight: "500"}}>Home</Text>
             <Text>{displaycurrentAddress}</Text>
            </View>
        </View>
        <Pressable 
         style={{marginLeft: "auto", marginRight: 7}}
         onPress={() => console.log("search pressed")}>
            <Image
              style={{width: 40, height: 40, borderRadius: 20}}
              source={require('../assets/user.png')}
             />
        </Pressable>
        {/* search bar */}
        <View style={{
          padding: 10, 
          margin: 10,
          flexDirection: "row",
          alignItemsc: "center",
          justifyContent: "space-between",
          borderWidth: 0.9 ,
          borderColor: "#c0c0c0",
          borderRadius: 7,
          }}>
          <TextInput placeholder='search' />
          <EvilIcons name="search" size={24} color="black" />
         </View>
     {/* carousel */}
      <Carousel />
      {/* services */}
      <Services />
       {/* render all product  */}
       {
          products.map((product,index) => (
            <Product key={index} item={product} />
          ))
       }

    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})