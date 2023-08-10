import { ActivityIndicator, Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
    const user = auth.currentUser;
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const logoutAlert = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            {
                text: "Cancel",
                onPress: () => {
                    return;
                }
            },
            {
                text: "Logout",
                onPress: () => {
                    setLoading(true);
                    logout();
                }
            }
        ]);
    };
    const logout = () => {
        auth.signOut().then(() => {
            console.log("User logged out successfully");
            navigation.navigate("Login");
            
        }).catch((error) => {
            setLoading(false);
            console.log(error.message);
            Alert.alert(error.message);
        });
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
                    <Pressable style={{marginTop: 20, borderWidth: 1,  borderColor: "red", padding: 15, borderRadius: 5}} onPress={logoutAlert}>
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