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
import React, {useEffect, useState} from 'react';
import {
  getOccupations,
  getSkillsByOccuId,
  getCountries,
  getState,
  getDistrict,
} from '../services/info.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {useGlobalState} from '../GlobalProvider';
import {registerUserStep2, editProfile} from '../services/user.service';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
const EditProfile = () => {
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
  const {translation, globalState, setGlobalState} = useGlobalState();
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
    empLanguage: '',
    empInternationMigrationExp: '',
    empWhatsapp: '',
    empEmail: '',
    empDailyWage: '',
    empExpectedMonthlyIncome: '',
    empRelocationIntQ: '',
    empRelocationIntQCountry: '',
    empAadharNo: '',
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
  useEffect(() => {
    getOccupationList();
    setFormData(
      ({
        empOccuId,
        empSkill,
        empEdu,
        empEduYear,
        empTechEdu,
        empSpecialEdu,
        empPassportQ,
        empMS,
        empInternationMigrationExp,
        empWhatsapp,
        empEmail,
        empDailyWage,
        empExpectedMonthlyIncome,
        empRelocationIntQ,
        empRelocationIntQCountry,
        empAadharNo,
      } = JSON.parse(globalState.user).empData),
    );
  }, []);

  const handleSubmit = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await editProfile(
        {empWhatsapp: 1234567890},
        JSON.parse(user).access_token,
      );
      if (response?.data?.msg == 'User profile updated successfully') {
        Toast.show({
          type: 'success',
          text1: 'User profile updated successfully',
          position: 'bottom',
          visibilityTime: 3000,
        });
        setUserImage(response?.data?.empData?.empPhoto);
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
              Edit Profile Pic
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
          <TextInput
            placeholder="Whatsapp Number"
            style={[styles.input, {marginBottom: 16}]}
            onChangeText={text => {}}
            keyboardType="numeric"
            value={formData.empWhatsapp && formData.empWhatsapp}
          />
          <TouchableOpacity
            onPress={() => setShowLanguageSelect(true)}
            style={[
              styles.input,
              {marginBottom: 16, padding: 17},
            ]}>
            <Text>
              {/* {formData.empLanguage.length == 0
                ? 'Language Select'
                : formData?.empLanguage.join(', ')}{' '} */}
                Language Select
            </Text>
          </TouchableOpacity>
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
          <View style={styles.picker}>
            <Picker
              selectedValue={formData.empPassportQ}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({...formData, empPassportQ: itemValue});
              }}>
              <Picker.Item
                label="Do you have Passport ?"
                value=""
                style={{color: 'gray'}}
              />
              <Picker.Item label="Yes" value="Yes" style={{color: 'gray'}} />
              <Picker.Item label="No" value="No" style={{color: 'gray'}} />

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
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
          <View style={styles.picker}>
            <Picker
              //   selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {}}>
              <Picker.Item
                label="Present Occupation"
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
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => {
              setFormData({...formData, empEmail: text});
            }}
            value={formData?.empEmail}></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Aadhar Number"
            onChangeText={text => {
              setFormData({...formData, empAadharNo: text});
            }}
            value={formData?.empAadharNo}></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Present Monthly Income"
            onChangeText={text => {
              setFormData({...formData, empDailyWage: text});
            }}
            value={formData?.empDailyWage}></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Expected Monthly Income"
            onChangeText={text => {
              setFormData({...formData, empExpectedMonthlyIncome: text});
            }}
            value={formData?.empExpectedMonthlyIncome}></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Reference Person Name"
            onChangeText={text => {
              setFormData({...formData, empRefName: text});
            }}
            value={formData?.empRefName}></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Reference Person Contact"
            onChangeText={text => {
              setFormData({...formData, empRefPhone: text});
            }}
            value={formData?.empRefPhone}></TextInput>
          <TextInput
            placeholder="Specialisation*"
            onChangeText={text => {
              setFormData({...formData, empSpecialEdu: text});
            }}
            value={formData?.empSpecialEdu}
            style={[styles.input]}
          />
          <TextInput
            placeholder="Year of highest education qualification*"
            style={[styles.input]}
            onChangeText={text => {
              setFormData({...formData, empEduYear: text});
            }}
            value={formData?.empEduYear}
            keyboardType="numeric"
          />
          <View style={styles.picker}>
            <Picker
              selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({...formData, empRelocationIntQ: itemValue});
              }}>
              <Picker.Item
                label="Are you intrested in international migration ?"
                value=""
                style={{color: 'gray'}}
              />
              <Picker.Item label="Yes" value="Yes" style={{color: 'gray'}} />
              <Picker.Item label="No" value="No" style={{color: 'gray'}} />

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
          {formData.empRelocationIntQ == 'Yes' && (
            <View style={styles.picker}>
              <Picker
                selectedValue={formData.empRelocationIntQCountry}
                onValueChange={(itemValue, itemIndex) => {
                  setFormData({
                    ...formData,
                    empRelocationIntQCountry: itemValue,
                  });
                }}>
                <Picker.Item label="Country" value="" style={{color: 'gray'}} />
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
          <View style={styles.nextBtn}>
            <Button title="Edit" onPress={handleSubmit} color="#035292" />
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
                title="Save"
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
