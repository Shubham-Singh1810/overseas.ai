import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FooterNav from '../components/FooterNav';
import {useGlobalState} from '../GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MyProfile = props => {
  const {translation, globalState, setGlobalState} = useGlobalState();
  console.log(JSON.parse(globalState?.user)?.empData?.empPhoto);
  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setGlobalState({...globalState, user: null});
      console.log('User data removed from AsyncStorage.');
    } catch (error) {
      console.error('Error removing user data from AsyncStorage:', error);
    }
  };

  return (
    <>
      <ScrollView style={{backgroundColor:"white"}}>
        <View style={styles.main}>
          <View style={{flexDirection: 'row', marginBottom:15, alignItems: 'center'}}>
            <View>
              <View>
                {JSON.parse(globalState?.user)?.empData?.empPhoto == null ? (
                  <Image
                    source={require('../images/circle.png')}
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
                onPress={() => props.navigation.navigate('Edit Profile')}>
                <Text
                  style={{textDecorationLine: 'underline', color: '#035292', textAlign:"center"}}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.name}>
                {JSON.parse(globalState?.user)?.empData?.empName} (56%)
              </Text>
              <View style={{flexDirection:"row", marginTop:-6, marginBottom:3}}>
              <Image source={require("../images/starIcon.png")}/>
              <Image source={require("../images/starIcon.png")}/>
              <Image source={require("../images/starIcon.png")}/>
              <Image source={require("../images/starIcon.png")}/>
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
                }}>
                <Image
                  source={require('../images/greenPhoneIcon.png')}
                  style={{marginRight: 8}}
                />
                <Text style={styles.welderText}>
                  {JSON.parse(globalState?.user)?.empData?.empPhone}
                </Text>
              </View>
              
            </View>
          </View>
          <View>
            <View style={styles.navItem}>
              <Image
                resizeMode="contain"
                source={require('../images/careerGraph.png')}
                style={{height: 20, width: 20, marginRight: 10}}
              />
              <Text style={styles.navText}>{translation.myCareerGraph}</Text>
            </View>

            <Pressable
              onPress={() => props.navigation.navigate('Applied Courses')}>
              <View style={styles.navItem}>
                <Image
                  resizeMode="contain"
                  source={require('../images/capIcon.png')}
                  style={{height: 20, width: 20, marginRight: 10}}
                />
                <Text style={styles.navText}>{translation.coursesApplied}</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => props.navigation.navigate('Applied Job')}>
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
              onPress={() => props.navigation.navigate('My Documents')}>
              <View style={styles.navItem}>
                <Image
                  resizeMode="contain"
                  source={require('../images/documentIcon.png')}
                  style={{height: 20, width: 20, marginRight: 10}}
                />
                <Text style={styles.navText}>{translation.myDocuments}</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => props.navigation.navigate('Saved Jobs')}>
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
              onPress={() => props.navigation.navigate('Notifications')}>
              <View style={styles.navItem}>
                <Image
                  resizeMode="contain"
                  source={require('../images/notificationIcon.png')}
                  style={{height: 20, width: 20, marginRight: 10}}
                />
                <Text style={styles.navText}>{translation.notifications}</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => props.navigation.navigate('Contact Us')}>
              <View style={styles.navItem}>
                <Image
                  source={require('../images/helpIcon.png')}
                  resizeMode="contain"
                  style={{height: 20, width: 20, marginRight: 10}}
                />
                <Text style={styles.navText}>{translation.needHelp}</Text>
              </View>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 40,
            }}>
            <Text style={styles.logout} onPress={handleLogOut}>
              {translation.logOut}
            </Text>
            <Text>{translation.version} 5.8.0</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    padding: 10,
    flex:1
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
    height: 120,
    width: 120,
    borderRadius: 60,
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
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Montserrat',
    color: 'maroon',
  },
});
