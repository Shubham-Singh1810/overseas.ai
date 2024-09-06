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
import {getNotification} from '../services/user.service';
import JobApplied from '../screens/JobApplied';
import Help from '../screens/Help';
import {useGlobalState} from '../GlobalProvider';
import NewsFeed from '../screens/NewsFeed';
import VideoInput from '../components/VideoInput';
import BuildProfile from '../screens/BuildProfile';
import YourHra from '../screens/YourHra';
import GetCertificate from '../screens/GetCertificate';
import NeedMigrationLoan from '../screens/NeedMigrationLoan';
import React, {useState, useEffect} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import FavrouiteJob from '../screens/FavrouiteJob';
import {useFocusEffect} from '@react-navigation/native';
import SavedJobs from '../screens/SavedJobs';
import MedicalTest from '../screens/MedicalTest';
import ApplyPcc from '../screens/ApplyPcc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PassportApply from '../screens/PassportApply';
import LanguageSplash from '../screens/LanguageTraining/LanguageSplash';
import {storeAppTime} from '../services/user.service';
const CustomDrawerContent = props => {
  const {navigation} = props;
  const {globalState, newTranslation, setGlobalState} = useGlobalState();
  const [navItem, setNavItem] = useState([
    {
      title: 'Home',
      hindiName: 'होम',
      banglaName: 'হোম',
      component: Home,
      name: 'Home',
      subMenu: [],
    },
    {
      title: 'Upload Video',
      hindiName: 'अपलोड वीडियो',
      banglaName: 'আপলোড ভিডিও',
      component: VideoInput,
      name: 'Upload Video',
      subMenu: [],
    },
    {
      title: 'Improve Profile',
      hindiName: 'प्रोफाइल बेहतर करे',
      banglaName: 'প্রোফাইল আপডেট করুন',
      component: BuildProfile,
      name: 'Improve Profile',
      subMenu: [],
    },
    {
      title: 'Jobs',
      hindiName: 'नौकरियां',
      banglaName: 'কাজের তালিকা',
      subMenu: [
        {
          title: 'Favourite Job',
          hindiName: 'पसंदीदा नौकरियां',
          banglaName: 'পছন্দের কাজ',
          component: FavrouiteJob,
          name: 'Favourite Job',
        },
        {
          title: 'Saved Job',
          hindiName: 'सेव नौकरियां',
          banglaName: 'সেভ করা কাজ',
          component: SavedJobs,
          name: 'Saved Jobs',
        },
        {
          title: 'Application Status',
          hindiName: 'आवेदन की स्थिति',
          banglaName: 'আবেদনপত্রের অবস্থা',
          component: JobApplied,
          name: 'Applied Job',
        },
      ],
    },
    {
      title: 'Your HRA',
      hindiName: 'आपका  एचआरए',
      banglaName: 'তোমার HRA',
      component: YourHra,
      name: 'Your HRA',
      subMenu: [],
    },
    {
      title: 'Language Training',
      hindiName: 'भाषा प्रशिक्षण',
      banglaName: 'ভাষা প্রশিক্ষণ',
      component: LanguageSplash,
      name: 'Language Splash', 
      subMenu: [],
    },
    {
      title: 'Get Certificate',
      hindiName: 'प्रमाणपत्र प्राप्त करें',
      banglaName: 'সার্টিফিকেট পান',
      component: GetCertificate,
      name: 'Get Certificate',
      subMenu: [],
    },
    {
      title: 'Trade Testing',
      hindiName: 'व्यापार परीक्षण',
      banglaName: 'ট্রেড টেস্টিং',
      component: YourHra,
      name: 'Trade Institute',
      subMenu: [],
    },
    {
      title: 'News Feed',
      hindiName: 'समाचार पढ़े',
      banglaName: 'খবর পড়ুন',
      component: NewsFeed,
      name: 'News Feed',
      subMenu: [],
    },
    {
      title: 'Apply Medical Test',
      hindiName: 'चिकित्सा परीक्षण करें',
      banglaName: 'মেডিকেল -এর আবেদন করুন',
      component: MedicalTest,
      name: 'Apply Medical Test',
      subMenu: [],
    },
    {
      title: 'Apply Passport',
      hindiName: 'पासपोर्ट के लिए आवेदन करें',
      banglaName: 'পাসপোর্ট -এর আবেদন করুন',
      component: PassportApply,
      name: 'Apply Passport',
      subMenu: [],
    },
    {
      title: 'Apply PCC',
      hindiName: 'पीसीसी के लिए आवेदन करें',
      banglaName: 'PCC-এর আবেদন করুন',
      component: ApplyPcc,
      name: 'Apply PCC',
      subMenu: [],
    },
    {
      title: 'Need Migration Loan',
      hindiName: 'प्रवासन ऋण की आवश्यकता है',
      banglaName: 'মাইগ্রেশন লোন প্রয়োজন',
      component: NeedMigrationLoan,
      name: 'Need Migration Loan',
      subMenu: [],
    },
    {
      title: 'Switch Language',
      hindiName: 'भाषा बदलें',
      banglaName: 'ভাষা পরিবর্তন করুন',
      translation: newTranslation?.home,
    },
    {
      title: 'Share with friends',
      hindiName: 'दोस्तों के साथ बांटें',
      banglaName: 'বন্ধুদের সাথে শেয়ার করুন',
      translation: newTranslation?.home,
    },
    {
      title: 'Contact Us',
      hindiName: 'संपर्क करें',
      banglaName: 'যোগাযোগ করুন',
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
  const [notificationList, setNotificationistList] = useState(null);
  const getNotificationFunc = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getNotification(JSON.parse(user).access_token);
      if (response.status == 200) {
        
        setNotificationistList(response.data);
      } else {
        console.warn('sdkfj');
      }
    } catch (error) {}
  };
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
                  {globalState?.selectedLanguage == 'english'
                    ? v.title
                    : globalState?.selectedLanguage == 'hindi'
                    ? v.hindiName
                    : v.banglaName}
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
                    <View
                      style={[selectedScreen == value.title && styles.navBox]}>
                      <DrawerItem
                        key={i}
                        label={
                          globalState?.selectedLanguage == 'english'
                            ? value.title
                            : globalState?.selectedLanguage == 'hindi'
                            ? value.hindiName
                            : value.banglaName
                        }
                        onPress={() => {
                          setSelectedScreen(value.title);
                          setShowSubmenu(false);
                          navigation.navigate(value.name);
                        }}
                      />
                      {value?.title == 'Application Status' && (
                        <View
                          style={{
                            backgroundColor: '#334B5E',
                            borderRadius: 7.5,
                            height: 15,
                            width: 15,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            right: 19,
                            top: 20,
                          }}>
                          <Text style={{color: 'white', fontSize: 10}}>
                            {notificationList?.notifications?.length}
                          </Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            )}
          </>
        );
      } else if (v.title == 'Improve Profile') {
        return (
          <TouchableOpacity>
            {globalState?.profileStrength ? (
              <DrawerItem
                key={i}
                label={
                  globalState?.selectedLanguage == 'english'
                    ? v.title
                    : globalState?.selectedLanguage == 'hindi'
                    ? v.hindiName
                    : v.banglaName
                }
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
            ) : (
              <DrawerItem
                key={i}
                label={v.title}
                labelStyle={{
                  color: '#334B5E',
                  fontSize: 16,
                  fontWeight: '500',
                }}
                onPress={() => {}}
              />
            )}
            <View
              style={{
                backgroundColor: '#334B5E',
                borderRadius: 7.5,
                height: 15,
                width: 15,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                right: 19,
                top: 20,
              }}>
              <Text style={{color: 'white', fontSize: 10}}>
                {
                  globalState?.profileStrength?.emptyFields?.filter?.(
                    (v, i) => {
                      return !v.complete;
                    },
                  ).length
                }
              </Text>
            </View>
          </TouchableOpacity>
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
                {
                globalState?.selectedLanguage == 'english'
                  ? v.title
                  : globalState?.selectedLanguage == 'hindi'
                  ? v.hindiName
                  : v.banglaName
              }
              </Text>
              <Image
                source={require('../images/languageSelect.png')}
                style={{
                  height: 25,
                  marginTop: 5,
                  width: 25,
                  resizeMode: 'contain',
                }}
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
                {globalState?.selectedLanguage == 'english'
                    ? v.title
                    : globalState?.selectedLanguage == 'hindi'
                    ? v.hindiName
                    : v.banglaName}
              </Text>
              <Image source={require('../images/shareIcon.png')} />
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <View style={selectedScreen === v?.title ? styles.navBox : null}>
            <DrawerItem
              key={i}
              label={
                globalState?.selectedLanguage == 'english'
                  ? v.title
                  : globalState?.selectedLanguage == 'hindi'
                  ? v.hindiName
                  : v.banglaName
              }
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
      renderNavItem();
      getNotificationFunc();
      setSelectedScreen(
        props.navigation.getState().routeNames[
          props.navigation.getState().index
        ],
      );
    }, [props.navigation.getState()]),
  );
