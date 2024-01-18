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
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import {getCountries} from '../services/info.service';
import {registerUserStep2} from "../services/user.service";
import {useGlobalState} from '../GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CandidateDetails2 = ({route}) => {
  const localUser = route?.params?.localUser;
  const {globalState, setGlobalState} = useGlobalState();
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
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // You can specify the types of documents to pick
      });
      console.warn(result);
      // Handle the picked document here
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
  const handleSubmit = async()=>{
    try {
      let response = await registerUserStep2(formData, localUser.access_token);
      console.log(response)
      if(response?.msg=="Data Updated Successfully."){
        await AsyncStorage.setItem('user', JSON.stringify(response));
        setUserData();
      }
      else{
        console.warn("something went wrong")
      }
    } catch (error) {
      console.warn( error,"Enternal server error")
    }
  }
  const handleSkip = async()=>{
    await AsyncStorage.setItem('user', JSON.stringify(localUser));
    setUserData();
  }
  useEffect(() => {
    getCountryList();
  }, []);
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.main}>
        <View>
          <Text style={styles.heading}>Please Enter Your Details : 2/2</Text>
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
              <Image source={require('../images/circle.png')} />
              <Text style={{color: '#035292', textDecorationLine: 'underline'}}>
                Add Profile Pic
              </Text>
            </Pressable>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text =>
              setFormData({...formData, empEmail: text})
            }></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Aadhar Number"
            onChangeText={text =>
              setFormData({...formData, empAadharNo: text})
            }></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Present Monthly Income"
            onChangeText={text =>
              setFormData({...formData, empDailyWage: text})
            }></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Expected Monthly Income"
            onChangeText={text =>
              setFormData({...formData, empExpectedMonthlyIncome: text})
            }></TextInput>

          {contactRef ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Reference Person Name"
                onChangeText={text =>
                  setFormData({...formData, empRefName: text})
                }></TextInput>
              <TextInput
                style={styles.input}
                placeholder="Reference Person Contact"
                onChangeText={text =>
                  setFormData({...formData, empRefPhone: text})
                }></TextInput>
            </>
          ) : (
            <View style={styles.picker}>
              <Picker
                selectedValue={contactRef}
                onValueChange={(itemValue, itemIndex) => {
                  // setContactRef(itemValue);
                }}>
                <Picker.Item
                  label="Any other contact "
                  value=""
                  style={{color: 'gray'}}
                />
                <Picker.Item label="Yes" value={true} style={{color: 'gray'}} />
                <Picker.Item label="No" value={false} style={{color: 'gray'}} />

                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>
          )}
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
          {formData.empRelocatedIntQ == 'Yes' && (
            <View style={styles.picker}>
              <Picker
                selectedValue={formData.empRelocationIntQCountry}
                onValueChange={(itemValue, itemIndex) => {
                  setFormData({...formData, empRelocationIntQCountry:itemValue})
                }}>
                <Picker.Item
                  label="Country "
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
            style={{flexDirection: 'row', justifyContent: 'flex-end'}} onPress={handleSkip}>
            <Text
              style={{textDecorationLine: 'underline', paddingHorizontal: 10}}>
              Skip
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '50%',
              backgroundColor: '#035292',
              padding: 10,
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={handleSubmit}
          >
            <Text style={{color: 'white'}}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
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