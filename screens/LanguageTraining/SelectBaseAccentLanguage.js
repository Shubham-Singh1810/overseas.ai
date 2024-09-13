import {StyleSheet, Text, View, Image, Pressable, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getSkillsByOccuId} from '../../services/info.service';
import {useGlobalState} from '../../GlobalProvider';

import {useAndroidBackHandler} from 'react-navigation-backhandler';
const SelectBaseAccentLanguage = props => {
  const {translation, newTranslation, globalState, setGlobalState} =
    useGlobalState();
  useAndroidBackHandler(() => {
    props.navigation.navigate('Language Training');
    return true;
  });

  const [skills, setSkills] = useState([]);
  const getSkillListByOccuId = async id => {
    try {
      let response = await getSkillsByOccuId(id);
      setSkills(response?.skills);
      setCurrentOcc(
        response?.skills?.filter((v, i) => {
          return v?.id == JSON.parse(globalState.user).empData.empSkill;
        })[0]?.skill,
      );
    } catch (error) {}
  };
  const [currentOcc, setCurrentOcc] = useState('');
  useEffect(() => {
    getSkillListByOccuId(JSON.parse(globalState.user).empData.empOccuId);
  }, []);
  const getTrainingData = async id => {
    // let user = await AsyncStorage.getItem('user');
    // try {
    //   let response = await languageTrainingData(
    //     id,
    //     JSON.parse(user).access_token,
    //   );
    //   if (response?.data?.message != 'Language training data not found') {
    //     props.navigation.navigate('Phase 1', {data: {selectedBaseLang, selectedPrefAccent}});
    //     // props.navigation.navigate('Assignment 1', {data: response?.data});
    //   } else {
    //     Alert.alert('We are working on it');
    //   }
    //   // props.navigation.navigate('Assignment 2', {data: response?.data});
    // } catch (error) {
    //   console.log(error);
    // }
    props.navigation.navigate('Phase 1');
  };
  const [selectedBaseLang, setSelectedBaseLang]=useState("");
  const [selectedPrefAccent, setSelectedPrefAccent]=useState("");
  return (
    <View style={styles.main}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={[styles.title]}>Learn On Your Terms</Text>

          {/* <Text style={[styles.title, {backgroundColor:"white", color:"#19487C", paddingHorizontal:10, borderRadius:15}]}>overseas.ai</Text> */}
        </View>

        <View
          style={{
            marginVertical: 30,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              marginRight: 10,
            }}
            onPress={() => props.navigation.navigate('Language Training')}>
            <Image
              source={require('../../images/backIcon.png')}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          </Pressable>
          <Text style={styles.subTitle}>We Offer Customised Learning</Text>
        </View>

        <View style={{marginVertical: 20}}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '500',
              marginBottom: 15,
            }}>
            Select Base Language
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Pressable
            onPress={()=>setSelectedBaseLang("Bengali")}
              style={{
                borderWidth: 1,
                margin: 10,
                borderColor: 'white',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor:selectedBaseLang=="Bengali"?"black":"#19487C"
              }}>
              <Text style={{color: 'white', fontWeight: '500'}}>Bengali</Text>
            </Pressable>
            <Pressable
            onPress={()=>setSelectedBaseLang("Hindi")}
              style={{
                borderWidth: 1,
                margin: 10,
                borderColor: 'white',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor:selectedBaseLang=="Hindi"?"black":"#19487C"
              }}>
              <Text style={{color: 'white', fontWeight: '500'}}>Hindi</Text>
            </Pressable>
          </View>
        </View>
        <View style={{marginVertical: 20}}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '500',
              marginBottom: 15,
            }}>
            Select Preferred Accent
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Pressable
            onPress={()=>setSelectedPrefAccent("Indian")}
              style={{
                borderWidth: 1,
                margin: 10,
                borderColor: 'white',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor:selectedPrefAccent=="Indian"?"black":"#19487C"
              }}>
              <Text style={{color: 'white', fontWeight: '500'}}>
                Indian English
              </Text>
            </Pressable>
            <Pressable
             onPress={()=>setSelectedPrefAccent("European")}
              style={{
                borderWidth: 1,
                margin: 10,
                borderColor: 'white',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
                backgroundColor:selectedPrefAccent=="European"?"black":"#19487C"
              }}>
              <Text style={{color: 'white', fontWeight: '500'}}>
                European English
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Pressable
        onPress={() =>
          getTrainingData(JSON.parse(globalState.user).empData.empSkill)
        }
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 30,
          elevation: 10,
          padding: 5,
          paddingVertical: 8,
          borderRadius: 20,
          width: '100%',
        }}>
        <Text
          style={{
            color: '#19487C',
            fontWeight: '600',
            fontSize: 20,
            textAlign: 'center',
          }}>
          Next
        </Text>
      </Pressable>
    </View>
  );
};

export default SelectBaseAccentLanguage;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#19487C',
  },
  title: {
    color: 'white',
    fontWeight: '600',
    fontSize: 35,
    textAlign: 'center',
  },
  subTitle: {
    color: 'whitesmoke',
    fontWeight: '600',
    fontSize: 18,
    fontFamily: 'monospace',
  },
});
