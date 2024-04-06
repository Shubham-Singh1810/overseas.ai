import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {
  verifyOtpForLogin,
  loginUsingOtp,
  verifyOtpForSignUp,
  signUp,
} from '../services/user.service';
import {useGlobalState} from '../GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';
const Otp = props => {
  const {params} = props.route;
  const [tempUser, setTempUser] = useState(params ? params.tempUser : null);
  const {newTranslation, globalState, setGlobalState} = useGlobalState();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const startTimer = () => {
    if (timer == 0) {
      return;
    }
    setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
  };
  const setUserData = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      setGlobalState({...globalState, user: user});
    } catch (error) {
      console.warn('error from global provider');
    }
  };
  const verifyOtp = async otp => {
    setLoading(true);
    try {
      let response;
      if (tempUser) {
        response = await verifyOtpForSignUp({
          empPhone: tempUser.mobile_no,
          empName: tempUser.name,
          password: tempUser.password,
          otp: otp,
          email:tempUser.empEmail,
          countryCode:tempUser.countryCode,
        });
        if (response.data.access_token) {
          await AsyncStorage.setItem('signUpUser', JSON.stringify(response.data));
          props.navigation.navigate("CandidateDetails1")
        } else {
          setLoading(false);
          Toast.show({
            type: 'error', // 'success', 'error', 'info', or any custom type you define
            // position: 'top',
            text1: newTranslation?.wrongOtp,
            visibilityTime: 3000, // Duration in milliseconds
          });
        }
      } 
      else {
        response = await verifyOtpForLogin({
          empPhone: await AsyncStorage.getItem('tempPhone'),
          otp: otp,
        });
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
          const regSource = response?.data?.user?.regSource;
          if (regSource !== undefined && regSource !== null) {
            await AsyncStorage.setItem('regSource', regSource);
          } else {
            console.log("No registration source found in the response.");
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
  const resendOtp = async () => {
    try {
      if (tempUser) {
        let response = await signUp({
          empPhone: tempUser.mobile_no,
        });
        if (response.data.msg == 'Otp Sent Succefully.') {
          Toast.show({
            type: 'success',
            // position: 'top',
            text1: newTranslation?.otpResendSuccessfully,
            visibilityTime: 3000,
          });
          setTimer(120);
          startTimer();
        }
      } else {
        let response = await loginUsingOtp({
          empPhone: await AsyncStorage.getItem('tempPhone'),
        });
        if (response.data.msg == 'Otp Sent Succefully.') {
          Toast.show({
            type: 'success',
            // position: 'top',
            text1: newTranslation?.otpResendSuccessfully,
            visibilityTime: 3000,
          });
          setTimer(120);
          startTimer();
        }
      }
      setLoading(false);
    } catch (error) {}
  };
  useFocusEffect(
    React.useCallback(() => {
      startTimer();
    }, [timer]),
  );
  return (
    <View style={styles.main}>
      <View>
        <Text style={{color:"black",fontWeight:"400", marginBottom:20, textAlign:"center"}}>OTP has been sent to your{"\n"}{tempUser?.empEmail ? tempUser?.empEmail: "Phone Number"}</Text>
        <Text style={styles.heading}>{newTranslation?.enterOTP}</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <TextInput onChangeText={(text)=>{
          if(text.length===6){
            verifyOtp(text);
          }
        }}keyboardType="numeric" style={{backgroundColor:"white", elevation:2,paddingHorizontal:20, marginBottom:25, borderRadius:5,color:"#212121", fontSize:30}}>

        </TextInput>
      )}

      <Text style={[styles.timerText, styles.textCenter]}>
        {timer == 0 ? (
          <Text style={{color: 'red'}}>{newTranslation?.timesUp}</Text>
        ) : (
          <Text>{timer} sec</Text>
        )}
      </Text>
      {timer == 0 && (
        <View style={styles.optionGroup}>
          <Text style={styles.timerText}>{newTranslation?.didntgetOTP}</Text>
          <Pressable onPress={resendOtp}>
            <Text style={[styles.timerText, styles.borderBottom]}>
              {newTranslation?.resendOTP}
            </Text>
          </Pressable>
        </View>
      )}

      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F5F5FA',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 60,
  },
  inputGroup: {
    marginBottom: 30,
    flexDirection: 'row',
  },
  otpInput: {
    borderColor: '1px solid rgba(167, 167, 167, 0.50)',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 15,
    marginHorizontal: 5,
    color: '#696969',
    borderRadius: 5,
    fontFamily: 'Noto Sans',
    fontSize: 25,
    width: 250,
    backgroundColor: '#fff',
  },
  input: {
    borderColor: '1px solid rgba(167, 167, 167, 0.50)',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 15,
    marginHorizontal: 5,
    color: '#696969',
    borderRadius: 5,
    fontFamily: 'Noto Sans',
    fontSize: 20,
  },
  heading: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 16,
    marginBottom: 40,
  },
  timerText: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 16,
    marginHorizontal: 10,
  },
  optionGroup: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  textCenter: {
    textAlign: 'center',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
});
