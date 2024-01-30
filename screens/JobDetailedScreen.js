import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getJobById, applyJobApi} from '../services/job.service';
const JobDetailedScreen = params => {
  const [details, setDetails] = useState(null);
  const getJobByIdFunc = async () => {
    try {
      let response = await getJobById(params?.route?.params?.jobId);
      console.log(response.data.jobs)
      setDetails(response.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getJobByIdFunc();
    }, [params?.route?.params?.jobId]),
  );
  return (
    <View style={styles.main}>
      <Text>JobDetailedScreen</Text>
    </View>
  );
};

export default JobDetailedScreen;

const styles = StyleSheet.create({
    main:{
        padding:18,
        flex:1,
        backgroundColor:"#fff"
    }
});
