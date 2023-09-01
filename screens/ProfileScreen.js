import { ActivityIndicator, Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from "@expo/vector-icons";
import { areYouSure } from './Reusable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { cleanCart } from '../redux/CartReducer';
import { setUser } from '../redux/UserReducer';
import { resetProductQuantity } from '../redux/ProductReducer';


const ProfileScreen = () => {
    const user = useSelector(state => state.user.userCredential);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const logout = async () => {
        // call the alert function
        const r =  await areYouSure("Logout", "Are you sure you want to logout?");
        if (!r) {
            setLoading(false);
            return;
        } else {
            setLoading(true);
            // empty cart
            dispatch(cleanCart());
            dispatch(resetProductQuantity());
            dispatch(setUser({}));
            auth.signOut().then(() => {
                AsyncStorage.removeItem('userCredential');
                navigation.navigate("Login");
                
            }).catch((error) => {
                setLoading(false);
                Alert.alert(error.message);
            });
        }
    };
  return (
    <SafeAreaView style={{alignItems: "center", justifyContent: "center", padding: 10}}>
        {/* render go back button  */}
        <Pressable style={{position: "absolute", top: 60, left: 10 , padding: 10}} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </Pressable>
        {
            loading ? (
                <View style={{ flexDirection: "row", flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            ) : (
                <>
                    <Text style={{ marginTop: 200}}>Profile</Text>
                    <Text style={{marginTop: 20}}>Welcome {user ? user.email : ""}</Text>
                    
                    {/* logout pressable  */}
                    <Pressable style={{marginTop: 20, borderWidth: 1,  borderColor: "red", padding: 15, borderRadius: 5}} onPress={logout}>
                    <Text style={{color: "black", fontSize: 19}}>Logout</Text>
                    </Pressable>
                </>
            )
        }
     
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})