import {StyleSheet,Modal, ScrollView, Pressable, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import JobApplied from './JobApplied';
import SearchResult from '../components/SearchResult';
import FooterNav from '../components/FooterNav';
import FavJobComponent from '../components/FavJobComponent';
import {savedJobList} from '../services/job.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
const SavedJobs = props => {
  const [showLoading, setShowLoading] = useState(false)
  const [savedList, setSavedList] = useState([]);
  const getListOfSavedJobs = async () => {
    setShowLoading(true)
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await savedJobList(JSON.parse(user).access_token);
      if (response?.data?.msg == 'Saved job list retrieved successfully.') {
        setSavedList(response?.data?.jobs);
      } else {
        console.log('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
    setShowLoading(false)
  };
  useFocusEffect(
    React.useCallback(() => {
      // This will be called when the screen is focused
      getListOfSavedJobs();
    }, [])
  );
  return (
    <>
    <Modal transparent={true} visible={showLoading} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
      <ScrollView style={{ flex:1, backgroundColor:"#fff"}}>
        <View style={{padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.messageText}>Jobs you have saved earlier</Text>
            <Pressable
              // onPress={() => setShowModal(true)}
              style={{
                backgroundColor: '#035292',
                padding: 8,
                elevation: 10,
                borderRadius: 3,
              }}>
              <Text style={{color: 'white', fontWeight: '500'}}>
                Video Tutorial
              </Text>
            </Pressable>
          </View>
          {savedList?.length==0 ? <View style={{height:500, justifyContent:"center", alignItems:"center"}}><Text style={{fontSize:22}}>You haven't saved any job yet !!!</Text></View> :savedList?.map((v, i) => {
            return <SearchResult getListOfSavedJobs={getListOfSavedJobs} saved={true} props={props} value={v} />;
          })}
        </View>
      </ScrollView>
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default SavedJobs;

const styles = StyleSheet.create({
  messageText: {
    color: '#0F0C0C',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Nato Sans',
    marginVertical: 15,
  },
});
