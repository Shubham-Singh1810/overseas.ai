import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useState} from 'react';
import {useGlobalState} from '../GlobalProvider';
import Toast from 'react-native-toast-message';
import {loginUsingPassword, loginUsingOtp} from '../services/user.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = props => {
  const [loading, setLoading] = useState(false);
  const {translation, globalState, setGlobalState} = useGlobalState();
  const [formData, setFormData] = useState({
    empPhone: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    empPhone: '',
    password: '',
  });
  const validateForm = () => {
    let valid = true;
    const newErrors = {...errors};

    // Validate mobile_no length
    if (formData.empPhone.trim().length != 10) {
      newErrors.empPhone = 'Mobile no. must be of 10 digit';
      valid = false;
    } else {
      newErrors.empPhone = '';
    }

    // Validate password
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    } else {
      newErrors.password = '';
    }
    setErrors(newErrors);
    return valid;
  };
  const setUserData = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      setGlobalState({...globalState, user: user});
      setFormData({
        empPhone: '',
        password: '',
      });
    } catch (error) {
      console.warn('error from global provider');
    }
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        let response = await loginUsingPassword(formData);
        if (response.data.access_token) {
          await AsyncStorage.setItem('user', JSON.stringify(response.data));
          setUserData();
          
          // props.navigation.navigate('Home');
          setLoading(false);
        } else {
          Toast.show({
            type: 'error', // 'success', 'error', 'info', or any custom type you define
            // position: 'top',
            text1: 'Invalid credentials',
            visibilityTime: 3000, // Duration in milliseconds
          });
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    } else {
      // Form is invalid, do something (e.g., display an error message)
      Toast.show({
        type: 'error', // 'success', 'error', 'info', or any custom type you define
        // position: 'top',
        text1: 'Form validation failed',
        visibilityTime: 3000, // Duration in milliseconds
      });
    }
  };
  function isValidIndianMobileNumber(mobileNumber) {
    // Regular expression for Indian mobile numbers
    const indianMobileNumberRegex = /^[6-9]\d{9}$/;

    // Check if the provided number matches the regex
    return indianMobileNumberRegex.test(mobileNumber);
  }
  const storeDataInLocal = async tempPhone => {
    try {
      // Store phone number and OTP in local storage
      await AsyncStorage.setItem('tempPhone', tempPhone);
      console.log('Data stored successfully!');
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };
  const handleRouteToOtp = async () => {
    const newErrors = {...errors};
    // Validate mobile_no length
    if (formData.empPhone.trim().length != 10) {
      newErrors.empPhone = 'Mobile no. must be of 10 digit';
      setErrors(newErrors);
    } else {
      if (isValidIndianMobileNumber(formData.empPhone)) {
        newErrors.empPhone = '';
        setErrors(newErrors);
        try {
          let response = await loginUsingOtp(formData);
          if (response.data.msg == 'Otp Sent Succefully.') {
            storeDataInLocal(formData.empPhone);
            props.navigation.navigate('Verify Otp');
          }
        } catch (error) {
          Alert('Something Went Wrong');
        }
      } else {
        newErrors.empPhone = 'Please enter a valid number';
        setErrors(newErrors);
      }
    }
  };
  return (
    <View style={styles.authMain}>
      <View style={styles.main}>
        <Text style={styles.heading}>{translation.LogInToYourAccount}</Text>
        <View>
          <TextInput
            placeholder={translation.mobileNumber}
            style={styles.input}
            onChangeText={text => setFormData({...formData, empPhone: text})}
            value={formData.empPhone}
          />
          <Text style={styles.errorMessage}>{errors.empPhone}</Text>
          <TextInput
            placeholder={translation.password}
            style={styles.input}
            onChangeText={text => setFormData({...formData, password: text})}
            value={formData.password}
            secureTextEntry={true}
          />
          <Text style={styles.errorMessage}>{errors.password}</Text>
          {loading ? (
            <ActivityIndicator size="large" color="gray" />
          ) : (
            <View>
              <View style={{flexDirection: 'row'}}>
                {/* <Text style={styles.smallText}>
                {translation.forgetPassword}?
              </Text> */}
                <Text style={[styles.sendOtp]} onPress={handleRouteToOtp}>
                  Login via OTP verification
                </Text>
              </View>
              <Pressable style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnText}>{translation.logIn}</Text>
              </Pressable>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:"center", marginTop:20}}>
                <Text>Don't have any account?</Text>
                <Pressable
                  style={{borderBottomColor: '#5F90CA',borderBottomWidth:1, marginLeft:4, paddingHorizontal:5}}
                  onPress={() => props.navigation.navigate("SignUpCom")}>
                  <Text>Sign Up</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  authMain: {
    backgroundColor: '#F5F5FA',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  navItem: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 20,
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderColor: '#5F90CA',
  },
  main: {
    // marginTop: 50,
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
  smallText: {
    marginTop: -10,
    marginBottom: 20,
    color: '#F00',
    fontFamily: 'Noto Sans',
    fontSize: 10,
    borderColor: '#5F90CA',
  },
  sendOtp: {
    marginTop: -10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#5F90CA',
    color: '#5F90CA',
    marginLeft: 4,
    fontFamily: 'Noto Sans',
    fontSize: 10,
  },
  errorMessage: {
    color: 'red',
    fontFamily: 'Noto Sans',
    fontSize: 10,
    position: 'relative',
    bottom: 15,
  },
});
