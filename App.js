import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GlobalStateProvider} from './GlobalProvider';
import AuthenticatedNavigator from './navigation/AuthenticatedNavigator';
import LayoutNavigator from './navigation/LayoutNavigator';
import Navigator from './navigation/Navigator';
import VideoInput from './components/VideoInput';
import { runOnUI } from 'react-native-reanimated';
import {useState, useEffect}from "react"
import WelcomeScreen from './screens/Welcome';

const App = () => {
  const Stack = createNativeStackNavigator();
  const[showWelcome, setShowWelcome]=useState(true);
  const hideWelcomme = ()=>{
    setTimeout(()=>{
      setShowWelcome(false)
    },1450)
  }
  useEffect(()=>{
    hideWelcomme()
  },[])
  
  
  return (
    <GlobalStateProvider>
      {showWelcome ? <WelcomeScreen/>: <Navigator/> } 
    </GlobalStateProvider>
  );
};

export default App;

