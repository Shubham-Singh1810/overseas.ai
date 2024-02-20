import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React,{useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {getOccupations, getJobByDepartment} from '../services/job.service';
import FooterNav from '../components/FooterNav';
import SearchResult from '../components/SearchResult';
import Toast from 'react-native-toast-message';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
const JobsByCategory = props => {
  const route = useRoute();
  useAndroidBackHandler(() => {
    props.navigation.navigate('Search Job');
    return true;
  });
  const {departmentId, departmentName} = route.params;
  const [jobList, setJobList] = useState([]);
  const getJobsByDetartmentFunc = async () => {
    try {
      let response = await getJobByDepartment(departmentId);
      setJobList(response?.data?.jobs);
    } catch (error) {}
  };
  
  useFocusEffect(
    React.useCallback(() => {
      getJobsByDetartmentFunc();
    }, [departmentId]),
  );
  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{padding: 15, marginBottom: 50}}>
          <Text style={{fontSize: 18, marginBottom: 15}}>
            Occupation: <Text style={{color: '#000'}}>{departmentName}</Text>
          </Text>
          {jobList?.map((value, i) => {
            return <SearchResult value={value} props={props} backTo="Jobs By Department" departmentName={departmentName} departmentId={departmentId}/>;
          })}
        </View>
      </ScrollView>
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default JobsByCategory;

const styles = StyleSheet.create({});
