// this is a module that should have many functions that can be used in many screens
import React from 'react';
import { Alert } from 'react-native';

// this is a simple promise function that asks user to confirm an action
const areYouSure = async (title, message) => {
    return new Promise((resolve) => {
      Alert.alert(title, message, [
        {
          text: "Cancel",
          onPress: () => {
            resolve(false);
          }
        },
        {
          text: title,
          onPress: () => {
            resolve(true);
          }
        }
      ]);
    });
  };
  


export { areYouSure };