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
} from 'react-native';
import {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-modern-datepicker';

const CandidateDetailsStep1 = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <ScrollView>
      <View style={styles.main}>
        <View>
          <Text style={styles.heading}>Please Enter your details : 1/2</Text>
        </View>
        <View style={styles.inputGroup}>
          <TextInput placeholder="Date of Birth" style={styles.input} />
          <View>
            <Text>Gender</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={[styles.genderGroup, styles.genderGroupSelected]}>
                <Image source={require('../images/maleIcon.png')} />
                <Text>Male</Text>
              </View>
              <View style={[styles.genderGroup]}>
                <Image source={require('../images/femaleIcon.png')} />
                <Text>Female</Text>
              </View>
              <View style={[styles.genderGroup]}>
                <Image source={require('../images/otherGenderIcon.png')} />
                <Text style={{marginLeft: 3}}>Others</Text>
              </View>
            </View>
          </View>
          <Pressable
            style={{flexDirection: 'row', marginTop:20, alignItems: 'center'}}
            // onPress={() => setJobAlert(!jobAlert)}
            >
            <Text>Do you have same phone number as whatsapp?</Text>
            <Text style={{marginHorizontal:5, textDecorationLine:"underline", color:"#000"}}>Yes</Text>
            <Text style={{marginHorizontal:5, textDecorationLine:"underline", color:"#000"}}>No</Text>
          </Pressable>
          <View
            style={{
              marginTop: 15,
            }}>
            <View style={styles.picker}>
              <Picker
                // selectedValue={userDeatils.empState}
                onValueChange={(itemValue, itemIndex) => {}}>
                <Picker.Item
                  label="Marital Status"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Single"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Married"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Divorced"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Widowed"
                  value="hello"
                  style={{color: 'gray'}}
                />
                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>

            <View style={styles.picker}>
              <Picker>
                <Picker.Item
                  label="Do you have Passport"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Yes"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="No"
                  value="hello"
                  style={{color: 'gray'}}
                />

                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker>
                <Picker.Item
                  label="Present Occupation"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Driver"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Labour"
                  value="hello"
                  style={{color: 'gray'}}
                />

                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker>
                <Picker.Item
                  label="Present Working Department"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Driver"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Labour"
                  value="hello"
                  style={{color: 'gray'}}
                />

                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker>
                <Picker.Item
                  label="Past Occupation"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Driver"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Labour"
                  value="hello"
                  style={{color: 'gray'}}
                />

                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker>
                <Picker.Item
                  label="Past Working Department"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Driver"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Labour"
                  value="hello"
                  style={{color: 'gray'}}
                />

                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker>
                <Picker.Item
                  label="Past International Migration Experience"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Yes"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="No"
                  value="hello"
                  style={{color: 'gray'}}
                />

                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>
            <View style={styles.picker}>
              <Picker>
                <Picker.Item
                  label="Highest Education Qualification"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="Yes"
                  value="hello"
                  style={{color: 'gray'}}
                />
                <Picker.Item
                  label="No"
                  value="hello"
                  style={{color: 'gray'}}
                />

                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>
          </View>
          <TextInput placeholder="Year of highest education qualification*" style={styles.input} />
          <TextInput
            placeholder="Specialisation*"
            style={styles.input}
          />
          <TextInput
            placeholder="Vocational/Technical Education*"
            style={styles.input}
          />
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

export default CandidateDetailsStep1;

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
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 17,
    fontFamily: '600',
    marginTop: 10,
    marginBottom: 20,
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
