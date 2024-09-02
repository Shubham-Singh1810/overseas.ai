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
import {useGlobalState} from '../GlobalProvider';
const NeedMigrationLoan = (props) => {
  useAndroidBackHandler(() => {
    props.navigation.navigate("Home") 
    return true;
  });
  const {newTranslation} = useGlobalState()
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
    loanAmount:''
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
        {newTranslation?.initiateMigrationLoanApplication}
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
            {newTranslation?.applicantName}
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
            {newTranslation?.contactNumber}
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
            {newTranslation?.panNumber}
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
            {newTranslation?.loanAmount}
          </Text>
        </View>
        <TextInput
          maxLength={10}
          style={styles.input}
          value={formData.loanAmount}
          keyboardType='numeric'
          onChangeText={text =>
            setFormData({...formData, loanAmount: text})
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
            {newTranslation?.doYouHaveLoanGuarantor}
          </Text>
        </View>
        <View style={[styles.picker]}>
          <Picker
            selectedValue={formData.loanGuarantorQ}
            onValueChange={(itemValue, itemIndex) => {
              setFormData({...formData, loanGuarantorQ: itemValue});
            }}>
            <Picker.Item label={newTranslation?.select} value="" style={{color: 'gray'}} />
            <Picker.Item label={newTranslation?.yes} value="Yes" style={{color: 'gray'}} />
            <Picker.Item label={newTranslation?.no} value="No" style={{color: 'gray'}} />

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
                {newTranslation?.guarantorName}
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
                {newTranslation?.guarantorContactNumber}
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
                {newTranslation?.guarantorOccupation}
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
            {newTranslation?.doYouhavePrioLoanRecords}
          </Text>
        </View>
        <View style={[styles.picker]}>
          <Picker
            selectedValue={formData.prevLoanQ}
            onValueChange={(itemValue, itemIndex) => {
              setFormData({...formData, prevLoanQ: itemValue});
            }}>
            <Picker.Item label={newTranslation?.select} value="" style={{color: 'gray'}} />
            <Picker.Item label={newTranslation?.yes} value="Yes" style={{color: 'gray'}} />
            <Picker.Item label={newTranslation?.no} value="No" style={{color: 'gray'}} />

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
                {newTranslation?.loanAmount}
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
                {newTranslation?.loanProvider}
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

        <Button title={newTranslation?.submit} color="#035292" onPress={handleSubmit} />
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
