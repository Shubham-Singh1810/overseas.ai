import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {getOccupations, getJobByDepartment, getJobByCountry} from '../services/job.service';
import FooterNav from '../components/FooterNav';
import SearchResult from '../components/SearchResult';
import Toast from 'react-native-toast-message';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
const JobsByCountry = (props) => {
  const route = useRoute();
  useAndroidBackHandler(() => {
    props.navigation.navigate('Search Job');
    return true;
  });
  const {countryId, countryName} = route.params;
  const [jobList, setJobList] = useState([]);
  const getJobsByCountryFunc = async () => {
    try {
      let response = await getJobByCountry(countryId);
      setJobList(response?.data?.jobs?.data);
    } catch (error) {}
  };
  useEffect(() => {
    getJobsByCountryFunc();
  }, [countryId]);
  return (
    <>
      <ScrollView style={{flex:1, backgroundColor:"#fff"}}>
        <View style={{padding: 15, marginBottom:50,}}>
          <Text style={{fontSize:18,  marginBottom:15}}>Location: <Text style={{color:"#000"}}>{countryName}</Text></Text>
          {jobList?.map((value, i) => {
            return (
              <SearchResult value={value} props={props}/>
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
