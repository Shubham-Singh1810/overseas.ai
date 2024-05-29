import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  Platform,
  Pressable,
  Modal,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RadioButton} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {useGlobalState} from '../GlobalProvider';
import DatePicker from 'react-native-modern-datepicker';
import {Picker} from '@react-native-picker/picker';
import MyMultipleSelectPopUp from '../components/MyMultipleSelectPopUp';
import MySingleSelectPopUp from '../components/MySingleSelectPopUp';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import {countryCodeList} from '../services/countryCodeList';
import {
  getOccupations,
  getSkillsByOccuId,
  getState,
  getDistrict,
  getPs,
  getPanchayat,
  getVillage,
  getCountryCode,
  getCountries,
} from '../services/info.service';
import {useFocusEffect} from '@react-navigation/native';
import ExperiencePopStep1 from '../components/ExperiencePopStep1';
import {registerUserStep1, addExperienceStep2} from '../services/user.service';
import {newsData} from '../services/migrating_workers (2) (1)';
export default function CandidateFormDetails() {
  const {globalState, newTranslation, setGlobalState} = useGlobalState();
  const [showStatePref, setShowStatePref] = useState(false);
  const [showCountryPref, setShowCountryPref] = useState(false);
  const [formData, setFormData] = useState({
    empDob: '',
    empGender: '',
    empWhatsapp: '',
    empWhatsappCountryCode: '+91',
    empLanguage: [],
    empMS: '',
    empPassportQ: '',
    empSkill: '',
    empOccuId: '',
    empInternationMigrationExp: '',
    empEdu: '',
    empTechEdu: '',
    empState: '',
    empDistrict: '',
    empPS: '',
    empPSName: '',
    empPanchayatID: '',
    empPanchayat: '',
    empVillage: '',
    empVillageID: '',
    empPin: '',
    empEmail: '',
    empDailyWage: '',
    empExpectedMonthlyIncome: '',
    empRelocationIntQ: '',
    empRelocationIntQCountry: '',
    empRelocationIntQState: '',
    empRefName: '',
    empRefPhone: '',
    empRefDistance: '',
  });
  const [experienceNone, setExperienceNome] = useState('');
  const [showCalender, setShowCalender] = useState(false);
  const [showLanguagePopUp, setShowLanguagePopUp] = useState(false);
  const languageOption = [
    {label: 'Bengali', value: 'Bengali'},
    {label: 'Assamese', value: 'Assamese'},
    {label: 'Hindi', value: 'Hindi'},
    {label: 'Marathi', value: 'Marathi'},
    {label: 'Malayalam', value: 'Malayalam'},
    {label: 'Oriya', value: 'Oriya'},
    {label: 'Punjabi', value: 'Punjabi'},
    {label: 'Tamil', value: 'Tamil'},
    {label: 'Telugu', value: 'Telugu'},
    {label: 'Urdu', value: 'Urdu'},
    {label: 'Arabic', value: 'Arabic'},
    {label: 'English', value: 'English'},
    {label: 'Japanese', value: 'Japanese'},
    {label: 'German', value: 'German'},
    {label: 'Spanish', value: 'Spanish'},
    {label: 'French', value: 'French'},
  ];
  const [showWorkDepPopUp, setShowWorkDepPopUp] = useState(false);
  const [occupations, setOccupations] = useState([]);
  const getOccupationList = async () => {
    try {
      let response = await getOccupations();
      let occupations = response?.occupation?.map(item => ({
        label: item.occupation,
        value: item.id,
      }));
      setOccupations(occupations);
    } catch (error) {}
  };
  const [showSkillPopUp, setShowSkillPopUp] = useState(false);
  const [skillList, setSkillList] = useState([]);
  const getSkillList = async id => {
    try {
      let response = await getSkillsByOccuId(id);
      console.warn(response);
      let skills = response?.skills?.map(item => ({
        label: item.skill,
        value: item.id,
      }));
      setSkillList(skills);
    } catch (error) {}
  };

  const [showHighestEduPopUp, setShowHighestEduPopUp] = useState(false);

  const highestEducationArr = [
    {
      label: 'Primary Education (below class 8)',
      value: 'Primary Education (below class 8)',
    },
    {
      label: 'Middle education (class 8 and above but below class 10)',
      value: 'Middle education (class 8 and above but below class 10)',
    },
    {label: 'Secondary Education', value: 'Secondary Education'},
    {label: 'Higher Secondary Education', value: 'Higher Secondary Education'},
    {label: 'Graduate', value: 'Graduate'},
    {label: 'Post Graduate', value: 'Post Graduate'},
  ];
  const [showTechPopUp, setShowTechPopUp] = useState(false);

  const vocationalEduArr = [
    {label: 'ITI', value: 'ITI'},
    {label: 'Polytechnic', value: 'Polytechnic'},
    {label: 'Graduate in Engineering', value: 'Graduate in Engineering'},
    {
      label: 'Any other Vocational Training (one year or above)',
      value: 'Any other Vocational Training (one year or above)',
    },
    {
      label: 'Any other Vocational Training (less than one year)',
      value: 'Any other Vocational Training (less than one year)',
    },
    {label: 'Not applicable', value: 'Not applicable'},
  ];
  const [showStatePopUp, setShowStatePopUp] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [stateListforPref, setStateListforPref] = useState([]);
  const getStateList = async () => {
    try {
      let response = await getState();
      let state = response.data.states.map(item => ({
        label: item.name,
        value: item.id,
      }));
      let statePref = response.data.states.map(item => ({
        label: item.name,
        value: item.name,
      }));
      setStateList(state);
      setStateListforPref(statePref);
    } catch (error) {
      console.log(error);
    }
  };
  const [showDistrictPopUp, setShowDistrictPopUp] = useState(false);
  const [districtList, setDistrictList] = useState([]);
  const getDistrictListFunc = async value => {
    try {
      let response = await getDistrict(value);
      let district = response.districts.map(item => ({
        label: item.name,
        value: item.id,
      }));
      setDistrictList(district);
    } catch (error) {
      console.log(error);
    }
  };

  const [showPsPopUp, setShowPsPopUp] = useState(false);
  const [psList, setPsList] = useState([]);
  const getPoliceStationById = async id => {
    try {
      let response = await getPs(id);
      let psList = response?.data?.ps_list.map(item => ({
        label: item.name,
        value: item.id,
      }));

      setPsList(psList);
    } catch (error) {
      console.log(error);
    }
  };

  const [showPanchayatPopUp, setShowPanchayatPopUp] = useState(false);
  const [panchayatList, setPanchayatList] = useState([]);
  const getPanchayatById = async id => {
    try {
      let response = await getPanchayat(id);
      let panchayatList = response?.data.panchayat_list.map(item => ({
        label: item.name,
        value: item.id,
      }));
      setPanchayatList(panchayatList);
    } catch (error) {
      console.log(error);
    }
  };

  const [showVillagePopUp, setShowVillagePopUp] = useState(false);
  const [villageList, setVillageList] = useState([]);
  const getVillageList = async id => {
    try {
      let response = await getVillage(id);
      let villageList = response?.data.village_list.map(item => ({
        label: item.name,
        value: item.id,
      }));
      setVillageList(villageList);
    } catch (error) {
      console.log(error);
    }
  };

  const [showExperiencePopUp, setShowExperiencePopUp] = useState(false);

  const [countryCodeArr, setCountryCodeArr] = useState([]);
  const getListOfCountryCode = async () => {
    try {
      let response = await getCountryCode();
      setCountryCodeArr(response?.data?.countryCodes);
    } catch (error) {
      console.log(error);
    }
  };
  const [countryList, setCountryList] = useState([]);
  const getListOfCountry = async () => {
    try {
      let response = await getCountries();
      let country = response.countries.map(item => ({
        label: item.name,
        value: item.name,
      }));
      setCountryList(country);
    } catch (error) {}
  };
  const [localUser, setLocalUser] = useState('');
  const getLocalUser = async () => {
    setLocalUser(JSON.parse(await AsyncStorage.getItem('signUpUser')));
    console.log('sdfs', localUser);
  };
  useFocusEffect(
    React.useCallback(() => {
      getOccupationList();
      getStateList();
      getListOfCountryCode();
      getListOfCountry();
      getLocalUser();
    }, []),
  );

  const [formDataError, setFormDataError] = useState({
    empDob: '',
    empGender: '',
    empLanguage: '',
    empMS: '',
    empPassportQ: '',
    empSkill: '',
    empOccuId: '',
    empEdu: '',
    empTechEdu: '',
    empState: '',
    empDistrict: '',
    empPS: '',
    empPanchayat: '',
    empPin: '',
    empInternationMigrationExp: '',
    empDailyWage: '',
    empExpectedMonthlyIncome: '',
    empRelocationIntQ: '',
    empEmail: '',
  });
  const formValidaion = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let result = true;
    const newErrors = {...formDataError};
    if (formData.empEmail != '') {
      if (!emailRegex.test(formData.empEmail)) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Please enter valid email',
          text2: 'Form validation failed',
          visibilityTime: 3000,
        });
        newErrors.empEmail = newTranslation.pleaseEnterValidEmail;
        return false;
      }
    }
    if (formData.empDob === '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Date of Birth is a required Feild',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empDob = newTranslation.dateOfBirthIsARequiredFeild;
      result = false;
    }
    if (formData.empGender == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Gender is required feild',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empGender = newTranslation.genderIsRequiredFeild;
      result = false;
    }
    if (formData.empLanguage.length == 0) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Language select is required feild',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empLanguage = newTranslation.languageSelectIsRequiredFeild;
      result = false;
    }
    if (formData.empMS == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Marital status is required field',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empMS = newTranslation.maritalStatusIsRequiredField;
      result = false;
    }
    if (formData.empPassportQ == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Please select : Do you have passport ?',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empPassportQ = newTranslation.pleaseSelectDoYouHavePassport;
      result = false;
    }
    if (formData.empOccuId == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Present working department is required field',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empOccuId =
        newTranslation.presentWorkingDepartmentIsRequiredField;
      result = false;
    }
    if (formData.empSkill == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Present Occupation is required field',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empSkill = newTranslation.presentOccupationIsRequiredField;
      result = false;
    }
    if (formData.empEdu == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Highest education qualification is required field',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empEdu =
        newTranslation.highestEducationQualificationIsRequiredField;
      result = false;
    }
    if (formData.empTechEdu == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Technical education is required field',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empTechEdu = newTranslation.technicalEducationIsRequiredField;
      result = false;
    }
    if (formData.empState == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'State is required field',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empState = newTranslation.stateIsRequiredField;
      result = false;
    }
    if (formData.empDistrict == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'District is required field',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empDistrict = newTranslation.districtIsRequiredField;
      result = false;
    }
    if (formData.empPS == '' && formData.empPSName == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Police Station is required field',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empPS = newTranslation.policeStationIsRequiredField;
      result = false;
    }
    if (formData.empPanchayat == '' && formData.empPanchayatID == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Pamchayat/Municipality is required field',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empPanchayat =
        newTranslation.pamchayatMunicipalityIsRequiredField;
      result = false;
    }
    if (formData.empPin.length != 6) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Pin code is required field please write valid pin number',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empPin =
        newTranslation.pinCodeIsRequiredFieldPleaseWriteValidPinNumber;
      result = false;
    }
    if (formData.empInternationMigrationExp == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Please select experience type',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empInternationMigrationExp =
        newTranslation.pleaseSelectExperienceType;
      result = false;
    }
    if (formData.empDailyWage == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Please enter present monthly income',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empDailyWage = newTranslation.pleaseEnterPresentMonthlyIncome;
      result = false;
    }
    if (formData.empExpectedMonthlyIncome == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Please enter expected monthly income',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empExpectedMonthlyIncome =
        newTranslation.pleaseEnterExpectedMonthlyIncome;
      result = false;
    }
    if (formData.empRelocationIntQ == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Please enter prefered job location',
        text2: 'Form validation failed',
        visibilityTime: 3000,
      });
      newErrors.empRelocationIntQ = newTranslation.pleaseEnterRelocationIntrest;
      result = false;
    }
    setFormDataError(newErrors);
    return result;
  };
  const setUserData = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      setGlobalState({...globalState, user: user});
    } catch (error) {
      console.warn('error from global provider');
    }
  };
  const handleSubmit = async () => {
    if (formValidaion()) {
      try {
        const finalPayload = {
          ...formData,
          empLanguage: JSON.stringify(formData.empLanguage),
        };
        let response = await registerUserStep1(
          finalPayload,
          JSON.parse(await AsyncStorage.getItem('signUpUser')).access_token,
        );
        if (response?.msg == 'Data Updated Successfully') {
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Data Updated Successfully',
            visibilityTime: 3000,
          });
          await AsyncStorage.setItem(
            'user',
            JSON.stringify({...response, access_token: localUser.access_token}),
          );
          setUserData();
        } else {
          console.log(response);
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Something went wrong',
            visibilityTime: 3000,
          });
        }
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Internal server error',
          visibilityTime: 3000,
        });
      }
    }
  };
  return (
    <>
      <ScrollView style={styles.main}>
        <View>
          <Text style={styles.heading}>
            {newTranslation?.pleaseEnterYourDetails}
          </Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{newTranslation.enterDateOfBirth}</Text>
          <Pressable
            style={[
              styles.input,
              {padding: 15},
              formDataError.empDob !== '' && {borderColor: 'red'},
            ]}
            onPress={() => setShowCalender(true)}>
            <Text style={{color: '#212121', fontSize: 14, fontWeight: '500'}}>
              {formData.empDob}
            </Text>
          </Pressable>
          <Text style={styles.errorText}>{formDataError.empDob}</Text>
          <Modal transparent={true} visible={showCalender}>
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
                  // padding: 20,
                  backgroundColor: '#fff',
                }}>
                {/* <View
                  style={{
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontWeight: '600', fontSize: 20, color: 'gray'}}>
                    Date of Birth
                  </Text>
                  <Pressable onPress={() => setShowCalender(false)}>
                    <Image source={require('../images/close.png')} />
                  </Pressable>
                </View> */}

                {/* <DatePicker
                  mode="calender"
                  format="YYYY-MM-DD"
                  onDateChange={date => {
                    const curreentDate = new Date();
                    const currentYear = curreentDate.getFullYear();
                    const birthYear = date.split('/')[0];
                    const agg = currentYear - birthYear;
                    if (agg < 16) {
                      Toast.show({
                        type: 'error', // 'success', 'error', 'info', or any custom type you define
                        // position: 'top',
                        text1: 'Age must be more than 16 years',
                        visibilityTime: 3000, // Duration in milliseconds
                      });
                    } else {
                      setFormData({...formData, empDob: date});
                      setShowCalender(false);
                      setFormDataError({...formDataError, empDob: ''});
                    }
                  }}
                /> */}
                <DateTimePickerModal
                  isVisible={showCalender}
                  mode="date"
                  onConfirm={selecteddate => {
                    const date = new Date(selecteddate);
                    const year = date.getFullYear();
                    if (year < 2010) {
                      const month = (date.getMonth() + 1)
                        .toString()
                        .padStart(2, '0');
                      const day = date.getDate().toString().padStart(2, '0');
                      const formattedDate = `${year}-${month}-${day}`;
                      setFormData({...formData, empDob: formattedDate});
                      setShowCalender(false);
                      setFormDataError({...formDataError, empDob: ''});
                    } else {
                      setShowCalender(false);
                      Toast.show({
                        type: 'error', 
                        position: 'top',
                        text1: 'Age must be more than 16 years',
                        visibilityTime: 3000, 
                      });
                    }
                  }}
                  onCancel={() => setShowCalender(false)}
                />
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{newTranslation.selectGender}</Text>
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 8,
              },
              styles.input,
              formDataError.empGender !== '' && {borderColor: 'red'},
            ]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="Male"
                status={formData.empGender === 'Male' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setFormDataError({...formDataError, empGender: ''});
                  setFormData({...formData, empGender: 'Male'});
                }}
              />
              <Text style={{color: 'black'}}>{newTranslation.Male}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="Female"
                status={
                  formData.empGender === 'Female' ? 'checked' : 'unchecked'
                }
                onPress={() => {
                  setFormDataError({...formDataError, empGender: ''});
                  setFormData({...formData, empGender: 'Female'});
                }}
              />
              <Text style={{color: 'black'}}>{newTranslation.Female}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="Other"
                status={
                  formData.empGender === 'Other' ? 'checked' : 'unchecked'
                }
                onPress={() => {
                  setFormData({...formData, empGender: 'Other'});
                  setFormDataError({...formDataError, empGender: ''});
                }}
              />
              <Text style={{color: 'black'}}>{newTranslation.Other}</Text>
            </View>
          </View>
          <Text style={styles.errorText}>{formDataError.empGender}</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{newTranslation.enterEmail}</Text>
          <TextInput
            style={[
              styles.input,
              formDataError.empEmail !== '' && {borderColor: 'red'},
            ]}
            onChangeText={text => setFormData({...formData, empEmail: text})}
            value={formData.empEmail}
          />
          <Text style={styles.errorText}>{formDataError.empEmail}</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{newTranslation.enterWhatsapp}</Text>
          <View style={[styles.input, {flexDirection: 'row'}]}>
            <View
              style={{
                width: '15%',
                height: '100%',
                position: 'absolute',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 5,
              }}>
              <Text style={{color: 'black'}}>
                {formData.empWhatsappCountryCode}
              </Text>
            </View>
            <View
              style={{
                width: '15%',
                borderRightWidth: 0.8,
                borderColor: 'gray',
              }}>
              <Picker
                selectedValue={formData.empWhatsappCountryCode}
                onValueChange={(itemValue, itemIndex) => {
                  setFormData({...formData, empWhatsappCountryCode: itemValue});
                }}
                // mode="dropdown"
                style={{color: 'black', opacity: 0}}>
                <Picker.Item
                  label="Select country code"
                  value="+91"
                  style={{color: 'gray'}}
                />
                {countryCodeArr?.map((v, i) => {
                  return (
                    <Picker.Item
                      label={'+' + v.countryCode + '  ' + v.name}
                      value={'+' + v.countryCode}
                      style={{color: 'gray'}}
                    />
                  );
                })}

                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>

            {/* <TextInput keyboardType="numeric" style={{width:"20%", borderRightWidth:1}} onChangeText={(text)=>setFormData({...formData, empEmail:text})} value={formData.empEmail}/> */}
            <TextInput
              keyboardType="numeric"
              onChangeText={text =>
                setFormData({...formData, empWhatsapp: text})
              }
              value={formData.empWhatsapp}
              style={{width: '100%', color: 'black'}}
            />
          </View>
          {/* <TextInput style={styles.input} onChangeText={(text)=>setFormData({...formData, empEmail:text})} value={formData.empEmail}/> */}
          <Text style={styles.errorText}></Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{newTranslation.enterLanguageKnown}</Text>
          <Pressable
            style={[
              styles.input,
              {padding: 15},
              formDataError.empLanguage !== '' && {borderColor: 'red'},
            ]}
            onPress={() => setShowLanguagePopUp(true)}>
            <Text style={{color: '#212121', fontSize: 14, fontWeight: '500'}}>
              {formData?.empLanguage?.map((v, i) => {
                return v + '  ';
              })}
            </Text>
          </Pressable>
          <Text style={styles.errorText}>{formDataError.empLanguage}</Text>
          <MyMultipleSelectPopUp
            title="Select Known language"
            toggle={showLanguagePopUp}
            showSearch={true}
            setToggle={setShowLanguagePopUp}
            inputOption={languageOption}
            callBackFunck={value => {
              setFormData({...formData, empLanguage: value});
              setFormDataError({...formDataError, empLanguage: ''});
            }}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {newTranslation?.selectMaritalStatus}
          </Text>
          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                padding: 8,
              },
              styles.input,
              formDataError.empMS !== '' && {borderColor: 'red'},
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '50%',
              }}>
              <RadioButton
                value="Married"
                status={formData.empMS === 'Married' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setFormDataError({...formDataError, empMS: ''});
                  setFormData({...formData, empMS: 'Married'});
                }}
              />
              <Text style={{color: 'black'}}>{newTranslation.Married}</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="Unmarried"
                status={
                  formData.empMS === 'Unmarried' ? 'checked' : 'unchecked'
                }
                onPress={() => {
                  setFormDataError({...formDataError, empMS: ''});
                  setFormData({...formData, empMS: 'Unmarried'});
                }}
              />
              <Text style={{color: 'black'}}>{newTranslation.Unmarried}</Text>
            </View>
          </View>
          <Text style={styles.errorText}>{formDataError.empMS}</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{newTranslation.doYouHavePassport}</Text>
          <View
            style={[
              {
                flexDirection: 'row',

                alignItems: 'center',
                padding: 8,
              },
              styles.input,
              formDataError.empPassportQ !== '' && {borderColor: 'red'},
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '50%',
              }}>
              <RadioButton
                value="Yes"
                status={
                  formData.empPassportQ === 'Yes' ? 'checked' : 'unchecked'
                }
                onPress={() => {
                  setFormDataError({...formDataError, empPassportQ: ''});
                  setFormData({...formData, empPassportQ: 'Yes'});
                }}
              />
              <Text style={{color: 'black'}}>{newTranslation.yes}</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="No"
                status={
                  formData.empPassportQ === 'No' ? 'checked' : 'unchecked'
                }
                onPress={() => {
                  setFormDataError({...formDataError, empPassportQ: ''});
                  setFormData({...formData, empPassportQ: 'No'});
                }}
              />
              <Text style={{color: 'black'}}>{newTranslation.no}</Text>
            </View>
          </View>
          <Text style={styles.errorText}>{formDataError.empPassportQ}</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {newTranslation.selectPreferedDepartment}
          </Text>
          <Pressable
            style={[
              styles.input,
              {padding: 15},
              formDataError.empOccuId !== '' && {borderColor: 'red'},
            ]}
            onPress={() => setShowWorkDepPopUp(true)}>
            <Text style={{color: '#212121', fontSize: 14, fontWeight: '500'}}>
              {
                occupations?.filter((v, i) => {
                  return v.value == formData.empOccuId;
                })[0]?.label
              }
            </Text>
          </Pressable>
          <Text style={styles.errorText}>{formDataError.empOccuId}</Text>
          <MySingleSelectPopUp
            title="Select Working Department"
            toggle={showWorkDepPopUp}
            showSearch={true}
            setToggle={setShowWorkDepPopUp}
            inputOption={occupations}
            callBackFunck={value => {
              setFormData({...formData, empOccuId: value});
              getSkillList(value);
              setFormDataError({...formDataError, empOccuId: ''});
            }}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {newTranslation.selectPreferedOccupation}
          </Text>
          <Pressable
            style={[
              styles.input,
              {padding: 15},
              formDataError.empSkill !== '' && {borderColor: 'red'},
            ]}
            onPress={() => setShowSkillPopUp(true)}>
            <Text style={{color: '#212121', fontSize: 14, fontWeight: '500'}}>
              {
                skillList?.filter((v, i) => {
                  return v.value == formData.empSkill;
                })[0]?.label
              }
            </Text>
          </Pressable>
          <Text style={styles.errorText}>{formDataError.empSkill}</Text>
          <MySingleSelectPopUp
            title="Select Skill"
            toggle={showSkillPopUp}
            showSearch={true}
            setToggle={setShowSkillPopUp}
            inputOption={skillList}
            callBackFunck={value => {
              setFormData({...formData, empSkill: value});
              setFormDataError({...formDataError, empSkill: ''});
            }}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {newTranslation.highestEducationQualification}
          </Text>
          <Pressable
            style={[
              styles.input,
              {padding: 15},
              formDataError.empEdu !== '' && {borderColor: 'red'},
            ]}
            onPress={() => setShowHighestEduPopUp(true)}>
            <Text style={{color: '#212121', fontSize: 14, fontWeight: '500'}}>
              {formData.empEdu}
            </Text>
          </Pressable>
          <Text style={styles.errorText}>{formDataError.empEdu}</Text>
          <MySingleSelectPopUp
            title="Highest Qualification"
            toggle={showHighestEduPopUp}
            // showSearch={true}
            setToggle={setShowHighestEduPopUp}
            inputOption={highestEducationArr}
            callBackFunck={value => {
              setFormData({...formData, empEdu: value});
              setFormDataError({...formDataError, empEdu: ''});
            }}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {/* {newTranslation.technicalVocationalEducation}* */}
            {newTranslation?.technicalVocationalEducation}
          </Text>
          <Pressable
            style={[
              styles.input,
              {padding: 15},
              formDataError.empTechEdu !== '' && {borderColor: 'red'},
            ]}
            onPress={() => setShowTechPopUp(true)}>
            <Text style={{color: '#212121', fontSize: 14, fontWeight: '500'}}>
              {formData.empTechEdu}
            </Text>
          </Pressable>
          <Text style={styles.errorText}>{formDataError.empTechEdu}</Text>
          <MySingleSelectPopUp
            title="Technical Qualification"
            toggle={showTechPopUp}
            // showSearch={true}
            setToggle={setShowTechPopUp}
            inputOption={vocationalEduArr}
            callBackFunck={value => {
              setFormDataError({...formDataError, empTechEdu: ''});
              setFormData({...formData, empTechEdu: value});
            }}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: 'black',
          }}></View>
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 5,
              left: 25,
              backgroundColor: 'white',
              zIndex: 1,
              position: 'relative',
              bottom: 10.5,
            }}>
            {newTranslation.parmanentAddress}
          </Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{newTranslation.state}*</Text>
          <Pressable
            style={[
              styles.input,
              {padding: 15},
              formDataError.empState !== '' && {borderColor: 'red'},
            ]}
            onPress={() => setShowStatePopUp(true)}>
            <Text style={{color: '#212121', fontSize: 14, fontWeight: '500'}}>
              {
                stateList?.filter((v, i) => {
                  return v.value == formData.empState;
                })[0]?.label
              }
            </Text>
          </Pressable>
          <Text style={styles.errorText}>{formDataError.empState}</Text>
          {stateList?.length > 0 && (
            <MySingleSelectPopUp
              title="Select State"
              toggle={showStatePopUp}
              showSearch={true}
              setToggle={setShowStatePopUp}
              inputOption={stateList}
              callBackFunck={value => {
                setFormDataError({...formDataError, empState: ''});
                setFormData({...formData, empState: value});
                getDistrictListFunc(value);
              }}
            />
          )}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{newTranslation.District}*</Text>
          <Pressable
            style={[
              styles.input,
              {padding: 15},
              formDataError.empDistrict !== '' && {borderColor: 'red'},
            ]}
            onPress={() => setShowDistrictPopUp(true)}>
            <Text style={{color: '#212121', fontSize: 14, fontWeight: '500'}}>
              {
                districtList?.filter((v, i) => {
                  return v.value == formData.empDistrict;
                })[0]?.label
              }
            </Text>
          </Pressable>
          <Text style={styles.errorText}>{formDataError.empDistrict}</Text>
          <MySingleSelectPopUp
            title={newTranslation?.selectDistrict}
            toggle={showDistrictPopUp}
            showSearch={true}
            setToggle={setShowDistrictPopUp}
            inputOption={districtList}
            callBackFunck={value => {
              setFormData({...formData, empDistrict: value});
              getPoliceStationById(value);
              setFormDataError({...formDataError, empDistrict: ''});
            }}
          />
        </View>
        {formData.empState == '35' ? (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {newTranslation.selectPoliceStation}
            </Text>
            <Pressable
              style={[
                styles.input,
                {padding: 15},
                formDataError.empPS !== '' && {borderColor: 'red'},
              ]}
              onPress={() => setShowPsPopUp(true)}>
              <Text style={{color: '#212121', fontSize: 14, fontWeight: '500'}}>
                {
                  psList?.filter((v, i) => {
                    return v.value == formData.empPS;
                  })[0]?.label
                }
              </Text>
            </Pressable>
            <Text style={styles.errorText}>{formDataError.empPS}</Text>
            <MySingleSelectPopUp
              title="Select Police Station"
              toggle={showPsPopUp}
              // showSearch={true}
              setToggle={setShowPsPopUp}
              inputOption={psList}
              callBackFunck={value => {
                setFormData({
                  ...formData,
                  empPS: value,
                  empPanchayatID: '',
                  empPanchayat: '',
                  empVillage: '',
                  empVillageID: '',
                });
                getPanchayatById(value);
                getVillageList(value);
                setFormDataError({...formDataError, empPS: ''});
              }}
            />
          </View>
        ) : (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {newTranslation.enterPoliceStation}
            </Text>
            <TextInput
              style={[
                styles.input,
                formDataError.empPS !== '' && {borderColor: 'red'},
              ]}
              onChangeText={text => {
                setFormDataError({...formDataError, empPS: ''});
                setFormData({...formData, empPSName: text});
              }}
              value={formData.empPSName}
            />
            <Text style={styles.errorText}>{formDataError.empPS}</Text>
          </View>
        )}
        {formData.empState == '35' ? (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {newTranslation.selectPanchayatMunicipality}
            </Text>
            <Pressable
              style={[
                styles.input,
                {padding: 15},
                formDataError.empPanchayat !== '' && {borderColor: 'red'},
              ]}
              onPress={() => setShowPanchayatPopUp(true)}>
              <Text style={{color: '#212121', fontSize: 14, fontWeight: '500'}}>
                {
                  panchayatList?.filter((v, i) => {
                    return v.value == formData.empPanchayatID;
                  })[0]?.label
                }
              </Text>
            </Pressable>
            <Text style={styles.errorText}>{formDataError.empPanchayat}</Text>
            <MySingleSelectPopUp
              title="Select Panchayat/Municipality"
              toggle={showPanchayatPopUp}
              showSearch={true}
              setToggle={setShowPanchayatPopUp}
              inputOption={panchayatList}
              callBackFunck={value => {
                setFormData({...formData, empPanchayatID: value});
                setFormDataError({...formDataError, empPanchayat: ''});
              }}
            />
          </View>
        ) : (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              {newTranslation?.enterPanchayatMunicipality}
            </Text>
            <TextInput
              style={[
                styles.input,
                formDataError.empPanchayat !== '' && {borderColor: 'red'},
              ]}
              onChangeText={text => {
                setFormDataError({...formDataError, empPanchayat: ''});
                setFormData({...formData, empPanchayat: text});
              }}
              value={formData.empPanchayat}
            />
            <Text style={styles.errorText}>{formDataError.empPanchayat}</Text>
          </View>
        )}
        {formData.empState == '35' ? (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{newTranslation.selectVillageWard}</Text>
            <Pressable
              style={[styles.input, {padding: 15}]}
              onPress={() => setShowVillagePopUp(true)}>
              <Text style={{color: '#212121', fontSize: 14, fontWeight: '500'}}>
                {
                  villageList?.filter((v, i) => {
                    return v.value == formData.empVillageID;
                  })[0]?.label
                }
              </Text>
            </Pressable>
            <Text style={styles.errorText}></Text>
            <MySingleSelectPopUp
              title="Select Village/Ward"
              toggle={showVillagePopUp}
              showSearch={true}
              setToggle={setShowVillagePopUp}
              inputOption={villageList}
              callBackFunck={value => {
                setFormData({...formData, empVillageID: value});
              }}
            />
          </View>
        ) : (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{newTranslation?.enterVillageWard}</Text>
            <TextInput
              style={styles.input}
              onChangeText={text =>
                setFormData({...formData, empVillage: text})
              }
              value={formData.empVillage}
            />
            <Text style={styles.errorText}></Text>
          </View>
        )}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{newTranslation.enterPincode}</Text>
          <TextInput
            style={[
              styles.input,
              formDataError.empPin !== '' && {borderColor: 'red'},
            ]}
            onChangeText={text => {
              setFormData({...formData, empPin: text});
              setFormDataError({...formDataError, empPin: ''});
            }}
            value={formData.empPin}
            keyboardType="numeric"
            maxLength={6}
          />
          <Text style={styles.errorText}>{formDataError.empPin}</Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: 'black',
          }}></View>
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 5,
              left: 25,
              backgroundColor: 'white',
              zIndex: 1,
              position: 'relative',
              bottom: 10.5,
            }}>
            {newTranslation.Experience}
          </Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {newTranslation?.selectExperienceType}
          </Text>
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 8,
              },
              styles.input,
              formDataError.empInternationMigrationExp !== '' && {
                borderColor: 'red',
              },
            ]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="Yes"
                status={
                  formData.empInternationMigrationExp === 'Yes'
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => {
                  setFormData({...formData, empInternationMigrationExp: 'Yes'});
                  setShowExperiencePopUp(true);
                  setExperienceNome('');
                  setFormDataError({
                    ...formDataError,
                    empInternationMigrationExp: '',
                  });
                }}
              />
              <Text style={{color: 'black'}}>
                {newTranslation.International}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="No"
                status={
                  formData.empInternationMigrationExp === 'No' &&
                  experienceNone == ''
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => {
                  setFormData({...formData, empInternationMigrationExp: 'No'});
                  setExperienceNome('');
                  setShowExperiencePopUp(true);
                  setFormDataError({
                    ...formDataError,
                    empInternationMigrationExp: '',
                  });
                }}
              />
              <Text style={{color: 'black'}}>{newTranslation.National}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="none"
                status={experienceNone === 'none' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setFormData({...formData, empInternationMigrationExp: 'No'});
                  setExperienceNome('none');
                  setFormDataError({
                    ...formDataError,
                    empInternationMigrationExp: '',
                  });
                }}
              />
              <Text style={{color: 'black'}}>{newTranslation.None}</Text>
            </View>
          </View>
          <Text style={styles.errorText}>
            {formDataError.empInternationMigrationExp}
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: 'black',
          }}></View>
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 5,
              left: 25,
              backgroundColor: 'white',
              zIndex: 1,
              position: 'relative',
              bottom: 10.5,
            }}>
            {newTranslation?.jobPreference}
          </Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {newTranslation?.enterPresentMonthlyIncome}
          </Text>
          <TextInput
            style={[
              styles.input,
              formDataError.empDailyWage != '' && {borderColor: 'red'},
            ]}
            onChangeText={text => {
              setFormData({...formData, empDailyWage: text});
              setFormDataError({...formDataError, empDailyWage: ''});
            }}
            value={formData.empDailyWage}
            keyboardType="numeric"
          />
          <Text style={styles.errorText}>{formDataError.empDailyWage}</Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {newTranslation?.enterExpectedMonthlyIncome}
          </Text>
          <TextInput
            style={[
              styles.input,
              formDataError.empExpectedMonthlyIncome != '' && {
                borderColor: 'red',
              },
            ]}
            onChangeText={text => {
              setFormData({...formData, empExpectedMonthlyIncome: text});
              setFormDataError({
                ...formDataError,
                empExpectedMonthlyIncome: '',
              });
            }}
            value={formData.empExpectedMonthlyIncome}
            keyboardType="numeric"
          />
          <Text style={styles.errorText}>
            {formDataError.empExpectedMonthlyIncome}
          </Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {newTranslation?.preferedJobLocation}
          </Text>
          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                padding: 8,
              },
              styles.input,
              formDataError.empRelocationIntQ != '' && {borderColor: 'red'},
            ]}>
            <View
              style={{
                flexDirection: 'row',
                width: '50%',
                alignItems: 'center',
              }}>
              <RadioButton
                value="Yes"
                status={
                  formData.empRelocationIntQ === 'Yes' ? 'checked' : 'unchecked'
                }
                onPress={() => {
                  setFormData({...formData, empRelocationIntQ: 'Yes'});
                  setFormDataError({...formDataError, empRelocationIntQ: ''});
                }}
              />
              <Text style={{color: 'black'}}>
                {newTranslation.International}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton
                value="No"
                status={
                  formData.empRelocationIntQ === 'No' ? 'checked' : 'unchecked'
                }
                onPress={() => {
                  setFormDataError({...formDataError, empRelocationIntQ: ''});
                  setFormData({...formData, empRelocationIntQ: 'No'});
                }}
              />
              <Text style={{color: 'black'}}>{newTranslation.National}</Text>
            </View>
          </View>

          <Text style={styles.errorText}>
            {formDataError.empRelocationIntQ}
          </Text>
        </View>
        {formData.empRelocationIntQ != '' && (
          <View>
            {formData.empRelocationIntQ == 'No' ? (
              <>
                <View style={{flexDirection: 'row', marginTop: -20}}>
                  <Text
                    style={{
                      position: 'relative',
                      top: 7,
                      zIndex: 6,
                      left: 7,
                      paddingHorizontal: 4,
                      backgroundColor: 'white',
                      color: 'black',
                    }}>
                    {newTranslation?.statePreference}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setShowStatePref(true)}
                  style={[styles.input, {marginBottom: 40, padding: 17}]}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'black'}}>
                      {formData.empRelocationIntQState.slice(1, -1)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={{flexDirection: 'row', marginTop: -20}}>
                  <Text
                    style={{
                      position: 'relative',
                      top: 7,
                      zIndex: 6,
                      left: 7,
                      paddingHorizontal: 4,
                      backgroundColor: 'white',
                      color: 'black',
                    }}>
                    {newTranslation?.countryPreference}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => setShowCountryPref(true)}
                  style={[styles.input, {marginBottom: 40, padding: 17}]}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'black'}}>
                      {formData.empRelocationIntQCountry.slice(1, -1)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        <View
          style={{
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: 'black',
          }}></View>
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <Text
            style={{
              color: 'black',
              paddingHorizontal: 5,
              left: 25,
              backgroundColor: 'white',
              zIndex: 1,
              position: 'relative',
              bottom: 10.5,
            }}>
            {newTranslation?.referenceDetails}
          </Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{newTranslation.referencePersonName}</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setFormData({...formData, empRefName: text})}
            value={formData.empRefName}
          />
          <Text style={styles.errorText}></Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {newTranslation.referencePersonPhoneNumber}
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setFormData({...formData, empRefPhone: text})}
            value={formData.empRefPhone}
            keyboardType="numeric"
          />
          <Text style={styles.errorText}></Text>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            {newTranslation?.referencePersonDistanceFromYou}
          </Text>
          <View style={styles.input}>
            <Picker
              selectedValue={formData.empRefDistance}
              style={{color: 'black', fontSize: 14}}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({...formData, empRefDistance: itemValue});
              }}>
              <Picker.Item
                label="Select"
                value=""
                style={{color: 'gray', fontSize: 14}}
              />
              <Picker.Item
                label="0-5 km"
                value="0-5 km"
                style={{color: 'gray', fontSize: 14}}
              />
              <Picker.Item
                label="5-10 km"
                value="5-10 km"
                style={{color: 'gray', fontSize: 14}}
              />
              <Picker.Item
                label="10-25 km"
                value="10-25 km"
                style={{color: 'gray', fontSize: 14}}
              />
              <Picker.Item
                label="25-50 km"
                value="25-50 km"
                style={{color: 'gray', fontSize: 14}}
              />
              <Picker.Item
                label="50-100 km"
                value="50-100 km"
                style={{color: 'gray', fontSize: 14}}
              />
              <Picker.Item
                label="Above 100 km"
                value="Above 100 km"
                style={{color: 'gray', fontSize: 14}}
              />

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
        </View>

        <View style={{marginBottom: 30}}>
          <Button title="Save" onPress={handleSubmit} />
        </View>
      </ScrollView>
      <ExperiencePopStep1
        occupations={occupations}
        stateList={stateList}
        setShowExperiencePopUp={setShowExperiencePopUp}
        showExperiencePopUp={showExperiencePopUp}
        localUser={localUser}
        showCountry={formData.empInternationMigrationExp == '' ? true : false}
      />
      {stateListforPref?.length > 0 && (
        <MyMultipleSelectPopUp
          title="Select prefered job state"
          toggle={showStatePref}
          showSearch={true}
          setToggle={setShowStatePref}
          inputOption={stateListforPref}
          callBackFunck={value => {
            setFormData({
              ...formData,
              empRelocationIntQState: JSON.stringify(value),
            });
          }}
        />
      )}

      {countryList?.length > 0 && (
        <MyMultipleSelectPopUp
          title="Select prefered job country"
          toggle={showCountryPref}
          showSearch={true}
          setToggle={setShowCountryPref}
          inputOption={countryList}
          callBackFunck={value => {
            setFormData({
              ...formData,
              empRelocationIntQCountry: JSON.stringify(value),
            });
          }}
        />
      )}

      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 16,
    backgroundColor: 'white',
    flex: 1,
  },
  heading: {
    color: 'black',
    fontWeight: '400',
    marginBottom: 40,
    fontSize: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: 'black',
    position: 'absolute',
    zIndex: 1,
    paddingHorizontal: 5,
    left: 10,
    backgroundColor: 'white',
    top: -10,
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    fontWeight: '400',
    position: 'absolute',
    bottom: 4,
  },
});
