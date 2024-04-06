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
} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import DatePicker from 'react-native-modern-datepicker';
import {Picker} from '@react-native-picker/picker';
import {getSkillsByOccuId, getCountries} from '../services/info.service';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {addExperienceStep2} from '../services/user.service';
const ExperiencePopStep1 = ({
  showExperiencePopUp,
  setShowExperiencePopUp,
  occupations,
  stateList,
  showCountry,
  localUser
}) => {
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
  const [countryList, setCountryList] = useState([]);
  const getListOfCompany = async () => {
    try {
      let response = await getCountries();
      let country = response.countries.map(item => ({
        label: item.name,
        value: item.id,
      }));
      console.log(country);
      setCountryList(country);
    } catch (error) {}
  };
  const [showJoiningCalender, setShowJoiningCalender] = useState(false);
  const [showEndingCalender, setShowEndingCalender] = useState(false);

  const [formDataError, setFormDataError] = useState({
    experinceCompanyName: '',
    jobProfile: '',
    jobOccupation: '',
    experienceType: '',
    fromDate: '',
    toDate: '',
    location: '',
    certificateImage: '',
  });
  const formValidaion = () => {
    let result = true;
    const newErrors = {...formDataError};
    if (experienceForm.experinceCompanyName === '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Company name is a required field',
        visibilityTime: 3000,
      });
      newErrors.experinceCompanyName = 'Company/Organisation name is a required field';
      result = false;
    }
    if (experienceForm.jobProfile === '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Job Profile is a required field',
        visibilityTime: 3000,
      });
      newErrors.jobProfile = 'Job Profile is a required field';
      result = false;
    }
    if (experienceForm.jobOccupation === '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Job Occupation is a required field',
        visibilityTime: 3000,
      });
      newErrors.jobOccupation = 'Job Occupation is a required field';
      result = false;
    }
    if (experienceForm.countryName === '' && experienceForm.stateName === '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Job location is a required field',
        visibilityTime: 3000,
      });
      newErrors.location = 'Job location is a required field';
      result = false;
    }
    if (experienceForm.fromDate === '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Joining date is a required field',
        visibilityTime: 3000,
      });
      newErrors.fromDate = 'Joining date is a required field';
      result = false;
    }
    if (experienceForm.toDate === '') {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Ending date is a required field',
        visibilityTime: 3000,
      });
      newErrors.toDate = 'Ending date is a required field';
      result = false;
    }
    setFormDataError(newErrors);
    return result;
  };
  const handleExperienceSubmit = async() => {
    if (formValidaion()) {
      try {
        let response = await addExperienceStep2(
          {
            ...experienceForm,
            experienceType: showCountry ? 'international' : 'national',
          },
          localUser.access_token,
        );
        if (response?.data?.msg == 'Experience Successfully Added.') {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Experience successfully added, You can add more',
            // text2:"Feel free to enrich your profile by adding more experiences if you desire.",
            visibilityTime: 10000,
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
          
        } else {
          Toast.show({
            type: 'error', // 'success', 'error', 'info', or any custom type you define
            // position: 'top',
            text1: 'Something went grong',
            visibilityTime: 3000, // Duration in milliseconds
          });
        }
      } catch (error) {
        console.warn(error)
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          // position: 'top',
          text1: 'Internal server error',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getListOfCompany();
    }, []),
  );
  return (
    <Modal
      transparent={true}
      visible={showExperiencePopUp}
      animationType="slide">
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            paddingBottom: 10,
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
            <Text style={{fontWeight: '500', fontSize: 20, color:"gray"}}>
              Experience Details
            </Text>
            <Pressable
              onPress={() => {
                setShowExperiencePopUp(false);
              }}>
              <Image source={require('../images/close.png')} />
            </Pressable>
          </View>
          <View style={{margin: 20, marginTop: 30}}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Enter Company/Organisation Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => {
                  setExperienceForm({
                    ...experienceForm,
                    experinceCompanyName: text,
                  });
                  setFormDataError({
                    ...formDataError,
                    experinceCompanyName: '',
                  });
                }}
                value={experienceForm.experinceCompanyName}
              />
              <Text style={styles.errorText}>
                {formDataError.experinceCompanyName}
              </Text>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Job Profile</Text>
              <View style={styles.input}>
                <Picker
                  selectedValue={experienceForm.jobProfile}
                  style={{color: 'black', fontSize: 14}}
                  onValueChange={(itemValue, itemIndex) => {
                    setExperienceForm({
                      ...experienceForm,
                      jobProfile: itemValue,
                    });
                    getSkillList(itemValue);
                    setFormDataError({
                      ...formDataError,
                      jobProfile: '',
                    });
                  }}>
                  <Picker.Item
                    label="Select"
                    value=""
                    style={{color: 'gray', fontSize: 14}}
                  />
                  {occupations?.map((v, i) => {
                    return (
                      <Picker.Item
                        key={i}
                        label={v.label}
                        value={v.value}
                        style={{color: 'gray', fontSize: 14}}
                      />
                    );
                  })}

                  {/* Add more Picker.Item as needed */}
                </Picker>
              </View>
              <Text style={styles.errorText}>{formDataError.jobProfile}</Text>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Job Occupation</Text>
              <View style={styles.input}>
                <Picker
                  selectedValue={experienceForm.jobOccupation}
                  style={{color: 'black', fontSize: 14}}
                  onValueChange={(itemValue, itemIndex) => {
                    setExperienceForm({
                      ...experienceForm,
                      jobOccupation: itemValue,
                    });
                    setFormDataError({
                      ...formDataError,
                      jobOccupation: '',
                    });
                  }}>
                  <Picker.Item
                    label="Select"
                    value=""
                    style={{color: 'gray', fontSize: 14}}
                  />
                  {skillList?.map((v, i) => {
                    return (
                      <Picker.Item
                        label={v.label}
                        value={v.value}
                        style={{color: 'gray', fontSize: 14}}
                      />
                    );
                  })}

                  {/* Add more Picker.Item as needed */}
                </Picker>
              </View>
              <Text style={styles.errorText}>
                {formDataError.jobOccupation}
              </Text>
            </View>
            {!showCountry ? (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>State</Text>
                <View style={styles.input}>
                  <Picker
                    selectedValue={experienceForm.stateName}
                    style={{color: 'black', fontSize: 14}}
                    onValueChange={(itemValue, itemIndex) => {
                      setExperienceForm({
                        ...experienceForm,

                        stateName: itemValue,
                      });
                      setFormDataError({
                        ...formDataError,
                        location: '',
                      });
                    }}>
                    <Picker.Item
                      label="Select"
                      value=""
                      style={{color: 'gray', fontSize: 14}}
                    />
                    {stateList?.map((v, i) => {
                      {
                        return (
                          <Picker.Item
                            label={v.label}
                            value={v.value}
                            style={{color: 'gray', fontSize: 14}}
                          />
                        );
                      }
                    })}

                    {/* Add more Picker.Item as needed */}
                  </Picker>
                </View>
                <Text style={styles.errorText}>{formDataError.location}</Text>
              </View>
            ) : (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Country</Text>
                <View style={styles.input}>
                  <Picker
                    selectedValue={experienceForm.countryName}
                    style={{color: 'black', fontSize: 14}}
                    onValueChange={(itemValue, itemIndex) => {
                      setExperienceForm({
                        ...experienceForm,
                        countryName: itemValue,
                      });
                      setFormDataError({
                        ...formDataError,
                        location: '',
                      });
                    }}>
                    <Picker.Item
                      label="Select"
                      value=""
                      style={{color: 'gray', fontSize: 14}}
                    />
                    {countryList?.map((v, i) => {
                      {
                        return (
                          <Picker.Item
                            label={v.label}
                            value={v.value}
                            style={{color: 'gray', fontSize: 14}}
                          />
                        );
                      }
                    })}

                    {/* Add more Picker.Item as needed */}
                  </Picker>
                </View>
                <Text style={styles.errorText}>{formDataError.location}</Text>
              </View>
            )}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Joining Date*</Text>
              <Pressable
                style={[styles.input, {padding: 15}]}
                onPress={() => setShowJoiningCalender(true)}>
                <Text
                  style={{color: '#212121', fontSize: 14, fontWeight: '500'}}>
                  {experienceForm.fromDate}
                </Text>
              </Pressable>
              <Text style={styles.errorText}>{formDataError.fromDate}</Text>
              {/* <Text style={styles.errorText}>{formDataError.empDob}</Text> */}
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
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 20,
                          color: 'gray',
                        }}>
                        Joining Date
                      </Text>
                      <Pressable onPress={() => setShowJoiningCalender(false)}>
                        <Image source={require('../images/close.png')} />
                      </Pressable>
                    </View>

                    <DatePicker
                      mode="calender"
                      format="YYYY-MM-DD"
                      
                      onDateChange={date => {
                        const formattedDate = moment(date, 'YYYY/MM/DD').format(
                          'YYYY-MM-DD',
                        );
                        setExperienceForm({...experienceForm, fromDate: formattedDate});
                        setShowJoiningCalender(false);
                        setFormDataError({
                          ...formDataError,
                          fromDate: '',
                        });
                      }}
                    />
                  </View>
                </View>
              </Modal>
            </View>
            <View style={styles.inputGroup}>
              <View>
                <Text style={styles.label}>Ending Date*</Text>
                <Pressable
                  style={[styles.input, {padding: 15}]}
                  onPress={() => setShowEndingCalender(true)}>
                  <Text
                    style={{color: '#212121', fontSize: 14, fontWeight: '500'}}>
                    {experienceForm.toDate}
                  </Text>
                </Pressable>
                <Text style={styles.errorText}>{formDataError.toDate}</Text>
              </View>

              {/* <Text style={styles.errorText}>{formDataError.empDob}</Text> */}
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
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 20,
                          color: 'gray',
                        }}>
                        Ending Date
                      </Text>
                      <Pressable onPress={() => setShowEndingCalender(false)}>
                        <Image source={require('../images/close.png')} />
                      </Pressable>
                    </View>
                    <DatePicker
                      mode="calender"
                      format="YYYY-MM-DD"
                      onDateChange={date => {
                        const formattedDate = moment(date, 'YYYY/MM/DD').format(
                          'YYYY-MM-DD',
                        );
                        setExperienceForm({...experienceForm, toDate: formattedDate});
                        setShowEndingCalender(false);
                        setFormDataError({
                          ...formDataError,
                          toDate: '',
                        });
                      }}
                    />
                  </View>
                </View>
              </Modal>
            </View>
            <Button title="Save" onPress={handleExperienceSubmit} />
          </View>
        </View>
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </Modal>
  );
};

export default ExperiencePopStep1;

const styles = StyleSheet.create({
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
