import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import SkillsGola from '../components/SkillsGola';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import {getInstituteList} from '../services/institute.service';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const GetCertificate = props => {
  const [instituteList, setInstituteList] = useState([]);
  const getInstituteListFunc = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getInstituteList(JSON.parse(user).access_token);
      console.log(response.msg);
      if (response.msg == 'Institute list retrieved successfully!') {
        console.log(response.data);
        setInstituteList(response?.data);
      }
    } catch (error) {
      console.log('Something went wrong');
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getInstituteListFunc();
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
          <View>
            <Text style={styles.greetText}>
              Looking for job opportunity {'\n'}
              overseas?
            </Text>
            <Text style={styles.nameText}>Get Certified</Text>
          </View>
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
        <View style={{marginTop: 20}}>
          <TouchableOpacity style={styles.input}>
            <Picker onValueChange={(itemValue, itemIndex) => {}}>
              <Picker.Item
                label="Course Name"
                value={null}
                style={{color: 'gray'}}
              />
            </Picker>
          </TouchableOpacity>
          <TouchableOpacity style={styles.input}>
            <Picker onValueChange={(itemValue, itemIndex) => {}}>
              <Picker.Item
                label="Institute name"
                value={null}
                style={{color: 'gray'}}
              />
            </Picker>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.heading}>Top Institutes</Text>
          <ScrollView horizontal={true} style={{marginTop: 10}}>
            {instituteList?.map((v, i) => {
              return (
                <Pressable
                  onPress={() =>
                    props.navigation.navigate(
                      'Get Institute By Id',
                      (instituteDetails = v),
                    )
                  }
                  style={{marginRight: 10}}>
                  {v?.profileImageUrl != null ? (
            <Image
              source={{
                uri: v?.profileImageUrl,
              }}
              style={{
                height: 100,
                width: 150,
                borderRadius: 5,
                resizeMode: 'contain',
                borderWidth: 0.5,
                borderColor: 'gray',
              }}
            />
          ) : (
            <Image
              source={require('../images/hraDummyIcon.png')}
              style={{
                height: 100,
                width: 150,
                borderRadius: 5,
                resizeMode: 'contain',

                borderWidth: 0.5,
                borderColor: 'gray',
              }}
            />
          )}
                  <Text style={{textAlign: 'center', color: 'black'}}>
                    {v?.instituteName}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.heading}>Top Courses</Text>
          <ScrollView horizontal={true} style={{marginTop: 10}}>
            <View style={{marginRight: 10}}>
              <Image source={require('../images/hraDummyIcon.png')} />
              <Text style={{textAlign: 'center'}}>Cooking</Text>
            </View>
            <View style={{marginRight: 10}}>
              <Image source={require('../images/hraDummyIcon.png')} />
              <Text style={{textAlign: 'center'}}>Driving</Text>
            </View>
            <View style={{marginRight: 10}}>
              <Image source={require('../images/hraDummyIcon.png')} />
              <Text style={{textAlign: 'center'}}>Welding</Text>
            </View>
            <View style={{marginRight: 10}}>
              <Image source={require('../images/hraDummyIcon.png')} />
              <Text style={{textAlign: 'center'}}>Carpentry</Text>
            </View>
            <View style={{marginRight: 10}}>
              <Image source={require('../images/hraDummyIcon.png')} />
              <Text style={{textAlign: 'center'}}>ABC college</Text>
            </View>
            <View style={{marginRight: 10}}>
              <Image source={require('../images/hraDummyIcon.png')} />
              <Text style={{textAlign: 'center'}}>ABC college</Text>
            </View>
          </ScrollView>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20, marginBottom: -15}}>
          <Image source={require('../images/arrowPost.png')} />
          <Image source={require('../images/searchPost.png')} />
        </View>
        <View style={styles.largeBtnGroup}>
          <TouchableOpacity style={[styles.largeBtn, styles.bgBlue]}>
            <Text style={styles.largeBtnText}>Hot Course</Text>
            <Image source={require('../images/rightArrow.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.largeBtn, styles.bgGreen]}>
            <Text style={styles.largeBtnText}>Most Recent</Text>
            <Image source={require('../images/rightArrow.png')} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default GetCertificate;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageGroup: {
    marginBottom: 20,
  },
  greetText: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 16,
    fontWeight: '400',
  },
  nameText: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 16,
    fontWeight: '900',
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#F0F0F0',
  },
  searchBtn: {
    borderWidth: 1,
    borderColor: 'rgba(167, 167, 167, 0.50)',
    padding: 12,
    borderRadius: 2,
    width: 200,
    backgroundColor: '#5F90CA',
    marginVertical: 35,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Nato Sans',
  },
  heading: {
    color: '#0F0C0C',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Nato Sans',
  },
  jobsList: {
    marginBottom: 40,
  },
  largeBtn: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 3,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  largeBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Nato Sans',
  },
  bgBlue: {
    backgroundColor: '#5F90CA',
  },
  bgYellow: {
    backgroundColor: '#ECB735',
  },
  bgGreen: {
    backgroundColor: '#4FB988',
  },
  largeBtnGroup: {
    marginTop: 40,
  },
});
