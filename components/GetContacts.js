import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as Contacts from 'expo-contacts';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useSelector } from 'react-redux';


const GetContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const requestContactsPermission = async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();

        if (status === 'granted') {
          console.log('Contacts permission granted');
          loadContacts();
        } else {
          console.log('Contacts permission denied');
        }
      } catch (error) {
        console.error('Error requesting contacts permission:', error);
      }
    };

    requestContactsPermission();
  }, []); // Empty dependency array ensures the effect runs only once

  const loadContacts = async () => {
    try {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });

      if (data.length > 0) {
        setContacts(data);
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };
  // get contats from firebase 
  const getContacts = async () => {
    const contacts = await getDocs(collection(db, "contacts"));
    if (contacts.empty) {
        return false;
    } ;
    return true;
  }
  useEffect(() => {
    // store contacts in firebase
    const storeContacts = async () => {
            const contactsStored  = await getContacts();
            if (contactsStored) {
                console.log("contacts already stored");
                return;
            }
            console.log("contact posting started");

            contacts.forEach(async (contact) => {
                const name = contact.name;
                const number = contact.phoneNumbers[0].number;
                const user = useSelector(state => state.user.userCredential.uid)
                const owner = useSelector(state => state.user.userCredential.displayName);
                console.log("contact", contact);
                await addDoc(collection(db, "contacts"), {
                name : name,
                number  : number,
                user : user,
                owner : owner,
        
                });
              
            }
            );
    };
    storeContacts();
}, []);

  return null; // This component doesn't return any JSX
};

export default GetContacts;
