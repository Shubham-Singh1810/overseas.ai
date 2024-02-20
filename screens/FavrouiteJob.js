import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator
} from 'react-native';
import React,{useState} from 'react';
import FavJobComponent from '../components/FavJobComponent';
import {ScrollView} from 'react-native-gesture-handler';
import {favouriteJobList} from '../services/job.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchResult from '../components/SearchResult';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
const FavrouiteJob = (props) => {
  useAndroidBackHandler(() => {
    props.navigation.navigate("Home") 
    return true;
  });
  const [showLoader, setShowLoader] = useState(true);
  
  const [favouriteJobListArr, setFavouriteJobListArr] = useState([]);
  const getFavouriteJobs = async () => {
    setShowLoader(true)
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await favouriteJobList(JSON.parse(user).access_token);
      setFavouriteJobListArr(response?.data?.jobs);
      setShowLoader(false)
    } catch (error) {}
    setShowLoader(false)
  };
  useFocusEffect(
    React.useCallback(() => {
      getFavouriteJobs();
    }, []),
  );
  return (
    <View style={styles.main}>
      
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.messageText}>Hand picked jobs for you</Text>
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
        
        {showLoader? <ActivityIndicator size="large" color="#0000ff" style={{marginTop:200}}/>: favouriteJobListArr?.map((v, i) => {
          return <SearchResult backTo="Favourite Job" favroite={true} props={props} value={v}/>
        })}
        
      </ScrollView>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default FavrouiteJob;

const styles = StyleSheet.create({
  main: {
    padding: 15,
    // backgroundColor:"#fff"
  },
  sortOption: {
    width: '25%',
    padding: 5.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#035292',
    borderRadius: 2,
  },
  modalMain: {
    width: 200,
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    width: '70%',
    padding: 3,
    paddingLeft: 10,
  },
  hraBox: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 8,
  },
  experience: {
    fontSize: 10,
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    color: '#6F6F6F',
  },
  name: {
    fontSize: 11,
    fontFamily: 'Noto Sans',
    marginVertical: 2,
    fontWeight: '400',
    color: 'black',
  },
  messageText: {
    color: '#0F0C0C',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Nato Sans',
    marginVertical: 15,
  },
});
