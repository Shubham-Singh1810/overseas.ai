import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {submitLoanForm} from '../services/user.service';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
const NeedMigrationLoan = (props) => {
  useAndroidBackHandler(() => {
    props.navigation.navigate("Home") 
    return true;
  });
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    panNo: '',
    loanGuarantorQ: '',
    loanGuarantorName: '',
    loanGuarantorContact: '',
    loanGuarantorOccu: '',
    prevLoanQ: '',
    prevLoanAmount: '',
    prevLoanProvider: '',
  });
  const handleSubmit = async () => {
    if (
      formData.name &&
      formData.contact &&
      formData.panNo &&
      formData.loanGuarantorQ &&
      formData.prevLoanQ
    ) {
      if (formData.panNo.length == 10) {
        if (formData.contact.length == 10) {
          let user = await AsyncStorage.getItem('user');
          try {
            let response = await submitLoanForm(
              formData,
              JSON.parse(user).access_token,
            );
            if (response.data.msg == 'Loan request sent successfully.') {
              Toast.show({
                type: 'success', // 'success', 'error', 'info', or any custom type you define
                position: 'top',
                text1: 'Loan request sent successfully.',
                visibilityTime: 3000, // Duration in milliseconds
              });
              setFormData({
                name: '',
                contact: '',
                panNo: '',
                loanGuarantorQ: '',
                loanGuarantorName: '',
                loanGuarantorContact: '',
                loanGuarantorOccu: '',
                prevLoanQ: '',
                prevLoanAmount: '',
                prevLoanProvider: '',
              });
            } else {
              Toast.show({
                type: 'error', // 'success', 'error', 'info', or any custom type you define
                position: 'top',
                text1: 'Something went wrong',
                visibilityTime: 3000, // Duration in milliseconds
              });
            }
            console.log(response);
          } catch (error) {
            Toast.show({
              type: 'error', // 'success', 'error', 'info', or any custom type you define
              position: 'top',
              text1: 'Internal Server Error',
              visibilityTime: 3000, // Duration in milliseconds
            });
          }
        } else {
          Toast.show({
            type: 'error', // 'success', 'error', 'info', or any custom type you define
            position: 'top',
            text1: 'Invalid Contact number',
            visibilityTime: 3000, // Duration in milliseconds
          });
        }
      } else {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Invalid Pan number',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    } else {
      Toast.show({
        type: 'error', // 'success', 'error', 'info', or any custom type you define
        position: 'top',
        text1: 'Invalid form details',
        visibilityTime: 3000, // Duration in milliseconds
      });
    }
  };
  return (
    <View style={styles.main}>
      <Text
        style={{
          color: '#333333',
          fontWeight: '500',
          fontSize: 17,
        }}>
        Initiate migration loan application.
      </Text>
      <ScrollView style={{marginVertical: 20}}>
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
            Applicant Name
          </Text>
        </View>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={text => setFormData({...formData, name: text})}
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
            Contact Number
          </Text>
        </View>
        <TextInput
          maxLength={10}
          keyboardType="numeric"
          style={styles.input}
          value={formData.contact}
          onChangeText={text => setFormData({...formData, contact: text})}
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
            PAN Numer
          </Text>
        </View>
        <TextInput
          maxLength={10}
          style={styles.input}
          value={formData.panNo}
          onChangeText={text =>
            setFormData({...formData, panNo: text.toUpperCase()})
          }
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
            Do you have loan guarantor
          </Text>
        </View>
        <View style={[styles.picker]}>
          <Picker
            selectedValue={formData.loanGuarantorQ}
            onValueChange={(itemValue, itemIndex) => {
              setFormData({...formData, loanGuarantorQ: itemValue});
            }}>
            <Picker.Item label="Select" value="" style={{color: 'gray'}} />
            <Picker.Item label="Yes" value="Yes" style={{color: 'gray'}} />
            <Picker.Item label="No" value="No" style={{color: 'gray'}} />

            {/* Add more Picker.Item as needed */}
          </Picker>
        </View>
        {formData.loanGuarantorQ == 'Yes' && (
          <View>
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
                Guarantor Name
              </Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.loanGuarantorName}
              onChangeText={text =>
                setFormData({...formData, loanGuarantorName: text})
              }
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
                Guarantor Contact Number
              </Text>
            </View>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={10}
              value={formData.loanGuarantorContact}
              onChangeText={text =>
                setFormData({...formData, loanGuarantorContact: text})
              }
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
                Guarantor Occupation
              </Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.loanGuarantorOccu}
              onChangeText={text =>
                setFormData({...formData, loanGuarantorOccu: text})
              }
            />
          </View>
        )}

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
            Do you have Prior Loan Records?
          </Text>
        </View>
        <View style={[styles.picker]}>
          <Picker
            selectedValue={formData.prevLoanQ}
            onValueChange={(itemValue, itemIndex) => {
              setFormData({...formData, prevLoanQ: itemValue});
            }}>
            <Picker.Item label="Select" value="" style={{color: 'gray'}} />
            <Picker.Item label="Yes" value="Yes" style={{color: 'gray'}} />
            <Picker.Item label="No" value="No" style={{color: 'gray'}} />

            {/* Add more Picker.Item as needed */}
          </Picker>
        </View>
        {formData.prevLoanQ == 'Yes' && (
          <View>
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
                Loan Amount
              </Text>
            </View>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={formData.prevLoanAmount}
              onChangeText={text =>
                setFormData({...formData, prevLoanAmount: text})
              }
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
                Loan Provider
              </Text>
            </View>
            <TextInput
              style={styles.input}
              value={formData.prevLoanProvider}
              onChangeText={text =>
                setFormData({...formData, prevLoanProvider: text})
              }
            />
          </View>
        )}

        <Button title="Submit" color="#035292" onPress={handleSubmit} />
      </ScrollView>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};
export default NeedMigrationLoan;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    padding: 18,
    flex: 1,
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 18,
    backgroundColor: 'white',
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
});
