import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import OnBoardScreen from './Apps/Screens/OnBoardScreen';
import SignUpForToRent from './Apps/Screens/SignUpForToRent';
export default function App() {
  return (
    <View>
      <OnBoardScreen />
      <SignUpForToRent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
