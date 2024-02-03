import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Button,
  Modal,
  Alert,
} from 'react-native';
import {useState, useEffect} from 'react';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-modern-datepicker';
import Toast from 'react-native-toast-message';
import {
  getOccupations,
  getSkillsByOccuId,
  getCountries,
  getState,
  getDistrict,
} from '../services/info.service';
import {registerUserStep1, addExperienceStep2} from '../services/user.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';
const CandidateDetailsStep1 = props => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [experienceMsgText, setShowExperinceMsgText] = useState(
    'Do you have past experience ?',
  );
  const [showWhatsappInput, setShowWhatsappInput] = useState(false);
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [showJoiningCalender, setJoiningCalender] = useState(false);
  const [showEndingCalender, setEndingCalender] = useState(false);
  const [formData, setFormData] = useState({
    empDob: '',
    empGender: '',
    empWhatsapp: '',
    empLanguage: [],
    empMS: '',
    empPassportQ: '',
    empSkill: '',
    empOccuId: '',
    empInternationMigrationExp: '',
    empEdu: '',
    empEduYear: '',
    empTechEdu: '',
    empSpecialEdu: '',
    empState: '',
    empDistrict: '',
    empPin: '',
  });
  const handleLanguageSelect = selectedLanguage => {
    if (formData.empLanguage.includes(selectedLanguage)) {
      const updatedLanguages = formData.empLanguage.filter(
        lang => lang !== selectedLanguage,
      );
      setFormData({...formData, empLanguage: updatedLanguages});
    } else {
      setFormData({
        ...formData,
        empLanguage: [...formData.empLanguage, selectedLanguage],
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
  const highestEducationArr = [
    'Primary Education (below class 8)',
    'Middle education (class 8 and above but below class 10)',
    'Secondary Education',
    'Higher Secondary Education',
    'Graduate',
    'Post Graduate',
  ];
  const vocationalEduArr = [
    'ITI',
    'Polytechnic',
    'Graduate in Engineering',
    'Any other Vocational Training (one year or above)',
    'Any other Vocational Training (less than one year)',
  ];
  const getSkillListByOccuId = async id => {
    try {
      console.warn(id);
      let response = await getSkillsByOccuId(id);
      console.log('res', response.skills);
      setSkills(response?.skills);
    } catch (error) {}
  };
  const [localUser, setLocalUser] = useState('');
  const getLocalUser = async () => {
    setLocalUser(JSON.parse(await AsyncStorage.getItem('signUpUser')));
  };
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
  const [districtList, setDistrictList] = useState([]);
  const getDistrictListFunc = async stateId => {
    try {
      let response = await getDistrict(stateId);
      setDistrictList(response?.districts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOccupationList();
    getLocalUser();
    getCountryList();
    getStateList();
  }, []);
  const [formDataError, setFormDataError] = useState({
    empDob: '',
    empGender: '',
    empWhatsapp: '',
    empLanguage: [],
    empMS: '',
    empPassportQ: '',
    empSkill: '',
    empOccuId: '',
    empInternationMigrationExp: '',
    empEdu: '',
    empEduYear: '',
    empTechEdu: '',
    empSpecialEdu: '',
    empState: '',
    empDistrict: '',
    empPin: '',
  });
  const formValidaion = () => {
    let result = true;
    if (formData.empDob == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Date of Birth is a required Feild',
        visibilityTime: 3000,
      });
      setFormDataError({
        ...formDataError,
        empDob: 'Date of Birth is a required Feild',
      });
      result = false;
    }
    if (formData.empGender == '') {
      
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Gender is required feild',
        visibilityTime: 3000,
      });
      setFormDataError({
        ...formDataError,
        empGender: 'Gender is required feild',
      });
      result = false;
    }
    if (formData.empWhatsapp == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Whatsapp is required feild',
        visibilityTime: 3000,
      });
      setFormDataError({
        ...formDataError,
        empWhatsapp: 'Whatsapp is required feild',
      });
      result = false;
    }
    if (formData.empWhatsapp.length != 10) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Invalid whatsapp number',
        visibilityTime: 3000,
      });
      setFormDataError({
        ...formDataError,
        empWhatsapp: 'Invalid whatsapp number',
      });
      result = false;
    }
    if (formData.empLanguage.length == 0) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Language select is required feild',
        visibilityTime: 3000,
      });
      setFormDataError({
        ...formDataError,
        empLanguage: 'Language select is required feild',
      });
      result = false;
    }
    if (formData.empMS == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Marital status is required field',
        visibilityTime: 3000,
      });
      setFormDataError({
        ...formDataError,
        empMS: 'Marital status is required field',
      });
      result = false;
    }
    if (formData.empPassportQ == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Please select : Do you have passport ?',
        // text2: '',
        visibilityTime: 3000,
      });
      setFormDataError({
        ...formDataError,
        empPassportQ: 'Please select : Do you have passport ?',
      });
      result = false;
    }
    if (formData.empOccuId == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Present working department is required field',
        // text2: '',
        visibilityTime: 3000,
      });
      setFormDataError({
        ...formDataError,
        empOccuId: 'Present working department is required field',
      });
      result = false;
    }
    if (formData.empSkill == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Present Occupation is required field',
        // text2: '',
        visibilityTime: 3000,
      });
      setFormDataError({
        ...formDataError,
        empSkill: 'Present Occupation is required field',
      });
      result = false;
    }
    if (formData.empInternationMigrationExp == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Past International Migration Exp?',
        // text2: '',
        visibilityTime: 3000,
      });
      setFormDataError({
        ...formDataError,
        empInternationMigrationExp: 'Past International Migration Exp?',
      });
      result = false;
    }
    if (formData.empEdu == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Highest education qualification is required field',
        // text2: '',
        visibilityTime: 3000,
      });
      setFormDataError({
        ...formDataError,
        empEdu: 'Highest education qualification is required field',
      });
      result = false;
    }
    if (formData.empState == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'State is required field',
        // text2: '',
        visibilityTime: 3000,
      });
      setFormDataError({...formDataError, empState: 'State is required field'});
      result = false;
    }
    if (formData.empDistrict == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'District is required field',
        // text2: '',
        visibilityTime: 3000,
      });
      setFormDataError({
        ...formDataError,
        empDistrict: 'District is required field',
      });
      result = false;
    }
    if (formData.empPin.length != 6) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Pin code is required field please write valid pin number',
        // text2: '',
        visibilityTime: 3000,
      });
      setFormDataError({
        ...formDataError,
        empPin: 'Pin code is required field please write valid pin number',
      });
      result = false;
    }
    if (formData.empEduYear == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Year of highest education qualification is required field',
        // text2: '',
        visibilityTime: 3000,
      });
      setFormDataError({
        ...formDataError,
        empEduYear: 'Year of highest education qualification is required field',
      });
      result = false;
    }
    if (formData.empSpecialEdu == '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Specialisation is required field',
        // text2: '',
        visibilityTime: 3000,
      });
      setFormDataError({
        ...formDataError,
        empSpecialEdu: 'Specialisation is required field',
      });
      result = false;
    }
    return result;
  };
  const [showAddExperienceForm, setShowAddExperienceForm] = useState(false);

  const handleSubmit = async () => {
    if (formValidaion()) {
      try {
        const finalPayload = {
          ...formData,
          empLanguage: JSON.stringify(formData.empLanguage),
        };
        let response = await registerUserStep1(
          finalPayload,
          localUser.access_token,
        );
        console.log(response?.msg);
        if (response?.msg == 'Data Updated Successfully') {
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Data Updated Successfully',
            // text2: '',
            visibilityTime: 3000,
          });
          setTimeout(() => {
            props.navigation.navigate('CandidateDetails2', {
              localUser: localUser,
            });
          }, 1500);
          await AsyncStorage.clear();
        } else {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Something went wrong',
            visibilityTime: 3000,
          });
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Something went wrong',
          visibilityTime: 3000,
        });
      }
    }
    else{
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Form validation failed',
        // text2: '',
        visibilityTime: 3000,
      });
    }
  };
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
    try {
      let response = await addExperienceStep2(
        experienceForm,
        localUser.access_token,
      );
      console.log('res', response);
      if (response?.data?.msg == 'Experience Successfully Added.') {
        Toast.show({
          type: 'success',
          position: 'bottom',
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
        setShowExperinceMsgText('Do you want to add more experience ?');
        setShowAddExperienceForm(false);
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
        text1: 'Something went grong',
        visibilityTime: 3000, // Duration in milliseconds
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.main}>
        <View>
          <Text style={styles.heading}>Please Enter Your Details : 1/2</Text>
        </View>
        <View style={[styles.inputGroup]}>
          <TouchableOpacity
            onPress={() => setShowCalender(true)}
            style={[
              styles.input,
              {marginBottom: 15, padding: 17, marginTop: 5},
              formDataError.empDob !== '' ? {borderColor: 'red'} : {},
            ]}>
            <Text>
              {formData?.empDob == '' ? 'Date of Birth' : formData?.empDob}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 10,
              marginBottom: 10,
              marginTop: -12,
              color: 'red',
            }}>
            {formDataError.empDob}
          </Text>
          <View>
            <Text>Gender</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => setFormData({...formData, empGender: 'Male'})}
                style={[
                  styles.genderGroup,
                  formData.empGender == 'Male' && styles.genderGroupSelected,
                ]}>
                <Image source={require('../images/maleIcon.png')} />
                <Text>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFormData({...formData, empGender: 'Female'})}
                style={[
                  styles.genderGroup,
                  formData.empGender == 'Female' && styles.genderGroupSelected,
                ]}>
                <Image source={require('../images/femaleIcon.png')} />
                <Text>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFormData({...formData, empGender: 'Other'})}
                style={[
                  styles.genderGroup,
                  formData.empGender == 'Other' && styles.genderGroupSelected,
                ]}>
                <Image source={require('../images/otherGenderIcon.png')} />
                <Text style={{marginLeft: 3}}>Others</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{fontSize: 10, marginBottom: 0, marginTop: 2, color: 'red'}}>
            {formDataError.empGender}
          </Text>
          {/* <View style={[{marginTop: 20}, styles.picker]}> */}
          {/* <Picker
              // selectedValue={showWhatsappInput}
              onValueChange={(itemValue, itemIndex) => {
                setShowWhatsappInput(itemValue);
                if(itemValue){
                  setFormData({...formData, empWhatsapp:localUser.user.phone})
                }else{
                  setFormData({...formData, empWhatsapp:""})
                }
              }}>
              <Picker.Item
                label="Phone and whatsapp are same?"
                value=""
                style={{color: 'gray'}}
              />
              <Picker.Item label="Yes" value={true} style={{color: 'gray'}} />
              <Picker.Item label="No" value={false} style={{color: 'gray'}} />

            
            </Picker> */}
          {/* </View> */}

          <TextInput
            placeholder="Whatsapp Number"
            style={[styles.input, {marginBottom: 5, marginTop: 20}]}
            value={formData.empWhatsapp}
            onChangeText={text => {
              setFormData({...formData, empWhatsapp: text});
            }}
            keyboardType="numeric"
          />
          <Text
            style={{fontSize: 10, marginBottom: 0, marginTop: 2, color: 'red'}}>
            {formDataError.empWhatsapp}
          </Text>

          <TouchableOpacity
            onPress={() => setShowLanguageSelect(true)}
            style={[
              styles.input,
              {marginBottom: 5, padding: 17, marginTop: 10},
            ]}>
            <Text>
              {formData.empLanguage.length == 0
                ? 'Language Select'
                : formData?.empLanguage.join(', ')}{' '}
            </Text>
          </TouchableOpacity>
          <Text
            style={{fontSize: 10, marginBottom: 0, marginTop: 2, color: 'red'}}>
            {formDataError.empLanguage}
          </Text>
          <View
            style={{
              marginTop: 15,
            }}>
            <View style={styles.picker}>
              <Picker
                selectedValue={formData.empMS}
                onValueChange={(itemValue, itemIndex) => {
                  setFormData({...formData, empMS: itemValue});
                }}>
                <Picker.Item
                  label="Marital Status"
                  value=""
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Married"
                  value="Married"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Single"
                  value="Unmarried"
                  style={{color: 'gray'}}
                />

                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>
            <Text
              style={{
                fontSize: 10,
                marginBottom: 15,
                marginTop: -12,
                color: 'red',
              }}>
              {formDataError.empMS}
            </Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={formData.empPassportQ}
                onValueChange={(itemValue, itemIndex) => {
                  setFormData({...formData, empPassportQ: itemValue});
                }}>
                <Picker.Item
                  label="Do you have Passport"
                  value=""
                  style={{color: 'gray'}}
                />
                <Picker.Item label="Yes" value="Yes" style={{color: 'gray'}} />
                <Picker.Item label="No" value="No" style={{color: 'gray'}} />

                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>
            <Text
              style={{
                fontSize: 10,
                marginBottom: 15,
                marginTop: -12,
                color: 'red',
              }}>
              {formDataError.empPassportQ}
            </Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={formData.empOccuId}
                onValueChange={(itemValue, itemIndex) => {
                  getSkillListByOccuId(itemValue);
                  setFormData({...formData, empOccuId: itemValue});
                }}>
                <Picker.Item
                  label="Present Working Department"
                  value=""
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
                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>
            <Text
              style={{
                fontSize: 10,
                marginBottom: 15,
                marginTop: -12,
                color: 'red',
              }}>
              {formDataError.empOccuId}
            </Text>
            {formData.empOccuId != '' && (
              <><View style={styles.picker}>
              <Picker
                selectedValue={formData.empSkill}
                onValueChange={(itemValue, itemIndex) => {
                  setFormData({...formData, empSkill: itemValue});
                }}>
                <Picker.Item
                  label="Present Occupation"
                  value=""
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

                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>
            <Text
            style={{
              fontSize: 10,
              marginBottom: 15,
              marginTop: -12,
              color: 'red',
            }}>
            {formDataError.empSkill}
          </Text>
              </>
              
            )}
            
            <View style={styles.picker}>
              <Picker
                selectedValue={formData.empInternationMigrationExp}
                onValueChange={(itemValue, itemIndex) => {
                  setFormData({
                    ...formData,
                    empInternationMigrationExp: itemValue,
                  });
                }}>
                <Picker.Item
                  label="Past International Migration Experience"
                  value=""
                  style={{color: 'gray'}}
                />
                <Picker.Item label="Yes" value="Yes" style={{color: 'gray'}} />
                <Picker.Item label="No" value="No" style={{color: 'gray'}} />

                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>
            <Text
              style={{
                fontSize: 10,
                marginBottom: 15,
                marginTop: -12,
                color: 'red',
              }}>
              {formDataError.empInternationMigrationExp}
            </Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={formData.empEdu}
                onValueChange={(itemValue, itemIndex) => {
                  setFormData({...formData, empEdu: itemValue});
                }}>
                <Picker.Item
                  label="Highest Education Qualification"
                  value=""
                  style={{color: 'gray'}}
                />
                {highestEducationArr.map((v, i) => {
                  return (
                    <Picker.Item label={v} value={v} style={{color: 'gray'}} />
                  );
                })}

                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>
            <Text
              style={{
                fontSize: 10,
                marginBottom: 15,
                marginTop: -12,
                color: 'red',
              }}>
              {formDataError.empEduYear}
            </Text>
          </View>
          <Text style={{color: 'black', marginBottom: 18}}>
            Current Address*
          </Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={formData.empState}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({...formData, empState: itemValue});
                getDistrictListFunc(itemValue);
              }}>
              <Picker.Item label="State" value="" style={{color: 'gray'}} />
              {stateList?.map((v, i) => {
                return (
                  <Picker.Item
                    label={v?.name}
                    value={v.id}
                    style={{color: 'gray'}}
                  />
                );
              })}

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
          <Text
            style={{
              fontSize: 10,
              marginBottom: 15,
              marginTop: -12,
              color: 'red',
            }}>
            {formDataError.empState}
          </Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={formData.empDistrict}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({...formData, empDistrict: itemValue});
              }}>
              <Picker.Item label="District" value="" style={{color: 'gray'}} />
              {districtList?.map((v, i) => {
                return (
                  <Picker.Item
                    label={v.name}
                    value={v.id}
                    style={{color: 'gray'}}
                  />
                );
              })}

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
          <Text
            style={{
              fontSize: 10,
              marginBottom: 15,
              marginTop: -12,
              color: 'red',
            }}>
            {formDataError.empDistrict}
          </Text>
          <TextInput
            placeholder="Pin Code*"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={text => setFormData({...formData, empPin: text})}
          />
          <Text
            style={{
              fontSize: 10,
              marginBottom: 15,
              marginTop: -12,
              color: 'red',
            }}>
            {formDataError.empPin}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 18,
            }}>
            <Pressable
              style={[
                styles.golaBorder,
                showAddExperienceForm && styles.backgroundBlue,
              ]}
              onPress={() =>
                setShowAddExperienceForm(!showAddExperienceForm)
              }></Pressable>
            <Text style={{marginTop: 2, color: 'black'}}>
              {experienceMsgText}{' '}
            </Text>
          </View>

          {/* experince form start */}
          {showAddExperienceForm && (
            <View
              style={{
                paddingHorizontal: 10,
                marginBottom: 20,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'gray',
                paddingVertical: 30,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 15,
                  marginTop: -10,
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={() => setShowAddExperienceForm(false)}>
                  <Image source={require('../images/close.png')} />
                </TouchableOpacity>
              </View>
              <TextInput
                placeholder="Company Name"
                style={styles.input}
                value={experienceForm.experinceCompanyName}
                onChangeText={text =>
                  setExperienceForm({
                    ...experienceForm,
                    experinceCompanyName: text,
                  })
                }></TextInput>
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
                    label="Working Department"
                    value=""
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
                  {/* Add more Picker.Item as needed */}
                </Picker>
              </View>
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
                    label="Occupation"
                    value=""
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

                  {/* Add more Picker.Item as needed */}
                </Picker>
              </View>
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
                      label="State"
                      value=""
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

                    {/* Add more Picker.Item as needed */}
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
                      label="Country"
                      value=""
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

                    {/* Add more Picker.Item as needed */}
                  </Picker>
                </View>
              )}

              <TouchableOpacity
                onPress={() => setJoiningCalender(true)}
                style={[
                  styles.input,
                  {marginBottom: 15, padding: 17, marginTop: 5},
                ]}>
                <Text>
                  {' '}
                  {experienceForm.fromDate != ''
                    ? experienceForm.fromDate
                    : 'Joining Date'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEndingCalender(true)}
                style={[
                  styles.input,
                  {marginBottom: 15, padding: 17, marginTop: 5},
                ]}>
                <Text>
                  {' '}
                  {experienceForm.toDate != ''
                    ? experienceForm.toDate
                    : 'Ending Date'}
                </Text>
              </TouchableOpacity>
              <Button
                title="Add Experience"
                onPress={addExperience}
                color="#5F90CA"
              />
            </View>
          )}
          {/* experince form start */}
          <TextInput
            placeholder="Year of highest education qualification*"
            style={styles.input}
            onChangeText={text => setFormData({...formData, empEduYear: text})}
          />
          <Text
            style={{
              fontSize: 10,
              marginBottom: 15,
              marginTop: -12,
              color: 'red',
            }}>
            {formDataError.empEduYear}
          </Text>
          <TextInput
            placeholder="Specialisation*"
            onChangeText={text =>
              setFormData({...formData, empSpecialEdu: text})
            }
            style={styles.input}
          />
          <Text
            style={{
              fontSize: 10,
              marginBottom: 15,
              marginTop: -12,
              color: 'red',
            }}>
            {formDataError.empSpecialEdu}
          </Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={formData.empTechEdu}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({...formData, empTechEdu: itemValue});
              }}>
              <Picker.Item
                label="Technical/Vocational Education"
                value=""
                style={{color: 'gray'}}
              />
              {vocationalEduArr.map((v, i) => {
                return (
                  <Picker.Item label={v} value={v} style={{color: 'gray'}} />
                );
              })}

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
        </View>
        <View style={styles.nextBtn}>
          <Button
            title="Save and Continue"
            onPress={handleSubmit}
            color="#035292"
          />
        </View>
        {/* <View style={styles.nextBtn}>
          <Button
            title="Save and Continue"
            onPress={()=>props.navigation.navigate('CandidateDetails2')}
            color="#035292"
          />
        </View> */}
      </View>
      <Modal transparent={true} visible={showLanguageSelect}>
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
              paddingBottom: 20,
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '500', fontSize: 20}}>
                Language Known
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setFormData({...formData, empLanguage: []});
                  setShowLanguageSelect(false);
                }}>
                <Image source={require('../images/close.png')} />
              </TouchableOpacity>
            </View>
            <View>
              <Pressable
                onPress={() => handleLanguageSelect('English')}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, color: 'black'}}>English</Text>
                <View
                  style={[
                    {
                      height: 15,
                      width: 15,
                      borderRadius: 7.5,
                      borderWidth: 1,
                      borderColor: '#ccc',
                    },
                    formData.empLanguage.includes('English') &&
                      styles.backgroundBlue,
                  ]}></View>
              </Pressable>
            </View>
            <View>
              <Pressable
                onPress={() => handleLanguageSelect('Hindi')}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, color: 'black'}}>Hindi</Text>
                <View
                  style={[
                    {
                      height: 15,
                      width: 15,
                      borderRadius: 7.5,
                      borderWidth: 1,
                      borderColor: '#ccc',
                    },
                    formData.empLanguage.includes('Hindi') &&
                      styles.backgroundBlue,
                  ]}></View>
              </Pressable>
            </View>
            <View>
              <Pressable
                onPress={() => handleLanguageSelect('Bengali')}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, color: 'black'}}>Bengali</Text>
                <View
                  style={[
                    {
                      height: 15,
                      width: 15,
                      borderRadius: 7.5,
                      borderWidth: 1,
                      borderColor: '#ccc',
                    },
                    formData.empLanguage.includes('Bengali') &&
                      styles.backgroundBlue,
                  ]}></View>
              </Pressable>
            </View>
            <View>
              <Pressable
                onPress={() => handleLanguageSelect('Urdu')}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, color: 'black'}}>Urdu</Text>
                <View
                  style={[
                    {
                      height: 15,
                      width: 15,
                      borderRadius: 7.5,
                      borderWidth: 1,
                      borderColor: '#ccc',
                    },
                    formData.empLanguage.includes('Urdu') &&
                      styles.backgroundBlue,
                  ]}></View>
              </Pressable>
            </View>
            <View>
              <Pressable
                onPress={() => handleLanguageSelect('Arabic')}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, color: 'black'}}>Arabic</Text>
                <View
                  style={[
                    {
                      height: 15,
                      width: 15,
                      borderRadius: 7.5,
                      borderWidth: 1,
                      borderColor: '#ccc',
                    },
                    formData.empLanguage.includes('Arabic') &&
                      styles.backgroundBlue,
                  ]}></View>
              </Pressable>
            </View>
            <View>
              <Pressable
                onPress={() => handleLanguageSelect('Odiya')}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, color: 'black'}}>Odiya</Text>
                <View
                  style={[
                    {
                      height: 15,
                      width: 15,
                      borderRadius: 7.5,
                      borderWidth: 1,
                      borderColor: '#ccc',
                    },
                    formData.empLanguage.includes('Odiya') &&
                      styles.backgroundBlue,
                  ]}></View>
              </Pressable>
            </View>
            <View style={{marginHorizontal: 18, marginTop: 10}}>
              <Button
                title="Save"
                onPress={() => setShowLanguageSelect(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
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
                Select Date Of Birth
              </Text>
              <TouchableOpacity onPress={() => setShowCalender(false)}>
                <Image source={require('../images/close.png')} />
              </TouchableOpacity>
            </View>

            <DatePicker
              mode="calender"
              format="YYYY-MM-DD"
              onDateChange={date => {
                setFormData({...formData, empDob: date});
                setFormDataError({...formDataError, empDob: ''});
                setShowCalender(false);
              }}
            />
          </View>
        </View>
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
                Select Date Of Birth
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
                Select Date Of Birth
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
      <Toast ref={ref => Toast.setRef(ref)} />
    </ScrollView>
  );
};

export default CandidateDetailsStep1;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  registerText: {
    color: '#5F90CA',
    fontFamily: 'Noto Sans',
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#5F90CA',
    fontFamily: '500',
  },
  heading: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 17,
    fontFamily: '600',
    marginTop: 10,
    marginBottom: 30,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    width: '100%',
    marginBottom: 18,
    backgroundColor: 'white',
  },
  inputGroup: {},
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 18,
    backgroundColor: 'white',
  },
  genderGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    width: 100,
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  genderGroupSelected: {
    backgroundColor: '#F1F7FF',
    borderColor: '#035292',
  },
  width45: {
    width: '45%',
  },
  nextBtn: {
    marginTop: 20,
    marginBottom: 50,
  },
  golaBorder: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 3,
    marginRight: 5,
  },
  backgroundBlue: {
    backgroundColor: '#5F90CA',
  },
});
