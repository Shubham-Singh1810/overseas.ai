import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {getOccupations, getJobByDepartment} from '../services/job.service';
import FooterNav from '../components/FooterNav';
import SearchResult from '../components/SearchResult';
import JobByDepartmentGola from '../components/JobByDepartmentGola';
const JobsByCategory = () => {
  const route = useRoute();
  const {departmentId, departmentName} = route.params;
  const [jobList, setJobList] = useState([]);
  const getJobsByDetartmentFunc = async () => {
    try {
      let response = await getJobByDepartment(departmentId);
      setJobList(response?.data?.jobs?.data);
    } catch (error) {}
  };
  useEffect(() => {
    getJobsByDetartmentFunc();
  }, []);
  return (
    <>
      <ScrollView>
        <View style={{padding: 15, marginBottom:50}}>
          <Text style={{fontSize:18,  marginBottom:15}}>Occupation: <Text style={{color:"#000"}}>{departmentName}</Text></Text>
          {jobList?.map((value, i) => {
            return (
              <SearchResult value={value}/>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

export default JobsByCategory;

const styles = StyleSheet.create({});
