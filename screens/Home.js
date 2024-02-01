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
import {useState, useEffect} from 'react';
import axios from 'axios';
import JobGola from '../components/JobGola';
import CandidateGola from '../components/CandidateGola';
import CandidateVideoGola from '../components/CandidateVideoGola';
import SkillsGola from '../components/SkillsGola';
import CountryGola from '../components/CountryGola';
import FooterNav from '../components/FooterNav';
import SearchResult from '../components/SearchResult';
import {useGlobalState} from '../GlobalProvider';
import {getCountries, getHomeData} from '../services/info.service';
import Toast from 'react-native-toast-message';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import {
  getOccupations,
  getJobByDepartment,
  getSearchResult,
} from '../services/job.service';
import {Picker} from '@react-native-picker/picker';
const Home = props => {
  useAndroidBackHandler(() => {
    if (searchJobKey || searchCounterKey) {
      setSearchCountryKey("");
      setSearchJobKey("")
    }  else {
      props.navigation.navigate('Feed');
    }
    return true;
  });
  const {globalState, translation, setGlobalState} = useGlobalState();
  useEffect(() => {
    setGlobalState({...globalState, currentScreen: 'Search Job'});
  }, []);
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
  const [homeData, setHomeData] = useState(null);
  const getHomeDataFunc = async () => {
    setLoaderCandidate(true);
    try {
      let response = await getHomeData();
      console.log('hello', response.afterDepartureVideos);
      setHomeData(response);
    } catch (error) {}
    setLoaderCandidate(false);
  };
  const [jobList, setJobList] = useState([]);
  const searchJob = async () => {
    setLoaderSearch(true);
    try {
      let response = await getSearchResult(searchJobKey, searchCounterKey);
      setJobList(response?.data?.jobs);
      console.log(response?.data?.jobs[0])
    } catch (error) {}
    setLoaderSearch(false);
  };
  useEffect(() => {
    searchJob();
  }, [searchJobKey, searchCounterKey]);
  useEffect(() => {
    getOccupationList();
    getCountryList();
    getHomeDataFunc();
  }, []);

  return (
    <View style={{backgroundColor:"#fff", flex:1}}>
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.messageGroup}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.greetText}>{translation.hello}</Text>
                <Text style={styles.nameText}>
                  {JSON.parse(globalState?.user)?.user?.name}
                </Text>
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
                  setSearchJobKey(itemValue);
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
                  setSearchCountryKey(itemValue);
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
          {searchJobKey || searchCounterKey ? (
            <View>
              {loaderSearch ? (
                <View
                  style={{
                    flex:1,
                    height:300,
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
                        return <SearchResult value={value} props={props}/>;
                      })}
                    </View>
                  )}
                </View>
              )}
            </View>
          ) : (
            <View style={{marginTop: 20}}>
              <View style={styles.jobsList}>
                <Text style={styles.heading}>{translation.jobsYouCanGet}</Text>
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
                <Text style={styles.heading}>{translation.hereFromOther}</Text>
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
                        return <CandidateVideoGola value={v} index={i}/>;
                      })}
                    </>
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
            </View>
          )}
        </View>
      </ScrollView>
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
