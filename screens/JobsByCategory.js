import {
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  RefreshControl
} from 'react-native';
import React, {useState} from 'react';
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
    props.navigation.navigate('Home');
    return true;
  });
  const {departmentId, departmentName} = route.params;
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);
  const getJobsByDetartmentFunc = async () => {
    try {
      let response = await getJobByDepartment(departmentId);
      setJobList(response?.data?.jobs);
      setLoading(false);
    } catch (error) {}
  };

  useFocusEffect(
    React.useCallback(() => {
      getJobsByDetartmentFunc();
    }, [departmentId]),
  );
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = () => {
    setTimeout(() => {
      getJobsByDetartmentFunc()
      setRefreshing(false); 
    }, 1000); 
  };

  const onRefresh = () => {
    setRefreshing(true); 
    fetchData(); 
  };
  return (
    <>
      <ScrollView
        style={{flex: 1, backgroundColor: '#fff'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{padding: 15, marginBottom: 50}}>
          <Text style={{fontSize: 18, marginBottom: 15, color: 'gray'}}>
            Occupation: <Text style={{color: '#000'}}>{departmentName}</Text>
          </Text>
          {loading ? (
            <View
              style={{
                height: 500,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color="maroon" />
            </View>
          ) : jobList.length == 0 ? (
            <View
              style={{
                height: 500,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'maroon',
                  paddingHorizontal: 20,
                  textAlign: 'center',
                }}>
                Opps! No result found for{'\n'}
                {departmentName}
              </Text>
            </View>
          ) : (
            jobList?.map((value, i) => {
              return (
                <SearchResult
                  value={value}
                  props={props}
                  backTo="Jobs By Department"
                  departmentName={departmentName}
                  departmentId={departmentId}
                />
              );
            })
          )}
        </View>
      </ScrollView>
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default JobsByCategory;

const styles = StyleSheet.create({});
