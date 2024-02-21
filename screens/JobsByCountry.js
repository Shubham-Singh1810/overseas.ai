import {ScrollView, StyleSheet, Text,ActivityIndicator, View} from 'react-native';
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
  const [loading, setLoading]=useState(true)
  const getJobsByCountryFunc = async () => {
    try {
      let response = await getJobByCountry(countryId);
      setJobList(response?.data?.jobs);
      setLoading(false)
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
          {loading? 
          <View style={{height:500,flexDirection:"row", alignItems:"center",justifyContent:"center"}}>
            <ActivityIndicator size="large" color="maroon" />
          </View>: jobList.length == 0 ? (
            <View style={{height:500,flexDirection:"row", alignItems:"center",justifyContent:"center"}}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'maroon',
                  paddingHorizontal: 20,
                  textAlign: 'center',
                }}>
                Opps! No result found for{"\n"}{countryName}
              </Text>
            </View>
          ) : (
            jobList?.map((value, i) => {
              return (
                <SearchResult  backTo="Jobs By Country" value={value} props={props} countryId={countryId} countryName={countryName}/>
              );
            })
          )}
          
        </View>
      </ScrollView>
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default JobsByCountry;

const styles = StyleSheet.create({});
