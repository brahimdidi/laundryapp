import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect , useState } from 'react'
import * as Location from 'expo-location';
import { EvilIcons } from '@expo/vector-icons';

const HomeScreen = () => {
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
    <SafeAreaView>
        <View>
            <EvilIcons name="location" size={34} color="#fd5c63" />
            <View>
             <Text style={{fontSize: 23, fontWeight: "500"}}>Home</Text>
             <Text>{displaycurrentAddress}</Text>
            </View>
        </View>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})