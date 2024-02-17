import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import React, {useState} from 'react';
import SkillsGola from '../components/SkillsGola';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import {
  getInstituteList,
  getCourseList,
  searchForCourse,
} from '../services/institute.service';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryGola from '../components/CountryGola';
import {isBefore, subWeeks} from 'date-fns';
import CourseGola from '../components/CourseGola';
const GetCertificate = props => {
  const [instituteList, setInstituteList] = useState([]);
  const [showCourseLoader, setShowCourseLoader]=useState(false);
  const [showInstituteLoader, setShowInstituteLoader]=useState(false);
  const [showSearchLoader, setShowSearchLoader]=useState(false);
  const [courseList, setCourseList] = useState([]);
  const [showHotJob, setShowHotJob] = useState(false);
  const [searchInstitute, setSearchInstitute] = useState('');
  const getInstituteListFunc = async () => {
    setShowInstituteLoader(true);
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getInstituteList(JSON.parse(user).access_token);
      if (response.msg == 'Institute list retrieved successfully!') {
        setInstituteList(response?.data);
      }
    } catch (error) {
      console.log('Something went wrong');
    }
    setShowInstituteLoader(false);
  };
  const getCourseListFunc = async () => {
    setShowCourseLoader(true)
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getCourseList(JSON.parse(user).access_token);
      if (response.msg == 'Course list retrieved successfully!') {
        setCourseList(response?.data);
      }
    } catch (error) {
      console.log('Something went wrong');
    }
    setShowCourseLoader(false)
  };
  const [searchResult, setSearchResult] = useState([]);
  const getSearchResultForCourseFunc = async id => {
    setShowSearchLoader(true)
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await searchForCourse({
        id: id,
        access_token: JSON.parse(user).access_token,
      });
      setSearchResult(response?.data);
    } catch (error) {
      console.log(error);
    }
    setShowSearchLoader(false)
  };
  useFocusEffect(
    React.useCallback(() => {
      getInstituteListFunc();
      getCourseListFunc();
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
          {/* <TouchableOpacity style={styles.input}>
            <Picker onValueChange={(itemValue, itemIndex) => {}}>
              <Picker.Item
                label="Course Name"
                value={null}
                style={{color: 'gray'}}
              />
            </Picker>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.input}>
            <Picker
              selectedValue={searchInstitute}
              onValueChange={(itemValue, itemIndex) => {
                setSearchInstitute(itemValue);
                getSearchResultForCourseFunc(itemValue);
              }}>
              <Picker.Item
                label="Select Institute"
                value=""
                style={{color: 'gray'}}
              />
              {instituteList?.map((v, i) => {
                return (
                  <Picker.Item
                    label={v?.instituteName}
                    value={v?.id}
                    style={{color: 'gray'}}
                  />
                );
              })}
            </Picker>
          </TouchableOpacity>
        </View>
        {searchInstitute != '' && (
          <View style={{marginTop: 10}}>
            <Text style={styles.nameText}>
              Search Result : {searchResult?.length}
            </Text>
            <View style={{marginTop: 15}}>
              {showSearchLoader ? <View style={{height:100,width:100, flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            <ActivityIndicator/>
            </View> :searchResult?.map((v, i) => {
                return <CourseGola value={v} props={props} />;
              })}
              
            </View>
          </View>
        )}

        <View style={{marginTop: 20}}>
          <Text style={styles.heading}>Top Institutes</Text>
          <ScrollView horizontal={true} style={{marginTop: 10}}>
            {showInstituteLoader ? <View style={{height:100,width:100, flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            <ActivityIndicator/>
            </View> : 
            instituteList?.map((v, i) => {
              return (
                <Pressable
                  onPress={() =>
                    props.navigation.navigate(
                      'Get Institute By Id',
                      (instituteDetails = v),
                    )
                  }
                  style={{marginRight: 10}}>
                  {v?.profileImage ? (
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
                    {v?.instituteName?.length > 20 ? (
                      <>{v?.instituteName?.substring(0, 20)}...</>
                    ) : (
                      v?.instituteName
                    )}
                  </Text>
                </Pressable>
              );
            })}  
          </ScrollView>
        </View>
        <View style={{marginTop: 30}}>
          <Text style={styles.heading}>Top Courses</Text>
          <ScrollView horizontal={true} style={{marginTop: 10}}>
            {showCourseLoader ? <View style={{height:100,width:100, flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            <ActivityIndicator/>
            </View>: courseList?.map((v, i) => {
              return (
                <Pressable
                  onPress={() =>
                    props.navigation.navigate(
                      'Get Course By Id',
                      (CourseDetails = v),
                    )
                  }>
                  <View style={{marginRight: 10}}>
                    {v?.course_image !=
                    'https://overseas.ai/placeholder/course.jpg' ? (
                      <Image
                        source={{
                          uri: v?.course_image,
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
                      {v?.course_name?.length > 20 ? (
                        <>{v?.course_name?.substring(0, 20)}...</>
                      ) : (
                        v?.course_name
                      )}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          
            
          </ScrollView>
          {courseList
                ?.filter((v, i) => {
                  return !isBefore(
                    new Date(v?.created_at),
                    subWeeks(new Date(), 1),
                  );
                }).length > 0 && <View style={{marginTop: 30}}>
                <Text style={styles.heading}>Course Added Recently</Text>
                <ScrollView horizontal={true} style={{marginTop: 10}}>
                  {courseList
                    ?.filter((v, i) => {
                      return !isBefore(
                        new Date(v?.created_at),
                        subWeeks(new Date(), 1),
                      );
                    })
                    .map((v, i) => {
                      return (
                        <Pressable
                          onPress={() =>
                            props.navigation.navigate(
                              'Get Course By Id',
                              (CourseDetails = v),
                            )
                          }>
                          <View style={{marginRight: 10}}>
                            {v?.course_image !=
                            'https://overseas.ai/placeholder/course.jpg' ? (
                              <Image
                                source={{
                                  uri: v?.course_image,
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
                              {v?.course_name}
                            </Text>
                          </View>
                        </Pressable>
                      );
                    })}
                </ScrollView>
              </View>}
          
        </View>
        {/* <View style={{flexDirection: 'row',justifyContent:"space-between", marginTop: 20, marginBottom: -15}}>
          <Pressable
            style={[
              {width: '45%'},
              showHotJob && {elevation: 1, borderRadius: 2},
            ]}
            onPress={() => setShowHotJob(!showHotJob)}>
            <Image
              source={require('../images/arrowPost.png')}
              style={{resizeMode: 'contain', width:"100%"}}
            />
          </Pressable>
          <Pressable
            style={{width: '45%'}}
            onPress={() => props.navigation.navigate('Feed')}>
            <Image
              source={require('../images/searchPost.png')}
              style={{resizeMode: 'contain', width:"100%"}}
            />
          </Pressable>
        </View> */}
        
        <View style={styles.largeBtnGroup}>
        
          
          <TouchableOpacity
            style={[styles.largeBtn, styles.bgBlue]}
            onPress={() => props.navigation.navigate('Applied Courses')}>
            <Text style={styles.largeBtnText}>Applied Course</Text>
            <Image source={require('../images/rightArrow.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.largeBtn, styles.bgGreen]}
            onPress={() => props.navigation.navigate('My Certificates')}>
            <Text style={styles.largeBtnText}>My Certificate</Text>
            <Image source={require('../images/rightArrow.png')} 
            />
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
