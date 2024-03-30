import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  ActivityIndicator,
  Alert,
  Image,
  Modal,
} from 'react-native';
import {useState} from 'react';
import {useGlobalState} from '../GlobalProvider';
import Toast from 'react-native-toast-message';
import {
  loginUsingPassword,
  loginUsingOtp,
  getOtpOnEmail,
  verifyOtpForLogin
} from '../services/user.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = props => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {newTranslation, globalState, setGlobalState} = useGlobalState();
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
    if (formData.empPhone == '') {
      newErrors.empPhone = 'Phone number is required field';
      valid = false;
    } else {
      newErrors.empPhone = '';
    }

    // Validate password
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be of 8 characters';
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
          if (response.data.user.second_step == '0') {
            await AsyncStorage.setItem(
              'signUpUser',
              JSON.stringify(response.data),
            );
            props.navigation.navigate('CandidateDetails1');
            setLoading(false);
            return;
          }
          try {
            const regSource = response?.data?.user?.regSource;
            // Check if "regSource" exists before setting it in AsyncStorage
            if (regSource !== undefined && regSource !== null) {
              await AsyncStorage.setItem('regSource', regSource);
            } else {
              console.log('No registration source found in the response.');
            }
            // Set the "user" item in AsyncStorage with the response data
            await AsyncStorage.setItem('user', JSON.stringify(response.data));
          } catch (error) {
            // Handle AsyncStorage errors
            console.error('Error saving data to AsyncStorage:', error);
          }
          setUserData();
          setLoading(false);
        } else {
          Toast.show({
            type: 'error', // 'success', 'error', 'info', or any custom type you define
            // position: 'top',
            text1: newTranslation?.invalidCredentials,
            visibilityTime: 3000, // Duration in milliseconds
          });
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
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
      await AsyncStorage.setItem('tempPhone', tempPhone);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };
  const handleRouteToOtp = async () => {
    const newErrors = {...errors};
    // Validate mobile_no length
    if (formData.empPhone.trim().length != 10) {
      newErrors.empPhone = newTranslation.mobileNumberMustBeOf10Digit;
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
          } else {
            Toast.show({
              type: 'error', // 'success', 'error', 'info', or any custom type you define
              position: 'top',
              text1: newTranslation?.phoneNumberNotRegistered,
              visibilityTime: 3000, // Duration in milliseconds
            });
          }
        } catch (error) {
          Alert('Something Went Wrong');
        }
      } else {
        newErrors.empPhone = newTranslation?.pleaseEnterAValidNumber;
        setErrors(newErrors);
      }
    }
  };
  const [showPopUp, setShowPopUp] = useState(false);
  const [showOtpInp, setShowOtpInp] = useState(false);
  const [empEmail, setEmpEmail] = useState('');
  const [otp, setOtp] = useState('');
  const getOtpViaEmail = async () => {
    try {
      let reponse = await getOtpOnEmail({empEmail});
      if ((reponse.data.msg = 'Otp Sent Successfully.')) {
        setShowOtpInp(true);
      }
    } catch (error) {
      console.warn('sdyfg', error);
    }
  };
  const verifyOtp = async () => {
    try {
      let response = await verifyOtpForLogin({
        empEmail: empEmail,
        otp: otp,
      });
      console.log(response.data)
      if (response.data.access_token) {
        if (response.data.user.second_step == '0') {
          await AsyncStorage.setItem(
            'signUpUser',
            JSON.stringify(response.data),
          );
          props.navigation.navigate('CandidateDetails1');
          return;
        }
        const regSource = response?.data?.user?.regSource;
        if (regSource !== undefined && regSource !== null) {
          await AsyncStorage.setItem('regSource', regSource);
        } else {
          console.log('No registration source found in the response.');
        }
        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        setUserData();
      } else {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: newTranslation?.wrongOtp,
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        // position: 'top',
        text1: newTranslation?.somethingWentWrong,
        visibilityTime: 3000,
      });
    }
  };
  return (
    <View style={styles.authMain}>
      <View style={styles.main}>
        <Text style={styles.heading}>{newTranslation.logInToYourAccount}</Text>
        <View>
          <TextInput
            placeholder={newTranslation.mobileNumber}
            placeholderTextColor="gray"
            style={styles.input}
            onChangeText={text => setFormData({...formData, empPhone: text})}
            value={formData.empPhone}
          />
          <Text style={styles.errorMessage}>{errors.empPhone}</Text>
          <TextInput
            placeholder={newTranslation.password}
            placeholderTextColor="gray"
            style={styles.input}
            onChangeText={text => setFormData({...formData, password: text})}
            value={formData.password}
            secureTextEntry={showPassword}
          />
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Pressable
              style={{
                position: 'relative',
                bottom: 55,
                right: 10,
              }}
              onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Image
                  source={require('../images/closeEye.png')}
                  style={{height: 25, width: 25, resizeMode: 'contain'}}
                />
              ) : (
                <Image
                  source={require('../images/openEye.png')}
                  style={{height: 25, width: 25, resizeMode: 'contain'}}
                />
              )}
            </Pressable>
          </View>
          <Text
            style={[styles.errorMessage, {marginTop: -20, marginBottom: 20}]}>
            {errors.password}
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color="gray" />
          ) : (
            <View>
              <View style={{flexDirection: 'row'}}>
                {/* <Text style={styles.smallText}>
                {translation.forgetPassword}?
              </Text> */}
                <Text style={[styles.sendOtp]} onPress={handleRouteToOtp}>
                  {newTranslation.logInViaOtpVerification}
                </Text>
              </View>
              <Pressable style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnText}>{newTranslation.logIn}</Text>
              </Pressable>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Text style={{color: '#212121'}}>
                  {newTranslation.dontHaveAnyAccount}
                </Text>
                <Pressable
                  style={{
                    borderBottomColor: '#5F90CA',
                    borderBottomWidth: 1,
                    marginLeft: 4,
                    paddingHorizontal: 5,
                  }}
                  onPress={() => props.navigation.navigate('SignUpCom')}>
                  <Text style={{color: '#5F90CA'}}>
                    {newTranslation.signUp}
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Pressable
              style={{
                paddingHorizontal: 10,
                paddingVertical: 2,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#5F90CA',
              }}
              onPress={() => setShowPopUp(true)}>
              <Text style={{color: '#5F90CA', fontSize: 12}}>
                Get OTP on email
              </Text>
            </Pressable>
          </View>
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
      </View>
      <Modal visible={showPopUp} transparent={true}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}>
          <View
            style={{
              width: 330,
              padding: 20,
              backgroundColor: 'white',
              elevation: 1,
              borderRadius: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}>
              <Text style={{color: 'black', fontSize: 18}}>
                {showOtpInp ? 'Verify Otp' : 'Get OTP on email'}
              </Text>
              <Pressable onPress={() => setShowPopUp(false)}>
                <Image source={require('../images/close.png')} />
              </Pressable>
            </View>
            {showOtpInp && (
              <Text
                style={{
                  color: 'green',
                  textAlign: 'center',
                  marginBottom: 20,
                  textDecorationLine: 'underline',
                }}>
                OTP sent successfully.
              </Text>
            )}

            <TextInput
              placeholder="abs@gmail.com"
              placeholderTextColor="gray"
              style={styles.input}
              value={empEmail}
              onChangeText={text => setEmpEmail(text)}
            />
            {showOtpInp && (
              <TextInput
                placeholder="Enter OTP"
                placeholderTextColor="gray"
                style={styles.input}
                value={otp}
                maxLength={6}
                keyboardType="numeric"
                onChangeText={text => setOtp(text)}
              />
            )}
            {showOtpInp ? (
              <Button title="Verify" onPress={verifyOtp} />
            ) : (
              <Button title="Send" onPress={getOtpViaEmail} />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  authMain: {
    backgroundColor: '#fff',
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
