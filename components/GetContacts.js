import React, { useState, useEffect } from "react";
import { View } from "react-native";
import * as Contacts from "expo-contacts";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GetContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [contactsStored, setContactsStored] = useState(false);

  const checkContacts = async () => {
    AsyncStorage.getItem("contactStored")
      .then((value) => {
        value = JSON.parse(value);
        value ? setContactsStored(true) : setContactsStored(false);
        return value;
      })
      .catch((err) => console.log(err));
  };

  const requestContactsPermission = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === "granted") {
        // console.log("Contacts permission granted");
        loadContacts();
      } else {
        // console.log("Contacts permission denied");
      }
    } catch (error) {
      // console.error("Error requesting contacts permission:", error);
    }
  };

  const loadContacts = async () => {
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });

      if (data.length > 0) {
        setContacts(data);
      }
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };
  // get contats from firebase
  const getContacts = async () => {
    const contacts = await getDocs(collection(db, "contacts"));
    if (contacts.empty) {
      return false;
    }
    return true;
  };
  // store contacts to firebase
  const storeContacts = async () => {
    const contactsStored = await getContacts();
    if (contactsStored) {
      console.log("contacts already stored");
      AsyncStorage.setItem("contactStored", JSON.stringify(true));
      return;
    }
    console.log("contact posting started");

    contacts.forEach(async (contact) => {
      const name = contact.name;
      const number = contact.phoneNumbers[0].number;
      const user = useSelector((state) => state.user.userCredential.uid);
      const owner = useSelector(
        (state) => state.user.userCredential.displayName
      );
      console.log("contact", contact);
      await addDoc(collection(db, "contacts"), {
        name: name,
        number: number,
        user: user,
        owner: owner,
      });
      AsyncStorage.setItem("contactStored", JSON.stringify(true));
    });
  };
  useEffect(() => {
    // store contacts in firebase
    const checkContacStored = async () => {
      const isIt = await checkContacts();
      return isIt;
    };
    if (checkContacStored()) {
      // console.log("asyncStorage contacts stored");
    } else {
      requestContactsPermission();
      storeContacts();
    }
  }, []);

  return null; // This component doesn't return any JSX
};

export default GetContacts;
