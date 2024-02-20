import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React,{useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {getOccupations, getJobByDepartment, getJobByCountry} from '../services/job.service';
import FooterNav from '../components/FooterNav';
import SearchResult from '../components/SearchResult';
import Toast from 'react-native-toast-message';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import {useFocusEffect} from '@react-navigation/native';
const JobsByCountry = (props) => {
  const route = useRoute();
  useAndroidBackHandler(() => {
    props.navigation.navigate('Home');
    return true;
  });
  const {countryId, countryName} = route.params;
  const [jobList, setJobList] = useState([]);
  const getJobsByCountryFunc = async () => {
    try {
      let response = await getJobByCountry(countryId);
      setJobList(response?.data?.jobs);
    } catch (error) {}
  };
  useFocusEffect(
    React.useCallback(() => {
      getJobsByCountryFunc();
    }, [countryId]),
  );
  return (
    <>
      <ScrollView style={{flex:1, backgroundColor:"#fff"}}>
        <View style={{padding: 15, marginBottom:50,}}>
          <Text style={{fontSize:18,  marginBottom:15}}>Location: <Text style={{color:"#000"}}>{countryName}</Text></Text>
          {jobList?.map((value, i) => {
            return (
              <SearchResult  backTo="Jobs By Country" value={value} props={props} countryId={countryId} countryName={countryName}/>
            );
          })}
        </View>
      </ScrollView>
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default JobsByCountry;

const styles = StyleSheet.create({});
