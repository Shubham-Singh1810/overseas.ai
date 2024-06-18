import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import SkillsGola from '../components/SkillsGola';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import {
  getInstituteList,
  getCourseList,
  searchForCourse,
  getTradeList,
  getTestList
} from '../services/institute.service';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryGola from '../components/CountryGola';
import {isBefore, subWeeks} from 'date-fns';
import CourseGola from '../components/CourseGola';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import {useGlobalState} from '../GlobalProvider';
import Toast from 'react-native-toast-message';
const TradeInstituteList = props => {
  useAndroidBackHandler(() => {
    if (searchInstitute) {
      setSearchInstitute('');
      return true;
    } else {
      props.navigation.navigate('Home');
      return true;
    }
  });
const [showFullList, setShowFullList]=useState(true)
  const {newTranslation} = useGlobalState();
  const [instituteList, setInstituteList] = useState([]);
  const [showCourseLoader, setShowCourseLoader] = useState(false);
  const [showInstituteLoader, setShowInstituteLoader] = useState(false);
  const [showSearchLoader, setShowSearchLoader] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [searchInstitute, setSearchInstitute] = useState('');

  const getInstituteListFunc = async () => {
    setShowInstituteLoader(true);
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getTradeList(JSON.parse(user).access_token);
      if (response.msg == 'Trade center list retrieved successfully!') {
        setInstituteList(response?.data);
      }
    } catch (error) {
      console.log('Something went wrong');
    }
    setShowInstituteLoader(false);
  };
  const getCourseListFunc = async () => {
    setShowCourseLoader(true);
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getTestList(JSON.parse(user).access_token);
      if (response.msg == 'Test list retrieved successfully!') {
        setCourseList(response?.data);
      }
    } catch (error) {
      console.log('Something went wrong');
    }
    setShowCourseLoader(false);
  };
  const [searchResult, setSearchResult] = useState([]);
  const getSearchResultForCourseFunc = async id => {
    setShowSearchLoader(true);
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
    setShowSearchLoader(false);
  };
  useFocusEffect(
    React.useCallback(() => {
      getInstituteListFunc();
      getCourseListFunc();
    }, []),
  );
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    getInstituteListFunc();
    getCourseListFunc();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); // Simulating a delay for demonstration
  };
  return (
    <View style={styles.main}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.greetText}>
                {newTranslation?.upgradeYourSkill}
              </Text>
              <Text style={styles.nameText}>
                {newTranslation?.getCertified}
              </Text>
            </View>
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
                  label={newTranslation?.searchInstitute}
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
                {newTranslation?.searchResults} : {searchResult?.length}
              </Text>
              <View style={{marginTop: 15}}>
                {showSearchLoader ? (
                  <View
                    style={{
                      height: 100,
                      width: 100,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ActivityIndicator />
                  </View>
                ) : (
                  searchResult?.map((v, i) => {
                    return (
                      <CourseGola
                        value={v}
                        props={props}
                        backTo="Get Certificate"
                      />
                    );
                  })
                )}
              </View>
            </View>
          )}

          <View style={{marginTop: 20}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.heading}>{newTranslation?.topInstitute}</Text>
              {/* <Pressable onPress={()=>setShowFullList(!showFullList)}>
              <Text style={{color: 'black', textDecorationLine: 'underline'}}>
                Show All
              </Text>
              </Pressable> */}
            </View>
            {showFullList ?
            <ScrollView horizontal={true} style={{marginTop: 10}}>
              {showInstituteLoader ? (
                <View
                  style={{
                    height: 100,
                    width: 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator />
                </View>
              ) : (
                instituteList?.map((v, i) => {
                  return (
                    <Pressable
                      onPress={() =>
                        props.navigation.navigate(
                          'Trade Institute Detail',
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
                })
              )}
            </ScrollView>:<View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {instituteList?.map((v, i) => {
                return (
                  <Pressable
                    onPress={() =>
                      props.navigation.navigate(
                        'Trade Institute Detail',
                        (instituteDetails = v),
                      )
                    }
                    style={{width: '45%', marginBottom: 10}}>
                    {v?.profileImage ? (
                      <Image
                        source={{
                          uri: v?.profileImageUrl,
                        }}
                        style={{
                          height: 100,
                          width: '100%',
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
                          width: '100%',
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
            </View>}
            
            
          </View>

          <View style={{marginTop: 30}}>
            <Text style={styles.heading}>{newTranslation?.topTradeTest}</Text>
            <ScrollView horizontal={true} style={{marginTop: 10}}>
              {showCourseLoader ? (
                <View
                  style={{
                    height: 100,
                    width: 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <ActivityIndicator />
                </View>
              ) : (
                courseList?.map((v, i) => {
                  return (
                    <Pressable
                      onPress={() =>
                        props.navigation.navigate('Trade Test Details', {
                          CourseDetails: v,
                          backTo: 'Trade Institute',
                        })
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
                })
              )}
            </ScrollView>
            {/* {courseList?.filter((v, i) => {
              return !isBefore(
                new Date(v?.created_at),
                subWeeks(new Date(), 1),
              );
            }).length > 0 && (
              <View style={{marginTop: 30}}>
                <Text style={styles.heading}>
                  {newTranslation?.courseAddedThisWeek}
                </Text>
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
                              // (CourseDetails = v),
                              {
                                CourseDetails: v,
                                backTo: 'Get Certificate',
                              },
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
              </View>
            )} */}
          </View>

          <View style={styles.largeBtnGroup}>
            <TouchableOpacity
              style={[styles.largeBtn, styles.bgBlue]}
              onPress={() =>
                props.navigation.navigate('Applied Courses', {
                  backTo: 'Get Certificate',
                })
              }>
              <Text style={styles.largeBtnText}>
                {newTranslation?.appliedCourse}
              </Text>
              <Image source={require('../images/rightArrow.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.largeBtn, styles.bgGreen]}
              onPress={() => props.navigation.navigate('My Certificates')}>
              <Text style={styles.largeBtnText}>
                {newTranslation?.myCertificate}
              </Text>
              <Image source={require('../images/rightArrow.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default TradeInstituteList;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
    flex: 1,
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
