import {StyleSheet, Text, Modal, Button, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import LayoutNavigator from './LayoutNavigator';
import {useGlobalState} from '../GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Linking} from 'react-native';
import DeviceInfo from 'react-native-device-info';
// import {} from "../services/user.service"
import {getVersionCode} from '../services/info.service';
import {refreshToken} from '../services/user.service'
import Toast from 'react-native-toast-message';
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
  const [showPopup, setShowPopup] = useState(false);
  const updateUserToken = async ()=>{
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user); 
    if(!user.baseUrlUpdated){
      try {
        let response = await refreshToken({empPhone:user.user.phone});
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: "Token Updated Successfully",
          visibilityTime: 1000, // Duration in milliseconds
        });
        
      } catch (error) {
        console.log(error)
      }
    } else{
    
    }
  }
  useEffect(() => {
    checkAppVersion();
    updateUserToken();
    setUserData();
  }, []);

  const getVersion = async () => {
    try {
      let response = await getVersionCode();
      return response.data.versionCode;
    } catch (error) {}
  };
  const checkAppVersion = async () => {
    const currentVersion = DeviceInfo.getVersion();
    try {
      const latestVersion = await getVersion(); // Implement this function to fetch latest version
      if (currentVersion !== latestVersion) {
        // showUpdateAlert();
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error checking app version:', error);
    }
  };
  
  return (
    <View style={styles.main}>
      {globalState?.user ? <AuthenticatedNavigator/> : <LayoutNavigator />}
      <Modal visible={showPopup} transparent={true}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            backgroundColor:"rgba(0,0,0,0.3)"
          }}>
          <View style={{width: "100%",padding:20,borderTopLeftRadius:25, borderTopRightRadius:25, backgroundColor:"white", paddingVertical:30}}>
            <Text style={{color: 'gray',textAlign:"center", fontSize:18, marginBottom:30}}>
            There is a new version of the App available on Play store, please update and restart the App.
            </Text>
            <Button
              title="UPDATE"
              color="#035292"
              onPress={() =>
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=ai.overseas',
                )
              }
            />
          </View>
        </View>
      </Modal>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default Navigator;
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
