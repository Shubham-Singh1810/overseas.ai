import {
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
} from 'react-native';
import React,{useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGlobalState} from '../GlobalProvider';
import {getNotification} from '../services/user.service';
import {useFocusEffect} from '@react-navigation/native';
const RightNav = props => {
  const [notificationList, setNotificationistList] = useState(null);
  const getNotificationFunc = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getNotification(JSON.parse(user).access_token);
      if (response.status == 200) {
        console.log(response.data);
        setNotificationistList(response.data);
      } else {
        console.warn('sdkfj');
      }
    } catch (error) {}
  };
  const {globalState, setGlobalState} = useGlobalState();
  useFocusEffect(
    React.useCallback(() => {
      getNotificationFunc();
    }, []),
  );
  return (
    <>
      <View style={styles.topNav}>
        <View style={{flexDirection: 'row'}}>
          {notificationList?.newJobs?.length +
          parseInt(notificationList?.notifications?.length) +
          globalState?.profileStrength?.emptyFields?.filter?.((v, i) => {
            return !v.complete;
          }).length ? (
            <Pressable
            onPress={() => props.navigation.navigate('Notifications')}
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginRight: 0,
              }}>
              <Image source={require('../images/blackBell.png')} />
              <View
                style={{
                  backgroundColor: '#D31416',
                  position: 'relative',
                  right: 6,
                  top: 8,
                  borderRadius: 8,
                  height: 16,
                  width: 16,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 7, color: '#fff'}}>
                  {' '}
                  {notificationList?.newJobs?.length +
                    parseInt(notificationList?.notifications?.length) +
                    globalState?.profileStrength?.emptyFields?.filter?.(
                      (v, i) => {
                        return !v.complete;
                      },
                    ).length}
                </Text>
              </View>
            </Pressable>
          ) : (
            <Pressable
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                marginRight: 0,
              }}
              >
              <Image source={require('../images/blackBell.png')} />
            </Pressable>
          )}
        </View>
      </View>
    </>
  );
};

export default RightNav;

const styles = StyleSheet.create({
  modalMain: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    width: 350,
    borderColor: '#CCC',
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  modelText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Noto Sans',
  },
  main: {
    backgroundColor: '#fff',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  languagetext: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Noto Sans',
    fontSize: 16,
    marginBottom: 17,
  },
  textCenter: {
    textAlign: 'center',
  },
  selectBox: {
    borderWidth: 1,
    borderColor: 'rgba(167, 167, 167, 0.50)',
    padding: 12,
    borderRadius: 5,
    width: 250,
    marginBottom: 35,
  },
  topNav: {
    paddingHorizontal: 10,
  },
});
