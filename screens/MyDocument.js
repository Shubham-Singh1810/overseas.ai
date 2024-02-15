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
import React, {useState, useEffect} from 'react';
import {
  addPassportApi,
  getPassportDetails,
  editPassportApi,
  addCvApi,
  addCovidCertificateApi,
  addDrivingLiecence,
  addHighestEduCertificate,
  addOtherDoc,
} from '../services/user.service';
import Toast from 'react-native-toast-message';
import {useGlobalState} from '../GlobalProvider';
import DocumentUploader from '../components/DocumentUploader';
import DatePicker from 'react-native-modern-datepicker';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCountries, getState} from '../services/info.service';
import MyMultipleSelectPopUp from '../components/MyMultipleSelectPopUp';
const MyDocument = props => {
  const [countryList, setCountryList] = useState([]);
  const getCountryList = async () => {
    try {
      let response = await getCountries();
      setCountryList(response?.countries);
    } catch (error) {}
  };

  const [stateList, setStateList] = useState([]);
  const getStateList = async () => {
    try {
      let response = await getState();
      setStateList(response.data.states);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCountryList();
    getStateList();
  }, []);
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
  const uploadCv = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // You can specify the types of documents to pick
      });
      const formData = new FormData();
      formData.append('empCV', {
        uri: result[0].uri,
        type: result[0].type,
        name: result[0].name,
      });
      let response = await addCvApi(formData, JSON.parse(user).access_token);
      if (response.data.msg == 'CV uploaded successfully.') {
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'CV uploaded successfully.',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
      if (response.data.msg == 'CV already uploaded.') {
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
  // function to upload educationCertificate
  const uploadEducationCertificate = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // You can specify the types of documents to pick
      });
      const formData = new FormData();
      formData.append('empCertificatepPhoto', {
        uri: result[0].uri,
        type: result[0].type,
        name: result[0].name,
      });
      let response = await addHighestEduCertificate(
        formData,
        JSON.parse(user).access_token,
      );
      if (
        response.data.msg ==
        'Highest education certificate uploaded successfully.'
      ) {
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Highest education certificate uploaded successfully.',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
      if (
        response.data.msg == 'Highest education certificate already uploaded.'
      ) {
        Toast.show({
          type: 'info', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Highest education certificate already uploaded.',
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
  const [showDlPopUp, setShowDlPopUp] = useState(false);
  const [dlFormType, setDlFormType] = useState('Add');
  const [showLicenceCat, setShowLicenceCat] = useState(false);
  const [dlFormData, setDlFormData] = useState({
    licenseNumber: '',
    licenseType: '',
    licenceCategory: '',
    formDate: '',
    toDate: '',
    licenseImage: '',
    licenceBackImage: '',
    stateName: '',
    countryName: '',
  });
  const uploadDl = () => {
    setShowDlPopUp(true);
    console.warn(' upload dl');
  };
  const pickDocumentForDlFrontImage = async () => {
    if (dlFormType == 'Edit') {
      // setEditPassportFrontPage(true)
    }
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // You can specify the types of documents to pick
      });
      setDlFormData({...dlFormData, licenseImage: result[0]});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        console.error('Error while picking a document', err);
      }
    }
  };
  const pickDocumentForDLBackImage = async () => {
    if (dlFormType == 'Edit') {
      // setEditPassportBackPage(true)
    }
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // You can specify the types of documents to pick
      });
      setDlFormData({...dlFormData, licenceBackImage: result[0]});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        console.error('Error while picking a document', err);
      }
    }
  };
  const [showDlIssueCalender, setShowDlIssueCalender] = useState(false);
  const [showDlExpCalender, setShowDlExpCalender] = useState(false);
  const addDl = async () => {
    let user = await AsyncStorage.getItem('user');
    const dlForm = new FormData();
    dlForm.append('licenceNumber', dlFormData.licenseNumber);
    dlForm.append('licenceType', dlFormData.licenseType);
    dlForm.append(
      'licenceCategory',
      JSON.stringify(dlFormData.licenceCategory),
    );
    dlForm.append('fromDate', dlFormData.formDate);
    dlForm.append('toDate', dlFormData.toDate);
    dlForm.append('stateName', dlFormData.stateName);
    dlForm.append('countryName', dlFormData.countryName);
    dlForm.append('licenceImage', {
      uri: dlFormData.licenseImage.uri,
      type: dlFormData.licenseImage.type,
      name: dlFormData.licenseImage.name,
    });
    dlForm.append('licenceBackImage', {
      uri: dlFormData.licenceBackImage.uri,
      type: dlFormData.licenceBackImage.type,
      name: dlFormData.licenceBackImage.name,
    });
    if (true) {
      try {
        let response = await addDrivingLiecence(
          dlForm,
          JSON.parse(user).access_token,
        );
        if (response.data.success) {
          Toast.show({
            type: 'success', // 'success', 'error', 'info', or any custom type you define
            position: 'top',
            text1: 'DL Successfully Added.',
            visibilityTime: 3000, // Duration in milliseconds
          });
          setDlFormData({
            licenseNumber: '',
            licenseType: '',
            licenceCategory: '',
            formDate: '',
            toDate: '',
            licenseImage: '',
            licenceBackImage: '',
            stateName: '',
            countryName: '',
          });
          setShowDlPopUp(false);
        } else {
          Toast.show({
            type: 'error', // 'success', 'error', 'info', or any custom type you define
            position: 'top',
            text1: 'Something went wrong.',
            visibilityTime: 3000, // Duration in milliseconds
          });
        }
      } catch (error) {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Internal server error',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    } else {
      console.warn('Something went wrong');
    }
  };
  // function to upload covid
  const uploadCovid = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // You can specify the types of documents to pick
      });
      const formData = new FormData();
      formData.append('covidCertificate', {
        uri: result[0].uri,
        type: result[0].type,
        name: result[0].name,
      });
      let response = await addCovidCertificateApi(
        formData,
        JSON.parse(user).access_token,
      );
      if (response.data.msg == 'Covid certificate uploaded successfully.') {
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Covid certificate uploaded successfully.',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
      if (response.data.msg == 'Covid certificate already uploaded.') {
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
    if (passportFormType == 'Edit') {
      setEditPassportFrontPage(true);
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
    if (passportFormType == 'Edit') {
      setEditPassportBackPage(true);
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
    if (editPassportFrontPage) {
      passportFormData.append('frontPage', {
        uri: passportForm.frontPage.uri,
        type: passportForm.frontPage.type,
        name: passportForm.frontPage.name,
      });
    }
    if (editPassportBackPage) {
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
          setShowPassportPopUp(false);
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
  const [editPassportFrontPage, setEditPassportFrontPage] = useState(false);
  const [editPassportBackPage, setEditPassportBackPage] = useState(false);
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

  // add other document
  const [otherDocPopUp, setOtherDocPopUp] = useState(false);
  const [formForOtherDoc, setFormForOtherDoc] = useState({
    document_type: '',
    document_image: '',
  });
  const pickDocumentOtherDoc = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // You can specify the types of documents to pick
      });
      setFormForOtherDoc({...formForOtherDoc, document_image: result[0]});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        console.error('Error while picking a document', err);
      }
    }
  };
  const uploadOtherDoc = async () => {
    let user = await AsyncStorage.getItem('user');

    try {
      const formData = new FormData();
      formData.append('document_type', formForOtherDoc.document_type);
      formData.append('document_image', {
        uri: formForOtherDoc.document_image.uri,
        type: formForOtherDoc.document_image.type,
        name: formForOtherDoc.document_image.name,
      });
      let response = await addOtherDoc(formData, JSON.parse(user).access_token);
      if(response?.data?.msg=="Document uploaded successfully."){
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Document Uploaded Successfully',
          visibilityTime: 3000, // Duration in milliseconds
        });
        setOtherDocPopUp(false);
        setFormForOtherDoc({
          document_image:"",
          document_type:"",
        })
      }
      else{
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Something went wrong',
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
            <Button title="Upload" onPress={uploadEducationCertificate} />
          </View>
          <Text style={styles.grayText}>
            {translation.allYourDocumentsAreSafeWithUs}
          </Text>
        </View>
        {/* <DocumentUploader showPopup={true} name="CV"/> */}
      </ScrollView>
      <Pressable onPress={() => setOtherDocPopUp(true)}>
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
      </Pressable>

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
                placeholder="Enter Passport Number"
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
      {/* DL UPLOAD */}
      <Modal transparent={true} visible={showDlPopUp} animationType="slide">
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
                {dlFormType} Driving License
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setShowDlPopUp(false);
                }}>
                <Image source={require('../images/close.png')} />
              </TouchableOpacity>
            </View>
            <ScrollView style={{marginTop: 20}}>
              <TextInput
                placeholder="Enter Licence Number"
                style={styles.input}
                value={dlFormData.licenseNumber}
                onChangeText={text =>
                  setDlFormData({
                    ...dlFormData,
                    licenseNumber: text,
                  })
                }></TextInput>
              <View style={styles.picker}>
                <Picker
                  selectedValue={dlFormData.licenseType}
                  onValueChange={(itemValue, itemIndex) => {
                    setDlFormData({
                      ...dlFormData,
                      licenseType: itemValue,
                    });
                  }}>
                  <Picker.Item
                    label="Select Licence Location"
                    value=""
                    style={{color: 'gray'}}
                  />
                  <Picker.Item
                    label="National"
                    value="national"
                    style={{color: 'gray'}}
                  />
                  <Picker.Item
                    label="International"
                    value="international"
                    style={{color: 'gray'}}
                  />
                </Picker>
              </View>

              {dlFormData.licenseType == 'international' && (
                <View style={styles.picker}>
                  <Picker
                    selectedValue={dlFormData.countryName}
                    onValueChange={(itemValue, itemIndex) => {
                      setDlFormData({
                        ...dlFormData,
                        countryName: itemValue,
                      });
                    }}>
                    <Picker.Item
                      label="Select Country"
                      value=""
                      style={{color: 'gray'}}
                    />
                    {countryList?.map((v, i) => {
                      return (
                        <Picker.Item
                          label={v?.name}
                          value={v?.id}
                          style={{color: 'gray'}}
                        />
                      );
                    })}
                  </Picker>
                </View>
              )}
              {dlFormData.licenseType == 'national' && (
                <View style={styles.picker}>
                  <Picker
                    selectedValue={dlFormData.stateName}
                    onValueChange={(itemValue, itemIndex) => {
                      setDlFormData({
                        ...dlFormData,
                        stateName: itemValue,
                      });
                    }}>
                    <Picker.Item
                      label="Select State"
                      value=""
                      style={{color: 'gray'}}
                    />
                    {stateList?.map((v, i) => {
                      return (
                        <Picker.Item
                          label={v?.name}
                          value={v?.id}
                          style={{color: 'gray'}}
                        />
                      );
                    })}
                  </Picker>
                </View>
              )}
              <TouchableOpacity
                onPress={() => setShowLicenceCat(true)}
                style={[styles.input, {marginBottom: 15, padding: 17}]}>
                {dlFormData.licenceCategory == '' ? (
                  <Text>Select Licence Category</Text>
                ) : (
                  <Text>
                    {dlFormData.licenceCategory?.map((v, i) => {
                      return <>{v} , </>;
                    })}
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowDlIssueCalender(true)}
                style={[styles.input, {marginBottom: 15, padding: 17}]}>
                <Text>
                  {dlFormData.formDate == ''
                    ? 'Liecence Issue Date'
                    : dlFormData.formDate}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowDlExpCalender(true)}
                style={[styles.input, {marginBottom: 15, padding: 17}]}>
                <Text>
                  {dlFormData.toDate == ''
                    ? 'Licence Expriry Date'
                    : dlFormData.toDate}
                </Text>
              </TouchableOpacity>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Pressable
                  onPress={pickDocumentForDlFrontImage}
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
                    source={require('../images/dlIcon.png')}
                    style={{height: 100, width: '100%', resizeMode: 'contain'}}
                  />
                  {passportFormType == 'Add' ? (
                    <Text
                      style={{
                        color: '#035292',
                        // textDecorationLine: 'underline',
                        fontWeight: '600',
                      }}>
                      {dlFormData.licenseImage != ''
                        ? 'Selected'
                        : 'Upload Front'}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: '#035292',
                        // textDecorationLine: 'underline',
                        fontWeight: '600',
                      }}>
                      Selected
                    </Text>
                  )}
                </Pressable>
                <Pressable
                  onPress={pickDocumentForDLBackImage}
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
                    source={require('../images/dlIcon.png')}
                    style={{height: 100, width: '100%', resizeMode: 'contain'}}
                  />
                  {passportFormType == 'Add' ? (
                    <Text
                      style={{
                        color: '#035292',
                        // textDecorationLine: 'underline',
                        fontWeight: '600',
                      }}>
                      {dlFormData.licenceBackImage != ''
                        ? 'Selected'
                        : 'Upload Back'}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: '#035292',
                        // textDecorationLine: 'underline',
                        fontWeight: '600',
                      }}>
                      Selected
                    </Text>
                  )}
                </Pressable>
              </View>
            </ScrollView>
            <Button
              title={dlFormType}
              onPress={dlFormType == 'Add' ? addDl : editDl}
              color="#035292"
            />
            {/* <Button title="Edit" onPress={editPassport} color="#035292" /> */}
          </View>
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
      </Modal>
      <Modal transparent={true} visible={showDlIssueCalender}>
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
                Liecence Issue Date
              </Text>
              <TouchableOpacity onPress={() => setShowDlIssueCalender(false)}>
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
                setDlFormData({
                  ...dlFormData,
                  formDate: formattedDate,
                });
                setShowDlIssueCalender(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={showDlExpCalender}>
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
                Liecence Expire Date
              </Text>
              <TouchableOpacity onPress={() => setShowDlExpCalender(false)}>
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
                setDlFormData({
                  ...dlFormData,
                  toDate: formattedDate,
                });
                setShowDlExpCalender(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={otherDocPopUp} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFF',
          }}>
          <View style={styles.modalMain}>
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 15,
                  width: '100%',
                }}>
                <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>
                  Upload Document
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setOtherDocPopUp(false);
                  }}>
                  <Image source={require('../images/close.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.picker}>
                <Picker
                  selectedValue={formForOtherDoc.document_type}
                  onValueChange={(itemValue, itemIndex) => {
                    setFormForOtherDoc({
                      ...formForOtherDoc,
                      document_type: itemValue,
                    });
                  }}>
                  <Picker.Item
                    label="Select Document Type"
                    value="Unknown"
                    style={{color: 'gray'}}
                  />
                  <Picker.Item
                    label="ITI"
                    value="ITI"
                    style={{color: 'gray'}}
                  />
                  <Picker.Item
                    label="Vocational"
                    value="Vocational"
                    style={{color: 'gray'}}
                  />
                  <Picker.Item
                    label="Technical"
                    value="Technical"
                    style={{color: 'gray'}}
                  />

                  <Picker.Item
                    label="Trade Test"
                    value="Trade Test"
                    style={{color: 'gray'}}
                  />
                  <Picker.Item
                    label="Adhar"
                    value="Adhar"
                    style={{color: 'gray'}}
                  />

                  {/* Add more Picker.Item as needed */}
                </Picker>
              </View>
              <TouchableOpacity
                style={styles.fileInput}
                onPress={pickDocumentOtherDoc}>
                {formForOtherDoc.document_image == '' ? (
                  <Text>Select File</Text>
                ) : (
                  <Text>{formForOtherDoc.document_image.name}</Text>
                )}
              </TouchableOpacity>
              <View style={{width: '100%'}}>
                <Button title="Submit" onPress={uploadOtherDoc} />
              </View>
            </View>
          </View>
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
      </Modal>
      <MyMultipleSelectPopUp
        title="Select Licence Category"
        toggle={showLicenceCat}
        setToggle={setShowLicenceCat}
        inputOption={[
          {
            label: 'MCWG',
            value: 'MCWG',
          },

          {label: 'LMV', value: 'LMV'},

          {label: 'MGV', value: 'MGV'},

          {label: 'TRNS', value: 'TRNS'},
          {
            label: 'HMV',
            value: 'HMV',
          },

          {label: 'Other', value: 'Other'},
        ]}
        callBackFunck={value =>
          setDlFormData({...dlFormData, licenceCategory: value})
        }
      />

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
  fileInput: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 18,
    backgroundColor: 'white',
    paddingVertical: 16,
    width: '100%',
  },
});
