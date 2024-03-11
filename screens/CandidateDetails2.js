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
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import {getCountries} from '../services/info.service';
import {registerUserStep2, editProfile} from '../services/user.service';
import {useGlobalState} from '../GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';
const CandidateDetails2 = ({route}) => {
  console.log(route.params.step1user.access_token);
  const {globalState, newTranslation, setGlobalState} = useGlobalState();
  const [formData, setFormData] = useState({
    empEmail: '',
    empDailyWage: '',
    empExpectedMonthlyIncome: '',
    empRelocationIntQ: '',
    empRelocationIntQCountry: '',
    empRefName: '',
    empRefPhone: '',
    empPhoto: '',
    empAadharNo: '',
  });
  const [contactRef, setContactRef] = useState(false);
  const pickDocument = async () => {
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

      let response = await registerUserStep2(
        imageformData,
        route.params.step1user.access_token,
      );
      console.log(response);
      setFormData({...formData, empPhoto: response.empData.empPhoto});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the document picker
      } else {
        console.error('Error while picking a document', err);
      }
    }
  };
  const [countryList, setCountryList] = useState([]);
  const getCountryList = async () => {
    try {
      let response = await getCountries();
      setCountryList(response?.countries);
    } catch (error) {}
  };
  const setUserData = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      setGlobalState({...globalState, user: user});
    } catch (error) {
      console.warn('error from global provider');
    }
  };
  const formValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.empEmail != '') {
      if (!emailRegex.test(formData.empEmail)) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Invalid Email',
          // text2: '',
          visibilityTime: 3000,
        });
        return false;
      }
    }
    if (formData.empRefPhone != '') {
      if (formData.empRefPhone.length != 10) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Invalid Phone number of Refrence person',
          // text2: '',
          visibilityTime: 3000,
        });
        return false;
      }
    }
    if (formData.empAadharNo != '') {
      if (formData.empAadharNo.length != 16) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Invalid Aadhar number',
          visibilityTime: 3000,
        });
        return false;
      }
    }
    return true;
  };
  const handleSubmit = async () => {
    if (formValidation()) {
      try {
        let response = await registerUserStep2(
          {
            empEmail: formData.empEmail,
            empDailyWage: formData.empDailyWage,
            empExpectedMonthlyIncome: formData.empExpectedMonthlyIncome,
            empRelocationIntQ: formData.empRelocationIntQ,
            empRelocationIntQCountry: formData.empRelocationIntQCountry,
            empRefName: formData.empRefName,
            empRefPhone: formData.empRefPhone,
            empAadharNo: formData.empAadharNo,
          },
          route.params.step1user.access_token,
        );
        if (response?.msg == 'Data Updated Successfully.') {
          const regSource = response?.data?.user?.regSource;
            // Check if "regSource" exists before setting it in AsyncStorage
            if (regSource !== undefined && regSource !== null) {
              
              await AsyncStorage.setItem('regSource', regSource);
            } else {
              
              console.log("No registration source found in the response.");
            }
          await AsyncStorage.setItem(
            'user',
            JSON.stringify({
              ...response,
              access_token: route.params.step1user.access_token,
            }),
          );
          setUserData();
        } else {
          console.warn('something went wrong');
          console.log(response);
        }
      } catch (error) {
        console.warn(error, 'Enternal server error');
      }
    }
  };

  const handleSkip = async () => {
    const regSource = route.params.step1user.user?.regSource;
    // Check if "regSource" exists before setting it in AsyncStorage
    if (regSource !== undefined && regSource !== null) {
      await AsyncStorage.setItem('regSource', regSource);
    } else {
      console.log('No registration source found in the response.');
    }
    await AsyncStorage.setItem('user', JSON.stringify(route.params.step1user));

    setUserData();
  };

  useFocusEffect(
    React.useCallback(() => {
      getCountryList();
    }, []),
  );
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.main}>
        <View>
          <Text style={styles.heading}>
            {newTranslation?.pleaseEnterYourDetails}2/2
          </Text>
        </View>
        <View style={styles.inputGroup}>
          <View
            style={{
              flexDirection: 'center',
              justifyContent: 'flex-start',
              marginBottom: 20,
              alignItems: 'center',
            }}>
            <Pressable onPress={pickDocument}>
              {formData.empPhoto == '' ? (
                <Image
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                  }}
                  source={require('../images/dummyUserProfile.jpg')}
                />
              ) : (
                <Image
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 50,
                  }}
                  source={{
                    uri: formData.empPhoto,
                  }}
                />
              )}
              <Text style={{color: '#035292', textDecorationLine: 'underline'}}>
                {newTranslation?.addProfilePic}
              </Text>
            </Pressable>
          </View>
          <TextInput
            style={styles.input}
            placeholder={newTranslation.email}
            onChangeText={text =>
              setFormData({...formData, empEmail: text})
            }></TextInput>
          <TextInput
            style={styles.input}
            placeholder={newTranslation?.aadhaNumber}
            keyboardType="numeric"
            onChangeText={text =>
              setFormData({...formData, empAadharNo: text})
            }></TextInput>
          <TextInput
            style={styles.input}
            placeholder={newTranslation?.presentMonthlyIncome}
            keyboardType="numeric"
            onChangeText={text =>
              setFormData({...formData, empDailyWage: text})
            }></TextInput>
          <TextInput
            style={styles.input}
            placeholder={newTranslation?.expectedMonthlyIncome}
            keyboardType="numeric"
            onChangeText={text =>
              setFormData({...formData, empExpectedMonthlyIncome: text})
            }></TextInput>
          <View style={styles.picker}>
            <Picker
              // selectedValue={contactRef}
              onValueChange={(itemValue, itemIndex) => {
                setContactRef(itemValue);
              }}>
              <Picker.Item
                label={newTranslation?.anyOtherContact}
                value=""
                style={{color: 'gray'}}
              />
              <Picker.Item
                label={newTranslation?.yes}
                value={true}
                style={{color: 'gray'}}
              />
              <Picker.Item
                label={newTranslation?.no}
                value={false}
                style={{color: 'gray'}}
              />

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
          {contactRef && (
            <>
              <TextInput
                style={styles.input}
                placeholder={newTranslation?.referencePersoneName}
                onChangeText={text =>
                  setFormData({...formData, empRefName: text})
                }></TextInput>
              <TextInput
                style={styles.input}
                placeholder={newTranslation?.referencePersoneContact}
                keyboardType="numeric"
                onChangeText={text =>
                  setFormData({...formData, empRefPhone: text})
                }></TextInput>
            </>
          )}
          <View style={styles.picker}>
            <Picker
              selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {
                setFormData({...formData, empRelocationIntQ: itemValue});
              }}>
              <Picker.Item
                label={newTranslation?.areYouInterestedInInternationalMigration}
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
                <Picker.Item
                  label={newTranslation?.selectCountry}
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
        </View>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', justifyContent: 'flex-end'}}
            onPress={handleSkip}>
            {formData.empPhoto == '' && (
              <Text
                style={{
                  textDecorationLine: 'underline',
                  paddingHorizontal: 10,
                }}>
                {newTranslation?.skip}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '50%',
              backgroundColor: '#035292',
              padding: 10,
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={handleSubmit}>
            <Text style={{color: 'white'}}>{newTranslation?.save}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </ScrollView>
  );
};

export default CandidateDetails2;

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
    backgroundColor: '#CCC',
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
