import {
  Image,
  StyleSheet,
  Button,
  Modal,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useEffect, useState} from 'react';
import {useGlobalState} from '../GlobalProvider';
import {getJobById, applyJobApi} from '../services/job.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {saveJobById} from '../services/job.service';
const SearchResult = ({value, getListOfSavedJobs, saved, favroite}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {translation} = useGlobalState();
  const [moreDetails, setMoreDetails] = useState(null);
  const getJobByIdFunc = async () => {
    try {
      let response = await getJobById(value?.id);
      console.log(response.data.jobs);
      setMoreDetails(response.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };
  const handleApplyJob = async jobId => {
    try {
      let user = await AsyncStorage.getItem('user');
      let payload = {
        id: jobId,
        'apply-job': '',
      };
      let response = await applyJobApi(payload, JSON.parse(user).access_token);
      if (response?.data?.msg) {
        Toast.show({
          type: 'success',
          text1: response?.data?.msg,
          visibilityTime: 3000,
        });
      }
      if (response.data.error) {
        Toast.show({
          type: 'error',
          text1: response?.data?.error,
          visibilityTime: 3000,
        });
      }
      console.log(response.data.error);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        visibilityTime: 3000,
      });
    }
  };
  const handleSaveJob = async jobId => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await saveJobById(jobId, JSON.parse(user).access_token);
      if(response?.data?.message=="Job unsaved successfully" || response?.data?.message=="Job saved successfully"){
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          // position: 'top',
          text1: response?.data?.message,
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
      if(saved){
        setTimeout(()=>{
          getListOfSavedJobs()
        }, 1000)
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getJobByIdFunc();
  }, []);
  return (
    <>
      <View style={styles.main}>
        <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
          {favroite ? (
            <Image source={require('../images/starIcon.png')} />
          ) : (
            <Text style={styles.newText}>{value?.jobID}</Text>
          )}
        </View>
        <View style={styles.navTop}>
          <Text style={styles.jobName}>
            {value?.jobTitle?.substring(0, 10)}...
          </Text>
          <Text style={styles.dateText}>
            {translation.applyBefore} - {value?.jobDeadline ? value?.jobDeadline: "No Deadline"}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.currencyText}>1400 SAR = 30,123 INR</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 2,
              }}>
              <Image source={require('../images/locationIcon.png')} />
              <Text style={[{marginLeft: 9}, styles.otherDetail]}>
                {value?.country_location}
              </Text>
            </View>
            <Text style={styles.countryName}>
              {/* {translation.experience} - 3 {translation.years} */}
              Number Of Vacancy : {value.jobVacancyNo}
            </Text>
            <Text style={styles.countryName}>
              {/* {translation.experience} - 3 {translation.years} */}
              Salary/Wage Per Month :
            </Text>
            <Text style={styles.countryName}>
              {/* {translation.experience} - 3 {translation.years} */}
              {value.jobWages}
            </Text>
            <Text style={[styles.messageText, {marginTop: 5}]}>
              {translation.yourProfileMatched} 87%
            </Text>
            {!showDetails ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Button
                  title={translation.applyNow}
                  onPress={() => handleApplyJob(value?.id)}
                />
                <Text
                  style={{marginLeft: 13, color: '#5F90CA', fontSize: 12}}
                  onPress={() => setShowDetails(true)}>
                  {translation.readDetails}
                </Text>
              </View>
            ) : (
              <View>
                <Text style={[styles.lightText, styles.marginFix]}>
                  Duty hours - 9 hours
                </Text>
                <Text style={styles.lightText}>Over Time Facility -Yes</Text>
              </View>
            )}
          </View>
          <View style={{marginTop: 'auto', paddingBottom: 15}}>
            <View>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  marginBottom: 10,
                  borderRadius: 10,
                }}
                source={{
                  uri: value?.jobPhoto,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: 10,
                }}>
                <TouchableOpacity onPress={() => handleSaveJob(saved? value?.JobPrimaryId:  value?.id)}>
                  {saved ? (
                    <Image
                    source={require('../images/redHeart.png')}
                    style={{resizeMode: 'contain'}}
                  />
                  ) : (
                    <Image
                      source={require('../images/emptyHeart.png')}
                      style={{resizeMode: 'contain'}}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {showDetails && (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <View>
                <Text style={styles.boldText}>Responsibilties</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.dot}></View>
                  <Text style={styles.lightText}>
                    Need to manage all tools perfectly
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.boldText}>Qualifications</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.dot}></View>
                  <Text style={styles.lightText}>
                    {translation.experience} - 3 {translation.year}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.dot}></View>
                  <Text style={styles.lightText}>Proficient in languages</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.dot}></View>
                  <Text style={styles.lightText}>Gulf return</Text>
                </View>
              </View>
              <View>
                <Text style={styles.boldText}>Skills Required</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.dot}></View>
                  <Text style={styles.lightText}>Hard Working</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Button
                  title={translation.applyNow}
                  onPress={() => handleApplyJob(value?.id)}
                />
                <Text
                  style={{marginLeft: 13, color: '#5F90CA', fontSize: 12}}
                  onPress={() => setShowDetails(false)}>
                  Hide Details
                </Text>
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#F00',
                  borderWidth: 7,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#F00',
                    fontFamily: 'Noto Sans',
                  }}>
                  87%
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#F00',
                    fontFamily: 'Noto Sans',
                  }}>
                  Match
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.modalMain}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Image
                source={require('../images/correctIcon.png')}
                style={{height: 90, width: 90}}
              />
            </View>
            <View style={{marginTop: 15, marginBottom: 10}}>
              <Text style={styles.modelText}>Congratulations !!! </Text>
              <Text style={styles.modelText}>
                {' '}
                You have successfully applied for the job.
              </Text>
            </View>
            <View>
              <Text style={{color: '#4FB988', fontSize: 12, marginBottom: 5}}>
                We have sent your:
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Image source={require('../images/cvImage.png')} />
                  <Text style={styles.docText}>CV</Text>
                </View>
                <View>
                  <Image source={require('../images/passwordImg.png')} />
                  <Text style={styles.docText}>Passport</Text>
                </View>
                <View>
                  <Image source={require('../images/docImg.png')} />
                  <Text style={styles.docText}>Experie....</Text>
                </View>
              </View>
            </View>
            <View style={{marginTop: 15}}>
              <Button title="Done" onPress={() => setShowModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  main: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation:5,
    paddingVertical:5
  },
  newText: {
    paddingHorizontal: 5,
    color: 'maroon',
    borderWidth:.5,
    borderRadius: 4,
    fontFamily: 'monospace',
    marginTop: 10,
    fontSize:12
  },
  navTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  jobName: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Noto Sans',
    color: '#000',
  },
  dateText: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Noto Sans',
    color: '#F00',
  },
  currencyText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Noto Sans',
    color: '#000',
    marginBottom: 3,
  },
  countryName: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Noto Sans',
    color: '#000',
  },
  messageText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Noto Sans',
    color: '#F00',
    marginBottom: 14,
  },
  boldText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Noto Sans',
    color: '#000',
    marginTop: 8,
    marginBottom: 4,
  },
  lightText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Noto Sans',
    color: '#000',
  },
  marginFix: {
    marginTop: -6,
    marginBottom: 6,
  },
  dot: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#000',
    marginHorizontal: 8,
  },
  modalMain: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    width: 350,
    borderColor: '#CCC',
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  modelText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Noto Sans',
  },
  docText: {
    marginVertical: 5,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Noto Sans',
    color: '#000',
  },
});
