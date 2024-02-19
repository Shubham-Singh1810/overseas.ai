import {
  StyleSheet,
  Image,
  Modal,
  Text,
  View,
  Button,
  Pressable,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Pdf from 'react-native-pdf';
import {useState, useEffect} from 'react';
import {appliedJobById, getInterviewById, uploadSignedDocForCaution , uploadMedicalForInterview} from '../services/job.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
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
  const handleFileDownload = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to save files.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('Storage permission granted');
      } else {
        console.warn('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const [showDocUploader,setShowDocUploader]=useState(false)
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
      formData.append("cautionMoneyScreenshot", {
        uri: uploadSignedDoc.cautionMoneyScreensort.uri,
        type: uploadSignedDoc.cautionMoneyScreensort.type,
        name: uploadSignedDoc.cautionMoneyScreensort.name,
      })
      formData.append("signedOfferLatter", {
        uri: uploadSignedDoc.signedOfferLatter.uri,
        type: uploadSignedDoc.signedOfferLatter.type,
        name: uploadSignedDoc.signedOfferLatter.name,
      })
      formData.append("interviewId", interviewJobDetails?.InterviewStage2?.intTblId);
      if(uploadSignedDoc.signedOfferLatter && uploadSignedDoc.cautionMoneyScreensort){
        let response = await uploadSignedDocForCaution(formData, JSON.parse(user).access_token);
        if(response?.data.message=="Documents added successfully."){
          setShowDocUploader(false);
          setUploadSignedDoc({
            cautionMoneyScreensort: '',
            signedOfferLatter: '',
          })
          Toast.show({
            type: 'success', // 'success', 'error', 'info', or any custom type you define
            position: 'top',
            text1: 'Documents added successfully.',
            visibilityTime: 3000, // Duration in milliseconds
          });
          getInterviewDetails(props?.route?.params?.id);
        }
        else{
          Toast.show({
            type: 'error', // 'success', 'error', 'info', or any custom type you define
            position: 'top',
            text1: 'Something went wrong',
            visibilityTime: 3000, // Duration in milliseconds
          });
        }
      }else{
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
  const [showPaymentPopUp, setShowPaymentPopUp]=useState(false);
  const [showMedicalPopUp, setShowMedicalPopUp]=useState(false);
  const [medicalPccForm, setMedicalPccForm]=useState({
    medicalReport:"",
    ppc:""
  })
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
      formData.append("medicalReport", {
        uri: medicalPccForm.medicalReport.uri,
        type: medicalPccForm.medicalReport.type,
        name: medicalPccForm.medicalReport.name,
      })
      formData.append("ppc", {
        uri: medicalPccForm.ppc.uri,
        type: medicalPccForm.ppc.type,
        name: medicalPccForm.ppc.name,
      })
      formData.append("interviewId", interviewJobDetails?.InterviewStage2?.intTblId);
      if(medicalPccForm.medicalReport){
        let response = await uploadMedicalForInterview(formData, JSON.parse(user).access_token);
        if(response?.data.message=="Data updated successfully"){
          setShowMedicalPopUp(false);
          setMedicalPccForm({
            medicalReport:"",
            ppc:""
          })
          Toast.show({
            type: 'success', // 'success', 'error', 'info', or any custom type you define
            position: 'top',
            text1: 'Documents added successfully.',
            visibilityTime: 3000, // Duration in milliseconds
          });
          getInterviewDetails(props?.route?.params?.id);
        }
        else{
          Toast.show({
            type: 'error', // 'success', 'error', 'info', or any custom type you define
            position: 'top',
            text1: 'Something went wrong',
            visibilityTime: 3000, // Duration in milliseconds
          });
        }
      }else{
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
        <Pressable  style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={[styles.highlight, (interviewJobDetails?.data?.offerLatterSent == 1) && styles.backgroundColorGreen]}></View>
          <Text style={(interviewJobDetails?.data?.offerLatterSent == 1) && styles.textGreen}>Signed Offer Letter</Text>
          {(interviewJobDetails?.data?.offerLatterSent == 1 && interviewJobDetails?.data?.cautionMoneyStatus == 0) ?
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
              <Text style={{color: 'black'}}>Upload</Text>
            </Pressable> : 
            interviewJobDetails?.data?.cautionMoneyStatus != 2 && <Pressable
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
            }
        </Pressable>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={[styles.highlight, interviewJobDetails?.data?.cautionMoneyStatus == 2 && styles.backgroundColorGreen]}></View>
          <Text style={[ interviewJobDetails?.data?.cautionMoneyStatus == 2 && styles.textGreen]}>Medical And PCC</Text> 
          {interviewJobDetails?.data?.cautionMoneyStatus == 2 && interviewJobDetails?.data?.stageStepCount==3 && interviewJobDetails?.data?.stage4==0 && <Pressable
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
              <Text style={{color: 'black'}}>Upload</Text>
            </Pressable>}
          
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={[styles.highlight, (interviewJobDetails?.data?.cautionMoneyStatus == 2 && interviewJobDetails?.data?.stageStepCount==5 && interviewJobDetails?.data?.stage5==1) && styles.backgroundColorGreen]}></View>
          <Text style={[(interviewJobDetails?.data?.cautionMoneyStatus == 2 && interviewJobDetails?.data?.stageStepCount==5 && interviewJobDetails?.data?.stage5==1) && styles.textGreen ]}>Visa and Ticket Relised</Text>
          {(interviewJobDetails?.data?.cautionMoneyStatus == 2 && interviewJobDetails?.data?.stageStepCount==5 && interviewJobDetails?.data?.stage5==1) && (
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
              <Text style={{color: 'black'}}>View</Text>
            </Pressable>
          )}
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
                <Button title="Download" onPress={() => handleFileDownload()} />
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
                Upload Signed Offer Letter
              </Text>
              <Pressable onPress={() => setShowDocUploader(false)}>
                <Image source={require('../images/close.png')} />
              </Pressable>
            </View>
            <View>
              <Text style={{color:"green", fontWeight:"600"}}> <Text style={{color:"black"}}>Note</Text> : You will get your caution back once you get placed successfully.</Text>
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
                <Text style={{color: 'black'}}>Caution Amount :100</Text>
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
                  <Text>{uploadSignedDoc?.cautionMoneyScreensort ==""? "Select Payment Screensort":"Selected"} </Text>
                </Pressable>
                <Pressable
                  onPress={pickDocumentForSignedOffer}
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    padding: 14,
                    borderRadius: 8,
                  }}>
                  <Text>{uploadSignedDoc.signedOfferLatter==""? "Select Signed Offer Letter": "Selected"}</Text>
                </Pressable>
              </View>
              <View>
                <Button title="Upload" onPress={() => handleUploadSignedDocuments()} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={showPaymentPopUp} animationType="slide">
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
                Payment Status
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
                  {interviewJobDetails?.data?.cautionMoneyStatus==1 && <Text style={{color:"#ffc107", backgroundColor:"gray",padding:6,textAlign:"center",borderRadius:4, fontSize:16}}>Waiting for Admin Approval</Text>}
                  {interviewJobDetails?.data?.cautionMoneyStatus==-1 && <Text style={{color:"red", backgroundColor:"#000",padding:6,textAlign:"center",borderRadius:4, fontSize:16}}>Payment marked as Rejected</Text>}
                  {interviewJobDetails?.data?.cautionMoneyStatus==2 && <Text style={{color:"green",padding:6,textAlign:"center",borderRadius:4, fontSize:16}}>Payment marked as Successful !</Text>}
              </View>
              
            </View>
          </View>
        </View>
      </Modal>
      {/* upload signed offer letter */}
      <Modal transparent={true} visible={showMedicalPopUp} animationType="slide">
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
                  <Text style={{color:"#000",margin:4, fontSize:12, fontWeight:"500"}}>Medical*</Text>
                <Pressable
                  onPress={pickDocumentForMedical}
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    padding: 14,
                    marginBottom: 16,
                    borderRadius: 8,
                  }}>
                  <Text>{medicalPccForm?.medicalReport ==""? "Select Medical":"Selected"} </Text>
                </Pressable>
                <Text style={{color:"#000",margin:4, fontSize:12, fontWeight:"500"}}>PCC if applicable</Text>
                <Pressable
                  onPress={pickDocumentForPCC}
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    padding: 14,
                    borderRadius: 8,
                  }}>
                  <Text>{medicalPccForm?.ppc ==""? "Select PCC": "Selected"}</Text>
                </Pressable>
              </View>
              <View>
                <Button title="Upload" onPress={() => handleUploadMedicalPcc()} />
              </View>
            </View>
          </View>
        </View>
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
