import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  View,
} from 'react-native';
import {useGlobalState} from '../GlobalProvider';
import {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {getDistrict, getState} from '../services/info.service';
const CandidateDetails = props => {
  const {translation, newTranslation, globalState} = useGlobalState();
  const [jobAlert, setJobAlert] = useState(false);
  const [userDeatils, setUserDetails] = useState({
    name: globalState?.user.user.name,
    empDob: globalState?.user.empData.empDob,
    empGender: globalState?.user.empData.empGender,
    empState: globalState?.user.empData.empState,
    empdistrictname: globalState?.user.empData.empdistrictname,
    empPS:globalState?.user.empData.empPS
  });
  const [stateList, setStateList] = useState([]);
  const [discrictList, setDistrictList] = useState([]);
  const getStateList = async () => {
    try {
      let response = await getState();
      setStateList(response.data.states);
    } catch (error) {
      console.log(error);
    }
  };
  const getDistrictList = async state_id => {
    try {
      let response = await getDistrict({state_id});
      setDistrictList(response.districts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getStateList();
  }, []);
  return (
    <ScrollView>
      <View style={styles.main}>
        <View>
          <Text style={styles.heading}>Please Enter your details</Text>
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="gray"
            value={userDeatils.name}
            style={styles.input}
          />
          <TextInput
            placeholder="Date of Birth"
            placeholderTextColor="gray"
            value={userDeatils.empDob}
            style={styles.input}
          />
          <View>
            <Text>Gender</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View
                style={[
                  styles.genderGroup,
                  userDeatils.empGender == 'Male' && styles.genderGroupSelected,
                ]}>
                <Image source={require('../images/maleIcon.png')} />
                <Text>Male</Text>
              </View>
              <View
                style={[
                  styles.genderGroup,
                  userDeatils.empGender == 'Female' &&
                    styles.genderGroupSelected,
                ]}>
                <Image source={require('../images/femaleIcon.png')} />
                <Text>Female</Text>
              </View>
              <View
                style={[
                  styles.genderGroup,
                  userDeatils.empGender == 'other' &&
                    styles.genderGroupSelected,
                ]}>
                <Image source={require('../images/otherGenderIcon.png')} />
                <Text style={{marginLeft: 3}}>Others</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <View style={styles.picker}>
              <Picker
                selectedValue={userDeatils.empState}
                onValueChange={(itemValue, itemIndex) => {
                  setUserDetails({...userDeatils, empState: itemValue});
                  getDistrictList(itemValue);
                }}>
                {stateList?.map((v, i) => {
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

            <View style={styles.picker}>
              <Picker
                selectedValue={userDeatils.empdistrictname}
                onValueChange={(itemValue, itemIndex) =>
                  setUserDetails({...userDeatils, empdistrictname: itemValue})
                }>
                {discrictList?.map((v, i) => {
                  return (
                    <Picker.Item
                      label={v.name}
                      value={v}
                      style={{color: 'gray'}}
                    />
                  );
                })}

                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>
          </View>
          <TextInput placeholder="Police Station" placeholderTextColor="gray" value={userDeatils.empPS} style={styles.input} />
          <TextInput
            placeholder="Do you have passport ?*"
            style={styles.input}
          />
          <TextInput placeholder="Passport Category*" style={styles.input} />
          <TextInput
            placeholder="Educational Qualifications*"
            style={styles.input}
          />
          <TextInput placeholder="Languages Known*" style={styles.input} />
          <TextInput
            placeholder="Your department of job*"
            style={styles.input}
          />
          <TextInput
            placeholder="What type of job role are you looking for? "
            style={styles.input}
          />
          <Pressable
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => setJobAlert(!jobAlert)}>
            <View
              style={[
                styles.golaBorder,
                jobAlert && styles.backgroundBlue,
              ]}></View>
            <Text>job alert</Text>
          </Pressable>
        </View>
        <View style={styles.nextBtn}>
          <Button
            title="Next"
            onPress={() => props.navigation.navigate('Home')}
            style={{paddingVertical: 20}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default CandidateDetails;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F5F5FA',
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
    textAlign: 'center',
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 17,
    fontFamily: '600',
    marginTop: 20,
    marginBottom: 40,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    width: '45%',
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
    backgroundColor: '#5F90CA',
  },
  width45: {
    width: '45%',
  },
  nextBtn: {
    marginVertical: 50,
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
