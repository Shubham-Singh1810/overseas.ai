import {
  StyleSheet,
  Image,
  Modal,
  Text,
  View,
  Button,
  Pressable,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {useState, useEffect} from 'react';
import {appliedJobById, getInterviewById} from '../services/job.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
const AppliedJobById = props => {
  const [appliedJobDetails, setAppliedJobDetails] = useState();
  const getAppliedJobById = async id => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await appliedJobById(id, JSON.parse(user).access_token);
      setAppliedJobDetails(response?.data?.job);
    } catch (error) {}
  };
  const [interviewJobDetails, setInterviewJobDetails] = useState();
  const getInterviewDetails = async id => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getInterviewById(id, JSON.parse(user).access_token);
      setInterviewJobDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAppliedJobById(props?.route?.params?.id);
    getInterviewDetails(props?.route?.params?.id);
  }, [props?.route?.params?.id]);
  const [showInterviewPopUp, setShowInterviewPopUp] = useState(false);
  const [showOfferLetterPopUp, setShowOfferLetterPopUp] = useState(false);
  return (
    <View style={styles.main}>
      <View style={{marginTop: 0}}>
        <Text style={[styles.heading]}>{appliedJobDetails?.jobTitle}</Text>
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={[styles.companyName, {maxWidth: 150, flexWrap: 'wrap'}]}>
              {appliedJobDetails?.jobCompany}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Image
                source={{
                  uri: `https://overseas.ai/storage/uploads/countryFlag/${appliedJobDetails?.countryFlag}`,
                }}
                style={{
                  marginRight: 8,
                  height: 26,
                  width: 26,
                  borderRadius: 13,
                }}
              />
              <Text style={styles.countryText}>
                {appliedJobDetails?.jobCountry}
              </Text>
            </View>
            <Text style={styles.currency}>
              {appliedJobDetails?.jobWages}{' '}
              {appliedJobDetails?.jobWagesCurrencyType}
            </Text>
            <Button
              title="View Details"
              color="#035292"
              onPress={() => {
                props.navigation.navigate('Job Details', {
                  jobId: appliedJobDetails.mainJobId,
                });
              }}
            />
          </View>
          <View>
            <Image
              style={{
                height: 120,
                width: 120,
                marginVertical: 10,
                borderRadius: 10,
              }}
              source={{
                uri: appliedJobDetails?.jobPhoto,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Text style={styles.date}>
            Applied on - {appliedJobDetails?.appliedOn}
          </Text>
        </View>
      </View>
      <View style={{marginTop: 15}}>
        <Text style={styles.countryText}>Status</Text>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <View style={[styles.highlight, styles.backgroundColorGreen]}></View>
          <Text style={styles.textGreen}>Application Sent to HRA</Text>
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        {interviewJobDetails?.data?.status == 0 &&
          appliedJobDetails?.interviewStatus == 0 && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={[styles.highlight, {backgroundColor: 'red'}]}></View>
              <Text style={{color: 'red'}}>Application Rejected</Text>
            </View>
          )}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={[
              styles.highlight,
              interviewJobDetails?.data?.stageStepCount >= 2 &&
                styles.backgroundColorGreen,
            ]}></View>
          <Text
            style={
              interviewJobDetails?.data?.stageStepCount >= 2 && styles.textGreen
            }>
            Interview Scheduled
          </Text>
          {interviewJobDetails?.data?.status == 1 &&
            interviewJobDetails?.data?.stage2 == 1 &&
            interviewJobDetails?.data?.stageStepCount == 2 &&
            appliedJobDetails?.interviewStatus == 1 && (
              <Pressable
                onPress={() => setShowInterviewPopUp(true)}
                style={{
                  borderWidth: 1,
                  flexDirection: 'row',
                  marginLeft: 10,
                  paddingHorizontal: 2,
                  borderRadius: 3,
                  backgroundColor: '#F1F7FF',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black'}}>View</Text>
                <Image
                  source={require('../images/infoIcon.png')}
                  style={{
                    height: 14,
                    width: 14,
                    resizeMode: 'contain',
                    marginLeft: 5,
                  }}
                />
              </Pressable>
            )}
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        {interviewJobDetails?.InterviewStage2?.afterInterviewStatus == 0 &&
          appliedJobDetails?.interviewStatus == 0 &&
          interviewJobDetails?.data?.status == 0 && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={[styles.highlight, {backgroundColor: 'red'}]}></View>
              <Text style={{color: 'red'}}>Application Rejected</Text>
            </View>
          )}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={[
              styles.highlight,
              interviewJobDetails?.InterviewStage2?.afterInterviewStatus == 1 &&
                interviewJobDetails?.data?.status == 1 &&
                interviewJobDetails?.data?.stage3 == 1 &&
                interviewJobDetails?.data?.offerLatterSent == 1 &&
                appliedJobDetails?.interviewStatus == 1 &&
                styles.backgroundColorGreen,
            ]}></View>
          <Text
            style={
              interviewJobDetails?.InterviewStage2?.afterInterviewStatus == 1 &&
              interviewJobDetails?.data?.status == 1 &&
              interviewJobDetails?.data?.stage3 == 1 &&
              interviewJobDetails?.data?.offerLatterSent == 1 &&
              appliedJobDetails?.interviewStatus == 1 &&
              styles.textGreen
            }>
            Selected
          </Text>
          {interviewJobDetails?.data?.offerLatterSent == 1 && (
            <Pressable
              onPress={() => setShowOfferLetterPopUp(true)}
              style={{
                borderWidth: 1,
                flexDirection: 'row',
                marginLeft: 10,
                paddingHorizontal: 2,
                borderRadius: 3,
                backgroundColor: '#F1F7FF',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black'}}>View Offer Letter</Text>
            </Pressable>
          )}
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.highlight}></View>
          <Text>Pay Caution Money</Text>
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.highlight}></View>
          <Text>Upload Documents</Text>
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.highlight}></View>
          <Text>Visa Relised</Text>
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.highlight}></View>
          <Text>Apply for caution money</Text>
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.highlight}></View>
          <Text>Caution Money Repay</Text>
        </View>
      </View>
      {/* interview details popup */}
      <Modal
        transparent={true}
        visible={showInterviewPopUp}
        animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              width: 340,
              padding: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
                Interview Mode :{' '}
                {interviewJobDetails?.data?.interviewMode
                  .charAt(0)
                  .toUpperCase() +
                  interviewJobDetails?.data?.interviewMode.slice(1)}
              </Text>
              <Pressable onPress={() => setShowInterviewPopUp(false)}>
                <Image source={require('../images/close.png')} />
              </Pressable>
            </View>
            <View>
              <Text style={{color: 'black', fontSize: 15, marginBottom: 3}}>
                Interview Date :{' '}
                {moment(
                  interviewJobDetails?.interviewModeData?.interviewDate,
                ).format('MMM Do YY')}{' '}
              </Text>
              <Text style={{color: 'black', fontSize: 15, marginBottom: 3}}>
                Interview Time :{' '}
                {interviewJobDetails?.interviewModeData?.interviewTime}
              </Text>
              {interviewJobDetails?.data?.interviewMode == 'offline' ? (
                <View>
                  <Text style={{color: 'black', fontSize: 15, marginBottom: 3}}>
                    State :{' '}
                    {
                      interviewJobDetails?.interviewModeData?.interview_state
                        .name
                    }
                  </Text>
                  <Text style={{color: 'black', fontSize: 15, marginBottom: 3}}>
                    PIN : {interviewJobDetails?.interviewModeData?.pin}
                  </Text>
                  <Text style={{color: 'black', fontSize: 15, marginBottom: 3}}>
                    Interview Location :{' '}
                    {interviewJobDetails?.interviewModeData?.officialAddress}
                  </Text>
                </View>
              ) : (
                <Text style={{color: 'black', fontSize: 15, marginBottom: 3}}>
                  {interviewJobDetails?.interviewModeData?.googleMeetLink
                    ? interviewJobDetails?.interviewModeData?.googleMeetLink
                    : 'Meeting Link will be updated soon.'}
                </Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
      {/* offer letter view popup */}
      <Modal
        transparent={true}
        visible={showOfferLetterPopUp}
        animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              width: 340,
              padding: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
                Offer Letter
              </Text>
              <Pressable onPress={() => setShowOfferLetterPopUp(false)}>
                <Image source={require('../images/close.png')} />
              </Pressable>
            </View>
            <View>
              {/* <Image
                style={{height: 450, marginVertical: 15, width: '100%'}}

                source={require('../images/hraDummyIcon.png')}
              /> */}
              <Pdf
                  trustAllCerts={false}
                  source={{uri: interviewJobDetails?.offerLetter_arr?.offerLetter, cache: true}}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`current page: ${page}`);
                  }}
                  onError={error => {
                    console.log(error);
                  }}
                  onPressLink={uri => {
                    console.log(`Link presse: ${uri}`);
                  }}
                  style={{height: 450, marginVertical: 15, width: '100%'}}
                />
              <View>
                <Button
                  title="Download"
                  onPress={() => console.warn('Download the  Offer Letter')}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AppliedJobById;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
    padding: 18,
  },
  heading: {
    color: '#0F0C0C',
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Nato Sans',
  },
  date: {
    color: '#000',
    fontSize: 10,
    fontWeight: '300',
    fontFamily: 'Nato Sans',
  },
  grayDot: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: 'gray',
    marginRight: 10,
    marginVertical: 3,
    marginLeft: 3,
  },
  highlight: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 7,
    borderColor: 'black',
    borderWidth: 1,
  },
  backgroundColorGreen: {
    backgroundColor: '#4FB988',
  },
  currency: {
    marginVertical: 10,
    color: '#0F0C0C',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Nato Sans',
  },
  countryText: {
    color: '#0F0C0C',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  },

  companyName: {
    color: '#0F0C0C',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
    marginTop: 10,
  },
  textGreen: {
    color: '#4FB988',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  },
});
