import {
  StyleSheet,
  TextInput,
  Text,
  Button,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import React, {useState} from 'react';
import DatePicker from 'react-native-modern-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import {useFocusEffect} from '@react-navigation/native';
import {
  getAllExperience,
  editExperienceStepApi,
  addExperienceStep2,
} from '../services/user.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getOccupations,
  getSkillsByOccuId,
  getCountries,
  getState,
  getDistrict,
} from '../services/info.service';

import {useAndroidBackHandler} from 'react-navigation-backhandler';
import {useGlobalState} from '../GlobalProvider';
const ExperienceScreen = props => {
  useAndroidBackHandler(() => {
    if (props?.route?.params?.backTo) {
      props.navigation.navigate(props?.route?.params.backTo);
      return true;
    } else {
      props.navigation.navigate('MyProfile');
      return true;
    }
  });
  const {newTranslation} = useGlobalState();
  const [loading, setLoading] = useState(false);
  const [showJoiningCalender, setJoiningCalender] = useState(false);
  const [showEndingCalender, setEndingCalender] = useState(false);
  const [showAddExperienceForm, setShowAddExperienceForm] = useState(false);
  const [editId, setEditId] = useState();
  const [experienceForm, setExperienceForm] = useState({
    experinceCompanyName: '',
    jobProfile: '',
    jobOccupation: '',
    experienceType: '',
    fromDate: '',
    toDate: '',
    countryName: '',
    stateName: '',
    certificateImage: '',
  });
  const formValidation = () => {
    if (experienceForm.experinceCompanyName == '') {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Company/Organisation name is required field',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      return false;
    }
    if (experienceForm.jobProfile == '') {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Job Profile is required field',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      return false;
    }
    if (experienceForm.jobOccupation == '') {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Job Occupation is required field',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      return false;
    }
    if (experienceForm.experienceType == '') {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Experience type is required field',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      return false;
    }
    if (experienceForm.fromDate == '') {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Joining date is required field',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      return false;
    }
    if (experienceForm.toDate == '') {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Ending date is required field',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      return false;
    }
    return true;
  };
  const addExperience = async () => {
    let user = await AsyncStorage.getItem('user');
    let experienceFormData = new FormData();
    experienceFormData.append(
      'experinceCompanyName',
      experienceForm.experinceCompanyName,
    );
    experienceFormData.append('jobProfile', experienceForm.jobProfile);
    experienceFormData.append('jobOccupation', experienceForm.jobOccupation);
    experienceFormData.append('experienceType', experienceForm.experienceType);
    experienceFormData.append('fromDate', experienceForm.fromDate);
    experienceFormData.append('toDate', experienceForm.toDate);
    experienceFormData.append('countryName', experienceForm.countryName);
    experienceFormData.append('stateName', experienceForm.stateName);
    if (experienceForm.certificateImage != '') {
      experienceFormData.append('certificateImage', {
        uri: experienceForm.certificateImage.uri,
        type: experienceForm.certificateImage.type,
        name: experienceForm.certificateImage.name,
      });
    }
    if (formValidation()) {
      try {
        let response = await addExperienceStep2(
          experienceFormData,
          JSON.parse(user).access_token,
        );
        console.log('res', response);
        if (response?.data?.msg == 'Experience Successfully Added.') {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Experience successfully added.',
            // text2:" Feel free to enrich your profile by adding more experiences if you desire.",
            visibilityTime: 3000,
          });
          setExperienceForm({
            experinceCompanyName: '',
            jobProfile: '',
            jobOccupation: '',
            experienceType: '',
            fromDate: '',
            toDate: '',
            countryName: '',
            stateName: '',
            certificateImage: '',
          });
          getExperienceFunc();
          setTimeout(() => {
            setShowAddExperienceForm(false);
          }, 2000);
        } else {
          Toast.show({
            type: 'error', // 'success', 'error', 'info', or any custom type you define
            // position: 'top',
            text1: 'Something went grong',
            visibilityTime: 3000, // Duration in milliseconds
          });
        }
      } catch (error) {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          // position: 'top',
          text1: 'Something went wrong',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    }
  };
  const editExperience = async () => {
    let user = await AsyncStorage.getItem('user');
    let experienceFormData = new FormData();
    experienceFormData.append(
      'experinceCompanyName',
      experienceForm.experinceCompanyName,
    );
    experienceFormData.append('jobProfile', experienceForm.jobProfile);
    experienceFormData.append('id', editId);
    experienceFormData.append('jobOccupation', experienceForm.jobOccupation);
    experienceFormData.append('experienceType', experienceForm.experienceType);
    experienceFormData.append('fromDate', experienceForm.fromDate);
    experienceFormData.append('toDate', experienceForm.toDate);
    if (experienceForm.stateName) {
      experienceFormData.append('stateName', experienceForm.stateName);
    }
    if (experienceForm.countryName) {
      experienceFormData.append('countryName', experienceForm.countryName);
    }
    if (experienceForm.certificateImage != '') {
      experienceFormData.append('certificateImage', {
        uri: experienceForm.certificateImage.uri,
        type: experienceForm.certificateImage.type,
        name: experienceForm.certificateImage.name,
      });
    }
    try {
      let response = await editExperienceStepApi(
        experienceFormData,
        JSON.parse(user).access_token,
      );
      console.log('res', response);
      if (response?.data?.msg == 'Experience Successfully Updated.') {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Experience successfully added.',
          // text2:" Feel free to enrich your profile by adding more experiences if you desire.",
          visibilityTime: 3000,
        });
        setExperienceForm({
          experinceCompanyName: '',
          jobProfile: '',
          jobOccupation: '',
          experienceType: '',
          fromDate: '',
          toDate: '',
          countryName: '',
          stateName: '',
          certificateImage: '',
        });
        setEditExtraField({
          viewState: '',
          viewCountry: '',
          viewJobProfile: '',
          viewOccupation: '',
        });
        getExperienceFunc();
        setTimeout(() => {
          setShowAddExperienceForm(false);
        }, 2000);
      } else {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          // position: 'top',
          text1: 'Something went wrong',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error', // 'success', 'error', 'info', or any custom type you define
        // position: 'top',
        text1: 'Something went wrong',
        visibilityTime: 3000, // Duration in milliseconds
      });
    }
  };
  const [occupations, setOccupations] = useState([]);
  const getOccupationList = async () => {
    try {
      let response = await getOccupations();
      setOccupations(response?.occupation);
    } catch (error) {}
  };
  const [skills, setSkills] = useState([]);
  const getSkillListByOccuId = async id => {
    try {
      let response = await getSkillsByOccuId(id);
      console.log('res', response.skills);
      setSkills(response?.skills);
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
  const [countryList, setCountryList] = useState([]);
  const getCountryList = async () => {
    try {
      let response = await getCountries();
      setCountryList(response?.countries);
    } catch (error) {}
  };
  const [experienceList, setExperinceList] = useState([]);
  const getExperienceFunc = async () => {
    setLoading(true);
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getAllExperience(JSON.parse(user).access_token);
      if (response?.data?.data) {
        setExperinceList(response?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getOccupationList();
      getStateList();
      getCountryList();
      getExperienceFunc();
    }, []),
  );
  const [imgPrev, setImgPrev] = useState('');
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // You can specify the types of documents to pick
      });
      setExperienceForm({...experienceForm, certificateImage: result[0]});
      setImgPrev(result[0].uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        console.error('Error while picking a document', err);
      }
    }
  };
  const [addForm, setAddForm] = useState('Add');
  const [editExtraField, setEditExtraField] = useState({
    viewState: '',
    viewCountry: '',
    viewJobProfile: '',
    viewOccupation: '',
    certificateImagePrev: '',
  });
  const setInputField = value => {
    console.warn(value.id);
    setAddForm('Edit');
    setEditId(value.id);
    setEditExtraField({
      viewState: value.stateName,
      viewCountry: value.countryName,
      viewJobProfile: value.jobProfile,
      viewOccupation: value.jobOccupation,
      certificateImagePrev: value.certificateImage,
    });
    setImgPrev(value.certificateImage);
    setExperienceForm({
      experinceCompanyName: value.experinceCompanyName,
      jobProfile: value.jobProfileId,
      jobOccupation: value.jobOccupationId,
      experienceType: value.experienceType,
      fromDate: value.fromDate,
      toDate: value.toDate,
      countryName: value.countryId,
      stateName: value.stateId,
      certificateImage: '',
    });
    getSkillListByOccuId(value.jobProfileId);
  };
  const emptyField = () => {
    setExperienceForm({
      experinceCompanyName: '',
      jobProfile: '',
      jobOccupation: '',
      experienceType: '',
      fromDate: '',
      toDate: '',
      countryName: '',
      stateName: '',
      certificateImage: '',
    });
  };
  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 15,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.cardText}>
          {newTranslation?.experinceCount} : {experienceList?.length}
        </Text>
        {/* <View style={{marginEnd:10}}>
        <Button title="ADD MORE"  />
        </View> */}
      </View>
      <ScrollView>
        {experienceList?.map((v, i) => {
          return (
            <View style={styles.experienceCard}>
              <View
                style={{
                  flexDirection: 'row',

                  alignItems: 'center',
                }}>
                {/* <Image style={{height:70, width:70, marginRight:10}} source={require('../images/dummyUserProfile.jpg')} /> */}
                <View>
                  <Text
                    style={[
                      styles.cardText,
                      {fontWeight: '700', fontSize: 17},
                    ]}>
                    {v?.experinceCompanyName}
                  </Text>
                  <Text style={styles.cardText}>
                    {newTranslation?.department} :{' '}
                    <Text style={{fontWeight: '400'}}>{v?.jobProfile}</Text>
                  </Text>
                  <Text style={styles.cardText}>
                    {newTranslation?.occupation} :{' '}
                    <Text style={{fontWeight: '400'}}>{v?.jobOccupation}</Text>
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',

                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={styles.cardText}>
                    {newTranslation?.experienceType} :{' '}
                    <Text style={{fontWeight: '400'}}>
                      {v?.experienceType &&
                        v?.experienceType.charAt(0).toUpperCase() +
                          v?.experienceType.slice(1)}
                    </Text>
                  </Text>
                  <Text style={styles.cardText}>
                    {newTranslation?.location} :{' '}
                    <Text style={{fontWeight: '400'}}>
                      {v?.countryName && v?.countryName}{' '}
                      {v?.stateName && v?.stateName}
                    </Text>
                  </Text>
                  <Text style={styles.cardText}>
                    {newTranslation?.duration} :{' '}
                    <Text style={{fontWeight: '400'}}>
                      {v?.durationMonth && v.durationMonth > 12
                        ? `${Math.floor(v.durationMonth / 12)} year${
                            Math.floor(v.durationMonth / 12) > 1 ? 's' : ''
                          } ${v.durationMonth % 12} month${
                            v.durationMonth % 12 > 1 ? 's' : ''
                          }`
                        : `${v?.durationMonth} month${
                            v.durationMonth === 1 ? '' : 's'
                          }`}
                    </Text>
                  </Text>
                </View>
                <View>
                  {v?.certificateImage ==
                  'https://overseas.ai/placeholder/no-image.jpg' ? (
                    <Image
                      style={{height: 70, width: 70, resizeMode: 'contain'}}
                      source={require('../images/certificatePrev.png')}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: v?.certificateImage,
                      }}
                      style={{height: 70, width: 70, resizeMode: 'contain'}}
                    />
                  )}

                  <Text
                    style={styles.btnText}
                    onPress={() => {
                      setShowAddExperienceForm(true);
                      setInputField(v);
                    }}>
                    {newTranslation?.edit}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View>
        <Button
          title={newTranslation?.addMoreExperience}
          color="#035292"
          onPress={() => {
            setShowAddExperienceForm(true);
            setAddForm('Add');
          }}
        />
      </View>
      <Modal
        transparent={true}
        visible={showAddExperienceForm}
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
                {addForm} Experience
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setShowAddExperienceForm(false);
                  emptyField();
                }}>
                <Image source={require('../images/close.png')} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{marginTop: 15}}>
              {addForm == 'Edit' ? (
                <Pressable style={{marginBottom: 15}} onPress={pickDocument}>
                  {experienceForm.certificateImage != '' ? (
                    <Image
                      source={{
                        uri: imgPrev,
                      }}
                      style={{
                        width: '100%',
                        height: 100,
                        resizeMode: 'contain',
                      }}
                    />
                  ) : (
                    <Image
                      style={{
                        width: '100%',
                        height: 100,
                        resizeMode: 'contain',
                      }}
                      source={require('../images/certificatePrev.png')}
                    />
                  )}
                  <View>
                    {editExtraField.certificateImagePrev == '' ? (
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '500',
                          textAlign: 'center',
                          color: '#035292',
                        }}>
                        {newTranslation?.uploadCertificate}
                      </Text>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: '500',
                            textAlign: 'center',
                            color: '#035292',
                            marginEnd: 20,
                          }}>
                          {experienceForm.certificateImage == ''
                            ? newTranslation?.upload
                            : newTranslation?.selected}
                        </Text>
                        <Pressable
                          onPress={() => {
                            setExperienceForm({
                              ...experienceForm,
                              certificateImage: '',
                            });
                            setImgPrev('');
                          }}>
                          <Image source={require('../images/close.png')} />
                        </Pressable>
                      </View>
                    )}
                  </View>
                </Pressable>
              ) : (
                <Pressable style={{marginBottom: 15}} onPress={pickDocument}>
                  <View>
                    {experienceForm.certificateImage == '' ? (
                      <View>
                        <Image
                          source={require('../images/certificatePrev.png')}
                          style={{
                            width: '100%',
                            height: 100,
                            resizeMode: 'contain',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: '500',
                            textAlign: 'center',
                            color: '#035292',
                          }}>
                          {newTranslation?.uploadCertificate}
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <Image
                          source={{
                            uri: imgPrev,
                          }}
                          style={{
                            width: '100%',
                            height: 100,
                            resizeMode: 'contain',
                          }}
                        />
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '500',
                              textAlign: 'center',
                              color: '#035292',
                              marginEnd: 20,
                            }}>
                            {newTranslation?.selected}
                          </Text>
                          <Pressable
                            onPress={() =>
                              setExperienceForm({
                                ...experienceForm,
                                certificateImage: '',
                              })
                            }>
                            <Image source={require('../images/close.png')} />
                          </Pressable>
                        </View>
                      </View>
                    )}
                  </View>
                </Pressable>
              )}
              <TextInput
                placeholder={newTranslation?.companyName}
                placeholderTextColor="gray"
                // style={styles.input}
                style={[
                  styles.input,
                  addForm == 'Edit' && {
                    backgroundColor: 'rgba(200, 200, 200, 0.4)',
                  },
                ]}
                value={experienceForm.experinceCompanyName}
                editable={addForm == 'Edit' ? false : true}
                onChangeText={text =>
                  setExperienceForm({
                    ...experienceForm,
                    experinceCompanyName: text,
                  })
                }
              />
              {addForm == 'Edit' ? (
                <TextInput
                  editable={false}
                  placeholderTextColor="gray"
                  style={[
                    styles.input,
                    {backgroundColor: 'rgba(200, 200, 200, 0.4)'},
                  ]}
                  value={editExtraField.viewJobProfile}></TextInput>
              ) : (
                <View style={styles.picker}>
                  <Picker
                    selectedValue={experienceForm.jobProfile}
                    onValueChange={(itemValue, itemIndex) => {
                      getSkillListByOccuId(itemValue);
                      setExperienceForm({
                        ...experienceForm,
                        jobProfile: itemValue,
                      });
                    }}>
                    <Picker.Item
                      label={
                        experienceForm?.jobProfile
                          ? experienceForm.jobProfile
                          : newTranslation?.selectOccupation
                      }
                      value={editExtraField.jobProfileId}
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
                </View>
              )}
              {experienceForm.jobProfile != '' && (
                <View style={styles.picker}>
                  <Picker
                    selectedValue={experienceForm.jobOccupation}
                    onValueChange={(itemValue, itemIndex) => {
                      setExperienceForm({
                        ...experienceForm,
                        jobOccupation: itemValue,
                      });
                    }}>
                    <Picker.Item
                      label={
                        editExtraField?.viewOccupation
                          ? editExtraField?.viewOccupation
                          : newTranslation?.selectSkill
                      }
                      value={editExtraField.jobOccupationId}
                      style={{color: 'gray'}}
                    />
                    {skills?.map((v, i) => {
                      return (
                        <Picker.Item
                          label={v?.skill}
                          value={v.id}
                          style={{color: 'gray'}}
                        />
                      );
                    })}
                  </Picker>
                </View>
              )}
              {addForm == 'Edit' ? (
                <TextInput
                  editable={false}
                  placeholderTextColor="gray"
                  style={[
                    styles.input,
                    {backgroundColor: 'rgba(200, 200, 200, 0.4)'},
                  ]}
                  value={
                    experienceForm.experienceType == 'national'
                      ? 'Inside India'
                      : 'Outside'
                  }></TextInput>
              ) : (
                <View style={styles.picker}>
                  <Picker
                    selectedValue={experienceForm.experienceType}
                    onValueChange={(itemValue, itemIndex) => {
                      setExperienceForm({
                        ...experienceForm,
                        experienceType: itemValue,
                      });
                    }}>
                    <Picker.Item
                      label={newTranslation?.experienceType}
                      value=""
                      style={{color: 'gray'}}
                    />

                    <Picker.Item
                      label="Inside India"
                      value="national"
                      style={{color: 'gray'}}
                    />
                    <Picker.Item
                      label="Outside India"
                      value="international"
                      style={{color: 'gray'}}
                    />

                    {/* Add more Picker.Item as needed */}
                  </Picker>
                </View>
              )}
              {experienceForm.experienceType == 'national' && (
                <View style={styles.picker}>
                  <Picker
                    style={{color: 'gray'}}
                    selectedValue={experienceForm.stateName}
                    onValueChange={(itemValue, itemIndex) => {
                      setExperienceForm({
                        ...experienceForm,
                        stateName: itemValue,
                      });
                    }}>
                    <Picker.Item
                      label={
                        editExtraField.viewState
                          ? editExtraField.viewState
                          : 'Select state'
                      }
                      value={experienceForm.stateId}
                      style={{color: 'gray'}}
                    />

                    {stateList?.map((v, i) => {
                      return (
                        <Picker.Item
                          label={v?.name}
                          value={v.id}
                          style={{color: 'gray'}}
                        />
                      );
                    })}
                  </Picker>
                </View>
              )}
              {experienceForm.experienceType == 'international' && (
                <View style={styles.picker}>
                  <Picker
                    selectedValue={experienceForm.countryName}
                    onValueChange={(itemValue, itemIndex) => {
                      setExperienceForm({
                        ...experienceForm,
                        countryName: itemValue,
                      });
                    }}>
                    <Picker.Item
                      label={
                        experienceForm.countryName
                          ? experienceForm.countryName
                          : 'Select country'
                      }
                      value={editExtraField.countryId}
                      style={{color: 'gray'}}
                    />
                    {countryList?.map((v, i) => {
                      return (
                        <Picker.Item
                          label={v?.name}
                          value={v.id}
                          style={{color: 'gray'}}
                        />
                      );
                    })}
                  </Picker>
                </View>
              )}

              {/* <Text style={[styles.cardText, {marginBottom:5}]}>Experience Duration</Text> */}
              <View
                style={
                  {
                    // flexDirection: 'row',
                    // justifyContent: 'space-between',
                    // alignItems: 'center',
                  }
                }>
                <View>
                  <TouchableOpacity
                    onPress={() => setJoiningCalender(true)}
                    style={[styles.input, {marginBottom: 15, padding: 17}]}>
                    <Text style={{color: 'gray'}}>
                      {experienceForm.fromDate != ''
                        ? experienceForm.fromDate
                        : newTranslation?.joiningDate}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setEndingCalender(true)}
                    style={[styles.input, {marginBottom: 15, padding: 17}]}>
                    <Text style={{color: 'gray'}}>
                      {experienceForm.toDate != ''
                        ? experienceForm.toDate
                        : newTranslation?.endingDate}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            {addForm == 'Edit' ? (
              <Button
                title={newTranslation?.edit}
                color="#035292"
                onPress={editExperience}
              />
            ) : (
              <Button
                title={newTranslation?.save}
                color="#035292"
                onPress={addExperience}
              />
            )}
          </View>
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
      </Modal>
      <DateTimePickerModal
        isVisible={showJoiningCalender}
        mode="date"
        onConfirm={selecteddate => {
          const date = new Date(selecteddate);
          const year = date.getFullYear();

          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;
          setExperienceForm({...experienceForm, fromDate: formattedDate});
          setJoiningCalender(false);
        }}
        onCancel={() => setJoiningCalender(false)}
      />
      <DateTimePickerModal
        isVisible={showEndingCalender}
        mode="date"
        onConfirm={selecteddate => {
          const date = new Date(selecteddate);
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;
          setExperienceForm({...experienceForm, toDate: formattedDate});
          setEndingCalender(false);
        }}
        onCancel={() => setEndingCalender(false)}
      />

      <Modal transparent={true} visible={loading} animationType="slide">
        <View style={{backgroundColor: 'rgba(0,0,0,0.1)', flex: 1}}></View>
      </Modal>
    </View>
  );
};

export default ExperienceScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 18,
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
  experienceCard: {
    padding: 10,
    backgroundColor: '#F1F7FF',
    elevation: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 3,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 15,
    marginBottom: 3,
    color: 'black',
    fontWeight: '600',
  },
  btnText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: 'blue',
    fontWeight: '500',
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
});
