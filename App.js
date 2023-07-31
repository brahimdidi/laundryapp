import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import StackNavigator from './StackNavigator';

const App = () => {
  return (
    <Provider store={Store}>
      <StackNavigator />
      <View style={styles.container}>
        <HomeScreen />
        <StatusBar style="auto" /> 
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#f1f1f1',
  }
});

export default App;