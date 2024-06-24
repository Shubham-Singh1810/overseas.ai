import {Button, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyCourse} from '../services/institute.service';
import {useGlobalState} from '../GlobalProvider';
const TestGola = ({value, props, isApplied, backTo}) => {
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
        position: 'top',
        text1: 'Something went wrong',
        visibilityTime: 3000, // Duration in milliseconds
      });
    }
  };
  const {newTranslation, translation} = useGlobalState();
  return (
    <View style={styles.main}>
      <Text
        style={{
          textAlign: 'right',
          color: 'green',
          fontSize: 12,
          marginVertical: 3,
        }}>
        {/* {newTranslation?.applyBefore} : {value?.submission_date} */}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 15,
        }}>
        {value?.course_image != 'https://overseas.ai/placeholder/course.jpg' ? (
          <Image
            source={{
              uri: value?.course_image,
            }}
            style={{
              height: 100,
              width: 150,
              borderRadius: 5,
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
              width: 150,
              borderRadius: 5,
              resizeMode: 'contain',
              borderWidth: 0.5,
              borderColor: 'gray',
            }}
          />
        )}
        <View style={{marginLeft: 15}}>
          <Text style={[styles.listText]}>{value?.course_name}</Text>
          <Text style={[styles.listText]}>
            {newTranslation?.duration} : {value?.course_duration}
          </Text>
          <Text style={[styles.listText]}>
            Total Seats : {value?.total_seats}
          </Text>
          <Text style={[styles.listText]}>
           Test Fees : {value?.course_fee}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 5,
        }}>
        {isApplied ? (
          <Text
            style={{
              paddingHorizontal: 10,
              borderWidth: 0.5,
              color: '#000',
              borderRadius: 4,
            }}>
            {value?.status == 0 && newTranslation?.applied}
            {value?.status == 1 && newTranslation?.selected}
            {value?.status == -1 && newTranslation?.rejected}
            {value?.status == 2 && newTranslation?.inProgress}
            {value?.status == 3 && newTranslation?.completed}
          </Text>
        ) : (
          <Pressable style={{width: '40%'}}>
            <Button
              title={
                value?.appliedStatus
                  ? newTranslation?.applied
                  : newTranslation?.apply
              }
            //   onPress={() => handleApplyCourse(value?.id)}
              color={value?.appliedStatus ? '#13C756' : '#035292'}
              style={{width: '50%'}}
            />
          </Pressable>
        )}

        <Pressable style={{width: '50%'}}>
          <Text
            style={[
              {textAlign: 'right', textDecorationLine: 'underline'},
              styles.clientLink,
            ]}
            onPress={() =>
              props.navigation.navigate('Trade Test Details', {
                CourseDetails: value,
                backTo: backTo,
              })
            }>
            {translation?.readDetails}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TestGola;

const styles = StyleSheet.create({
  main: {
    padding: 10,
    backgroundColor: '#fff',
    elevation: 10,
    borderWidth: 1,
    borderColor: '#F1F7FF',
    borderRadius: 5,
    marginVertical: 8,
  },
  listText: {
    color: '#000',
    fontSize: 15,
    fontWeight: 400,
  },
  clientLink: {
    fontSize: 16,
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    color: '#1877F2',
    textDecorationLine: 'underline',
  },
});
