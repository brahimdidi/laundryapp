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
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { setUser } from "../redux/UserReducer";

// Retrieving data


const LoginScreen = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const login = () => {
    if (!email || !password) {
      return Alert.alert("Please fill in all the fields");
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in 
      console.log("User logged in successfully from login function");
      const userData = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
      }
      console.log(userData, 'this is user data');
      AsyncStorage.setItem('userCredential', JSON.stringify(userData));
      dispatch(setUser(userData));
      setLoading(false);
      navigation.navigate("Home");
    }).catch((error) => {
      const errorMessage = error.message;
      Alert.alert(errorMessage.toString().slice(9));
      setLoading(false);
    });
  };
  
  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('userCredential')
    .then(value => {
      if(value) {
        // save user in redux store
        console.log(JSON.parse(value),'this is json value');
         dispatch(setUser(JSON.parse(value)));
         setLoading(false);
         navigation.navigate("Home");
      } else {
        // User token not found, continue checking Firebase auth state
          const unsubscribe = auth.onAuthStateChanged(authUser => {
            if (!authUser) {
              setLoading(false);
              console.log('User not logged in');
            } else {
              setLoading(false);
              navigation.navigate("Home");
            }
          });
          return unsubscribe;
      }
    })
    .catch((error) => {
      console.log(error);
    })

  }, []);
  

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      {loading ? (
            <View style={{ flexDirection: "row", flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{marginRight: 10}}>Loading...</Text>
                <ActivityIndicator size="large" color="#662d91" />
            </View>
        ) : (
         <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 20, color: "#662d91" }}>Sign In</Text>
          <Text style={{ fontSize: 18, marginTop: 10, fontWeight: "600" }}>
            Sign in to your account{" "}
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
          {/* login button  */}
          <Pressable
            onPress={login}
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
            <Text>login</Text>
          </Pressable>

          <Pressable 
          onPress={() => navigation.navigate('Register')}
          style={{marginTop: 20}}>
            <Text style={{textAlign: "center", fontSize: 17, color: "gray", fontWeight: 600}}>Don't have an account ?  Sign up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
        )
      }
      
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
