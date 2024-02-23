import {
  StyleSheet,
  Image,
  Modal,
  Text,
  View,
  Button,
  Pressable,
  Linking,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Pdf from 'react-native-pdf';
import React, {useState} from 'react';
import {
  appliedJobById,
  getInterviewById,
  uploadSignedDocForCaution,
  uploadMedicalForInterview,
} from '../services/job.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import { useGlobalState } from '../GlobalProvider';
const AppliedJobById = props => {
  useAndroidBackHandler(() => {
    if (props?.route?.params?.backTo) {
      props.navigation.navigate(props?.route?.params.backTo);
      return true;
    } else {
      props.navigation.navigate('Applied Job');
      return true;
    }
  });
  const {newTranslation} = useGlobalState();
  const [loading, showLoading] = useState(true);
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
    showLoading(true)
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getInterviewById(id, JSON.parse(user).access_token);
      setInterviewJobDetails(response.data);
      console.log(response?.data);
      showLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getAppliedJobById(props?.route?.params?.id);
      getInterviewDetails(props?.route?.params?.id);
    }, [props?.route?.params?.id]),
  );
  const [showInterviewPopUp, setShowInterviewPopUp] = useState(false);
  const [showOfferLetterPopUp, setShowOfferLetterPopUp] = useState(false);
  const handleFileDownload = async value => {
    Linking.openURL(value)
      .then(supported => {
        if (!supported) {
          console.warn(`Cannot handle URL: ${value}`);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };
  const handleGoogleMeet = async value => {
    Linking.openURL(value)
      .then(supported => {
        if (!supported) {
          console.warn(`Cannot handle URL: ${value}`);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };
  const [showDocUploader, setShowDocUploader] = useState(false);
  const [uploadSignedDoc, setUploadSignedDoc] = useState({
    cautionMoneyScreensort: '',
    signedOfferLatter: '',
  });
  const pickDocumentForPaymentScreenSort = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // You can specify the types of documents to pick
      });
      setUploadSignedDoc({
        ...uploadSignedDoc,
        cautionMoneyScreensort: result[0],
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        console.error('Error while picking a document', err);
      }
    }
  };
  const pickDocumentForSignedOffer = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // You can specify the types of documents to pick
      });
      setUploadSignedDoc({...uploadSignedDoc, signedOfferLatter: result[0]});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        console.error('Error while picking a document', err);
      }
    }
  };
  const handleUploadSignedDocuments = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      const formData = new FormData();
      formData.append('cautionMoneyScreenshot', {
        uri: uploadSignedDoc.cautionMoneyScreensort.uri,
        type: uploadSignedDoc.cautionMoneyScreensort.type,
        name: uploadSignedDoc.cautionMoneyScreensort.name,
      });
      formData.append('signedOfferLatter', {
        uri: uploadSignedDoc.signedOfferLatter.uri,
        type: uploadSignedDoc.signedOfferLatter.type,
        name: uploadSignedDoc.signedOfferLatter.name,
      });
      formData.append(
        'interviewId',
        interviewJobDetails?.InterviewStage2?.intTblId,
      );
      if (
        uploadSignedDoc.signedOfferLatter &&
        uploadSignedDoc.cautionMoneyScreensort
      ) {
        let response = await uploadSignedDocForCaution(
          formData,
          JSON.parse(user).access_token,
        );
        if (response?.data.message == 'Documents added successfully.') {
          setShowDocUploader(false);
          setUploadSignedDoc({
            cautionMoneyScreensort: '',
            signedOfferLatter: '',
          });
          Toast.show({
            type: 'success', // 'success', 'error', 'info', or any custom type you define
            position: 'top',
            text1: 'Documents added successfully.',
            visibilityTime: 3000, // Duration in milliseconds
          });
          getInterviewDetails(props?.route?.params?.id);
        } else {
          Toast.show({
            type: 'error', // 'success', 'error', 'info', or any custom type you define
            position: 'top',
            text1: 'Something went wrong',
            visibilityTime: 3000, // Duration in milliseconds
          });
        }
      } else {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Please enter both the fields',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error', // 'success', 'error', 'info', or any custom type you define
        position: 'top',
        text1: 'Internal Server Error',
        visibilityTime: 3000, // Duration in milliseconds
      });
    }
  };
  const [showPaymentPopUp, setShowPaymentPopUp] = useState(false);
  const [showMedicalPopUp, setShowMedicalPopUp] = useState(false);
  const [medicalPccForm, setMedicalPccForm] = useState({
    medicalReport: '',
    ppc: '',
  });
  const pickDocumentForMedical = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // You can specify the types of documents to pick
      });
      setMedicalPccForm({
        ...medicalPccForm,
        medicalReport: result[0],
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        console.error('Error while picking a document', err);
      }
    }
  };
  const pickDocumentForPCC = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // You can specify the types of documents to pick
      });
      setMedicalPccForm({...medicalPccForm, ppc: result[0]});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        console.error('Error while picking a document', err);
      }
    }
  };
  const handleUploadMedicalPcc = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      const formData = new FormData();
      formData.append('medicalReport', {
        uri: medicalPccForm.medicalReport.uri,
        type: medicalPccForm.medicalReport.type,
        name: medicalPccForm.medicalReport.name,
      });
      formData.append('ppc', {
        uri: medicalPccForm.ppc.uri,
        type: medicalPccForm.ppc.type,
        name: medicalPccForm.ppc.name,
      });
      formData.append(
        'interviewId',
        interviewJobDetails?.InterviewStage2?.intTblId,
      );
      if (medicalPccForm.medicalReport) {
        let response = await uploadMedicalForInterview(
          formData,
          JSON.parse(user).access_token,
        );
        if (response?.data.message == 'Data updated successfully') {
          setShowMedicalPopUp(false);
          setMedicalPccForm({
            medicalReport: '',
            ppc: '',
          });
          Toast.show({
            type: 'success', // 'success', 'error', 'info', or any custom type you define
            position: 'top',
            text1: 'Documents added successfully.',
            visibilityTime: 3000, // Duration in milliseconds
          });
          getInterviewDetails(props?.route?.params?.id);
        } else {
          Toast.show({
            type: 'error', // 'success', 'error', 'info', or any custom type you define
            position: 'top',
            text1: 'Something went wrong',
            visibilityTime: 3000, // Duration in milliseconds
          });
        }
      } else {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Medical is required field',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error', // 'success', 'error', 'info', or any custom type you define
        position: 'top',
        text1: 'Internal Server Error',
        visibilityTime: 3000, // Duration in milliseconds
      });
    }
  };
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
              title={newTranslation?.readDetails}
              color="#035292"
              onPress={() => {
                props.navigation.navigate('Job Details', {
                  jobId: appliedJobDetails.mainJobId,
                  backTo: 'Applied Job',
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
            {newTranslation?.appliedOn}- {appliedJobDetails?.appliedOn}
          </Text>
        </View>
      </View>
      <View style={{marginTop: 15}}>
        <Text style={styles.countryText}>{newTranslation?.status}</Text>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <View style={[styles.highlight, styles.backgroundColorGreen]}></View>
          <Text style={styles.textGreen}>{newTranslation?.applicationSentToHRA}</Text>
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        {interviewJobDetails?.data?.status == 0 &&
          interviewJobDetails?.data?.stageStepCount == 1 &&
          appliedJobDetails?.interviewStatus == 0 && (
            <>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={[styles.highlight, {backgroundColor: 'red'}]}></View>
                <Text style={{color: 'red'}}>{newTranslation?.applicationRejected}</Text>
              </View>
              <View style={styles.grayDot}></View>
              <View style={styles.grayDot}></View>
            </>
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
            {newTranslation?.interviewScheduled}
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
                <Text style={{color: 'black'}}>{newTranslation?.view}</Text>
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
          interviewJobDetails?.data?.status == 0 &&
          interviewJobDetails?.data?.stageStepCount == 2 && (
            <>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={[styles.highlight, {backgroundColor: 'red'}]}></View>
                <Text style={{color: 'red'}}>{newTranslation?.rejectedInInterview}</Text>
              </View>
              <View style={styles.grayDot}></View>
              <View style={styles.grayDot}></View>
            </>
          )}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={[
              styles.highlight,
              interviewJobDetails?.InterviewStage2?.afterInterviewStatus == 1 &&
                // interviewJobDetails?.data?.status == 1 &&
                interviewJobDetails?.data?.stage3 == 1 &&
                interviewJobDetails?.data?.offerLatterSent == 1 &&
                // appliedJobDetails?.interviewStatus == 1 &&
                styles.backgroundColorGreen,
            ]}></View>
          <Text
            style={
              interviewJobDetails?.InterviewStage2?.afterInterviewStatus == 1 &&
              // interviewJobDetails?.data?.status == 1 &&
              interviewJobDetails?.data?.stage3 == 1 &&
              interviewJobDetails?.data?.offerLatterSent == 1 &&
              // appliedJobDetails?.interviewStatus == 1 &&
              styles.textGreen
            }>
            {newTranslation?.selected}
          </Text>
          {interviewJobDetails?.data?.offerLatterSent == 1 && (
            <Pressable
              onPress={() =>
                handleFileDownload(
                  interviewJobDetails?.offerLetter_arr?.offerLetter,
                )
              }
              style={{
                borderWidth: 1,
                flexDirection: 'row',
                marginLeft: 10,
                paddingHorizontal: 2,
                borderRadius: 3,
                backgroundColor: '#F1F7FF',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black'}}>{newTranslation?.viewOfferLetter}</Text>
            </Pressable>
          )}
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={[
              styles.highlight,
              interviewJobDetails?.data?.offerLatterSent == 1 &&
                styles.backgroundColorGreen,
            ]}></View>
          <Text
            style={
              interviewJobDetails?.data?.offerLatterSent == 1 &&
              styles.textGreen
            }>
            {newTranslation?.signedOfferLetter}
          </Text>
          {interviewJobDetails?.data?.offerLatterSent == 1 &&
          interviewJobDetails?.data?.cautionMoneyStatus == 0 ? (
            <Pressable
              onPress={() => setShowDocUploader(true)}
              style={{
                borderWidth: 1,
                flexDirection: 'row',
                marginLeft: 10,
                paddingHorizontal: 2,
                borderRadius: 3,
                backgroundColor: '#F1F7FF',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black'}}>{newTranslation?.upload}</Text>
            </Pressable>
          ) : (
            interviewJobDetails?.data?.cautionMoneyStatus != 2 &&
            interviewJobDetails?.data?.offerLatterSent != 0 && (
              <Pressable
                onPress={() => setShowPaymentPopUp(true)}
                style={{
                  borderWidth: 1,
                  flexDirection: 'row',
                  marginLeft: 10,
                  paddingHorizontal: 2,
                  borderRadius: 3,
                  backgroundColor: '#F1F7FF',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black'}}>{newTranslation?.view}</Text>
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
            )
          )}
        </Pressable>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={[
              styles.highlight,
              interviewJobDetails?.data?.cautionMoneyStatus == 2 &&
                styles.backgroundColorGreen,
            ]}></View>
          <Text
            style={[
              interviewJobDetails?.data?.cautionMoneyStatus == 2 &&
                styles.textGreen,
            ]}>
            {newTranslation?.medicalAndPCC}
          </Text>
          {interviewJobDetails?.data?.cautionMoneyStatus == 2 &&
            interviewJobDetails?.data?.stageStepCount == 3 &&
            interviewJobDetails?.data?.stage4 == 0 && (
              <Pressable
                onPress={() => setShowMedicalPopUp(true)}
                style={{
                  borderWidth: 1,
                  flexDirection: 'row',
                  marginLeft: 10,
                  paddingHorizontal: 2,
                  borderRadius: 3,
                  backgroundColor: '#F1F7FF',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black'}}>{newTranslation?.upload}</Text>
              </Pressable>
            )}
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        {interviewJobDetails?.data?.stageStepCount == 4 &&
          interviewJobDetails?.data?.status == 0 && (
            <>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={[styles.highlight, {backgroundColor: 'red'}]}></View>
                <Text style={{color: 'red'}}>{newTranslation?.visaApplicationRejected}</Text>
              </View>
              <View style={styles.grayDot}></View>
              <View style={styles.grayDot}></View>
            </>
          )}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={[
              styles.highlight,
              interviewJobDetails?.data?.cautionMoneyStatus == 2 &&
                interviewJobDetails?.data?.stageStepCount == 5 &&
                interviewJobDetails?.data?.stage5 == 1 &&
                styles.backgroundColorGreen,
            ]}></View>
          <Text
            style={[
              interviewJobDetails?.data?.cautionMoneyStatus == 2 &&
                interviewJobDetails?.data?.stageStepCount == 5 &&
                interviewJobDetails?.data?.stage5 == 1 &&
                styles.textGreen,
            ]}>
            {newTranslation?.visaReleased}
          </Text>
          {interviewJobDetails?.data?.cautionMoneyStatus == 2 &&
            interviewJobDetails?.data?.stageStepCount == 5 &&
            interviewJobDetails?.data?.stage5 == 1 && (
              <Pressable
                onPress={() =>
                  handleFileDownload(interviewJobDetails?.InterviewStage4?.visa)
                }
                style={{
                  borderWidth: 1,
                  flexDirection: 'row',
                  marginLeft: 10,
                  paddingHorizontal: 2,
                  borderRadius: 3,
                  backgroundColor: '#F1F7FF',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black'}}>{newTranslation?.view}</Text>
              </Pressable>
            )}
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={[
              styles.highlight,
              interviewJobDetails?.data?.cautionMoneyStatus == 2 &&
                interviewJobDetails?.data?.stageStepCount == 5 &&
                interviewJobDetails?.data?.stage5 == 1 &&
                interviewJobDetails?.InterviewStage4?.ticket !=
                  '/placeholder/no-doc-found.jpg' &&
                styles.backgroundColorGreen,
            ]}></View>
          <Text
            style={[
              interviewJobDetails?.data?.cautionMoneyStatus == 2 &&
                interviewJobDetails?.data?.stageStepCount == 5 &&
                interviewJobDetails?.data?.stage5 == 1 &&
                interviewJobDetails?.InterviewStage4?.ticket !=
                  '/placeholder/no-doc-found.jpg' &&
                styles.textGreen,
            ]}>
            {newTranslation?.ticketReleased}
          </Text>
          {interviewJobDetails?.data?.cautionMoneyStatus == 2 &&
            interviewJobDetails?.data?.stageStepCount == 5 &&
            interviewJobDetails?.data?.stage5 == 1 &&
            interviewJobDetails?.InterviewStage4?.ticket !=
              '/placeholder/no-doc-found.jpg' && (
              <Pressable
                onPress={() =>
                  handleFileDownload(
                    interviewJobDetails?.InterviewStage4?.ticket,
                  )
                }
                style={{
                  borderWidth: 1,
                  flexDirection: 'row',
                  marginLeft: 10,
                  paddingHorizontal: 2,
                  borderRadius: 3,
                  backgroundColor: '#F1F7FF',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'black'}}>{newTranslation?.view}</Text>
              </Pressable>
            )}
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.highlight}></View>
          <Text>{newTranslation?.applyForCautionMoney}</Text>
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.highlight}></View>
          <Text>{newTranslation?.cautionMoneyRepay}</Text>
        </View>
      </View>
      {interviewJobDetails?.data?.cautionMoneyStatus == 2 &&
        interviewJobDetails?.data?.stageStepCount == 5 &&
        interviewJobDetails?.data?.stage5 == 1 &&
        interviewJobDetails?.InterviewStage4?.ticket !=
          '/placeholder/no-doc-found.jpg' && (
          <View>
            <Text
              style={{
                color: 'green',
                fontSize: 18,
                fontWeight: '600',
                marginVertical: 20,
                textAlign: 'center',
                padding:10
              }}>
              {newTranslation?.congoMess}
            </Text>
          </View>
        )}
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
                {newTranslation?.interviewMode} :{' '}
                {interviewJobDetails?.data?.interviewMode
                  ?.charAt(0)
                  ?.toUpperCase() +
                  interviewJobDetails?.data?.interviewMode?.slice(1)}
              </Text>
              <Pressable onPress={() => setShowInterviewPopUp(false)}>
                <Image source={require('../images/close.png')} />
              </Pressable>
            </View>
            <View>
              <Text style={{color: 'black', fontSize: 15, marginBottom: 3}}>
                {newTranslation?.interviewDate} :{' '}
                {interviewJobDetails?.interviewModeData?.interviewDate && moment(
                  interviewJobDetails?.interviewModeData?.interviewDate,
                ).format('MMM Do YY')}{' '}
              </Text>
              <Text style={{color: 'black', fontSize: 15, marginBottom: 3}}>
                {newTranslation?.interviewTime} :{' '}
                {interviewJobDetails?.interviewModeData?.interviewTime}
              </Text>
              {interviewJobDetails?.data?.interviewMode == 'offline' ? (
                <View>
                  <Text style={{color: 'black', fontSize: 15, marginBottom: 3}}>
                    {newTranslation?.state} :{' '}
                    {
                      interviewJobDetails?.interviewModeData?.interview_state
                        .name
                    }
                  </Text>
                  <Text style={{color: 'black', fontSize: 15, marginBottom: 3}}>
                    {newTranslation?.pinCode} : {interviewJobDetails?.interviewModeData?.pin}
                  </Text>
                  <Text style={{color: 'black', fontSize: 15, marginBottom: 3}}>
                    {newTranslation?.interviewLocation} :{' '}
                    {interviewJobDetails?.interviewModeData?.officialAddress}
                  </Text>
                </View>
              ) : (
                <View style={{marginBottom: 3}}>
                  {interviewJobDetails?.interviewModeData?.googleMeetLink ? (
                    <Pressable
                      onPress={() =>
                        handleGoogleMeet(
                          interviewJobDetails?.interviewModeData
                            ?.googleMeetLink,
                        )
                      }>
                      <Text style={{color: 'black', fontSize: 15}}>
                        {newTranslation?.joinNow}
                      </Text>
                    </Pressable>
                  ) : (
                    <Text style={{color: 'black', fontSize: 15}}>
                      {newTranslation?.meetingLinkWillBeUpdatedSoon}
                    </Text>
                  )}
                </View>
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
                {newTranslation?.offerLetter}
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
                source={{
                  uri: interviewJobDetails?.offerLetter_arr?.offerLetter,
                  cache: true,
                }}
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
                  onPress={() =>
                    handleFileDownload(
                      interviewJobDetails?.offerLetter_arr?.offerLetter,
                    )
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* upload signed offer letter */}
      <Modal transparent={true} visible={showDocUploader} animationType="slide">
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
                {newTranslation?.uploadSignedOfferLetter}
              </Text>
              <Pressable onPress={() => setShowDocUploader(false)}>
                <Image source={require('../images/close.png')} />
              </Pressable>
            </View>
            <View>
              <Text style={{color: 'green', fontWeight: '600'}}>
                {' '}
                <Text style={{color: 'black'}}>Note</Text> :
                 {newTranslation?.noteMessage}
              </Text>
              <Image
                style={{height: 250, marginVertical: 15, width: '100%'}}
                source={require('../images/upiUrl.jpeg')}
              />

              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: 'black'}}>{newTranslation?.cautionAmount} :100</Text>
                {/* <Pressable onPress={handlePayNow}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                  fontWeight: '500',
                  textAlign: 'center',
                  backgroundColor:"#035292",
                  borderWidth:1,
                  paddingHorizontal:5,
                  borderRadius:2
                }}>
                Pay Now
              </Text>
              </Pressable> */}
              </View>

              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: 'gray',
                  paddingVertical: 16,
                }}>
                <Pressable
                  onPress={pickDocumentForPaymentScreenSort}
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    padding: 14,
                    marginBottom: 16,
                    borderRadius: 8,
                  }}>
                  <Text>
                    {uploadSignedDoc?.cautionMoneyScreensort == ''
                      ? newTranslation?.selectpaymentScreensort
                      : newTranslation?.selected}{' '}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={pickDocumentForSignedOffer}
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    padding: 14,
                    borderRadius: 8,
                  }}>
                  <Text>
                    {uploadSignedDoc.signedOfferLatter == ''
                      ? newTranslation?.selectSignedOfferLetter
                      : newTranslation?.selected}
                  </Text>
                </Pressable>
              </View>
              <View>
                <Button
                  title={newTranslation?.upload}
                  onPress={() => handleUploadSignedDocuments()}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={showPaymentPopUp}
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
                {newTranslation?.paymentStatus}
              </Text>
              <Pressable onPress={() => setShowPaymentPopUp(false)}>
                <Image source={require('../images/close.png')} />
              </Pressable>
            </View>
            <View>
              <View
                style={{
                  paddingVertical: 16,
                }}>
                {interviewJobDetails?.data?.cautionMoneyStatus == 1 && (
                  <Text
                    style={{
                      color: '#ffc107',
                      backgroundColor: 'gray',
                      padding: 6,
                      textAlign: 'center',
                      borderRadius: 4,
                      fontSize: 16,
                    }}>
                    {newTranslation?.waitingForAdminApproval}
                  </Text>
                )}
                {interviewJobDetails?.data?.cautionMoneyStatus == -1 && (
                  <Text
                    style={{
                      color: 'red',
                      backgroundColor: '#000',
                      padding: 6,
                      textAlign: 'center',
                      borderRadius: 4,
                      fontSize: 16,
                    }}>
                    {newTranslation?.paymentMarkedAsRejected}
                  </Text>
                )}
                {interviewJobDetails?.data?.cautionMoneyStatus == 2 && (
                  <Text
                    style={{
                      color: 'green',
                      padding: 6,
                      textAlign: 'center',
                      borderRadius: 4,
                      fontSize: 16,
                    }}>
                    {newTranslation?.paymentMarkedAsSuccessfull}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* upload signed offer letter */}
      <Modal
        transparent={true}
        visible={showMedicalPopUp}
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
                Upload Medical / PCC
              </Text>
              <Pressable onPress={() => setShowMedicalPopUp(false)}>
                <Image source={require('../images/close.png')} />
              </Pressable>
            </View>
            <View>
              <View
                style={{
                  paddingVertical: 16,
                }}>
                <Text
                  style={{
                    color: '#000',
                    margin: 4,
                    fontSize: 12,
                    fontWeight: '500',
                  }}>
                  Medical*
                </Text>
                <Pressable
                  onPress={pickDocumentForMedical}
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    padding: 14,
                    marginBottom: 16,
                    borderRadius: 8,
                  }}>
                  <Text>
                    {medicalPccForm?.medicalReport == ''
                      ? 'Select Medical'
                      : newTranslation?.selected}{' '}
                  </Text>
                </Pressable>
                <Text
                  style={{
                    color: '#000',
                    margin: 4,
                    fontSize: 12,
                    fontWeight: '500',
                  }}>
                  PCC if applicable
                </Text>
                <Pressable
                  onPress={pickDocumentForPCC}
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    padding: 14,
                    borderRadius: 8,
                  }}>
                  <Text>
                    {medicalPccForm?.ppc == '' ? newTranslation?.selectPCC : newTranslation?.selected}
                  </Text>
                </Pressable>
              </View>
              <View>
                <Button
                  title={newTranslation?.upload}
                  onPress={() => handleUploadMedicalPcc()}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={loading} animationType="slide">
        <View style={{backgroundColor: 'rgba(0,0,0,0.1)', flex: 1}}></View>
      </Modal>
      <Toast ref={ref => Toast.setRef(ref)} />
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
