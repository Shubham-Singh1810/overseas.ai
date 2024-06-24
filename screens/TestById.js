import {StyleSheet, Text, View, Image, Pressable, Modal,Button} from 'react-native';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyCourse} from '../services/institute.service';
import WebView from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import { ScrollView } from 'react-native-gesture-handler';
import { useGlobalState } from '../GlobalProvider';
const TestById = props => {
  useAndroidBackHandler(() => {
    props.navigation.navigate(props?.route?.params.backTo);
    return true;
  });
  const {newTranslation} = useGlobalState()
  const[courseDetails, setCourseDetails]=useState(props?.route?.params?.CourseDetails)
  // const courseDetails = props?.route?.params;
  const [showWebsite, setShowWebsite] = useState(false);
  const handleApplyCourse = async id => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await applyCourse({
        id: id,
        access_token: JSON.parse(user).access_token,
      });
      if (response?.message == 'Application submitted successfully!') {
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: response?.message,
          visibilityTime: 3000, // Duration in milliseconds
        });
      } else if (
        response?.message == 'You have already applied for this course.'
      ) {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'You have already applied for this course.',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error', // 'success', 'error', 'info', or any custom type you define
        position: 'bottom',
        text1: 'Something went wrong',
        visibilityTime: 3000, // Duration in milliseconds
      });
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      setCourseDetails(props?.route?.params?.CourseDetails);
    }, [props?.route?.params]),
  );
  return (
    <ScrollView style={styles.main}>
       <View >
      <View>
        
        <View style={{marginVertical: 15}}>
          {courseDetails?.course_image !=
          'https://overseas.ai/placeholder/course.jpg' ? (
            <Image
              source={{
                uri: courseDetails?.course_image,
              }}
              style={{height: 220, width: '100%'}}
            />
          ) : (
            <Image
              source={require('../images/hraDummyIcon.png')}
              style={{height: 220, width: '100%'}}
            />
          )}

          <View
            style={{
              marginVertical: 20,
              // justifyContent: 'space-between',
              // alignItems: 'center',
              // flexDirection: 'row',
              
            }}>
            <Text style={[styles.title]}>{courseDetails?.course_name}</Text>
            <View style={{flexDirection:"row", justifyContent:"flex-end"}}>
            <Text
              style={[
                styles.tableText,
                {
                  borderWidth: 0.5,
                  paddingHorizontal: 6,
                  borderRadius: 5,
                  borderColor: 'green',
                  marginTop:15,
                },
              ]}>
              Test Fee : {courseDetails?.course_fee} &#8377;
            </Text>
            </View>
            
          </View>

          <View style={styles.otherDetailsContainer}>
            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>{newTranslation?.duration}</Text>
              <Text style={[styles.tableText]}>
                {courseDetails?.course_duration}
              </Text>
            </View>
            {/* <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>{newTranslation?.examMode}</Text>
              <Text style={[styles.tableText]}>
                {courseDetails?.assessment_type}
              </Text>
            </View> */}
            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>Video Graphy Facility</Text>
              <Text style={[styles.tableText]}>
                {courseDetails?.videographyAvlQ}
              </Text>
            </View>

            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>{newTranslation?.eligibility}</Text>
              <Text style={[styles.tableText]}>
                {courseDetails?.eligibility?.substring(0, 30)}
                {courseDetails?.eligibility?.length>30 && "..."}
              </Text>
            </View>
            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>{newTranslation?.institute}</Text>
              <Pressable onPress={()=>setShowWebsite(true)}>
                <Text
                  style={[styles.tableText, {textDecorationLine: 'underline'}]}>
                  {courseDetails?.institute_details?.instituteName}
                </Text>
              </Pressable>
            </View>
            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>{newTranslation?.totalSeats}</Text>
              <Text style={[styles.tableText]}>
                {courseDetails?.total_seats}
              </Text>
            </View>
          </View>
        </View>
        {courseDetails?.status ? (
          <Text
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderWidth: 0.5,
              fontSize: 20,
              textAlign: 'center',
              color: '#000',
              borderRadius: 4,
            }}>
            {courseDetails?.status == 0 && newTranslation?.applied}
            {courseDetails?.status == 1 && newTranslation?.selected}
            {courseDetails?.status == -1 && newTranslation?.rejected}
            {courseDetails?.status == 2 && newTranslation?.inProgress}
            {courseDetails?.status == 3 && newTranslation?.completed}
          </Text>
        ) : (
          <Pressable style={{width: '100%', marginTop:20, marginBottom: 25}}>
            <Button
              title={courseDetails?.appliedStatus ? newTranslation?.applied : newTranslation?.apply}
              color={courseDetails?.appliedStatus ? '#13C756' : '#035292'}
              style={{width: '50%'}}
              // onPress={() => handleApplyCourse(courseDetails?.id)}
            />
          </Pressable>
        )}
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
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
          <WebView source={{uri: courseDetails?.institute_details?.insWebLink}} style={{flex: 1}} />
        </View>
      </Modal>
    </View>
    </ScrollView>
   
  );
};

export default TestById;

const styles = StyleSheet.create({
  main: {
    padding: 18,
    backgroundColor: 'white',
    flex: 1,
  },
  flex: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: '500',
    color: '#000',
    fontSize: 20,
  },

  listText: {
    color: '#000',
    fontSize: 17,
    fontWeight: '400',
  },
  clientLink: {
    fontSize: 16,
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    color: '#1877F2',
    textDecorationLine: 'underline',
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
});
