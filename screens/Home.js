import {
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Button,
  RefreshControl,
} from 'react-native';
import React, {useState, useRef} from 'react';
import JobGola from '../components/JobGola';
import CandidateVideoGola from '../components/CandidateVideoGola';
import CountryGola from '../components/CountryGola';
import SearchResult from '../components/SearchResult';
import {useGlobalState} from '../GlobalProvider';
import {submitReference, checkServiceCode} from '../services/user.service';
import {
  getCountries,
  getCountriesForJobs,
  getHomeData,
} from '../services/info.service';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getInstituteList, getCourseList} from '../services/institute.service';
import {getOccupations, getSearchResult} from '../services/job.service';
import {Picker} from '@react-native-picker/picker';
import {useFocusEffect} from '@react-navigation/native';
import {getHraList} from '../services/hra.service';
import {newsData} from '../services/migrating_workers (2) (1)';
import NewsFeedComponent from '../components/NewsFeedComponent';
import HraGolaFeed from '../components/HraGolaFeed';
import CourseGola from '../components/CourseGola';
import InstituteFeedGola from '../components/InstituteFeedGola';
import {useAndroidBackHandler} from 'react-navigation-backhandler';

const Home = props => {
  useAndroidBackHandler(() => {
    if (searchJobKey || searchCounterKey) {
      setSearchCountryKey('');
      setSearchJobKey('');
    } else {
      return false;
    }
    return true;
  });
  const {
    globalState,
    translation,
    newTranslation,
    notifications,
    setGlobalState,
  } = useGlobalState();
  const [searchJobKey, setSearchJobKey] = useState('');
  const [searchCounterKey, setSearchCountryKey] = useState('');
  const [occupations, setOccupations] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loaderOccu, setLoaderOccu] = useState(true);
  const [loaderCandidate, setLoaderCandidate] = useState(true);
  const [loaderCountry, setLoaderCountry] = useState(true);
  const [loaderSearch, setLoaderSearch] = useState(true);
  const [showRefSelectPopUp, setShowRefSelectPopUp] = useState(false);
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
      let response = await getCountriesForJobs();
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
  const handleShowRegPopUp = async () => {
    let regSource = await AsyncStorage.getItem('regSource');
    if (regSource && regSource != 'Other') {
      setShowRefSelectPopUp(false);
    } else {
      setShowRefSelectPopUp(true);
    }
  };
  const [showBlockPopUp, setShowBlockPopUp] = useState(false);
  const checkCode = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await checkServiceCode(JSON.parse(user).access_token);
      setShowBlockPopUp(!response?.data?.access);
    } catch (error) {
      console.log('dfjghdfj', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      checkCode();
      setTimeout(() => {
        handleShowRegPopUp();
      }, 5000);
    }, []),
  );
  const [refItem, setRefItem] = useState('');
  const submitReferItem = async item => {
    setRefItem(item);
  };
  const handleSubmitRefItem = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await submitReference(JSON.parse(user).access_token, {
        regSource: refItem,
      });
      if (response.data.message == 'Registration source updated successfully') {
        setShowRefSelectPopUp(false);
        await AsyncStorage.setItem('regSource', refItem);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = () => {
    setTimeout(() => {
      createDynamicFeedFunc();
      setRefreshing(false);
    }, 1000);
  };
  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };
  const [showPageLoader, setShowPageLoader] = useState(false);
  const scrollViewRef = useRef(null);
  const [pageNo, setPageNo] = useState(1);
  const handleScroll = ({nativeEvent}) => {
    const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isEndReached) {
      setShowPageLoader(true);
      setTimeout(() => {
        setPageNo(pageNo + 1);
        setShowPageLoader(true);
      }, 1000);
    }
  };

  return (
    <>
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
                  <Text style={{color: '#000'}}>
                    {newTranslation?.searchYourDreamJob}
                  </Text>
                </View>
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
                    label={newTranslation?.selectOccupation}
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
                    label={newTranslation?.selectCountry}
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
            <ScrollView
              style={{marginBottom: 350}}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ref={scrollViewRef}
              onScroll={handleScroll}>
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
                      <Text
                        style={{fontSize: 18, marginTop: 15, color: '#000'}}>
                        {newTranslation?.searchResults} : {jobList.length}
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
                            {
                              newTranslation?.OppsNoResultFoundForThisCombination
                            }
                          </Text>
                        </View>
                      ) : (
                        <View style={{marginTop: 20}}>
                          {jobList?.map((value, i) => {
                            return (
                              <SearchResult
                                backTo="Home"
                                value={value}
                                props={props}
                              />
                            );
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
                      {newTranslation?.JobOccupationsThatWeOffer}
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
                          return (
                            <CountryGola props={props} value={v} key={i} />
                          );
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
                      {newTranslation?.discoverFreshFeedDelightsNow}
                    </Text>
                  </View>

                  {dynamicFeedArr?.slice(0, pageNo * 10).map((v, i) => {
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
                          <SearchResult backTo="Home" value={v} props={props} />
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
                          <CourseGola value={v} props={props} backTo="Home" />
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
                  {showPageLoader && (
                    <View style={{marginVertical: 50}}>
                      <ActivityIndicator size="large" />
                    </View>
                  )}

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
      <Modal
        transparent={true}
        visible={showRefSelectPopUp}
        animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={{padding: 20, backgroundColor: '#fff'}}>
            <View>
              <Text style={styles.languagetext}>
                From where did you here about us ?
              </Text>
            </View>
            <View style={{marginTop: 20}}>
              <TouchableOpacity
                style={[
                  styles.box,
                  refItem == 'Facebook' && styles.selectedBox,
                ]}
                onPress={() => submitReferItem('Facebook')}>
                <Text style={styles.textCenter}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.box, refItem == 'Google' && styles.selectedBox]}
                onPress={() => submitReferItem('Google')}>
                <Text style={styles.textCenter}>Google </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.box, refItem == 'Friend' && styles.selectedBox]}
                onPress={() => submitReferItem('Friend')}>
                <Text style={[styles.textCenter]}>From a friend</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.box, refItem == 'Call' && styles.selectedBox]}
                onPress={() => submitReferItem('Call')}>
                <Text style={styles.textCenter}>Via call from us</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.box, refItem == 'Poster' && styles.selectedBox]}
                onPress={() => submitReferItem('Poster')}>
                <Text style={styles.textCenter}>Poster</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={[styles.box, refItem == 'Other' && styles.selectedBox]}
                onPress={() => submitReferItem('Other')}>
                <Text style={styles.textCenter}>Other</Text>
              </TouchableOpacity> */}
            </View>
            <View
              style={{
                width: 250,
              }}>
              <Button
                title="Save"
                color="#194a81"
                onPress={() => handleSubmitRefItem()}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={showBlockPopUp} animationType="slide">
        <View
          style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              padding: 20,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: '#fff',
            }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '600',
                  fontSize: 19,
                  padding: 20,
                  textAlign: 'center',
                }}>
                Currently, Services are not available
                {'\n'} in your area!
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
  languagetext: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Noto Sans',
    fontSize: 16,
    marginBottom: 0,
  },
  textCenter: {
    textAlign: 'center',
    color: 'black',
  },
  box: {
    borderWidth: 1,
    borderColor: 'rgba(167, 167, 167, 0.50)',
    padding: 8,
    borderRadius: 5,
    width: 250,
    marginBottom: 15,
  },
  selectedBox: {
    backgroundColor: '#f0f7ff',
  },
});
