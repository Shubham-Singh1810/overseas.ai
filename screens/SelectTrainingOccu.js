import {StyleSheet, Text, View, Image, Pressable, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getSkillsByOccuId} from '../services/info.service';
import {useGlobalState} from '../GlobalProvider';
import {ScrollView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {set} from 'date-fns';
import {languageTrainingData} from '../services/languageTraining';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SelectTrainingOccu = props => {
  const {translation, newTranslation, globalState, setGlobalState} =
    useGlobalState();
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
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await languageTrainingData(
        id,
        JSON.parse(user).access_token,
      );
      if (response?.data?.message != 'Language training data not found') {
        props.navigation.navigate('Phase 1', {data: response?.data});
      } else {
        Alert.alert('We are working on it');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.main}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.title}>Lets start your learning</Text>

          {/* <Text style={[styles.title, {backgroundColor:"white", color:"#19487C", paddingHorizontal:10, borderRadius:15}]}>overseas.ai</Text> */}
        </View>

        <View
          style={{
            marginVertical: 30,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.subTitle}>Choose your occupation</Text>
        </View>
        <ScrollView>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <View style={{width: '50%'}}>
              <Pressable
                onPress={() =>
                  getTrainingData(JSON.parse(globalState.user).empData.empSkill)
                }
                style={[
                  {
                    backgroundColor: 'white',
                    borderRadius: 6,
                    elevation: 1,
                    flexDirection: 'row',
                    margin: 5,
                    padding: 5,
                    paddingVertical: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                  true
                    ? {
                        backgroundColor: '#0E2E53',
                        borderColor: 'white',
                        borderWidth: 1,
                      }
                    : {}, // Conditionally apply the red background color
                ]}>
                <Text
                  style={[
                    {color: '#19487C', fontSize: 12, fontWeight: '500'},
                    true ? {color: 'white'} : {},
                  ]}>
                  {currentOcc}
                </Text>
              </Pressable>
            </View>
            {skills?.map((v, i) => {
              if (currentOcc != v?.skill) {
                // Adjust the condition as needed
                return (
                  <View key={i} style={{width: '50%'}}>
                    <Pressable
                      onPress={() => getTrainingData(v?.id)}
                      style={[
                        {
                          backgroundColor: 'white',
                          borderRadius: 6,
                          elevation: 1,
                          flexDirection: 'row',
                          margin: 5,
                          padding: 5,
                          paddingVertical: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                      ]}>
                      <Text
                        style={[
                          {color: '#19487C', fontSize: 12, fontWeight: '500'},
                        ]}>
                        {v?.skill}
                      </Text>
                    </Pressable>
                  </View>
                );
              }
              return null; // Return null if the condition is not met
            })}
          </View>
        </ScrollView>

        <Pressable
          onPress={() =>
            getTrainingData(JSON.parse(globalState.user).empData.empSkill)
          }
          style={{
            backgroundColor: 'white',
            marginTop: 40,
            elevation: 10,
            padding: 5,
            paddingVertical: 8,
            borderRadius: 20,
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
    </View>
  );
};

export default SelectTrainingOccu;

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
