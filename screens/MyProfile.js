import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import {loginOut} from '../services/user.service';
import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useGlobalState} from '../GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getProfileStrength, getNotification} from '../services/user.service';

const MyProfile = props => {
  const {translation, newTranslation, globalState, setGlobalState} =
    useGlobalState(); 
  const handleLogOut = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await loginOut(JSON.parse(user).access_token);
      if (response?.data?.logout == 'success') {
        await AsyncStorage.clear();
        setGlobalState({...globalState, user: null});
        setShowLogOutPopUp(false);
      } else {
        console.warn('Something went wrong');
      }
    } catch (error) {
      console.error('Error removing user data from AsyncStorage:', error);
    }
  };
  const getProfileStrengthFunc = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getProfileStrength(JSON.parse(user).access_token);
      if (
        response?.data.msg == 'Some fields are empty' ||
        response?.data.msg ==
          'Profile strength calculated successfully and updated in records'
      ) {
        setGlobalState({
          ...globalState,
          user: user,
          profileStrength: response?.data,
        });
      }
    } catch (error) {
      console.log('NEW', error);
    }
  };
  const renderStar = () => {
    const strength = globalState?.profileStrength?.profileStrength;
    if (strength <= 20) {
      return <Image source={require('../images/starIcon.png')} />;
    } else if (strength > 20 && strength <= 40) {
      return (
        <>
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
        </>
      );
    } else if (strength > 40 && strength <= 60) {
      return (
        <>
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
        </>
      );
    } else if (strength > 60 && strength <= 80) {
      return (
        <>
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
        </>
      );
    } else {
      return (
        <>
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
        </>
      );
    }
  };
  const [showLogOutPopUp, setShowLogOutPopUp] = useState(false);
  const fetchUserData = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      setGlobalState({...globalState, user: user});
      setTimeout(() => {
        getProfileStrengthFunc();
      }, 2000);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
    fetchUserData();
    }, [globalState.selectedLanguage]),
  );
  return (
    <>
      <View style={styles.main}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 15,
              alignItems: 'center',
            }}>
            <View>
              <View>
                {JSON.parse(globalState?.user)?.empData?.empPhoto == null ? (
                  <Image
                    source={require('../images/dummyUserProfile.jpg')}
                    style={styles.myPic}
                  />
                ) : (
                  <Image
                    source={{
                      uri: JSON.parse(globalState?.user)?.empData?.empPhoto,
                    }}
                    style={styles.myPic}
                  />
                )}
              </View>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('Edit Profile', {
                    backTo: 'MyProfile',
                  })
                }>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    color: '#035292',
                    textAlign: 'center',
                    marginTop: 8,
                  }}>
                  {newTranslation?.edit}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{marginLeft: 15}}>
              <Text style={styles.name}>
                {JSON.parse(globalState?.user)?.empData?.empName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: -6,
                  marginBottom: 3,
                }}>
                {renderStar()}
              </View>

              <Text style={[styles.welderText]}>
                {
                  JSON.parse(globalState?.user)?.empData?.empOccupationModel
                    ?.occupation
                }
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  //  marginTop:-10
                }}>
                <Image
                  source={require('../images/greenPhoneIcon.png')}
                  style={{marginRight: 5}}
                />
                <Text style={styles.welderText}>
                  {JSON.parse(globalState?.user)?.empData?.empPhone}
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginBottom: 5}}>
            <View
              style={{
                width: globalState?.profileStrength?.profileStrength + '%',
                flexDirection: 'row',
                marginBottom: 2,
                justifyContent: 'flex-end',
              }}>
              <Text
                style={[
                  styles.nameText,
                  {
                    color:
                      globalState?.profileStrength?.profileStrength < 30
                        ? '#dc3545'
                        : globalState?.profileStrength?.profileStrength > 70
                        ? '#079E3F'
                        : '#007BFF',
                    fontSize: 12,
                  },
                ]}>
                {globalState?.profileStrength?.profileStrength}%
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                backgroundColor: '#fff',
                borderWidth: 0.3,
                height: 5,
              }}></View>
            <View
              style={{
                backgroundColor:
                  globalState?.profileStrength?.profileStrength < 30
                    ? '#dc3545'
                    : globalState?.profileStrength?.profileStrength > 70
                    ? '#079E3F'
                    : '#007BFF',
                borderRadius: 3,
                height: 5,
                width: globalState?.profileStrength?.profileStrength + '%',
                position: 'relative',
                bottom: 5,
              }}></View>
            <Text
              style={[
                styles.nameText,
                styles.fontWeight500,
                {marginTop: 5, marginBottom: -5, fontSize: 12},
              ]}>
              {newTranslation?.profileStrength}
            </Text>
          </View>
        </View>
        <ScrollView style={{marginTop: 20}}>
          <View>
            <View>
              {/* <View style={styles.navItem}>
                <Image
                  resizeMode="contain"
                  source={require('../images/careerGraph.png')}
                  style={{height: 20, width: 20, marginRight: 10}}
                />
                <Text style={styles.navText}>{translation.myCareerGraph}</Text>
              </View> */}

              <Pressable
                onPress={() =>
                  props.navigation.navigate('Applied Courses', {
                    backTo: 'MyProfile',
                  })
                }>
                <View style={styles.navItem}>
                  <Image
                    resizeMode="contain"
                    source={require('../images/capIcon.png')}
                    style={{height: 20, width: 20, marginRight: 10}}
                  />
                  <Text style={styles.navText}>
                    {translation.coursesApplied}
                  </Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() =>
                  props.navigation.navigate('Applied Job', {
                    backTo: 'MyProfile',
                  })
                }>
                <View style={styles.navItem}>
                  <Image
                    resizeMode="contain"
                    source={require('../images/jobApplied2.png')}
                    style={{height: 20, width: 20, marginRight: 10}}
                  />
                  <Text style={styles.navText}>{translation.jobApplied}</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() =>
                  props.navigation.navigate('My Documents', {
                    backTo: 'MyProfile',
                  })
                }>
                <View style={styles.navItem}>
                  <Image
                    resizeMode="contain"
                    source={require('../images/documentIcon.png')}
                    style={{height: 20, width: 20, marginRight: 10}}
                  />
                  <Text style={styles.navText}>{translation.myDocuments}</Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() =>
                  props.navigation.navigate('Saved Jobs', {backTo: 'MyProfile'})
                }>
                <View style={styles.navItem}>
                  <Image
                    resizeMode="contain"
                    source={require('../images/savedJobs.png')}
                    style={{height: 20, width: 20, marginRight: 10}}
                  />
                  <Text style={styles.navText}>{translation.savedJobs}</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() =>
                  props.navigation.navigate('Notifications', {
                    backTo: 'MyProfile',
                  })
                }>
                <View style={styles.navItem}>
                  <Image
                    resizeMode="contain"
                    source={require('../images/notificationIcon.png')}
                    style={{height: 20, width: 20, marginRight: 10}}
                  />
                  <Text style={styles.navText}>
                    {translation.notifications}
                  </Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() =>
                  props.navigation.navigate('My Experience', {
                    backTo: 'MyProfile',
                  })
                }>
                <View style={styles.navItem}>
                  <Image
                    source={require('../images/jobIcon.png')}
                    resizeMode="contain"
                    style={{height: 20, width: 20, marginRight: 10}}
                  />
                  <Text style={styles.navText}>
                    {newTranslation.experience}
                  </Text>
                </View>
              </Pressable>
              {/* <Pressable
                onPress={() =>
                  props.navigation.navigate('Language Training')
                }>
                <View style={styles.navItem}>
                  <Image
                    source={require('../images/applicationIcon.png')}
                    resizeMode="contain"
                    style={{height: 20, width: 20, marginRight: 10}}
                  />
                  <Text style={styles.navText}>Language Training</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() =>
                  props.navigation.navigate('Career Graph', {backTo: 'MyProfile'})
                }>
                <View style={styles.navItem}>
                  <Image
                    source={require('../images/careerGraph.png')}
                    resizeMode="contain"
                    style={{height: 20, width: 20, marginRight: 10}}
                  />
                  <Text style={styles.navText}>Career Graph</Text>
                </View>
              </Pressable> */}
              <Pressable
                onPress={() =>
                  props.navigation.navigate('Contact Us', {backTo: 'MyProfile'})
                }>
                <View style={styles.navItem}>
                  <Image
                    source={require('../images/helpIcon.png')}
                    resizeMode="contain"
                    style={{height: 20, width: 20, marginRight: 10}}
                  />
                  <Text style={styles.navText}>{translation.needHelp}</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => setShowLogOutPopUp(true)}>
                <View style={styles.navItem}>
                  <Image
                    source={require('../images/logoutIcon.png')}
                    style={{
                      height: 25,
                      width: 25,
                      position: 'relative',
                      right: 3,
                      marginRight: 10,
                    }}
                  />
                  <Text style={styles.logout}>{translation.logOut}</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <Text style={{textAlign: 'center', padding: 10, color: 'gray'}}>
          Version 2.1.0
        </Text>
      </View>
      <Modal transparent={true} visible={showLogOutPopUp} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={styles.modalMain}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 18,
              }}>
              <Text style={[styles.nameText]}>
                {newTranslation?.areYouSureYouWantToLogout} ?{'\n'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '45%'}}>
                <Button
                  title={newTranslation?.no}
                  onPress={() => setShowLogOutPopUp(false)}
                  color="#28a745"
                />
              </View>
              <View style={{width: '45%'}}>
                <Button
                  title={newTranslation?.yes}
                  onPress={handleLogOut}
                  color="#dc3545"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  main: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },
  nameText: {
    fontFamily: 'Noto Sans',
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  mainHeading: {
    color: '#0F0C0C',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Nato Sans',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginLeft: -5,
    marginBottom: 30,
  },
  myPic: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  bedge: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: 75,
    left: '60%',
  },
  smallText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
    textAlign: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: '500',
    fontFamily: 'Nato Sans',
    color: '#000',
    marginBottom: 5,
  },
  welderText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
    color: '#000',
  },
  editText: {
    color: '#5F90CA',
    borderBottomColor: '#5F90CA',
    borderBottomWidth: 1,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  },
  clickText: {
    textAlign: 'center',
    color: '#5F90CA',
    borderBottomColor: '#5F90CA',
    borderBottomWidth: 1,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 22,
    fontFamily: 'Nato Sans',
    marginBottom: 20,
  },
  navItem: {
    flexDirection: 'row',
    borderBottomColor: '#B3B3B3',
    borderBottomWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  navText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
    color: 'black',
    marginLeft: 3,
  },
  logout: {
    fontSize: 13,
    position: 'relative',
    top: 3,
    fontWeight: '500',
    fontFamily: 'Nato Sans',
    color: 'maroon',
  },
  modalMain: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    width: 350,
    borderColor: '#CCC',
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
});
