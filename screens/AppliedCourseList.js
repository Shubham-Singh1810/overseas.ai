import {StyleSheet, ScrollView, Text, View, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getListOfAppliedCourse} from "../services/institute.service";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryGola from '../components/CountryGola';
import CourseGola from '../components/CourseGola';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import { useGlobalState } from '../GlobalProvider';
const AppliedCourseList = props => {
  useAndroidBackHandler(() => {
    if(props?.route?.params.backTo){
      props.navigation.navigate(props?.route?.params.backTo);
      return true;
    }else{
      props.navigation.navigate("Home") 
      return true;
    }
  });
  const {newTranslation} = useGlobalState()
  const[loading,setLoading]=useState(true)
  const[appliedCourse, setAppliedCourse]=useState([])
  const getAppliedCourseList = async() => {
    setLoading(true)
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getListOfAppliedCourse(JSON.parse(user).access_token);
      if(response.msg=="Applied courses list retrieved successfully!"){
        setAppliedCourse(response?.applied_courses);
        setLoading(false)
      }
    } catch (error) {}
    setLoading(false)
  };
  useFocusEffect(
    React.useCallback(() => {
      getAppliedCourseList();
    }, []),
  );
  return (
    <View style={styles.main}>
      <Text style={styles.hraName}>
        {newTranslation.listofcourseyouhaveappliedearlier}
      </Text>
      <ScrollView>
        {loading? <View style={{height:500, justifyContent:"center", alignItems:"center"}}><ActivityIndicator size="large"/></View>: appliedCourse?.map((v, i)=>{
          return(
            <CourseGola value={v} props={props} isApplied={true} backTo="Applied Courses"/>
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
