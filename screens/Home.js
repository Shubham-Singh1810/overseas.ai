import {
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import JobGola from '../components/JobGola';
import CandidateGola from '../components/CandidateGola';
import CandidateVideoGola from '../components/CandidateVideoGola';
import SkillsGola from '../components/SkillsGola';
import {getNotification} from '../services/user.service';
import CountryGola from '../components/CountryGola';
import FooterNav from '../components/FooterNav';
import SearchResult from '../components/SearchResult';
import {useGlobalState} from '../GlobalProvider';
import {getCountries, getHomeData} from '../services/info.service';
import Toast from 'react-native-toast-message';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getInstituteList, getCourseList} from '../services/institute.service';
import {
  getOccupations,
  getJobByDepartment,
  getSearchResult,
} from '../services/job.service';
import {Picker} from '@react-native-picker/picker';
import {useFocusEffect} from '@react-navigation/native';
import {getHraList} from '../services/hra.service';
import {newsData} from '../services/migrating_workers (2) (1)';
import NewsFeedComponent from '../components/NewsFeedComponent';
import HraGolaFeed from '../components/HraGolaFeed';
import CourseGola from '../components/CourseGola';
import InstituteFeedGola from '../components/InstituteFeedGola';
const Home = props => {
  useAndroidBackHandler(() => {
    if (searchJobKey || searchCounterKey) {
      setSearchCountryKey('');
      setSearchJobKey('');
    }
    return true;
  });
  const {globalState, translation,notifications, setGlobalState} = useGlobalState();
  const [searchJobKey, setSearchJobKey] = useState('');
  const [searchCounterKey, setSearchCountryKey] = useState('');
  const [occupations, setOccupations] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loaderOccu, setLoaderOccu] = useState(true);
  const [loaderCandidate, setLoaderCandidate] = useState(true);
  const [loaderCountry, setLoaderCountry] = useState(true);
  const [loaderSearch, setLoaderSearch] = useState(true);
  
  const getOccupationList = async () => {
    setLoaderOccu(true);
    try {
      let response = await getOccupations();
      setOccupations(response?.occupation);
    } catch (error) {}
    setLoaderOccu(false);
  };
  const getCountryList = async () => {
    setLoaderCountry(true);
    try {
      let response = await getCountries();
      setCountries(response?.countries);
    } catch (error) {}
    setLoaderCountry(false);
  };
  const [jobList, setJobList] = useState([]);

  const searchJob = async (occuId, countryId) => {
    setLoaderSearch(true);
    setSearchJobKey(occuId);
    setSearchCountryKey(countryId);
    try {
      let response = await getSearchResult(occuId, countryId);
      setJobList(response?.data?.jobs);
    } catch (error) {
      console.log(error);
    }
    
    setLoaderSearch(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getOccupationList();
      getCountryList();
    }, []),
  );
  // logic to build a dynamic feed start

  const [jobFeed, setJobFeed] = useState([]);
  const [instituteFeed, setInstituteFeed] = useState([]);
  const [courseFeed, setCourseFeed] = useState([]);
  const [homeData, setHomeData] = useState(null);
  const [hraFeed, setHraFeed] = useState([]);

  // const dataObjects = [
  //   { type: 'job', data: jobList },
  //   { type: 'institute', data: instituteFeed },
  //   // { type: 'video', data: homeData.afterDepartureVideos },
  //   // { type: 'news', data: newsList },
  //   { type: 'course', data: courseFeed },
  //   { type: 'hra', data: hraFeed }
  // ];
  const searchJobForFeed = async () => {
    setLoaderSearch(true);
    try {
      let response = await getSearchResult('', '');
      const jobsWithDataType = response?.data?.jobs.map(job => ({
        ...job,
        dataType: 'job',
      }));
      setJobFeed(jobsWithDataType);
    } catch (error) {}
    setLoaderSearch(false);
  };
  const getInstituteListFunc = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getInstituteList(JSON.parse(user).access_token);
      if (response.msg == 'Institute list retrieved successfully!') {
        const instituteWithDataType = response?.data?.map(institute => ({
          ...institute,
          dataType: 'institute',
        }));
        setInstituteFeed(instituteWithDataType);
      }
    } catch (error) {
      console.log('Something went wrong');
    }
  };
  const getHomeDataFunc = async () => {
    setLoaderCandidate(true);
    try {
      let response = await getHomeData();
      setHomeData(response);
    } catch (error) {}
    setLoaderCandidate(false);
  };
  const getCourseListFunc = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getCourseList(JSON.parse(user).access_token);
      if (response.msg == 'Course list retrieved successfully!') {
        const courseWithDataType = response?.data?.map(course => ({
          ...course,
          dataType: 'course',
        }));
        setCourseFeed(courseWithDataType);
      }
    } catch (error) {
      console.log('Something went wrong');
    }
  };
  const getHraFunc = async () => {
    try {
      let response = await getHraList();
      const hraWithDataType = response?.data?.cmpData?.map(hra => ({
        ...hra,
        dataType: 'hra',
      }));
      setHraFeed(hraWithDataType);
    } catch (error) {
      console.log(error);
    }
  };
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const [dynamicFeedArr, setDynamicFeedArray] = useState([]);
  const createDynamicFeedFunc = async () => {
    let newsDataFeed = newsData?.map(news => ({...news, dataType: 'news'}));
    let shuffledArr = shuffleArray(
      jobFeed.concat(instituteFeed, courseFeed, hraFeed, newsDataFeed),
    );
    setDynamicFeedArray(shuffledArr);
  };
  useFocusEffect(
    React.useCallback(() => {
      getInstituteListFunc();
      searchJobForFeed();
      getCourseListFunc();
      getHomeDataFunc();
      getHraFunc();
    }, []),
  );
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        createDynamicFeedFunc();
      }, 1000);
    }, [jobFeed]),
  );
  // logic to build a dynamic feed end
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View>
        <View style={styles.main}>
          <View style={styles.messageGroup}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.greetText}>{translation.hello},</Text>
                  <Text style={[styles.nameText, {marginLeft: 5}]}>
                    {JSON.parse(globalState?.user)?.user?.name.split(' ')[0]}
                  </Text>
                </View>
                <Text style={{color: '#000'}}>Search your dream job!</Text>
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
          </View>
          <View>
            <TouchableOpacity style={styles.input}>
              <Picker
                selectedValue={searchJobKey}
                onValueChange={(itemValue, itemIndex) => {
                  searchJob(itemValue, searchCounterKey);
                }}>
                <Picker.Item
                  label="Select an occupation"
                  value={null}
                  style={{color: 'gray'}}
                />
                {occupations?.map((v, i) => {
                  return (
                    <Picker.Item
                      label={v.occupation}
                      value={v.id}
                      style={{color: 'gray'}}
                    />
                  );
                })}
              </Picker>
            </TouchableOpacity>
            <TouchableOpacity style={styles.input}>
              <Picker
                selectedValue={searchCounterKey}
                onValueChange={(itemValue, itemIndex) => {
                  searchJob(searchJobKey, itemValue);
                }}>
                <Picker.Item
                  label="Select country name"
                  value={null}
                  style={{color: 'gray'}}
                />
                {countries?.map((v, i) => {
                  return (
                    <Picker.Item
                      label={v.name}
                      value={v.id}
                      style={{color: 'gray'}}
                    />
                  );
                })}
              </Picker>
            </TouchableOpacity>
          </View>
          <ScrollView style={{marginBottom:400}}>
            {searchJobKey || searchCounterKey ? (
              <View>
                {loaderSearch ? (
                  <View
                    style={{
                      flex: 1,
                      height: 300,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ActivityIndicator />
                  </View>
                ) : (
                  <View>
                    <Text style={{fontSize: 18, marginTop: 15, color: '#000'}}>
                      Search results : {jobList.length}
                    </Text>
                    {jobList.length == 0 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          height: 300,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: 'maroon',
                            paddingHorizontal: 20,
                            textAlign: 'center',
                          }}>
                          Opps! No result found for this combination
                        </Text>
                      </View>
                    ) : (
                      <View style={{marginTop: 20}}>
                        {jobList?.map((value, i) => {
                          return <SearchResult value={value} props={props} />;
                        })}
                      </View>
                    )}
                  </View>
                )}
              </View>
            ) : (
              <View style={{marginTop: 20}}>
                <View style={styles.jobsList}>
                  <Text style={styles.heading}>
                    {translation.jobsYouCanGet}
                  </Text>
                  <ScrollView horizontal={true}>
                    {loaderOccu ? (
                      <View
                        style={{
                          height: 130,
                          width: 100,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <ActivityIndicator />
                      </View>
                    ) : (
                      occupations?.map((v, i) => {
                        return <JobGola value={v} key={i} props={props} />;
                      })
                    )}
                  </ScrollView>
                </View>
                <View style={styles.jobsList}>
                  <Text style={styles.heading}>
                    {translation.countriesWhereYouCanApply}
                  </Text>
                  <ScrollView horizontal={true}>
                    {loaderCountry ? (
                      <View
                        style={{
                          height: 130,
                          width: 100,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <ActivityIndicator />
                      </View>
                    ) : (
                      countries?.map((v, i) => {
                        return <CountryGola props={props} value={v} key={i} />;
                      })
                    )}
                  </ScrollView>
                </View>
                <View style={{paddingVertical: 20, borderTopWidth: 1}}>
                  <Text
                    style={{
                      color: '#333333',
                      fontWeight: '500',
                      fontSize: 20,
                      textAlign: 'center',
                    }}>
                    Discover Fresh Feed Delights Now!
                  </Text>
                </View>
                {dynamicFeedArr?.map((v, i) => {
                  if (v?.dataType == 'hra') {
                    return (
                      <View>
                        <HraGolaFeed value={v} key={i} props={props} />
                      </View>
                    );
                  }
                  if (v?.dataType == 'job') {
                    return (
                      <View>
                        <Text
                          style={{
                            position: 'relative',
                            zIndex: 1,
                            padding: 5,
                            marginLeft: 8,
                            top: 12,
                            backgroundColor: 'maroon',
                            fontSize: 10,
                            color: '#fff',
                            borderRadius: 4,
                            width: 60,
                            textAlign: 'center',
                          }}>
                          Job Alert
                        </Text>
                        <SearchResult value={v} props={props} />
                      </View>
                    );
                  }
                  if (v?.dataType == 'news') {
                    return <NewsFeedComponent value={v} key={i} />;
                  }
                  if (v?.dataType == 'course') {
                    return (
                      <View>
                        <Text
                          style={{
                            position: 'relative',
                            zIndex: 1,
                            padding: 5,
                            marginLeft: 8,
                            top: 40,
                            backgroundColor: '#28a745',
                            fontSize: 10,
                            color: '#fff',
                            borderRadius: 4,
                            width: 80,
                            textAlign: 'center',
                          }}>
                          Get Certified
                        </Text>
                        <CourseGola value={v} props={props} />
                      </View>
                    );
                  }
                  if (v?.dataType == 'institute') {
                    return (
                      <View>
                        <InstituteFeedGola value={v} props={props} />
                      </View>
                    );
                  }
                })}
                <View style={styles.jobsList}>
                  <Text style={styles.heading}>
                    {translation.hereFromOther}
                  </Text>
                  <ScrollView horizontal={true}>
                    {loaderCandidate ? (
                      <View
                        style={{
                          height: 130,
                          width: 100,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <ActivityIndicator />
                      </View>
                    ) : (
                      <>
                        {homeData?.afterDepartureVideos.map((v, i) => {
                          return <CandidateVideoGola value={v} index={i} />;
                        })}
                        {homeData?.beforeDepartureVideo.map((v, i) => {
                          return <CandidateVideoGola value={v} index={i} />;
                        })}
                      </>
                    )}
                  </ScrollView>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
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
