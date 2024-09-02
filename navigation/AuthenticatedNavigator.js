import {StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import Home from '../screens/Home';
import MyProfile from '../screens/MyProfile';
import JobApplied from '../screens/JobApplied';
import MyDocument from '../screens/MyDocument';
import Notifications from '../screens/Notifications';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RightNav from '../components/RightNav';
import SavedJobs from '../screens/SavedJobs';
import SavedVideo from '../screens/SavedVideo';
import Help from '../screens/Help';
import {useGlobalState} from '../GlobalProvider';
import JobsByCategory from '../screens/JobsByCategory';
import JobsByCountry from '../screens/JobsByCountry';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NewsFeed from '../screens/NewsFeed';
import FooterNav from '../components/FooterNav';
import JobSubMenu from '../components/JobSubMenu';
import VideoInput from '../components/VideoInput';
import BuildProfile from '../screens/BuildProfile';
import YourHra from '../screens/YourHra';
import GetCertificate from '../screens/GetCertificate';
import NeedMigrationLoan from '../screens/NeedMigrationLoan';
import CustomDrawerContent from './CustomDrawerContent';
import VideoScreen from '../screens/VideoScreen';
import FavrouiteJob from '../screens/FavrouiteJob';
import AppliedJob from '../components/AppliedJob';

import DetailedHra from '../screens/DetailedHra';
import MedicalTest from '../screens/MedicalTest';
import ApplyPcc from '../screens/ApplyPcc';
import Support from '../screens/Support';
import CandidateDetails2 from '../screens/CandidateDetails2';
import AppliedJobById from '../screens/AppliedJobById';
import EditProfile from '../screens/EditProfile';
// import JobById from '../screens/JobById';
import GetInstituteById from '../screens/GetInstituteById';
import GetCourseById from '../screens/GetCourseById';
import AppliedCourseList from '../screens/AppliedCourseList';
import MyCertificate from '../screens/MyCertificate';
import JobDetailedScreen from '../screens/JobDetailedScreen';
import React, {useEffect} from 'react';
import {getProfileStrength, getNotification} from '../services/user.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExperienceScreen from '../screens/ExperienceScreen';
import {useFocusEffect} from '@react-navigation/native';
import ReviewForHra from '../screens/ReviewForHra';
import ReviewForInstitute from '../screens/ReviewForInstitute';
import CustomCv from '../screens/CustomCv';
import Covid from '../screens/Covide';
import HighestEducation from '../screens/HighestEducatuin';
import OtherDocPrev from '../screens/OtherDocPrev';
import Dl_list from '../screens/Dl_list';
import Career from '../screens/Career';
import CreateGraph from '../screens/CreateGraph';
import LanguageTraining from '../screens/LanguageTraining';
import SelectTrainingOccu from '../screens/SelectTrainingOccu';
import Phase1 from '../screens/Phase1';
// import Assignment1 from '../screens/Assignment1';
import VoiceToText from '../components/VoiceToText';
import Phase2 from '../screens/Phase2';
import Assignment2 from '../screens/Assignment2';
import TradeInstituteList from '../screens/TradeInstituteList';
import TradeCenterDetail from '../screens/TradeCenterDetail';
import TestById from '../screens/TestById';
import Phase3 from '../screens/Phase3';
import SelectBaseAccentLanguage from '../screens/SelectBaseAccentLanguage';

const Drawer = createDrawerNavigator();

const AuthenticatedNavigator = ({fcmToken}) => {
  const {translation, newTranslation, globalState, setGlobalState} =
    useGlobalState();
  const getProfileStrengthFunc = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getProfileStrength(JSON.parse(user).access_token);
      if (
        response?.data.msg == 'Some fields are empty' ||
        response?.data.msg ==
          'Profile strength calculated successfully and updated in records'
      ) {
        setGlobalState({...globalState, profileStrength: response?.data});
      }
    } catch (error) {
      console.log('NEW', error);
    }
  };

  useEffect(() => {
    getProfileStrengthFunc();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={Home}
          options={({navigation, route}) => ({
            title: newTranslation?.home,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="MyProfile"
          component={MyProfile}
          options={({navigation, route}) => ({
            title: newTranslation?.myProfile,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Upload Video"
          component={VideoScreen}
          options={({navigation, route}) => ({
            title: newTranslation?.myVideos,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Improve Profile"
          component={BuildProfile}
          options={({navigation, route}) => ({
            title: newTranslation?.improveYourProfile,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="News Feed"
          component={NewsFeed}
          options={({navigation, route}) => ({
            title: newTranslation?.newsFeed,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Favourite Job"
          component={FavrouiteJob}
          options={({navigation, route}) => ({
            title: newTranslation?.favouriteJob,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Saved Jobs"
          component={SavedJobs}
          options={({navigation, route}) => ({
            title: newTranslation?.savedJobs,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Applied Job"
          component={JobApplied}
          options={({navigation, route}) => ({
            title: newTranslation?.appliedJobs,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Your HRA"
          component={YourHra}
          options={({navigation, route}) => ({
            title: newTranslation?.yourHra,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Notifications"
          component={Notifications}
          options={({navigation, route}) => ({
            title: 'Notifications',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="DetailedHra"
          component={DetailedHra}
          options={({navigation, route}) => ({
            title: newTranslation?.yourHra,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Jobs By Department"
          component={JobsByCategory}
          options={({navigation, route}) => ({
            title: newTranslation?.JobsByDepartment,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Jobs By Country"
          component={JobsByCountry}
          options={({navigation, route}) => ({
            title: newTranslation?.jobsByCountry,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Apply Medical Test"
          component={MedicalTest}
          options={({navigation, route}) => ({
            title: 'Apply Medical Test',
            headerShown: false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Apply PCC"
          component={ApplyPcc}
          options={({navigation, route}) => ({
            title: 'Apply PCC',
            headerShown: false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Apply Passport"
          component={ApplyPcc}
          options={({navigation, route}) => ({
            title: 'Apply Passport',
            headerShown: false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Get Certificate"
          component={GetCertificate}
          options={({navigation, route}) => ({
            title: 'Get Certificate',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Need Migration Loan"
          component={NeedMigrationLoan}
          options={({navigation, route}) => ({
            title: 'Need Migration Loan',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Contact Us"
          component={Help}
          options={({navigation, route}) => ({
            title: '',
            headerShown: false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Support"
          component={Support}
          options={({navigation, route}) => ({
            title: 'Support',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Applied Job By Id"
          component={AppliedJobById}
          options={({navigation, route}) => ({
            title: '',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Edit Profile"
          component={EditProfile}
          options={({navigation, route}) => ({
            title: newTranslation?.editProfile,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Get Institute By Id"
          component={GetInstituteById}
          options={({navigation, route}) => ({
            title: newTranslation?.trainingInstitute,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Get Course By Id"
          component={GetCourseById}
          options={({navigation, route}) => ({
            title: newTranslation?.courseDetails,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Applied Courses"
          component={AppliedCourseList}
          options={({navigation, route}) => ({
            title: newTranslation?.appliedCourse,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="My Documents"
          component={MyDocument}
          options={({navigation, route}) => ({
            title: newTranslation?.myDocuments,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="My Certificates"
          component={MyCertificate}
          options={({navigation, route}) => ({
            title: newTranslation?.myCertificate,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Job Details"
          component={JobDetailedScreen}
          options={({navigation, route}) => ({
            title: newTranslation?.jobDetails,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="My Experience"
          component={ExperienceScreen}
          options={({navigation, route}) => ({
            title: newTranslation?.myExperience,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Hra review"
          component={ReviewForHra}
          options={({navigation, route}) => ({
            title: 'HRA Reviews',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Institute review"
          component={ReviewForInstitute}
          options={({navigation, route}) => ({
            title: 'Institute Reviews',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Custom CV"
          component={CustomCv}
          options={({navigation, route}) => ({
            title: 'Custom CV',
            headerShown: false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Covid"
          component={Covid}
          options={({navigation, route}) => ({
            title: 'Covid',
            headerShown: false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Highest Education"
          component={HighestEducation}
          options={({navigation, route}) => ({
            title: 'Covid',
            headerShown: false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Other Doc Prev"
          component={OtherDocPrev}
          options={({navigation, route}) => ({
            title: 'Other Documents',
            headerShown: false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Dl_list"
          component={Dl_list}
          options={({navigation, route}) => ({
            title: 'Driving License',
            // headerShown:false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Career Graph"
          component={Career}
          options={({navigation, route}) => ({
            title: 'Career Graph',
            // headerShown:false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Create Career"
          component={CreateGraph}
          options={({navigation, route}) => ({
            title: 'Create Career',
            // headerShown:false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Language Training"
          component={LanguageTraining}
          options={({navigation, route}) => ({
            title: 'Language Training',
            headerShown: false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Select Training Occu"
          component={SelectTrainingOccu}
          options={({navigation, route}) => ({
            title: 'Select Training Occupation',
            headerShown: false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Phase 1"
          component={Phase1}
          options={({navigation, route}) => ({
            title: 'Phase 1',
            headerShown: false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Phase 2"
          component={Phase2}
          options={({navigation, route}) => ({
            title: 'Phase 2',
            headerShown: false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Phase 3"
          component={Phase3}
          options={({navigation, route}) => ({
            title: 'Phase 3',
            headerShown: false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Assignment 1"
          component={VoiceToText}
          options={({navigation, route}) => ({
            title: 'Assignment 1',
            headerShown: false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Assignment 2"
          component={Assignment2}
          options={({navigation, route}) => ({
            title: 'Assignment 2',
            headerShown: false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Trade Institute"
          component={TradeInstituteList}
          options={({navigation, route}) => ({
            title: 'Trade Testing',
            headerShown: true,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Trade Institute Detail"
          component={TradeCenterDetail}
          options={({navigation, route}) => ({
            title: 'Trade Center',
            headerShown: true,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Trade Test Details"
          component={TestById}
          options={({navigation, route}) => ({
            title: 'Trade Test Details',
            headerShown: true,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Select Base Accent Language"
          component={SelectBaseAccentLanguage}
          options={({navigation, route}) => ({
            title: 'Select Base Accent Language',
            headerShown: false,
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        {/* Add more screens as needed */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticatedNavigator;
