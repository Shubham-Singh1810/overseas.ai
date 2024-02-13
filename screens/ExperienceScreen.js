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
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-modern-datepicker';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
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

const ExperienceScreen = () => {
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
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getAllExperience(JSON.parse(user).access_token);
      if (response?.data?.data) {
        setExperinceList(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOccupationList();
    getStateList();
    getCountryList();
    getExperienceFunc();
  }, []);
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // You can specify the types of documents to pick
      });
      setExperienceForm({...experienceForm, certificateImage: result[0]});
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
          Experince Count : {experienceList?.length}
        </Text>
        {/* <View style={{marginEnd:10}}>
        <Button title="ADD MORE"  />
        </View> */}
        <View>
          <Button title="Video tutorial" color="#035292" />
        </View>
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
                    Department :{' '}
                    <Text style={{fontWeight: '400'}}>{v?.jobProfile}</Text>
                  </Text>
                  <Text style={styles.cardText}>
                    Occupation :{' '}
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
                    Experience Type :{' '}
                    <Text style={{fontWeight: '400'}}>
                      {v?.experienceType &&
                        v?.experienceType.charAt(0).toUpperCase() +
                          v?.experienceType.slice(1)}
                    </Text>
                  </Text>
                  <Text style={styles.cardText}>
                    Location :{' '}
                    <Text style={{fontWeight: '400'}}>
                      {v?.countryName && v?.countryName}{' '}
                      {v?.stateName && v?.stateName}
                    </Text>
                  </Text>
                  <Text style={styles.cardText}>
                    Duration :{' '}
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
                    Edit
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View>
        <Button
          title="Add more Experience"
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
                      source={require('../images/certificatePrev.png')}
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
                      source={{
                        uri: editExtraField.certificateImagePrev,
                      }}
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
                        Upload Certificate
                      </Text>
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop:10
                        }}>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: '500',
                            textAlign: 'center',
                            color: '#035292',
                            marginEnd: 20,
                            
                          }}>
                          {experienceForm.certificateImage =="" ? "Upload": "Selected"} 
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
                    )}
                  </View>
                </Pressable>
              ) : (
                <Pressable style={{marginBottom: 15}} onPress={pickDocument}>
                  <Image
                    source={require('../images/certificatePrev.png')}
                    style={{width: '100%', height: 100, resizeMode: 'contain'}}
                  />

                  <View>
                    {experienceForm.certificateImage == '' ? (
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '500',
                          textAlign: 'center',
                          color: '#035292',
                        }}>
                        Upload Certificate
                      </Text>
                    ) : (
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
                          Selected
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
                    )}
                  </View>
                </Pressable>
              )}
              <TextInput
                placeholder="Company Name"
                style={styles.input}
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
                  style={styles.input}
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
                      // label="Select Working Department"
                      label={
                        experienceForm?.jobProfile
                          ? experienceForm.jobProfile
                          : 'Select Working Department'
                      }
                      value={editExtraField.jobProfileId}
                      style={{color: 'gray'}}
                    />
                    {occupations.map((v, i) => {
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
                          : 'Select Occupation'
                      }
                      value={editExtraField.jobOccupationId}
                      style={{color: 'gray'}}
                    />
                    {skills.map((v, i) => {
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
                  style={styles.input}
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
                      label="Experience Type"
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
                    <Text>
                      {experienceForm.fromDate != ''
                        ? experienceForm.fromDate
                        : 'Joining Date'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setEndingCalender(true)}
                    style={[styles.input, {marginBottom: 15, padding: 17}]}>
                    <Text>
                      {experienceForm.toDate != ''
                        ? experienceForm.toDate
                        : 'Ending Date'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            {addForm == 'Edit' ? (
              <Button title="Edit" color="#035292" onPress={editExperience} />
            ) : (
              <Button title="Save" color="#035292" onPress={addExperience} />
            )}
          </View>
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
      </Modal>
      <Modal transparent={true} visible={showJoiningCalender}>
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
                Select Date Of Joining
              </Text>
              <TouchableOpacity onPress={() => setJoiningCalender(false)}>
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
                console.log(formattedDate);

                setExperienceForm({...experienceForm, fromDate: formattedDate});
                setJoiningCalender(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={showEndingCalender}>
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
                Select Date Of Exit
              </Text>
              <TouchableOpacity onPress={() => setEndingCalender(false)}>
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
                console.log(formattedDate);
                setExperienceForm({...experienceForm, toDate: formattedDate});
                setEndingCalender(false);
              }}
            />
          </View>
        </View>
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
