import {StyleSheet, ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getListOfAppliedCourse} from "../services/institute.service";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryGola from '../components/CountryGola';
import CourseGola from '../components/CourseGola';
const AppliedCourseList = props => {
  const[appliedCourse, setAppliedCourse]=useState([])
  const getAppliedCourseList = async() => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getListOfAppliedCourse(JSON.parse(user).access_token);
      if(response.msg=="Applied courses list retrieved successfully!"){
        setAppliedCourse(response.applied_courses);
      }
    } catch (error) {}
  };
  useFocusEffect(
    React.useCallback(() => {
      getAppliedCourseList();
    }, []),
  );
  return (
    <View style={styles.main}>
      <Text style={styles.hraName}>
        List of course you have applied earlier.
      </Text>
      <ScrollView>
        {appliedCourse?.map((v, i)=>{
          return(
            <CourseGola value={v} props={props} isApplied={true}/>
          )
        })}
      </ScrollView>
    </View>
  );
};

export default AppliedCourseList;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    padding: 18,
    flex: 1,
  },
  hraName: {
    fontSize: 16,
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    color: '#000',
    marginBottom:15
  },
});
