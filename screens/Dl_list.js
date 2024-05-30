import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Button,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import {Picker} from '@react-native-picker/picker';
import {getCountries, getState} from '../services/info.service';
import {useFocusEffect} from '@react-navigation/native';
import MyMultipleSelectPopUp from '../components/MyMultipleSelectPopUp';
import DatePicker from 'react-native-modern-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addDrivingLiecence,
  getAllDocApi,
  editDrivingLiecence,
} from '../services/user.service';
const Dl_list = props => {
  useAndroidBackHandler(() => {
    props.navigation.navigate('My Documents');
    return true;
  });
  const [showAddPopUp, setShowAddPopUp] = useState(false);
  const [showLicenceCat, setShowLicenceCat] = useState(false);
  const [showDlIssueCalender, setShowDlIssueCalender] = useState(false);
  const [showDlExpCalender, setShowDlExpCalender] = useState(false);
  const [dlFormData, setDlFormData] = useState({
    licenceNumber: '',
    licenceType: '',
    licenceCategory: '',
    fromDate: '',
    toDate: '',
    licenseImage: '',
    licenceBackImage: '',
    stateName: '',
    countryName: '',
  });
  const [countryList, setCountryList] = useState([]);
  const getCountryList = async () => {
    try {
      let response = await getCountries();
      setCountryList(response?.countries);
    } catch (error) {}
  };
  const [dlFrontPrev, setDlFrontPrev] = useState('');
  const [dlBackPrev, setDlBackPrev] = useState('');
  const pickDocumentForDlFrontImage = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // You can specify the types of documents to pick
      });
      setDlFormData({...dlFormData, licenseImage: result[0]});
      setDlFrontPrev(result[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        console.error('Error while picking a document', err);
      }
    }
  };
  const pickDocumentForDLBackImage = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // You can specify the types of documents to pick
      });
      setDlFormData({...dlFormData, licenceBackImage: result[0]});
      setDlBackPrev(result[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        console.error('Error while picking a document', err);
      }
    }
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
  useFocusEffect(
    React.useCallback(() => {
      getCountryList();
      getStateList();
    }, []),
  );
  const [errorText, setErrorText] = useState('');
  const formValidation = () => {
    if (dlFormData?.licenceNumber == '') {
      setErrorText('License number is a required field');
      return false;
    } else {
      setErrorText('');
    }
    if (dlFormData?.licenceType == '') {
      setErrorText('License location is a required field');
      return false;
    } else {
      setErrorText('');
    }
    if (dlFormData?.licenceCategory == '') {
      setErrorText('License category is a required field');
      return false;
    } else {
      setErrorText('');
    }
    if (dlFormData?.formDate == '') {
      setErrorText('License issue date is a required field');
      return false;
    } else {
      setErrorText('');
    }
    if (dlFormData?.toDate == '') {
      setErrorText('License expiry date is a required field');
      return false;
    } else {
      setErrorText('');
    }
    if (dlFormData?.licenseImage == '') {
      setErrorText('License image is a required field');
      return false;
    } else {
      setErrorText('');
    }
    if (dlFormData?.licenceBackImage == '') {
      setErrorText('License back image is a required field');
      return false;
    } else {
      setErrorText('');
    }
    return true;
  };
  const addDl = async () => {
    let user = await AsyncStorage.getItem('user');
    const dlForm = new FormData();
    dlForm.append('licenceNumber', dlFormData.licenceNumber);
    dlForm.append('licenceType', dlFormData.licenceType);
    dlForm.append(
      'licenceCategory',
      JSON.stringify(dlFormData.licenceCategory),
    );
    dlForm.append('fromDate', dlFormData.fromDate);
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
    if (formValidation()) {
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
            licenceNumber: '',
            licenceType: '',
            licenceCategory: '',
            formDate: '',
            toDate: '',
            licenseImage: '',
            licenceBackImage: '',
            stateName: '',
            countryName: '',
          });
          getAllDocList();
          setShowAddPopUp(false);
        } else {
          Toast.show({
            type: 'error', // 'success', 'error', 'info', or any custom type you define
            position: 'top',
            text1: 'Something went wrong.',
            visibilityTime: 3000, // Duration in milliseconds
          });
          setShowAddPopUp(false);
        }
      } catch (error) {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Internal server error',
          visibilityTime: 3000, // Duration in milliseconds
        });
        setShowAddPopUp(false);
      }
    }
  };
  const [allDocListDetail, setAllDocListDetails] = useState('');
  const getAllDocList = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getAllDocApi(JSON.parse(user).access_token);
      setAllDocListDetails(response.data);
    } catch (error) {}
  };
  useFocusEffect(
    React.useCallback(() => {
      getAllDocList();
    }, []),
  );
  const [stateName, setStateName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [formType, setFormType] = useState('Add');
  const setEdit = value => {
    console.log(value);
    setFormType('Edit');
    setShowAddPopUp(true);
    setDlFormData({
      licenceNumber: value?.licenceNumber,
      licenceType: value?.licenceType,
      licenceCategory: value?.licenceCategory,
      fromDate: value?.fromDate,
      toDate: value?.toDate,
      licenseImage: '',
      licenceBackImage: '',
      stateName: value?.stateName,
      countryName: value?.countryName,
      id: value.id,
      stateId: value.state,
      countryId: value.country,
    });
    setDlFrontPrev(value?.licenceImage);
    setDlBackPrev(value?.licenceBackImage);
    setStateName(value.stateName);
    setCountryName(value.countryName);
  };
  const editDl = async () => {
    let user = await AsyncStorage.getItem('user');
    const dlForm = new FormData();
    dlForm.append('id', dlFormData.id);
    dlForm.append('licenceNumber', dlFormData.licenceNumber);
    dlForm.append('licenceType', dlFormData.licenceType);
    dlForm.append(
      'licenceCategory',
      JSON.stringify(dlFormData.licenceCategory),
    );
    dlForm.append('fromDate', dlFormData.fromDate);
    dlForm.append('toDate', dlFormData.toDate);
    if (dlFormData.licenceType == 'national') {
      dlForm.append('stateName', dlFormData.stateId);
    } else {
      dlForm.append('countryName', dlFormData.countryId);
    }
    if (dlFormData.licenceBackImage != '') {
      dlForm.append('licenceBackImage', {
        uri: dlFormData.licenceBackImage.uri,
        type: dlFormData.licenceBackImage.type,
        name: dlFormData.licenceBackImage.name,
      });
    }
    if (dlFormData.licenseImage != '') {
      dlForm.append('licenceImage', {
        uri: dlFormData.licenseImage.uri,
        type: dlFormData.licenseImage.type,
        name: dlFormData.licenseImage.name,
      });
    }
    try {
      let response = await editDrivingLiecence(
        dlForm,
        JSON.parse(user).access_token,
      );
      if (response.data.success) {
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'DL Successfully updated.',
          visibilityTime: 3000, // Duration in milliseconds
        });
        setDlFormData({
          licenceNumber: '',
          licenceType: '',
          licenceCategory: '',
          fromDate: '',
          toDate: '',
          licenseImage: '',
          licenceBackImage: '',
          stateName: '',
          countryName: '',
        });
        getAllDocList();
        setShowAddPopUp(false);
      } else {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Something went wrong.',
          visibilityTime: 3000, // Duration in milliseconds
        });
        setShowAddPopUp(false);
      }
    } catch (error) {
      Toast.show({
        type: 'error', // 'success', 'error', 'info', or any custom type you define
        position: 'top',
        text1: 'Internal server error',
        visibilityTime: 3000, // Duration in milliseconds
      });
      setShowAddPopUp(false);
    }
  };
  return (
    <View style={styles.main}>
      <ScrollView>
        {allDocListDetail?.licenceDetails?.licenceDetails?.map((v, i) => {
          return (
            <View
              key={i}
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                padding: 12,
                marginVertical: 10,
                borderRadius: 6,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.cardText}>DL Number : </Text>
                <Text style={{color: 'black'}}> {v?.licenceNumber}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.cardText}>Issue Location : </Text>
                <Text style={{color: 'black'}}>
                  {v?.stateName ? v?.stateName : v?.countryName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.cardText}>Issue Date : </Text>
                <Text style={{color: 'black'}}>{v?.fromDate}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.cardText}>Expire Date : </Text>
                <Text style={{color: 'black'}}>{v?.toDate}</Text>
              </View>

              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Pressable style={{width: '45%'}}>
                  {v?.licenceImage ? (
                    <Image
                      style={{
                        width: '100%',
                        height: 100,
                        resizeMode: 'contain',
                      }}
                      source={{uri: v?.licenceImage}}
                    />
                  ) : (
                    <Image
                      style={{
                        width: '100%',
                        height: 100,
                        resizeMode: 'contain',
                      }}
                      source={require('../images/hraDummyIcon.png')}
                    />
                  )}
                  <Text
                    style={{
                      textAlign: 'center',
                      marginVertical: 5,
                      color: '#035292',
                    }}>
                    Front Image
                  </Text>
                </Pressable>
                <Pressable style={{width: '45%'}}>
                  {v?.licenceBackImage ? (
                    <Image
                      style={{
                        width: '100%',
                        height: 100,
                        resizeMode: 'contain',
                      }}
                      source={{uri: v?.licenceBackImage}}
                    />
                  ) : (
                    <Image
                      style={{
                        width: '100%',
                        height: 100,
                        resizeMode: 'contain',
                      }}
                      source={require('../images/hraDummyIcon.png')}
                    />
                  )}

                  <Text
                    style={{
                      textAlign: 'center',
                      marginVertical: 5,
                      color: '#035292',
                    }}>
                    Back Image
                  </Text>
                </Pressable>
              </View>
              <Button title="Edit" onPress={() => setEdit(v)} />
            </View>
          );
        })}
      </ScrollView>
      <Button
        title="Add More"
        onPress={() => {
          setShowAddPopUp(true);
          setDlFrontPrev('');
          setDlBackPrev('');
          setFormType('Add');
        }}
        color="#035292"
      />
      {/* add dl popup start */}
      <Modal transparent={true} visible={showAddPopUp} animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}>
          <View
            style={{
              width: '100%',
              flex: 1,
              backgroundColor: 'white',
              padding: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>
                {formType} DL
              </Text>
              <Pressable
                onPress={() => {
                  setShowAddPopUp(false);
                  setDlFormData({
                    licenceNumber: '',
                    licenceType: '',
                    licenceCategory: '',
                    fromDate: '',
                    toDate: '',
                    licenseImage: '',
                    licenceBackImage: '',
                    stateName: '',
                    countryName: '',
                  });
                }}>
                <Image source={require('../images/close.png')} />
              </Pressable>
            </View>

            <View>
              <TextInput
                placeholder="Enter License Number"
                placeholderTextColor="gray"
                style={[
                  styles.input,
                  formType == 'Edit' && {backgroundColor: 'whitesmoke'},
                ]}
                value={dlFormData.licenceNumber}
                editable={formType == 'Add' ? true : false}
                onChangeText={text =>
                  setDlFormData({
                    ...dlFormData,
                    licenceNumber: text,
                  })
                }></TextInput>
              {formType == 'Add' && (
                <View style={styles.picker}>
                  <Picker
                    selectedValue={dlFormData.licenceType}
                    onValueChange={(itemValue, itemIndex) => {
                      setDlFormData({
                        ...dlFormData,
                        licenceType: itemValue,
                      });
                    }}>
                    <Picker.Item
                      label="Select License Location"
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
              )}
              {dlFormData.licenceType == 'international' &&
                (formType == 'Add' ? (
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
                ) : (
                  <TextInput
                    style={[
                      styles.input,
                      formType == 'Edit' && {backgroundColor: 'whitesmoke'},
                    ]}
                    value={countryName}
                  />
                ))}
              {dlFormData.licenceType == 'national' &&
                (formType == 'Add' ? (
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
                ) : (
                  <TextInput
                    style={[
                      styles.input,
                      formType == 'Edit' && {backgroundColor: 'whitesmoke'},
                    ]}
                    value={stateName}
                  />
                ))}
              <Pressable
                onPress={() => setShowLicenceCat(true)}
                style={[styles.input, {marginBottom: 15, padding: 17}]}>
                {dlFormData.licenceCategory == '' ? (
                  <Text style={{color: 'gray'}}>Select Licence Category</Text>
                ) : (
                  <Text style={{color: 'gray'}}>
                    {formType == 'Add'
                      ? dlFormData?.licenceCategory?.map((v, i) => {
                          return <>{v + '  '}</>;
                        })
                      : formType == 'Edit' &&
                        typeof dlFormData?.licenceCategory == 'object'
                      ? dlFormData?.licenceCategory?.map((v, i) => {
                          return <>{v + '  '}</>;
                        })
                      : dlFormData?.licenceCategory}
                  </Text>
                )}
              </Pressable>
              <Pressable
                onPress={() => setShowDlIssueCalender(true)}
                style={[styles.input, {marginBottom: 15, padding: 17}]}>
                <Text style={{color: 'gray'}}>
                  {dlFormData.fromDate == ''
                    ? 'Liecence Issue Date'
                    : dlFormData?.fromDate}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setShowDlExpCalender(true)}
                style={[styles.input, {marginBottom: 15, padding: 17}]}>
                <Text style={{color: 'gray'}}>
                  {dlFormData.toDate == ''
                    ? 'Licence Expriry Date'
                    : dlFormData.toDate}
                </Text>
              </Pressable>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
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
                  {dlFrontPrev ? (
                    <Image
                      source={{uri: dlFrontPrev}}
                      style={{
                        height: 100,
                        width: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  ) : (
                    <Image
                      source={require('../images/dlIcon.png')}
                      style={{
                        height: 100,
                        width: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  )}
                  <Text style={{color: 'black'}}>Front Image</Text>
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
                  {dlBackPrev ? (
                    <Image
                      source={{uri: dlBackPrev}}
                      style={{
                        height: 100,
                        width: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  ) : (
                    <Image
                      source={require('../images/dlIcon.png')}
                      style={{
                        height: 100,
                        width: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  )}
                  <Text style={{color: 'black'}}>Back Image</Text>
                </Pressable>
              </View>
            </View>

            <Text
              style={{
                color: 'red',
                fontWeight: '500',
                marginTop: 20,
                textAlign: 'center',
              }}>
              {errorText}
            </Text>
            <View style={{marginTop: 20}}>
              <Button
                title={formType == 'Add' ? 'Submit' : 'Update'}
                color="#035292"
                onPress={formType == 'Add' ? addDl : editDl}
              />
            </View>
          </View>
        </View>
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
      <DateTimePickerModal
        isVisible={showDlIssueCalender}
        mode="date"
        onConfirm={selecteddate => {
          const formattedDate = moment(selecteddate, 'YYYY/MM/DD').format(
            'YYYY-MM-DD',
          );
          setDlFormData({
            ...dlFormData,
            fromDate: formattedDate,
          });
          setShowDlIssueCalender(false);
        }}
        onCancel={() => setShowDlIssueCalender(false)}
      />
      <DateTimePickerModal
        isVisible={showDlExpCalender}
        mode="date"
        onConfirm={selecteddate => {
          const formattedDate = moment(selecteddate, 'YYYY/MM/DD').format(
            'YYYY-MM-DD',
          );
          setDlFormData({
            ...dlFormData,
            toDate: formattedDate,
          });
          setShowDlExpCalender(false);
        }}
        onCancel={() => setShowDlExpCalender(false)}
      />

      {/* add dl popup end */}
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default Dl_list;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
  },
  cardText: {
    fontSize: 18,
    marginBottom: 3,
    color: 'black',
    fontWeight: '600',
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 18,
    backgroundColor: 'white',
    color: 'gray',
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
