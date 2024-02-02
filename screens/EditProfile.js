import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {useGlobalState} from '../GlobalProvider';
const EditProfile = () => {
  const {translation, globalState, setGlobalState} = useGlobalState();
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
    empState: '',
    empDistrict: '',
    empPin: '',
    empEmail: '',
    empDailyWage: '',
    empExpectedMonthlyIncome: '',
    empRelocationIntQ: '',
    empRelocationIntQCountry: '',
    empRefName: '',
    empRefPhone: '',
    empPhoto: '',
  });
  console.log(JSON.parse(globalState?.user)?.empData)
  return (
    <ScrollView style={styles.main}>
      <View style={styles.body}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Pressable>
            <View>
              {JSON.parse(globalState?.user)?.empData?.empPhoto == null ? (
                <Image
                  source={require('../images/circle.png')}
                  style={styles.myPic}
                />
              ) : (
                <Image
                  source={{
                    uri: JSON.parse(globalState?.user)?.empData?.empPhoto,
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
          <View style={{marginLeft: 15}}>
            <Text style={styles.heading}>Shubham Singh</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../images/maleIcon.png')} />
              <Text style={styles.heading}>Male</Text>
            </View>
            <Text style={styles.heading}>776042085</Text>
            <Text style={styles.heading}>hittheshubham1810@...</Text>
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <View style={styles.picker}>
            <Picker
              //   selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {}}>
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
          <View style={styles.picker}>
            <Picker
              //   selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {}}>
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
          <View style={styles.picker}>
            <Picker
              //   selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {}}>
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
          <View style={styles.picker}>
            <Picker
              //   selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {}}>
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
          <View style={styles.picker}>
            <Picker
              //   selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {}}>
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
          <View style={styles.picker}>
            <Picker
              //   selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {}}>
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
        </View>
      </View>
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
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: 'contain',
  },
});
