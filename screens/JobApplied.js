import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Modal,
  Button,
  View,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import AppliedJob from '../components/AppliedJob';
import {appliedJobList} from "../services/job.service"
import {useGlobalState} from '../GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
const JobApplied = props => {
  const[appliedJobListArr, setAppliedJobListArr]=useState([])
  const {translation} = useGlobalState();
  const getAppliedJobList = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await appliedJobList(JSON.parse(user).access_token);
      console.log(response.data)
      setAppliedJobListArr(response?.data?.jobs)
    } catch (error) {}
  };
  useFocusEffect(
    React.useCallback(() => {
      getAppliedJobList();
    }, []),
  );
  return (
    <>
      <ScrollView style={{flex:1, backgroundColor:"white"}}>
        <View style={styles.main}>
          <Text style={styles.messageText}>
            {translation.checkUpdatesOnYourApplication}
          </Text>
          <View>
            {appliedJobListArr?.map((v, i)=>{
              return(
                <AppliedJob props={props} value={v}/>
              )
            })}
            
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default JobApplied;

const styles = StyleSheet.create({
  main: {
    padding: 10,
    marginBottom: 60,
  },
  mainHeading: {
    color: '#0F0C0C',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Nato Sans',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginLeft: -5,
    marginBottom: 30,
  },
  messageText: {
    color: '#0F0C0C',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Nato Sans',
    marginVertical: 15,
  },
});
