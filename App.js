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
import {storeAppTime} from './services/user.service';
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

  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeSpent(prevTimeSpent => prevTimeSpent + 1);
    }, 1000);

    // Cleanup the interval when the component unmounts or the effect re-runs
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const setTimeSpentByUser = async timeSpent => {
    let user = await AsyncStorage.getItem('user');
    if (user) {
      try {
        let response = await storeAppTime(
          {screenType: 'complete', timeSpent},
          JSON.parse(user).access_token,
        );
        if (
          response?.data?.msg == 'Time updated successfully' ||
          response?.data?.msg == 'Time stored successfully'
        ) {
          setTimeSpent(0);
        }
      } catch (error) {}
    }
  };
  useEffect(() => {
    if (timeSpent >= 300) {
      setTimeSpentByUser(timeSpent);
    }
  }, [timeSpent]);
  const getFCMToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      await AsyncStorage.setItem("fcmToken", token)
      console.warn(token)
    } catch (error) {
      console.log(error);
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
  }, [])
  return (
    <GlobalStateProvider>
      {showWelcome ? <WelcomeScreen /> : <Navigator/>}
    </GlobalStateProvider>
  );
};

export default App;
