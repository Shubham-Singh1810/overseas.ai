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
const EditProfile = (props) => {
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
  ];
  const [countryList, setCountryList] = useState([]);
  const getCountryList = async () => {
    try {
      let response = await getCountries();
      setCountryList(response?.countries);
    } catch (error) {}
  };
  const {translation,newTranslation, globalState, setUserData, setGlobalState} =
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
    empAadharNo: '',
    empLanguage: '',
    empRefName: '',
    empRefPhone: '',
  });
  const handleLanguageSelect = selectedLanguage => {
    if (JSON.parse(formData?.empLanguage).includes(selectedLanguage)) {
      const updatedLanguages = JSON.parse(formData.empLanguage).filter(
        lang => lang !== selectedLanguage,
      );
      setFormData({...formData, empLanguage: JSON.stringify(updatedLanguages)});
    } else {
      let prevLang = JSON.parse(formData.empLanguage);
      setFormData({
        ...formData,
        empLanguage: JSON.stringify([...prevLang, selectedLanguage]),
      });
    }
  };
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
          text1: 'Please logout and login again to view the updated data',
          visibilityTime: 3000,
        });
        setUserImage(response?.data?.empData?.empPhoto);
        getProfileStrengthFunc();
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
      console.log('res', response.skills);
      setSkills(response?.skills);
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
  useFocusEffect(
    React.useCallback(() => {
      getCountryList();
      getOccupationList();
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
      });
      getSkillListByOccuId(JSON.parse(globalState.user).empData.empOccuId);
    }, []),
  );

  const handleSubmit = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await editProfile(formData, JSON.parse(user).access_token);
      if (response?.data?.msg == 'User profile updated successfully') {
        Toast.show({
          type: 'success',
          text1: 'User profile updated successfully',
          text1: 'Please logout and login again to view the updated data',
          position: 'bottom',
          visibilityTime: 3000,
        });

        user = JSON.parse(user);
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({...user, empData: response?.data.empData}),
        );
        setUserData();
        getProfileStrengthFunc();
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

  return (
    <ScrollView style={styles.main}>
      <View style={styles.body}>
        <View
          style={{
            // flexDirection: 'row',
            // alignItems: 'center',
            marginBottom: 6,
            // justifyContent:"center"
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
          {/* <View style={{marginLeft: 15}}>
            <Text style={styles.heading}>Shubham Singh</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../images/maleIcon.png')} />
              <Text style={styles.heading}>Male</Text>
            </View>
            <Text style={styles.heading}>776042085</Text>
            <Text style={styles.heading}>Date of Birth : 18/10/2001</Text>
          </View> */}
        </View>
        <View style={{marginTop: 15}}>
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
             {newTranslation?.whatsappNumber}
            </Text>
          </View>
          <TextInput
            style={[styles.input, {marginBottom: 16}]}
            onChangeText={text => {
              setFormData({...formData, empWhatsapp: text});
            }}
            keyboardType="numeric"
            value={formData.empWhatsapp && formData.empWhatsapp}
          />
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
            <Text>
              {formData?.empLanguage.length > 2
                ? formData?.empLanguage.substring(
                    1,
                    formData?.empLanguage.length - 1,
                  )
                : ''}
            </Text>
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
              <Picker.Item label={newTranslation?.yes} value="Yes" style={{color: 'gray'}} />
              <Picker.Item label={newTranslation?.no} value="No" style={{color: 'gray'}} />

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
                  })[0]?.skill
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
              {newTranslation?.pastInternationalMigrationExperience}
            </Text>
          </View>
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
                label={formData.empInternationMigrationExp}
                value={formData.empInternationMigrationExp}
                style={{color: 'gray'}}
              />
              <Picker.Item label={newTranslation?.yes} value="Yes" style={{color: 'gray'}} />
              <Picker.Item label={newTranslation?.no} value="No" style={{color: 'gray'}} />

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
              {newTranslation?.yearOfHighestEducationQualification}
            </Text>
          </View>
          <TextInput
            style={[styles.input]}
            onChangeText={text => {
              setFormData({...formData, empEduYear: text});
            }}
            value={formData?.empEduYear}
            keyboardType="numeric"
          />
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
              <Picker.Item label={newTranslation?.select} value="" style={{color: 'gray'}} />
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
              {newTranslation?.email}
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder={newTranslation?.email}
            onChangeText={text => {
              setFormData({...formData, empEmail: text});
            }}
            value={formData?.empEmail}></TextInput>
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
              {newTranslation?.aadhaNumber}
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder=""
            onChangeText={text => {
              setFormData({...formData, empAadharNo: text});
            }}
            value={formData?.empAadharNo}></TextInput>
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
            style={styles.input}
            onChangeText={text => {
              setFormData({...formData, empRefPhone: text});
            }}
            value={formData?.empRefPhone}></TextInput>
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
              {newTranslation?.specialisation}
            </Text>
          </View>
          <TextInput
            onChangeText={text => {
              setFormData({...formData, empSpecialEdu: text});
            }}
            value={formData?.empSpecialEdu}
            style={[styles.input]}
          />
          
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
              {newTranslation?.areYouInterestedInInternationalMigration}
            </Text>
          </View>
          <View style={styles.picker}>
            <Picker
              selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({...formData, empRelocationIntQ: itemValue});
              }}>
              <Picker.Item label={newTranslation?.select} value="" style={{color: 'gray'}} />
              <Picker.Item label={newTranslation?.yes} value="Yes" style={{color: 'gray'}} />
              <Picker.Item label={newTranslation?.no} value="No" style={{color: 'gray'}} />

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
          {formData.empRelocationIntQ == 'Yes' && (
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
              <View style={styles.picker}>
                <Picker
                  selectedValue={formData.empRelocationIntQCountry}
                  onValueChange={(itemValue, itemIndex) => {
                    setFormData({
                      ...formData,
                      empRelocationIntQCountry: itemValue,
                    });
                  }}>
                  <Picker.Item
                    label={
                      countryList?.filter((v, i) => {
                        return v.id == formData?.empRelocationIntQCountry;
                      })[0]?.name
                    }
                    value={formData.empRelocationIntQCountry}
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
            </>
          )}
          <View style={styles.nextBtn}>
            <Button title={newTranslation?.save} onPress={handleSubmit} color="#035292" />
          </View>
        </View>
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
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
                {newTranslation?.languageKnown}
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
                    formData?.empLanguage?.includes('English') &&
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
                title={newTranslation?.save}
                onPress={() => setShowLanguageSelect(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
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
});
