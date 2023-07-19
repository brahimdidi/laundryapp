import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <View>
      <HomeScreen />
      <StatusBar style="auto" />
    </View>
  );
};

export default App;