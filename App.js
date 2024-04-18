import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GlobalStateProvider} from './GlobalProvider';
import AuthenticatedNavigator from './navigation/AuthenticatedNavigator';
import LayoutNavigator from './navigation/LayoutNavigator';
import Navigator from './navigation/Navigator';
import VideoInput from './components/VideoInput';
import {runOnUI} from 'react-native-reanimated';
import {useState, useEffect} from 'react';
import WelcomeScreen from './screens/Welcome';
import {Text} from 'react-native';
import {storeAppTime} from "./services/user.service";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    if(user){
      try {
        let response = await storeAppTime({screenType: 'complete', timeSpent}, JSON.parse(user).access_token);
        if(response?.data?.msg=="Time updated successfully" || response?.data?.msg=="Time stored successfully"){
          setTimeSpent(0)
        }
      } catch (error) {}
    }
  };
  useEffect(() => {
    if (timeSpent >= 300) {
      setTimeSpentByUser(timeSpent);
    }
  }, [timeSpent]);
  return (
    <GlobalStateProvider>
      {showWelcome ? <WelcomeScreen /> : <Navigator />}
    </GlobalStateProvider>
  );
};

export default App;
