import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import WebView from 'react-native-webview';
import CountryGola from '../components/CountryGola';
import CourseGola from '../components/CourseGola';
import {getCourseByInstitute} from '../services/institute.service';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const GetInstituteById = props => {
  const {params} = props.route;
  const [showWebsite, setShowWebsite] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const getCourseByInstituteFunc = async instId => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getCourseByInstitute({
        instId: instId,
        access_token: JSON.parse(user).access_token,
      });
      if (response?.msg == 'Courses retrieved successfully!') {
        setCourseList(response?.data);
      }
    } catch (error) {
      console.log('Something went wrong');
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getCourseByInstituteFunc(params?.id);
    }, []),
  );
  return (
    <View style={styles.main}>
      <View style={[styles.flex, {alignItems: 'center'}]}>
        <View style={{marginRight: 15}}>
          {params?.profileImageUrl != null ? (
            <Image
              source={{
                uri: params?.profileImageUrl,
              }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                resizeMode: 'contain',

                borderWidth: 0.5,
                borderColor: 'gray',
              }}
            />
          ) : (
            <Image
              source={require('../images/hraDummyIcon.png')}
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                resizeMode: 'contain',

                borderWidth: 0.5,
                borderColor: 'gray',
              }}
            />
          )}
          <Pressable onPress={() => setShowWebsite(true)}>
            <Text
              style={{
                textAlign: 'center',
                textDecorationLine: 'underline',
                marginVertical: 5,
                color: '#035292',
              }}>
              Vist Web
            </Text>
          </Pressable>
        </View>

        <View>
          <View style={[styles.flex, {alignItems: 'center'}]}>
            <Text style={styles.hraName}>{params?.instituteName}</Text>
          </View>

          <View style={[styles.flex, {alignItems: 'center'}]}>
            <Text style={styles.countryName}>{params?.phone}</Text>
          </View>
          <Text style={styles.countryName}>{params?.email}</Text>
          <View style={[styles.flex, {alignItems: 'center'}]}>
            <Text style={styles.lightText}>Since {params?.insSince}</Text>
          </View>
        </View>
      </View>

      <ScrollView >
        <View style={{marginVertical: 20}}>
          <View style={styles.otherDetailsContainer}>
            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>Address</Text>
              <Text style={[styles.tableText]}>{params?.insAddress}</Text>
            </View>
            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>Affliated By</Text>
              <Text style={[styles.tableText]}>{params?.affilatedBy}</Text>
            </View>
            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>Registration No.</Text>
              <Text style={[styles.tableText]}>{params?.insRegNo}</Text>
            </View>
          </View>
        </View>
        <View style={{marginVertical: 20}}>
          <Text style={[styles.hraName]}>
            Course provided by Institute : <Text>12</Text>
          </Text>
        </View>
        {courseList?.map((v, i) => {
          return <CourseGola />;
        })}
      </ScrollView>

      <Modal transparent={false} visible={showWebsite} animationType="slide">
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <Pressable
            style={{
              backgroundColor: 'white',
              padding: 18,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => setShowWebsite(false)}>
            <Image source={require('../images/backIcon.png')} />
            <Text
              style={{
                textDecorationLine: 'underline',
                color: '#035292',
                fontWeight: '700',
              }}>
              Back
            </Text>
          </Pressable>
          <WebView source={{uri: params?.insWebLink}} style={{flex: 1}} />
        </View>
      </Modal>
    </View>
  );
};

export default GetInstituteById;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  flex: {
    flexDirection: 'row',
  },
  hraName: {
    fontSize: 16,
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    color: '#000',
    marginRight: 3,
  },
  countryName: {
    fontSize: 12,
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    color: '#000',
  },
  lightText: {
    fontSize: 10,
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    color: '#6F6F6F',
  },
  button: {
    backgroundColor: '#035292',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
  },
  otherDetailsContainer: {
    backgroundColor: '#F1F7FF',
    paddingVertical: 10,
  },
  tableItemPadding: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#A6A6A6',
  },
  tableText: {
    fontSize: 14,
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    color: '#000',
  },
  clientLink: {
    fontSize: 16,
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    color: '#1877F2',
    textDecorationLine: 'underline',
  },
});
