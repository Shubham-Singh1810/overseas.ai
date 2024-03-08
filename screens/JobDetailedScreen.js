import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Button,
  Share,
  Modal
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import { useGlobalState } from '../GlobalProvider';
import {useFocusEffect} from '@react-navigation/native';
import {getJobById, applyJobApi} from '../services/job.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import Toast from 'react-native-toast-message';
const JobDetailedScreen = params => {
  useAndroidBackHandler(() => {
    params.navigation.navigate(params.route.params.backTo,
      {countryName:params?.route?.params?.countryName,
      departmentName:params.route.params.departmentName,
      departmentId:params?.route?.params?.departmentId,
      countryId:params?.route?.params?.countryId,
      hraDetails:params?.route?.params?.hraDetails
    });
    return true;
  });
  const {newTranslation} = useGlobalState()
  const [details, setDetails] = useState(null);
  const[loading,setLoading]=useState(true)
  const [showFacility, setShowFacility] = useState(false);
  const [showReqDoc, setShowReqDoc] = useState(false);
  const paramsJobId = params?.route?.params?.jobId;
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
      if (response?.data?.error) {
        Toast.show({
          type: 'error',
          text1: response?.data?.error,
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        visibilityTime: 3000,
      });
    }
  };
  const getJobByIdFunc = async () => {
    setLoading(true)
    try {
      let response = await getJobById(paramsJobId);
      setDetails(response.data.jobs);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getJobByIdFunc();
    }, [paramsJobId]),
  );
  function toTitleCase(inputString) {
    if (inputString && typeof inputString === 'string') {
      let words = inputString.split(' ');
      let titleCaseWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });
      return titleCaseWords.join(' ');
    } else {
      return inputString;
    }
  }
  const onShare = async (link) => {
    try {
      const result = await Share.share({
        message:
        link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <View style={styles.main}>
      <View>
        <Text
          style={{
            textAlign: 'right',
            color: 'green',
            fontSize: 12,
            margin: 3,
          }}>
          {newTranslation?.applyBefore} : {details?.jobDeadline}
        </Text>
        <Image
          style={{
            height: 200,
            marginTop: 3,
            width: '100%',
            resizeMode: 'stretch',
          }}
          source={{
            uri: details?.jobPhoto,
          }}
        />
        <View
          style={{
            position: 'relative',
            bottom: 200,
            right: 4,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.newText}>{details?.jobID}</Text>
        </View>
      </View>
      <View
        style={{
          marginTop: -20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <View>
          <Text style={styles.jobName}>{toTitleCase(details?.jobTitle)}</Text>
          {details?.jobWages ? (
            <Text style={styles.currencyText}>
              {details?.jobWages} {details?.jobWagesCurrencyType} ={' '}
              {Math.round(
                details?.jobWages * details?.jobLocationCountry?.currencyValue,
              )}{' '}
              INR / month
            </Text>
          ) : (
            <Text style={styles.currencyText}>{newTranslation?.salaryNegotiable}</Text>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical:5
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: `https://overseas.ai/storage/uploads/countryFlag/${details?.jobLocationCountry?.countryFlag}`,
            }}
            style={{height: 20, width: 20}}
          />
          <Text style={[{marginLeft: 9}, styles.otherDetail]}>
            {details?.jobLocationCountry?.name}
          </Text>
        </View>

        <Pressable onPress={()=>onShare(details?.jobUrl)}>
          <Image source={require("../images/shareIcon.png")}/>
        </Pressable>
      </View>
      <View style={{marginTop:7}}>
      <Button
        title={newTranslation?.applyNow}
        onPress={() => handleApplyJob(details?.id)}
        color="#035292"
        
      />
      </View>
      
      <ScrollView>
        <View style={styles.otherDetailsContainer}>
          <View style={[styles.tableItemPadding, styles.borderBottom]}>
            <Text style={[styles.tableText]}>{newTranslation?.jobPostedBy}</Text>
            <View style={[styles.flex, {marginTop: 5}]}>
              <Text
                style={[
                  styles.tableText,
                  {
                    marginRight: 6,
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    elevation: 2,
                    backgroundColor: '#fff',
                    borderRadius: 4,
                  },
                ]}>
                {details?.cmpName}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.flex,
              styles.tableItemPadding,
              styles.borderBottom,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={[styles.tableText]}>{newTranslation?.numberOfVacancy}</Text>
            <Text style={[styles.tableText]}>{details?.jobVacancyNo}</Text>
          </View>
          <View
            style={[
              styles.flex,
              styles.tableItemPadding,
              styles.borderBottom,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={[styles.tableText]}>{newTranslation?.ageLimit}</Text>
            <Text style={[styles.tableText]}>{details?.jobAgeLimit} years</Text>
          </View>
          <View
            style={[
              styles.flex,
              styles.tableItemPadding,
              styles.borderBottom,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={[styles.tableText]}>{newTranslation?.passportType}</Text>
            <Text style={[styles.tableText]}>{details?.passport_type}</Text>
          </View>
          <View
            style={[
              styles.flex,
              styles.tableItemPadding,
              styles.borderBottom,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={[styles.tableText]}>{newTranslation?.contractPeriod}</Text>
            <Text style={[styles.tableText]}>
              {details?.contract_period} months
            </Text>
          </View>
          {details?.cmpNameACT && <View
            style={[
              styles.flex,
              styles.tableItemPadding,
              styles.borderBottom,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={[styles.tableText]}>{newTranslation?.hiringCompany}</Text>
            <Text style={[styles.tableText, {width:200, textAlign:"right"}]}>
              {details?.cmpNameACT}
            </Text>
          </View>}
          

          <View
            style={[
              styles.flex,
              styles.tableItemPadding,
              styles.borderBottom,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={[styles.tableText]}>{newTranslation?.experienceRequired}</Text>
            <Text style={[styles.tableText]}>
              {details?.jobExpDuration} years
            </Text>
          </View>
          <View
            style={[
              styles.flex,
              styles.tableItemPadding,
              styles.borderBottom,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={[styles.tableText]}>{newTranslation?.experienceType}</Text>
            <Text style={[styles.tableText]}>
              {toTitleCase(details?.jobExpTypeReq)}
            </Text>
          </View>
          <View
            style={[
              styles.flex,
              styles.tableItemPadding,
              styles.borderBottom,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={[styles.tableText]}>{newTranslation?.interviewMode}</Text>
            <Text style={[styles.tableText]}>{details?.jobMode}</Text>
          </View>
          {details?.jobInterviewDate && (
            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>{newTranslation?.interviewDate}</Text>
              <Text style={[styles.tableText]}>
                {details?.jobInterviewDate}
              </Text>
            </View>
          )}

          {details?.jobInterviewPlace && (
            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>{newTranslation?.interviewMode}</Text>
              <Text style={[styles.tableText]}>
                {details?.jobInterviewPlace}
              </Text>
            </View>
          )}

          {/* <View
          style={[
            styles.flex,
            styles.tableItemPadding,
            styles.borderBottom,
            {justifyContent: 'space-between'},
          ]}>
          <Text style={[styles.tableText]}>Job Department</Text>
          <Text style={[styles.tableText]}>{details?.jobOccupation}</Text>
        </View> */}

          <View
            style={[
              styles.flex,
              styles.tableItemPadding,
              styles.borderBottom,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={[styles.tableText]}>{newTranslation?.workingDays}</Text>
            <Text style={[styles.tableText]}>{details?.jobWorkingDay}</Text>
          </View>
          <View
            style={[
              styles.flex,
              styles.tableItemPadding,
              styles.borderBottom,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={[styles.tableText]}>{newTranslation?.workingHours}</Text>
            <Text style={[styles.tableText]}>{details?.jobWorkingHour}</Text>
          </View>
          <View
            style={[
              styles.flex,
              styles.tableItemPadding,
              styles.borderBottom,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={[styles.tableText]}>{newTranslation?.overtime}</Text>
            <Text style={[styles.tableText]}>{details?.jobOvertime}</Text>
          </View>
          <Pressable
            onPress={() => setShowFacility(!showFacility)}
            style={[
              styles.flex,
              styles.tableItemPadding,
              styles.borderBottom,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={styles.tableText}>{newTranslation?.facilities}</Text>
            <View>
              <Image
                source={
                  !showFacility
                    ? require('../images/downArrow.png')
                    : require('../images/upArrow.png')
                }
              />
            </View>
          </Pressable>
          {showFacility &&
            details?.facilities?.map((v, i) => {
              return (
                <View
                  style={[
                    styles.tableItemPadding,
                    styles.borderBottom,
                    {backgroundColor: '#fff'},
                  ]}>
                  <Text style={styles.tableText}>{v}</Text>
                  <Image />
                </View>
              );
            })}
          <Pressable
            onPress={() => setShowReqDoc(!showReqDoc)}
            style={[
              styles.flex,
              styles.tableItemPadding,
              styles.borderBottom,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={styles.tableText}>{newTranslation?.requiredDocuments}</Text>
            <View>
              <Image
                source={
                  !showReqDoc
                    ? require('../images/downArrow.png')
                    : require('../images/upArrow.png')
                }
              />
            </View>
          </Pressable>
          {showReqDoc &&
            details?.required_documents?.map((v, i) => {
              return (
                <View
                  style={[
                    styles.tableItemPadding,
                    styles.borderBottom,
                    {backgroundColor: '#fff'},
                  ]}>
                  <Text style={styles.tableText}>{v}</Text>
                </View>
              );
            })}

          <View
            style={[
              styles.flex,
              styles.tableItemPadding,
              styles.borderBottom,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={[styles.tableText]}>{newTranslation?.salaryNegotiable}</Text>
            <Text style={[styles.tableText]}>{details?.salary_negotiable}</Text>
          </View>
          {details?.service_charge && (
            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText]}>{newTranslation?.serviceCharge}</Text>
              <Text style={[styles.tableText]}>
                {details?.service_charge} INR
              </Text>
            </View>
          )}

          {details?.jobDescription && (
            <View style={[styles.tableItemPadding, styles.borderBottom]}>
              <Text
                style={[styles.tableText, {textDecorationLine: 'underline'}]}>
                {newTranslation?.moreDetails} :
              </Text>
              <View style={[styles.flex, {marginTop: 5}]}>
                <Text style={[styles.tableText, {}]}>
                  {details?.jobDescription}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <Modal transparent={true} visible={loading} animationType="slide">
        <View style={{backgroundColor: 'rgba(0,0,0,0.1)', flex: 1}}></View>
      </Modal>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default JobDetailedScreen;

const styles = StyleSheet.create({
  main: {
    padding: 18,
    flex: 1,
    backgroundColor: '#fff',
  },
  currencyText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Noto Sans',
    color: '#000',
    marginBottom: 3,
  },
  newText: {
    paddingHorizontal: 5,
    color: 'maroon',
    borderWidth: 0.5,
    borderRadius: 4,
    fontFamily: 'monospace',
    marginTop: 10,
    fontSize: 12,
    backgroundColor: '#fff',
  },
  jobName: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Noto Sans',
    color: '#000',
    marginVertical: 5,
  },
  otherDetailsContainer: {
    backgroundColor: '#F1F7FF',
    marginTop: 15,
  },
  tableItemPadding: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#A6A6A6',
  },
  tableText: {
    fontSize: 14,
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    color: '#000',
  },
  flex: {
    flexDirection: 'row',
  },
});
