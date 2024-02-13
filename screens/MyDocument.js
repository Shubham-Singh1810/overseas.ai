import {
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {
  addPassportApi,
  getPassportDetails,
  editPassportApi,
  addCvApi,
  addCovidCertificateApi
} from '../services/user.service';
import Toast from 'react-native-toast-message';
import {useGlobalState} from '../GlobalProvider';
import DocumentUploader from '../components/DocumentUploader';
import DatePicker from 'react-native-modern-datepicker';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyDocument = props => {
  const {translation} = useGlobalState();
  // function to upload passport
  const uploadPassport = () => {
    setShowPassportPopUp(true);
    setPassportFormType('Add');
    setPassportForm({
      passportNumber: '',
      passportCategory: '',
      passportIssueDate: '',
      passportExpDate: '',
      placeOfIssue: '',
      frontPage: '',
      backPage: '',
    });
  };
  // function to upload cv
  const uploadCv = async() => {
    let user = await AsyncStorage.getItem('user');
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // You can specify the types of documents to pick
      });
      const formData = new FormData()
      formData.append("empCV", {
        uri: result[0].uri,
        type: result[0].type,
        name: result[0].name,
      })
      let response = await addCvApi(formData, JSON.parse(user).access_token)
      if(response.data.msg=="CV uploaded successfully."){
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'CV uploaded successfully.',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
      if(response.data.msg=="CV already uploaded."){
        Toast.show({
          type: 'info', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'CV already uploaded.',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'No file Selected',
          visibilityTime: 3000, // Duration in milliseconds
        });
        // User canceled the document picker
      } else {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Internal server error',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    }
  };

  // function to upload EXPERIENCE
  const uploadExperience = () => {
    props.navigation.navigate('My Experience');
  };
  // function to upload dl
  const uploadDl = () => {
    console.warn('passport upload dl');
  };
  // function to upload covid
  const uploadCovid = async() => {
    let user = await AsyncStorage.getItem('user');
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // You can specify the types of documents to pick
      });
      const formData = new FormData()
      formData.append("covidCertificate", {
        uri: result[0].uri,
        type: result[0].type,
        name: result[0].name,
      })
      let response = await addCovidCertificateApi(formData, JSON.parse(user).access_token)
      if(response.data.msg=="Covid certificate uploaded successfully."){
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Covid certificate uploaded successfully.',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
      if(response.data.msg=="Covid certificate already uploaded."){
        Toast.show({
          type: 'info', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Covid certificate already uploaded.',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'No file selected',
          visibilityTime: 3000, // Duration in milliseconds
        });
      } else {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Internal server error',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    }
  };

  // Add Passport func
  const [showPassportPopUp, setShowPassportPopUp] = useState(false);
  const [showPassportIssueCalender, setShowPassportIssueCalender] =
    useState(false);
  const [showPassportExpCalender, setShowPassportExpCalender] = useState(false);
  const [passportForm, setPassportForm] = useState({
    passportNumber: '',
    passportCategory: '',
    passportIssueDate: '',
    passportExpDate: '',
    placeOfIssue: '',
    frontPage: '',
    backPage: '',
  });
  const pickDocumentForFrontImage = async () => {
    if(passportFormType=="Edit"){
      setEditPassportFrontPage(true)
    }
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // You can specify the types of documents to pick
      });
      setPassportForm({...passportForm, frontPage: result[0]});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        console.error('Error while picking a document', err);
      }
    }
  };
  const pickDocumentForBackImage = async () => {
    if(passportFormType=="Edit"){
      setEditPassportBackPage(true)
    }
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // You can specify the types of documents to pick
      });
      setPassportForm({...passportForm, backPage: result[0]});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        console.error('Error while picking a document', err);
      }
    }
  };
  const addPassport = async () => {
    let user = await AsyncStorage.getItem('user');
    let passportFormData = new FormData();
    passportFormData.append('passportNumber', passportForm.passportNumber);
    passportFormData.append('passportCategory', passportForm.passportCategory);
    passportFormData.append(
      'passportIssueDate',
      passportForm.passportIssueDate,
    );
    passportFormData.append('passportExpDate', passportForm.passportExpDate);
    passportFormData.append('placeOfIssue', passportForm.placeOfIssue);
    passportFormData.append('frontPage', {
      uri: passportForm.frontPage.uri,
      type: passportForm.frontPage.type,
      name: passportForm.frontPage.name,
    });
    passportFormData.append('backPage', {
      uri: passportForm.backPage.uri,
      type: passportForm.backPage.type,
      name: passportForm.backPage.name,
    });
    try {
      let response = await addPassportApi(
        passportFormData,
        JSON.parse(user).access_token,
      );
      if (response.data.msg == 'Passport Successfully Added.') {
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Passport Successfully Added.',
          visibilityTime: 3000, // Duration in milliseconds
        });
        setPassportForm({
          passportNumber: '',
          passportCategory: '',
          passportIssueDate: '',
          passportExpDate: '',
          placeOfIssue: '',
          frontPage: '',
          backPage: '',
        });
      } else {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: response.data.error,
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error', // 'success', 'error', 'info', or any custom type you define
        // position: 'top',
        text1: 'Internal server error',
        visibilityTime: 3000, // Duration in milliseconds
      });
    }
  };
  const editPassport = async () => {
    let user = await AsyncStorage.getItem('user');
    let passportFormData = new FormData();
    passportFormData.append('passportNumber', passportForm.passportNumber);
    passportFormData.append('passportCategory', passportForm.passportCategory);
    passportFormData.append(
      'passportIssueDate',
      passportForm.passportIssueDate,
    );
    passportFormData.append('passportExpDate', passportForm.passportExpDate);
    passportFormData.append('placeOfIssue', passportForm.placeOfIssue);
    if(editPassportFrontPage){
      passportFormData.append('frontPage', {
        uri: passportForm.frontPage.uri,
        type: passportForm.frontPage.type,
        name: passportForm.frontPage.name,
      });
    }
    if(editPassportBackPage){
      passportFormData.append('backPage', {
        uri: passportForm.backPage.uri,
        type: passportForm.backPage.type,
        name: passportForm.backPage.name,
      });
    }
    
    try {
      let response = await editPassportApi(
        passportFormData,
        JSON.parse(user).access_token,
      );
      if (response.data.msg == 'Passport Updated Successfully.') {
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Passport Updated Successfully.',
          visibilityTime: 3000, // Duration in milliseconds
        });
        
        setTimeout(() => {
          setShowPassportPopUp(false)
          setPassportForm({
            passportNumber: '',
            passportCategory: '',
            passportIssueDate: '',
            passportExpDate: '',
            placeOfIssue: '',
            frontPage: '',
            backPage: '',
          });
        }, 2000);
        
      } else {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: response.data.error,
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error', // 'success', 'error', 'info', or any custom type you define
        // position: 'top',
        text1: 'Internal server error',
        visibilityTime: 3000, // Duration in milliseconds
      });
    }
  };
  const [passportFormType, setPassportFormType] = useState('Add');
  const[editPassportFrontPage, setEditPassportFrontPage]=useState(false)
  const[editPassportBackPage, setEditPassportBackPage]=useState(false)
  const setPassportEdit = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getPassportDetails(JSON.parse(user).access_token);
      if (response?.data?.data) {
        setPassportForm({
          passportNumber: response?.data.data.passportNumber,
          passportCategory: response?.data.data.passportCategory,
          passportIssueDate: response?.data.data.passportIssueDate,
          passportExpDate: response?.data.data.passportExpDate,
          placeOfIssue: response?.data.data.placeOfIssue,
          frontPage: response?.data.data.frontPage,
          backPage: response?.data.data.backPage,
        });
        setPassportFormType('Edit');
        setShowPassportPopUp(true);
      } else {
        console.warn('Something went wrong');
      }
    } catch (error) {
      console.warn('Something went wrong');
    }
  };
  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.main}>
          <Text style={styles.messageText}>
            {translation.saveAllYourImportantDocumentsHere}
          </Text>
          <View style={{paddingBottom: 6}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{alignItems: 'flex-end', flexDirection: 'row'}}>
                <View>
                  <Text style={styles.text}>Overseas CV</Text>
                  <Text style={styles.noteText}>
                    {translation.noteThisIsAnAutoGeneratedCvByOurSystem}
                  </Text>
                </View>
              </View>
              <Image source={require('../images/rectangle.png')} />
            </View>
            <Text style={styles.blueText}>
              {translation.clickEditToMakeChanges}
            </Text>
          </View>
          <View style={styles.buttonBox}>
            <Text style={styles.text}>Custom CV</Text>
            <Button title="Upload" onPress={uploadCv} />
          </View>
          <View style={styles.buttonBox}>
            <Text style={styles.text}>{translation.passport}</Text>
            <Button title="Upload" onPress={uploadPassport} />
            <Button title="View" onPress={setPassportEdit} />
          </View>
          <View style={styles.buttonBox}>
            <Text style={styles.text}>{translation.experienceCertificate}</Text>
            <Button title="Upload" onPress={uploadExperience} />
          </View>
          <View style={styles.buttonBox}>
            <Text style={styles.text}>{translation.drivingLicense}</Text>
            <Button title="Upload" onPress={uploadDl} />
          </View>
          {/* <View style={styles.buttonBox}>
            <Text style={styles.text}>{translation.jobPermit}</Text>
            <Button title={translation.uploadNow}/>
        </View> */}
          <View style={styles.buttonBox}>
            <Text style={styles.text}>Covid Certificate</Text>
            <Button title="Upload" onPress={uploadCovid} />
          </View>
          <View style={styles.buttonBox}>
            <Text style={styles.text}>Education Certificate</Text>
            <Button title="Upload" onPress={uploadDl} />
          </View>
          <Text style={styles.grayText}>
            {translation.allYourDocumentsAreSafeWithUs}
          </Text>
        </View>
        {/* <DocumentUploader showPopup={true} name="CV"/> */}
      </ScrollView>
      <Text
        style={[
          {
            textAlign: 'center',
            color: 'white',
            fontSize: 18,
            padding: 15,
            backgroundColor: '#035292',
          },
        ]}>
        <Text>+ </Text> Add New Document
      </Text>

      {/* passport upload */}
      <Modal
        transparent={true}
        visible={showPassportPopUp}
        animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFF',
          }}>
          <View style={styles.modalMain}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>
                {passportFormType} Passport
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setShowPassportPopUp(false);
                }}>
                <Image source={require('../images/close.png')} />
              </TouchableOpacity>
            </View>
            <ScrollView style={{marginTop: 20}}>
              <TextInput
                placeholder="Enter Password Number"
                style={styles.input}
                value={passportForm.passportNumber}
                onChangeText={text =>
                  setPassportForm({
                    ...passportForm,
                    passportNumber: text,
                  })
                }></TextInput>
              <View style={styles.picker}>
                <Picker
                  selectedValue={passportForm.passportCategory}
                  onValueChange={(itemValue, itemIndex) => {
                    setPassportForm({
                      ...passportForm,
                      passportCategory: itemValue,
                    });
                  }}>
                  <Picker.Item
                    label="Select Passport Category"
                    value=""
                    style={{color: 'gray'}}
                  />
                  <Picker.Item
                    label="ECR"
                    value="ECR"
                    style={{color: 'gray'}}
                  />
                  <Picker.Item
                    label="ECNR"
                    value="ECNR"
                    style={{color: 'gray'}}
                  />
                </Picker>
              </View>
              <TextInput
                placeholder="Place of Issue"
                style={styles.input}
                value={passportForm.placeOfIssue}
                onChangeText={text =>
                  setPassportForm({...passportForm, placeOfIssue: text})
                }></TextInput>
              <TouchableOpacity
                onPress={() => setShowPassportIssueCalender(true)}
                style={[styles.input, {marginBottom: 15, padding: 17}]}>
                <Text>
                  {passportForm.passportIssueDate == ''
                    ? 'Passport Issue Date'
                    : passportForm.passportIssueDate}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowPassportExpCalender(true)}
                style={[styles.input, {marginBottom: 15, padding: 17}]}>
                <Text>
                  {passportForm.passportExpDate == ''
                    ? 'Passport Expriry Date'
                    : passportForm.passportExpDate}
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 16,
                  justifyContent: 'space-between',
                }}>
                <Pressable
                  onPress={pickDocumentForFrontImage}
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    width: '45%',
                    borderRadius: 5,
                    flexDirection: 'column',
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../images/passportIcon.png')}
                    style={{height: 120, width: 100}}
                  />
                  {passportFormType == 'Add' ? (
                    <Text
                      style={{
                        color: '#035292',
                        textDecorationLine: 'underline',
                        fontWeight: '600',
                      }}>
                      {passportForm.frontPage != ''
                        ? 'Selected'
                        : 'Upload Front Image'}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: '#035292',
                        textDecorationLine: 'underline',
                        fontWeight: '600',
                      }}>
                      Selected
                    </Text>
                  )}
                </Pressable>
                <Pressable
                  onPress={pickDocumentForBackImage}
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    width: '45%',
                    borderRadius: 5,
                    flexDirection: 'column',
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../images/passportIcon.png')}
                    style={{height: 120, width: 100}}
                  />
                  {passportFormType == 'Add' ? (
                    <Text
                      style={{
                        color: '#035292',
                        textDecorationLine: 'underline',
                        fontWeight: '600',
                      }}>
                      {passportForm.backPage != ''
                        ? 'Selected'
                        : 'Upload Back Image'}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: '#035292',
                        textDecorationLine: 'underline',
                        fontWeight: '600',
                      }}>
                      Selected
                    </Text>
                  )}
                </Pressable>
              </View>
            </ScrollView>
            <Button
              title={passportFormType}
              onPress={passportFormType == 'Add' ? addPassport : editPassport}
              color="#035292"
            />
            {/* <Button title="Edit" onPress={editPassport} color="#035292" /> */}
          </View>
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
      </Modal>
      <Modal transparent={true} visible={showPassportIssueCalender}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0, 0, 0.5)',
          }}>
          <View
            style={{
              width: 330,
              borderRadius: 10,
              padding: 20,
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '600', fontSize: 20}}>
                Passport Issue Date
              </Text>
              <TouchableOpacity
                onPress={() => setShowPassportIssueCalender(false)}>
                <Image source={require('../images/close.png')} />
              </TouchableOpacity>
            </View>

            <DatePicker
              mode="calender"
              format="YYYY-MM-DD"
              onDateChange={date => {
                const formattedDate = moment(date, 'YYYY/MM/DD').format(
                  'YYYY-MM-DD',
                );
                setPassportForm({
                  ...passportForm,
                  passportIssueDate: formattedDate,
                });
                setShowPassportIssueCalender(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={showPassportExpCalender}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0, 0, 0.5)',
          }}>
          <View
            style={{
              width: 330,
              borderRadius: 10,
              padding: 20,
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '600', fontSize: 20}}>
                Passport Expire Date
              </Text>
              <TouchableOpacity
                onPress={() => setShowPassportExpCalender(false)}>
                <Image source={require('../images/close.png')} />
              </TouchableOpacity>
            </View>

            <DatePicker
              mode="calender"
              format="YYYY-MM-DD"
              onDateChange={date => {
                const formattedDate = moment(date, 'YYYY/MM/DD').format(
                  'YYYY-MM-DD',
                );
                setPassportForm({
                  ...passportForm,
                  passportExpDate: formattedDate,
                });
                setShowPassportExpCalender(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default MyDocument;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 60,
    flex: 1,
  },
  mainHeading: {
    color: '#0F0C0C',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Nato Sans',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginLeft: -5,
    marginBottom: 30,
  },
  messageText: {
    color: '#0F0C0C',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Nato Sans',
    marginVertical: 15,
  },
  buttonBox: {
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#B3B3B3',
    borderTopWidth: 1,
    alignItems: 'center',
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  },
  noteText: {
    color: '#EB4343',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  },
  blueText: {
    color: '#5F90CA',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  },
  grayText: {
    textAlign: 'center',
    color: '#B3B3B3',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Nato Sans',
    marginVertical: 20,
  },
  modalMain: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 18,
    backgroundColor: 'white',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    width: '100%',
    marginBottom: 18,
    backgroundColor: 'white',
  },
});
