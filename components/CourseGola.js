import {Button, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyCourse} from '../services/institute.service';
const CourseGola = ({value, props, isApplied}) => {
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
  return (
    <View style={styles.main}>
      
      <Text
        style={{
          textAlign: 'right',
          color: 'red',
          fontSize: 12,
          marginVertical: 3,
        }}>
        Submit Till : {value?.submission_date}
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
            Duration : {value?.course_duration}
          </Text>
          <Text style={[styles.listText]}>
            Exam Mode : {value?.assessment_type}
          </Text>
          <Text style={[styles.listText]}>
            Course Type : {value?.course_type}
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
          <Text style={{paddingHorizontal:10, borderWidth:0.5, color:"#000", borderRadius:4}}>
            {value?.status==0 && "Applied"}
            {value?.status==1 && "Selected"}
            {value?.status==-1 && "Rejected"}
            {value?.status==2 && "In Progress"}
            {value?.status==3 && "Completed"}
          </Text>
        ) : (
          <Pressable style={{width: '40%'}}>
            <Button
              title= {value?.appliedStatus ? "Applied": 'Apply'}
              color= {value?.appliedStatus ? "#13C756": "#035292"}
              style={{width: '50%'}}
              onPress={() => handleApplyCourse(value?.id)}
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
              props.navigation.navigate(
                'Get Course By Id',
                (CourseDetails = value),
              )
            }>
            Learn More
          </Text>
        </Pressable>
      </View>
      
    </View>
  );
};

export default CourseGola;

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
