import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Button,
  Share,
} from 'react-native';
import Home from '../screens/Home';
import JobApplied from '../screens/JobApplied';
import Help from '../screens/Help';
import {useGlobalState} from '../GlobalProvider';
import NewsFeed from '../screens/NewsFeed';
import VideoInput from '../components/VideoInput';
import BuildProfile from '../screens/BuildProfile';
import YourHra from '../screens/YourHra';
import GetCertificate from '../screens/GetCertificate';
import NeedMigrationLoan from '../screens/NeedMigrationLoan';
import React,{useEffect, useState} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import FavrouiteJob from '../screens/FavrouiteJob';
import { useFocusEffect } from '@react-navigation/native';
import SavedJobs from '../screens/SavedJobs';
import MedicalTest from '../screens/MedicalTest';
import ApplyPcc from '../screens/ApplyPcc';
const CustomDrawerContent = (props) => {
  console.log(props.navigation.getState())
  const {navigation} = props
  const {globalState, setGlobalState} = useGlobalState();
  const [navItem, setNavItem] = useState([
    {
      title: 'Home',
      component: Home,
      name: 'Home',
      subMenu: [],
    },
    {
      title: 'Upload Video',
      component: VideoInput,
      name: 'Upload Video',
      subMenu: [],
    },
    {
      title: 'Improve Profile',
      component: BuildProfile,
      name: 'Improve Profile',
      subMenu: [],
    },
    {
      title: 'Jobs',
      subMenu: [
        {
          title: 'Favourite Job',
          component: FavrouiteJob,
          name: 'Favourite Job',
        },
        {
          title: 'Saved Job',
          component: SavedJobs,
          name: 'Saved Jobs',
        },
        {
          title: 'Application Status',
          component: JobApplied,
          name: 'Applied Job',
        },
      ],
    },
    {
      title: 'Your HRA',
      component: YourHra,
      name: 'Your HRA',
      subMenu: [],
    },
    {
      title: 'News Feed',
      component: NewsFeed,
      name: 'News Feed',
      subMenu: [],
    },

    {
      title: 'Get Certificate',
      component: GetCertificate,
      name: 'Get Certificate',
      subMenu: [],
    },
    {
      title: 'Apply Medical Test',
      component: MedicalTest,
      name: 'Apply Medical Test',
      subMenu: [],
    },
    {
      title: 'Apply PCC',
      component: ApplyPcc,
      name: 'Apply PCC',
      subMenu: [],
    },

    {
      title: 'Need Migration Loan',
      component: NeedMigrationLoan,
      name: 'Need Migration Loan',
      subMenu: [],
    },
    {
      title: 'Switch Language',
    },
    {
      title: 'Share with friends',
    },
    {
      title: 'Contact Us',
      component: Help,
      name: 'Contact Us',
      subMenu: [],
    },
  ]);
  const [showSubMnu, setShowSubmenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'https://play.google.com/store/apps/details?id=ai.overseas',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const [selectedScreen, setSelectedScreen] = useState('Home');
  const renderNavItem = () => {
    return navItem.map((v, i) => {
      if (v.title == 'Jobs') {
        return (
          <>
            <TouchableOpacity onPress={() => setShowSubmenu(!showSubMnu)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 18,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#334B5E',
                    fontSize: 16,
                    fontWeight: '500',
                    marginVertical: 10,
                  }}>
                  {v.title}
                </Text>
                {showSubMnu ? (
                  <Image source={require('../images/upArrow.png')} />
                ) : (
                  <Image source={require('../images/downArrow.png')} />
                )}
              </View>
            </TouchableOpacity>
            {showSubMnu && (
              <View style={{marginLeft: 15}}>
                {v.subMenu.map((value, i) => {
                  return (
                    <View style={selectedScreen == value.title && styles.navBox}>
                      <DrawerItem
                        key={i}
                        label={value.title}
                        style={{}}
                        onPress={() => {
                          setSelectedScreen(value.title);
                          setShowSubmenu(false)
                          navigation.navigate(value.name);
                        }}
                      />
                    </View>
                  );
                })}
              </View>
            )}
          </>
        );
      } else if (v.title == 'Switch Language') {
        return (
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 18,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#334B5E',
                  fontSize: 16,
                  fontWeight: '500',
                  marginVertical: 20,
                }}>
                {v.title}
              </Text>
              <Image
                source={require('../images/languageSelect.png')}
                style={{height: 25, marginTop: 5, width: 25, resizeMode:"contain"}}
              />
            </View>
          </TouchableOpacity>
        );
      } else if (v.title == 'Share with friends') {
        return (
          <TouchableOpacity onPress={onShare}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 18,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#334B5E',
                  fontSize: 16,
                  fontWeight: '500',
                  marginVertical: 10,
                }}>
                {v.title}
              </Text>
              <Image source={require('../images/shareIcon.png')} />
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <View style={selectedScreen == v?.title && styles.navBox}>
            <DrawerItem
              key={i}
              label={v.title}
              labelStyle={{
                color: '#334B5E',
                fontSize: 16,
                fontWeight: '500',
              }}
              onPress={() => {
                setSelectedScreen(v.name);
                navigation.navigate(v.name);
              }}
            />
          </View>
        );
      }
    });
  };
 
  useFocusEffect(
    React.useCallback(() => {
      renderNavItem()
      setSelectedScreen(props.navigation.getState().routeNames[props.navigation.getState().index])
    }, [props.navigation.getState()])
  );
  return (
    <>
      <DrawerContentScrollView>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MyProfile');
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
            {JSON.parse(globalState?.user)?.empData?.empPhoto == null ? (
              <Image
                source={require('../images/dummyUserProfile.jpg')}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              />
            ) : (
              <Image
                source={{
                  uri: JSON.parse(globalState?.user)?.empData?.empPhoto,
                }}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  marginRight: 10,
                }}
              />
            )}

            <View>
              <Text style={styles.userName}>
                {JSON.parse(globalState?.user)?.empData?.empName}
              </Text>
              <Text style={{color: '#00111F', fontSize: 11}}>
                Profile Strength {globalState?.profileStrength?.profileStrength}
                %
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {renderNavItem()}
        {/* Normal text in the drawer */}
        <Text style={styles.version}>App Version:v1.4.8</Text>
      </DrawerContentScrollView>
      <Modal transparent={false} visible={showModal} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={styles.main}>
            <View>
              <Text style={styles.languagetext}>
                Please select your language
              </Text>
              <Text style={styles.languagetext}>कृपया अपनी भाषा चुनें</Text>
              <Text style={styles.languagetext}>আপনার ভাষা নির্বাচন করুন</Text>
            </View>
            <View style={{marginTop: 20}}>
              <TouchableOpacity
                style={styles.selectBox}
                onPress={() => {
                  setShowModal(false);
                  setGlobalState({...globalState, selectedLanguage: 'english'});
                }}>
                <Text style={styles.textCenter}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.selectBox}
                onPress={() => {
                  setShowModal(false);
                  setGlobalState({...globalState, selectedLanguage: 'hindi'});
                }}>
                <Text style={styles.textCenter}>हिंदी </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.selectBox}
                onPress={() => {
                  setShowModal(false);
                  setGlobalState({...globalState, selectedLanguage: 'bangla'});
                }}>
                <Text style={styles.textCenter}>বাংলা</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: 250,
                marginTop: -15,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Button title="Close" onPress={() => setShowModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  version: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: 50,
  },
  navItem: {
    color: 'gray',
    fontSize: 14,
    letterSpacing: 0.2,
    fontWeight: '500',
    marginBottom: 10,
  },
  navBox: {
    backgroundColor: '#EFF8FF',
    marginHorizontal: 10,
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
    borderRadius: 10,
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
  userName: {
    color: '#000',
    fontWeight: '700',
    fontFamily: 'Noto Sans',
    fontSize: 13,
  },
});
