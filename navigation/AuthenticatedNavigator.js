import {StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import CandidateDetails from '../screens/CandidateDetails';
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
import Video from '../screens/Video';
import FavrouiteJob from '../screens/FavrouiteJob';
import AppliedJob from '../components/AppliedJob';

import DetailedHra from '../screens/DetailedHra';
import MedicalTest from '../screens/MedicalTest';
import ApplyPcc from '../screens/ApplyPcc';
const Drawer = createDrawerNavigator();
const AuthenticatedNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="Feed"
          component={NewsFeed}
          options={({navigation, route}) => ({
            title: 'Home',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen name="MyProfile" component={MyProfile} />
        <Drawer.Screen
          name="Upload Video"
          component={Video}
          options={({navigation, route}) => ({
            title: 'My Videos',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Improve Profile"
          component={BuildProfile}
          options={({navigation, route}) => ({
            title: 'Improve Profile',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Search Job"
          component={Home}
          options={({navigation, route}) => ({
            title: 'Search Job',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Favourite Job"
          component={FavrouiteJob}
          options={({navigation, route}) => ({
            title: 'Favourite Job',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Saved Jobs"
          component={SavedJobs}
          options={({navigation, route}) => ({
            title: 'Saved Jobs',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Applied Job"
          component={JobApplied}
          options={({navigation, route}) => ({
            title: 'Applied Jobs',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Your HRA"
          component={YourHra}
          options={({navigation, route}) => ({
            title: 'Your HRA',
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
            title: 'Your HRA',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Jobs By Department"
          component={JobsByCategory}
          options={({navigation, route}) => ({
            title: 'Jobs By Department',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Jobs By Country"
          component={JobsByCountry}
          options={({navigation, route}) => ({
            title: 'Jobs By Country',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Apply Medical Test"
          component={MedicalTest}
          options={({navigation, route}) => ({
            title: 'Apply Medical Test',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        <Drawer.Screen
          name="Apply PCC"
          component={ApplyPcc}
          options={({navigation, route}) => ({
            title: 'Apply PCC',
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
            title: 'Contact Us',
            headerRight: () => <RightNav navigation={navigation} />,
          })}
        />
        {/* Add more screens as needed */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticatedNavigator;
