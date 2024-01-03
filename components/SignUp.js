import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import {useGlobalState} from '../GlobalProvider';
import { getApiData, postApiData } from '../services/user.service';
const SignUp = ({props}) => {
  const {translation} = useGlobalState();
  const[formData, setFormData] = useState({
    name:"",
    mobile_no:"",
    password:"",
    confirmPassword:""
  })
  const [errors, setErrors] = useState({
    name:"",
    mobile_no: '',
    password: '',
    confirmPassword: '',
  });
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    // Validate Name
    if (formData.name.trim() == "") {
      newErrors.name = 'Name is a required field';
      valid = false;
    } else {
      newErrors.mobile_no = '';
    }
    // Validate mobile_no length
    if (formData.mobile_no.trim().length != 10) {
      newErrors.mobile_no = 'Mobile no. must be of 10 digit';
      valid = false;
    } else {
      newErrors.mobile_no = '';
    }
    

    // Validate password
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    } else {
      newErrors.password = '';
    }

    // Validate confirm password
    if (formData.confirmPassword!=formData.password) {
      newErrors.confirmPassword = 'Confirm Password does not match';
      valid = false;
    } else {
      newErrors.confirmPassword = '';
    }

    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = () => {
    if (validateForm()) {
      // Form is valid, perform form submission logic here
      props.navigation.navigate("Candidate Details")
    } else {
      // Form is invalid, do something (e.g., display an error message)
      Toast.show({
        type: "error", // 'success', 'error', 'info', or any custom type you define
        // position: 'top',
        text1: "Form validation failed",
        visibilityTime: 3000, // Duration in milliseconds
      });
    }
  };
  
  return (
    <View style={styles.main}>
      <Text style={styles.heading}>{translation.createNewAccount}</Text>
      <View>
        <TextInput placeholder={translation.name} style={styles.input} onChangeText={(text) => setFormData({ ...formData, name: text })}/>
        <Text style={styles.errorMessage}>{errors.name}</Text>
        <TextInput placeholder={translation.mobileNumber} style={styles.input} onChangeText={(text) => setFormData({ ...formData, mobile_no: text })}/>
        <Text style={styles.errorMessage}>{errors.mobile_no}</Text>
        <TextInput placeholder={translation.enterPassword} style={styles.input} onChangeText={(text) => setFormData({ ...formData, password: text })}/>
        <Text style={styles.errorMessage}>{errors.password}</Text>
        <TextInput placeholder={translation.reEnterPassword} style={styles.input} onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}/>
        <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>
        <Pressable style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>{translation.signUp}</Text>
        </Pressable>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  main: {
    marginTop: 50,
    width: 270,
  },
  heading: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Noto Sans',
    fontSize: 16,
    marginBottom: 40,
  },
  input: {
    borderColor: '1px solid rgba(167, 167, 167, 0.50)',
    borderWidth: 1,
    paddingLeft: 12,
    color: '#696969',
    borderRadius: 5,
    fontFamily: 'Noto Sans',
    fontSize: 14,
    marginBottom: 16,
  },
  btn: {
    borderRadius: 3,
    backgroundColor: '#5F90CA',
    padding: 14,
  },
  btnText: {
    color: '#fff',
    fontFamily: 'Noto Sans',
    fontSize: 14,
    textAlign: 'center',
  },
  errorMessage:{
    color: 'red',
    fontFamily: 'Noto Sans',
    fontSize: 10,
    position:"relative",
    bottom:15
  }
});
