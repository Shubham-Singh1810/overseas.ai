import {
  StyleSheet,
  ScrollView,
  Image,
  Button,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getNotification} from '../services/user.service';
import moment from 'moment';
import {useGlobalState} from '../GlobalProvider';
const Notifications = props => {
  const {globalState, setGlobalState} = useGlobalState();
  const [showNotifyScreen, setShowNotifyScreen] = useState('Jobs');
  const [notificationArr, setNotificationArr] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const getNotificationFunc = async () => {
    setShowLoader(true);
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getNotification(JSON.parse(user).access_token);
      if (response.status == 200) {
        console.log(response.data);
        setNotificationArr(response.data);
      } else {
        console.warn('sdkfj');
      }
    } catch (error) {}
    setShowLoader(false);
  };
  useFocusEffect(
    React.useCallback(() => {
      getNotificationFunc();
    }, []),
  );

  return (
    <View style={styles.main}>
      <View>
        <ScrollView horizontal={true}>
          <Text
            style={[
              styles.navText,
              showNotifyScreen === 'Jobs'
                ? {textDecorationLine: 'underline'}
                : null,
            ]}
            onPress={() => setShowNotifyScreen('Jobs')}>
            Jobs ({notificationArr?.newJobs?.length})
          </Text>
          <Text
            style={[
              styles.navText,
              showNotifyScreen === 'Applications'
                ? {textDecorationLine: 'underline'}
                : null,
            ]}
            onPress={() => setShowNotifyScreen('Applications')}>
            Applications ({notificationArr?.notifications?.length})
          </Text>
          <Text
            style={[
              styles.navText,
              showNotifyScreen === 'Profile'
                ? {textDecorationLine: 'underline'}
                : null,
            ]}
            onPress={() => setShowNotifyScreen('Profile')}>
            Profile (
            {
              globalState.profileStrength.emptyFields.filter?.((v, i) => {
                return !v.complete;
              }).length
            }
            )
          </Text>
        </ScrollView>
      </View>
      {showLoader ? (
        <View
          style={{
            height: 400,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{marginTop: 16}}>
          <ScrollView>
            {showNotifyScreen == 'Jobs' &&
              notificationArr?.newJobs?.map((v, i) => {
                return (
                  <Pressable
                    onPress={() =>
                      props.navigation.navigate('Job Details', {jobId: v.id, backTo:"Notifications"})
                    }
                    style={styles.notificationBox}>
                    <Text style={styles.notificationBoxText}>
                      {v.fullMessage}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'right',
                        color: '#000',
                        marginTop: 5,
                        fontWeight: 500,
                        fontSize: 12,
                      }}>
                      {moment(v.created_at).fromNow()} {}
                    </Text>
                  </Pressable>
                );
              })}
            {showNotifyScreen == 'Applications' &&
              notificationArr.notifications?.map((v, i) => {
                return (
                  <Pressable
                    onPress={() =>
                      props.navigation.navigate('Applied Job By Id', {
                        id: v?.jobApplicationId,
                      })
                    }
                    style={styles.notificationBox}>
                    <Text style={styles.notificationBoxText}>
                      {v.fullMessage}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'right',
                        color: '#000',
                        marginTop: 5,
                        fontWeight: 500,
                        fontSize: 12,
                      }}>
                      {moment(v.created_at).fromNow()} {}
                    </Text>
                  </Pressable>
                );
              })}
            {showNotifyScreen == 'Profile' &&
              globalState.profileStrength?.emptyFields?.map((v, i) => {
                return (
                  !v.complete && (
                    <Pressable
                      onPress={() =>
                        props.navigation.navigate(v.type)
                      }
                      style={styles.notificationBox}>
                      <Text style={styles.notificationBoxText}>
                        {v?.message}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'right',
                          color: '#000',
                          marginTop: 5,
                          fontWeight: 500,
                          fontSize: 12,
                        }}>
                       Action
                      </Text>
                    </Pressable>
                  )
                );
              })}
            {/* <View style={[styles.notificationBox, {backgroundColor: 'white'}]}>
            <Text style={styles.notificationBoxText}>
              Congratulations !!! Your profile for Product analyst is
              shortlisted by Hindustan Unilever.
            </Text>
          </View> */}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 18,
  },
  navText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 18,
    marginRight: 20,
  },
  notificationBox: {
    backgroundColor: '#dfeaf2',
    padding: 10,
    borderWidth: 0.2,
    elevation: 2,
    marginBottom: 20,
  },
  notificationBoxText: {
    color: '#000',
    fontWeight: '400',
    fontSize: 14,
    letterSpacing: 0.5,
    lineHeight: 19,
  },
});
