import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import LanguageSelect from '../screens/LanguageSelect';
import Auth from '../screens/Auth';
import Otp from '../screens/Otp';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useGlobalState} from '../GlobalProvider';
import CandidateDetailsStep1 from '../screens/CandidateDetailsStep1';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import CandidateDetails2 from '../screens/CandidateDetails2';
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
          <Stack.Screen
            name="CandidateDetails1"
            component={CandidateDetailsStep1}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="CandidateDetails2"
            component={CandidateDetails2}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginCom"
            component={Login}
            options={{title: 'Login'}}
          />
          <Stack.Screen
            name="SignUpCom"
            component={SignUp}
            options={{title: 'Sign Up'}}
          />
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
