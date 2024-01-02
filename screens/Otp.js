import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
const Otp = props => {
  const [timer, setTimer] = useState(30);
  const startTimer = () => {
    if (timer == 0) {
      return;
    }
    setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
  };
  const handleOtpSubmit = text => {
    if (text.length == 4) {
      props.navigation.navigate('Candidate Details');
    }
  };
  useEffect(() => {
    startTimer();
  }, [timer]);
  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.heading}>Enter OTP</Text>
      </View>
      <OTPInputView
        style={{width: '80%', height: 70, color:"red"}}
        pinCount={4}
        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        // onCodeChanged = {code => { this.setState({code})}}
        autoFocusOnLoad
        codeInputFieldStyle={{color:"black"}}
        codeInputHighlightStyle={{borderColor:"black"}}
        onCodeFilled={code => {
          props.navigation.navigate("Home")
        }}
      />

      <Text style={[styles.timerText, styles.textCenter]}>
        {timer == 0 ? (
          <Text style={{color: 'red'}}>Times up</Text>
        ) : (
          <Text>{timer} sec</Text>
        )}
      </Text>
      <View style={styles.optionGroup}>
        <Text style={styles.timerText}>Didn’t get OTP?</Text>
        <Text style={[styles.timerText, styles.borderBottom]}>Resend code</Text>
      </View>
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