//  store current time start 

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
          {screenType: selectedScreen, timeSpent},
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
    if (timeSpent >= 10) {
      setTimeSpentByUser(timeSpent);
    }
  }, [timeSpent]);
  return (
    <>
      <DrawerContentScrollView>
        <TouchableOpacity
          onPress={() => {
            globalState?.profileStrength?.profileStrength &&
              navigation.navigate('MyProfile', {selectedLanguage: globalState.selectedLanguage});
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
            {JSON.parse(globalState?.user)?.empData?.empPhoto == null ? (
              <Image
                source={require('../images/dummyUserProfile.jpg')}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  marginRight: 10,
                }}
              />
            ) : (
              <Image
                source={{
                  uri: JSON.parse(globalState?.user)?.empData?.empPhoto,
                }}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  marginRight: 10,
                }}
              />
            )}

            <View>
              <Text style={styles.userName}>
                {JSON.parse(globalState?.user)?.empData?.empName}
              </Text>
              <Text style={{color: '#00111F', fontSize: 12}}>
              {newTranslation?.profileStrength} {globalState?.profileStrength?.profileStrength}
                %
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{borderWidth: 0.4, height: 2, marginBottom: 10}}>
          <View
            style={{
              width: globalState?.profileStrength?.profileStrength
                ? globalState?.profileStrength?.profileStrength + '%'
                : '0%',
              backgroundColor:
                globalState?.profileStrength?.profileStrength < 30
                  ? '#dc3545'
                  : globalState?.profileStrength?.profileStrength > 70
                  ? '#079E3F'
                  : '#007BFF',
              height: 1.4,
            }}></View>
        </View>
        {renderNavItem()}
        {/* Normal text in the drawer */}
        <Text style={styles.version}>App Version:v2.2.1</Text>
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
    color:"black"
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
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
