import {StyleSheet, Text, View} from 'react-native';
import {useState, useEffect} from 'react';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import LayoutNavigator from './LayoutNavigator';
import {useGlobalState} from '../GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navigator = () => {
  const {translation, globalState, setGlobalState} = useGlobalState();
  
  const setUserData = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      setGlobalState({...globalState, user});
    } catch (error) {
      console.warn('error from global provider');
    }
  };
  useEffect(() => {
    setUserData();
  }, []);
  return (
    <View style={styles.main}>
      {globalState?.user ? <AuthenticatedNavigator />  : <LayoutNavigator />}
    </View>
  );
};

export default Navigator;
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
