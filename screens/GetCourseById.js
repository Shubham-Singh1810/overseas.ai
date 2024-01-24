import {StyleSheet, Text, View, Image, Pressable, Modal,Button} from 'react-native';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyCourse} from '../services/institute.service';
import WebView from 'react-native-webview';
const GetCourseById = props => {
  const courseDetails = props?.route?.params;
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
  return (
    <View style={styles.main}>
      <View>
        <Text
          style={{
            textAlign: 'right',
            color: 'red',
            fontSize: 12,
            marginVertical: 3,
          }}>
          Submit Till : {courseDetails?.submission_date}
        </Text>
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
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={styles.title}>{courseDetails?.course_name}</Text>
            <Text
              style={[
                styles.tableText,
                {
                  borderWidth: 0.5,
                  paddingHorizontal: 6,
                  borderRadius: 5,
                  borderColor: 'green',
                },
              ]}>
              Course Fee : {courseDetails?.course_fee} &#8377;
            </Text>
          </View>

          <View style={styles.otherDetailsContainer}>
            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>Duration</Text>
              <Text style={[styles.tableText]}>
                {courseDetails?.course_duration}
              </Text>
            </View>
            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>Exam Mode</Text>
              <Text style={[styles.tableText]}>
                {courseDetails?.assessment_type}
              </Text>
            </View>
            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>Course Type</Text>
              <Text style={[styles.tableText]}>
                {courseDetails?.course_type}
              </Text>
            </View>

            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>Eligibility</Text>
              <Text style={[styles.tableText]}>
                {courseDetails?.eligibility}
              </Text>
            </View>
            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>Institute</Text>
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
              <Text style={[styles.tableText]}>Total Seats</Text>
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
            {courseDetails?.status == 0 && 'Applied'}
            {courseDetails?.status == 1 && 'Selected'}
            {courseDetails?.status == -1 && 'Rejected'}
            {courseDetails?.status == 2 && 'In Progress'}
            {courseDetails?.status == 3 && 'Completed'}
          </Text>
        ) : (
          <Pressable style={{width: '100%', marginTop:20, marginBottom: 25}}>
            <Button
              title={courseDetails?.appliedStatus ? 'Applied' : 'Apply'}
              color={courseDetails?.appliedStatus ? '#13C756' : '#035292'}
              style={{width: '50%'}}
              onPress={() => handleApplyCourse(courseDetails?.id)}
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
  );
};

export default GetCourseById;

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
    fontSize: 23,
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
