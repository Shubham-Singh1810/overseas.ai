import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import LanguageSelect from '../screens/LanguageSelect';
import Auth from '../screens/Auth';
import Otp from '../screens/Otp';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useGlobalState} from '../GlobalProvider';
const LayoutNavigator = () => {
  const Stack = createNativeStackNavigator();
  const {translation} = useGlobalState();
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.main}>
        <Stack.Navigator>
          <Stack.Screen name="Select Language" component={LanguageSelect} />
          <Stack.Screen
            name="Login"
            options={({navigation, route}) => ({
              title: translation.authenticate,
            })}
            component={Auth}
          />
          <Stack.Screen name="Verify Otp" component={Otp} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
    
  );
};

export default LayoutNavigator;

const styles = StyleSheet.create({
  main: {
    flex: 1,

  },
});
