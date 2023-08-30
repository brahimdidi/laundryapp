import {
  ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { MaterialIcons } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { setUser } from "../redux/UserReducer";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const register = () => {
        if (!email || !password || !phone) {
          return Alert.alert("Please fill in all the fields");
        } else {
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password).then( (userCredential) => {
                // Signed in 

                const userUid = userCredential.user.uid;
                setDoc(doc(db, "users", `${userUid}`), {
                    email: email,
                    phone: phone,
                });
                const userData = {
                  email: userCredential.user.email,
                  uid: userCredential.user.uid,
                  displayName: userCredential.user.displayName,
                }
                AsyncStorage.setItem('userCredential', JSON.stringify(userData));
                // set user in the redux store
                dispatch(setUser(userData));
                console.log("User created and stored successfully");
                setLoading(false);
                navigation.navigate("Home");
            }
            ).catch((error) => {
                setLoading(false);
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert(errorMessage.toString().slice(9));
            });
        }
    };
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          padding: 10,
        }}
      >
        
        {
          loading ? (
            <View style={{ flexDirection: "row", flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="#662d91" />
            </View>
          ) : (
            <>
            {/* render back button  */}
          <Pressable style={{ flexDirection: "row", alignItems: "center", position: "absolute", top: 60, left: 10 ,padding: 10 }} 
          onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={24} color="black" /> 
            <Text>back to login page</Text>
          </Pressable>
            <KeyboardAvoidingView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 100,
            }}
          >
            <Text style={{ fontSize: 20, color: "#662d91" }}>Register</Text>
            <Text style={{ fontSize: 18, marginTop: 10, fontWeight: "600" }}>
              Create a new account
            </Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="email" size={24} color="black" />
              <TextInput
                placeholder="Email"
                placeholderTextColor="black"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  fontSize: 18,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  width: 300,
                  marginLeft: 10,
                  marginVertical: 10,
                  padding: 10
                }}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="vpn-key" size={24} color="black" />
              <TextInput
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="black"
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  width: 300,
                  marginLeft: 10,
                  marginVertical: 10,
                  padding: 10
                }}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="phone" size={24} color="black" />
              <TextInput
                keyboardType="numeric"
                placeholder="Phone"
                placeholderTextColor="black"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                style={{
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "gray",
                  width: 300,
                  marginLeft: 10,
                  marginVertical: 10,
                  padding: 10
                }}
              />
            </View>
            {/* register button  */}
            <Pressable
             onPress={register}
              style={{
                backgroundColor: "#7CB9E8",
                width: 200,
                alignItems: "center",
                borderRadius: 8,
                marginTop: 40,
                marginLeft: "auto",
                marginRight: "auto",
                padding: 15,
              }}
            >
              <Text>Register</Text>
            </Pressable>
  
            <Pressable 
            onPress={() => navigation.navigate('Login')}
            style={{marginTop: 20}}>
              <Text style={{textAlign: "center", fontSize: 17, color: "gray", fontWeight: 600}}>Already have an account ?  Log in</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
            </>
          )
        }
        
      </SafeAreaView>
    );
};

export default RegisterScreen

const styles = StyleSheet.create({})