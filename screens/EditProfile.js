import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {
  getOccupations,
  getSkillsByOccuId,
  getCountries,
  getState,
  getCountryCode,
  getDistrict,
} from '../services/info.service';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {useGlobalState} from '../GlobalProvider';
import {
  registerUserStep2,
  getProfileStrength,
  editProfile,
} from '../services/user.service';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import MyMultipleSelectPopUp from '../components/MyMultipleSelectPopUp';
const EditProfile = props => {
  useAndroidBackHandler(() => {
    props.navigation.navigate(props?.route?.params.backTo);
    return true;
  });
  const [occupations, setOccupations] = useState([]);
  const getOccupationList = async () => {
    try {
      let response = await getOccupations();
      setOccupations(response?.occupation);
    } catch (error) {}
  };
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
    "Not applicable"
  ];
  const [showCountryPref, setShowCountryPref]=useState(false)
  const [countryList, setCountryList] = useState([]);
  const getCountryList = async () => {
    try {
      let response = await getCountries();
      let country = response?.countries.map(item => ({
        label: item.name,
        value: item.name,
      }));
      setCountryList(country);
    } catch (error) {}
  };
  const {translation, newTranslation, globalState, setGlobalState} =
    useGlobalState();
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [formData, setFormData] = useState({
    empOccuId: '',
    empSkill: '',
    empEdu: '',
    empEduYear: '',
    empTechEdu: '',
    empSpecialEdu: '',
    empPassportQ: '',
    empMS: '',
    empInternationMigrationExp: '',
    empWhatsapp: '',
    empEmail: '',
    empDailyWage: '',
    empExpectedMonthlyIncome: '',
    empRelocationIntQ: '',
    empRelocationIntQCountry: '',
    empRelocationIntQState: '',
    empAadharNo: '',
    empLanguage: [],
    empRefName: '',
    empRefPhone: '',
    empWhatsappCountryCode: '+91',
    empRefDistance: '',
  });
  const [userImage, setUserImage] = useState(
    JSON.parse(globalState?.user)?.empData?.empPhoto,
  );
  const pickDocument = async () => {
    let user = await AsyncStorage.getItem('user');
    const imageformData = new FormData();
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images], // You can specify the types of documents to pick
      });
      imageformData.append('empPhoto', {
        uri: result[0].uri,
        type: result[0].type,
        name: result[0].name,
      });
      console.log(imageformData);
      let response = await editProfile(
        imageformData,
        JSON.parse(user).access_token,
      );
      if (response?.data?.msg == 'User profile updated successfully') {
        Toast.show({
          type: 'success',
          text1: 'Profile pic updated successfully',
          visibilityTime: 3000,
        });
        setUserImage(response?.data?.empData?.empPhoto);
        getProfileStrengthFunc();
        user = JSON.parse(user);
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({...user, empData: response?.data.empData}),
        );
        setTimeout(() => {
          props.navigation.navigate('MyProfile');
        }, 2000);
      } else {
        Toast.show({
          type: 'error',
          text1: 'something went wrong',
          visibilityTime: 3000,
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Toast.show({
          type: 'error',
          text1: 'No file selected',
          visibilityTime: 3000,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong',
          visibilityTime: 3000,
        });
      }
    }
  };
  const [skills, setSkills] = useState([]);
  const getSkillListByOccuId = async id => {
    try {
      let response = await getSkillsByOccuId(id);
      setSkills(response?.skills);

      let label = response?.skills?.filter((v, i) => {
        return v.id == 154;
      });
      console.log(label);
    } catch (error) {}
  };
  const getProfileStrengthFunc = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getProfileStrength(JSON.parse(user).access_token);
      if (
        response?.data.msg == 'Some fields are empty' ||
        response?.data.msg ==
          'Profile strength calculated successfully and updated in records'
      ) {
        setGlobalState({...globalState, profileStrength: response?.data});
      }
    } catch (error) {
      console.log('NEW', error);
    }
  };
  const [countryCodeArr, setCountryCodeArr] = useState([]);
  const getListOfCountryCode = async () => {
    try {
      let response = await getCountryCode();
      setCountryCodeArr(response?.data?.countryCodes);
      
    } catch (error) {
      console.log(error);
    }
  };

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
  const handleSubmit = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await editProfile(formData, JSON.parse(user).access_token);
      if (response?.data?.msg == 'User profile updated successfully') {
        Toast.show({
          type: 'success',
          text1: 'User profile updated successfully',
          position: 'bottom',
          visibilityTime: 3000,
        });
        user = JSON.parse(user);
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({
            ...user,
            empData: response?.data?.empData,
          }),
        );
        setTimeout(() => {
          props.navigation.navigate('MyProfile');
        }, 2000);
      } else {
        Toast.show({
          type: 'error',
          text1: 'something went wrong',
          position: 'bottom',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Internal Server Error',
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
  };
  const[showStatePref, setShowStatePref]=useState(false)
  const [stateList, setStateList] = useState([]);
  const getStateList = async () => {
    try {
      let response = await getState();
      let state = response.data.states.map(item => ({
        label: item.name,
        value: item.name,
      }));
      setStateList(state);
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      console.warn(formData?.empSkill);
      getCountryList();
      getOccupationList();
      getListOfCountryCode();
      getStateList();
      setFormData({
        empOccuId: JSON.parse(globalState.user)?.empData?.empOccuId,
        empSkill: JSON.parse(globalState.user).empData.empSkill,
        empEdu: JSON.parse(globalState.user).empData.empEdu,
        empEduYear: JSON.parse(globalState.user).empData.empEduYear,
        empTechEdu: JSON.parse(globalState.user).empData.empTechEdu,
        empSpecialEdu: JSON.parse(globalState.user).empData.empSpecialEdu,
        empPassportQ: JSON.parse(globalState.user).empData.empPassportQ,
        empMS: JSON.parse(globalState.user).empData.empMS,
        empInternationMigrationExp: JSON.parse(globalState.user).empData
          .empInternationMigrationExp,
        empWhatsapp: JSON.parse(globalState.user).empData.empWhatsapp,
        empEmail: JSON.parse(globalState.user).empData.empEmail,
        empDailyWage: JSON.parse(globalState.user).empData.empDailyWage,
        empExpectedMonthlyIncome: JSON.parse(globalState.user).empData
          .empExpectedMonthlyIncome,
        empRelocationIntQ: JSON.parse(globalState.user).empData
          .empRelocationIntQ,
        empRelocationIntQCountry: JSON.parse(globalState.user).empData
          .empRelocationIntQCountry,
        empAadharNo: JSON.parse(globalState.user).empData.empAadharNo,
        empLanguage: JSON.parse(globalState.user).empData.empLanguage,
        empRefName: JSON.parse(globalState.user).empData.empRefName,
        empRefPhone: JSON.parse(globalState.user).empData.empRefPhone,
        empRelocationIntQState: JSON.parse(globalState.user).empData
          .empRelocationIntQState,
        empRefDistance: JSON.parse(globalState.user).empData.empRefDistance,
        empWhatsappCountryCode: JSON.parse(globalState.user).empData
          .empWhatsappCountryCode
          ? JSON.parse(globalState.user).empData.empWhatsappCountryCode
          : '+91',
      });
      getSkillListByOccuId(JSON.parse(globalState.user).empData.empOccuId);
    }, [globalState.user]),
  );
  return (
    <ScrollView style={styles.main}>
      <View style={styles.body}>
        <View
          style={{
            marginBottom: 6,
          }}>
          <Pressable onPress={() => pickDocument()}>
            <View>
              {JSON.parse(globalState?.user)?.empData?.empPhoto == null ? (
                <Image
                  source={require('../images/dummyUserProfile.jpg')}
                  style={styles.myPic}
                />
              ) : (
                <Image
                  source={{
                    uri: userImage,
                  }}
                  style={styles.myPic}
                />
              )}
            </View>
            <Text
              style={{
                color: '#035292',
                marginTop: 5,
                textDecorationLine: 'underline',
              }}>
              {newTranslation?.editProfilePic}
            </Text>
          </Pressable>
        </View>
        <View style={{marginTop: 15}}>
          <View style={{marginBottom: -20}}>
            <Text style={styles.label}>Enter Whatsapp</Text>
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
                  {formData?.empWhatsappCountryCode}
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
                    setFormData({
                      ...formData,
                      empWhatsappCountryCode: itemValue,
                    });
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
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                position: 'relative',
                top: 7,
                zIndex: 1,
                left: 7,
                paddingHorizontal: 4,
                backgroundColor: 'white',
                color: 'black',
              }}>
              {newTranslation?.languageKnown}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowLanguageSelect(true)}
            style={[styles.input, {marginBottom: 16, padding: 17}]}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'black'}}>
                {formData.empLanguage.slice(1, -1)}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
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
              {newTranslation?.maritalStatus}
            </Text>
          </View>
          <View style={[styles.picker]}>
            <Picker
              selectedValue={formData.empMS}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({...formData, empMS: itemValue});
              }}>
              <Picker.Item
                label={newTranslation?.maritalStatus}
                value=""
                style={{color: 'gray'}}
              />
              <Picker.Item
                label={newTranslation?.married}
                value="Married"
                style={{color: 'gray'}}
              />
              <Picker.Item
                label={newTranslation?.single}
                value="Unmarried"
                style={{color: 'gray'}}
              />

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
          <View style={{flexDirection: 'row'}}>
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
              {newTranslation?.doYouHavePassport}
            </Text>
          </View>
          <View style={styles.picker}>
            <Picker
              selectedValue={formData.empPassportQ}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({...formData, empPassportQ: itemValue});
              }}>
              <Picker.Item
                label={newTranslation?.doYouHavePassport}
                value=""
                style={{color: 'gray'}}
              />
              <Picker.Item
                label={newTranslation?.yes}
                value="Yes"
                style={{color: 'gray'}}
              />
              <Picker.Item
                label={newTranslation?.no}
                value="No"
                style={{color: 'gray'}}
              />

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
          <View style={{flexDirection: 'row'}}>
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
              {newTranslation?.presentWorkingDepertment}
            </Text>
          </View>
          <View style={styles.picker}>
            <Picker
              selectedValue={formData.empOccuId}
              onValueChange={(itemValue, itemIndex) => {
                getSkillListByOccuId(itemValue);
                setFormData({...formData, empOccuId: itemValue});
              }}>
              <Picker.Item
                label={
                  JSON.parse(globalState.user).empData?.empOccupationModel
                    ?.occupation
                    ? JSON.parse(globalState.user).empData?.empOccupationModel
                        ?.occupation
                    : newTranslation?.select
                }
                value={formData.empOccuId}
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
          <View style={{flexDirection: 'row'}}>
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
              {newTranslation?.presentOccupation}
            </Text>
          </View>
          <View style={styles.picker}>
            <Picker
              selectedValue={formData.empSkill}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({...formData, empSkill: itemValue});
              }}>
              <Picker.Item
                label={
                  skills?.filter((v, i) => {
                    return v?.id == formData?.empSkill;
                  })[0]?.skill ? skills?.filter((v, i) => {
                    return v?.id == formData?.empSkill;
                  })[0]?.skill :"Select"
                }
                value={formData.empSkill}
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
          <View style={{flexDirection: 'row'}}>
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
              {newTranslation?.highestEducationQualification}
            </Text>
          </View>
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

          <View style={{flexDirection: 'row'}}>
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
              {newTranslation?.technicalVocationalEducation}
            </Text>
          </View>
          <View style={styles.picker}>
            <Picker
              selectedValue={formData.empTechEdu}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({...formData, empTechEdu: itemValue});
              }}>
              <Picker.Item
                label={newTranslation?.select}
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

          <View style={{flexDirection: 'row'}}>
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
              {newTranslation?.presentMonthlyIncome}
            </Text>
          </View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={text => {
              setFormData({...formData, empDailyWage: text});
            }}
            value={formData?.empDailyWage}></TextInput>
          <View style={{flexDirection: 'row'}}>
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
              {newTranslation?.expectedMonthlyIncome}
            </Text>
          </View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={text => {
              setFormData({...formData, empExpectedMonthlyIncome: text});
            }}
            value={formData?.empExpectedMonthlyIncome}></TextInput>

          <View style={{flexDirection: 'row'}}>
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
              {/* {newTranslation?.areYouInterestedInInternationalMigration} */}
              Migration Interest
            </Text>
          </View>
          <View style={styles.picker}>
            <Picker
              selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({...formData, empRelocationIntQ: itemValue});
              }}>
              <Picker.Item
                label={newTranslation?.select}
                value=""
                style={{color: 'gray'}}
              />
              <Picker.Item
                label="International"
                value="Yes"
                style={{color: 'gray'}}
              />
              <Picker.Item
                label="National"
                value="No"
                style={{color: 'gray'}}
              />

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
          {formData.empRelocationIntQ == 'Yes' ? (
            <>
              <View style={{flexDirection: 'row'}}>
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
            style={[styles.input, {marginBottom: 16, padding: 17}]}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'black'}}>
                {formData?.empRelocationIntQCountry?.slice(1, -1)}
              </Text>
            </View>
          </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={{flexDirection: 'row'}}>
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
                  State Preference
                </Text>
              </View>
              <TouchableOpacity
            onPress={() => setShowStatePref(true)}
            style={[styles.input, {marginBottom: 16, padding: 17}]}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: 'black'}}>
                {formData?.empRelocationIntQState?.slice(1, -1)}
              </Text>
            </View>
          </TouchableOpacity>
            </>
          )}
          <View style={{flexDirection: 'row'}}>
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
              {newTranslation?.referencePersoneName}
            </Text>
          </View>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setFormData({...formData, empRefName: text});
            }}
            value={formData?.empRefName}></TextInput>
          <View style={{flexDirection: 'row'}}>
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
              {newTranslation?.referencePersoneContact}
            </Text>
          </View>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            onChangeText={text => {
              setFormData({...formData, empRefPhone: text});
            }}
            value={formData?.empRefPhone}></TextInput>
          <View style={{marginTop: 15, marginBottom: 20}}>
            <Text style={styles.label}>Reference person distance from you</Text>
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
          <View style={styles.nextBtn}>
            <Button
              title={newTranslation?.save}
              onPress={handleSubmit}
              color="#035292"
            />
          </View>
        </View>
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />

      <MyMultipleSelectPopUp
        title="Select Known language"
        toggle={showLanguageSelect}
        showSearch={true}
        setToggle={setShowLanguageSelect}
        inputOption={languageOption}
        defaultSelected={formData.empLanguage}
        callBackFunck={value => {
          setFormData({...formData, empLanguage: JSON.stringify(value)});
          // setFormDataError({...formDataError, empLanguage: ''});
        }}
      />

      <MyMultipleSelectPopUp
        title="Select relocation state"
        toggle={showStatePref}
        showSearch={true}
        setToggle={setShowStatePref}
        inputOption={stateList}
        defaultSelected={formData.empRelocationIntQState}
        callBackFunck={value => {
          setFormData({...formData, empRelocationIntQState: JSON.stringify(value)});
        }}
      />
      <MyMultipleSelectPopUp
        title="Select relocation country"
        toggle={showCountryPref}
        defaultSelected={formData.empRelocationIntQCountry}
        showSearch={true}
        setToggle={setShowCountryPref}
        inputOption={countryList}
        callBackFunck={value => {
          setFormData({...formData, empRelocationIntQCountry: JSON.stringify(value)});
        }}
      />
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
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
  heading: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 15,
    fontFamily: '600',
    marginVertical: 1,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    width: '100%',
    marginBottom: 18,
    backgroundColor: 'white',
    zIndex: -1,
  },
  myPic: {
    height: 200,
    width: '100%',
    borderRadius: 2,
    resizeMode: 'stretch',
  },
  backgroundBlue: {
    backgroundColor: '#5F90CA',
  },
  label: {
    color: 'black',
    position: 'absolute',
    zIndex: 1,
    paddingHorizontal: 5,
    left: 7,
    backgroundColor: 'white',
    top: -10,
  },
});
