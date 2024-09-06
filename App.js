import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GlobalStateProvider} from './GlobalProvider';
import AuthenticatedNavigator from './navigation/AuthenticatedNavigator';
import LayoutNavigator from './navigation/LayoutNavigator';
import Navigator from './navigation/Navigator';
import VideoInput from './components/VideoInput';
import {runOnUI} from 'react-native-reanimated';
import {useState, useEffect} from 'react';
import WelcomeScreen from './screens/Welcome';
import {Text, PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  const Stack = createNativeStackNavigator();
  const [showWelcome, setShowWelcome] = useState(true);
  const hideWelcomme = () => {
    setTimeout(() => {
      setShowWelcome(false);
    }, 1450);
  };
  useEffect(() => {
    hideWelcomme();
  }, []);

  
  const getFCMToken = async () => {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user); 
    if(!user.baseUrlUpdated){
      try {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        await AsyncStorage.setItem("fcmToken", token)
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getNotificationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted === 'granted') {
      getFCMToken();
    } else {
      console.log('permission denied');
    }
  };
  useEffect(()=>{
    getNotificationPermission();
  }, []);
  return (
    <GlobalStateProvider>
      {showWelcome ? <WelcomeScreen /> : <Navigator/>}
    </GlobalStateProvider>
  );
};

export default App;
