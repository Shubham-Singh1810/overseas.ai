import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Pressable,
  Image
} from 'react-native';
import React, {useState} from 'react';
import Toast from 'react-native-toast-message';
import {useGlobalState} from '../GlobalProvider';
import {getApiData, postApiData, signUp} from '../services/user.service';
const SignUp = props => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {newTranslation,translation} = useGlobalState();
  const [formData, setFormData] = useState({
    name: '',
    mobile_no: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    mobile_no: '',
    password: '',
    confirmPassword: '',
  });
  const validateForm = () => {
    let valid = true;
    const newErrors = {...errors};

    // Validate Name
    if (formData.name.trim() == '') {
      newErrors.name = newTranslation?.nameIsARequiredField;
      valid = false;
    } else {
      newErrors.mobile_no = '';
    }
    // Validate mobile_no length
    if (formData.mobile_no.trim().length != 10) {
      newErrors.mobile_no = newTranslation?.mobileNumberMustBeOf10Digit;
      valid = false;
    } else {
      newErrors.mobile_no = '';
    }

    // Validate password
    if (formData.password.length < 6) {
      newErrors.password = newTranslation?.passwordMustBeAtLeast6Characters;
      valid = false;
    } else {
      newErrors.password = '';
    }

    // Validate confirm password
    if (formData.confirmPassword != formData.password) {
      newErrors.confirmPassword = newTranslation?.confirmPasswordDoesNotMatch;
      valid = false;
    } else {
      newErrors.confirmPassword = '';
    }
    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        let response = await signUp({empPhone: formData.mobile_no});
        if (response.data.msg == 'Otp Sent Successfully.') {
          props.navigation.navigate('Verify Otp', {tempUser: formData});
        } else {
          Toast.show({
            type: 'error', 
            text1: newTranslation?.userAlredyRegistered,
            visibilityTime: 3000, 
          });
        }
      } catch (error) {
        Toast.show({
          type: 'error', 
          text1: newTranslation?.somethingWentWrong,
          visibilityTime: 3000, 
        });
      }
    }
  };

  return (
    <View style={styles.authMain}>
      <View style={styles.main}>
        <Text style={styles.heading}>{newTranslation.createNewAccount}</Text>
        <View>
          <TextInput
            placeholder={newTranslation.name}
            style={styles.input}
            onChangeText={text => setFormData({...formData, name: text})}
          />
          <Text style={styles.errorMessage}>{errors.name}</Text>
          <TextInput
            placeholder={newTranslation.mobileNumber}
            style={styles.input}
            keyboardType='numeric'
            onChangeText={text => setFormData({...formData, mobile_no: text})}
          />
          <Text style={styles.errorMessage}>{errors.mobile_no}</Text>
          <TextInput
            secureTextEntry={showPassword}
            placeholder={newTranslation.enterPassword}
            style={styles.input}
            onChangeText={text => setFormData({...formData, password: text})}
          />
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Pressable
              style={{
                position: 'relative',
                bottom: 55,
                right: 10,
                marginBottom:-55
              }}
              onPress={() => setShowPassword(!showPassword)}>
                {showPassword? <Image
                source={require('../images/closeEye.png')}
                style={{height: 25, width: 25, resizeMode: 'contain'}}
              />:<Image
              source={require('../images/openEye.png')}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />}
              
            </Pressable>
          </View>
          <Text style={styles.errorMessage}>{errors.password}</Text>
          <TextInput
            secureTextEntry={showConfirmPassword}
            placeholder={newTranslation.reEnterPassword}
            style={styles.input}
            onChangeText={text =>
              setFormData({...formData, confirmPassword: text})
            }
          />
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Pressable
              style={{
                position: 'relative',
                bottom: 55,
                right: 10,
                marginBottom:-55
              }}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword? <Image
                source={require('../images/closeEye.png')}
                style={{height: 25, width: 25, resizeMode: 'contain'}}
              />:<Image
              source={require('../images/openEye.png')}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />}
              
            </Pressable>
          </View>
          <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>
          <Pressable style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnText}>{newTranslation.signUp}</Text>
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text>{newTranslation?.alreadyHaveAnAccount}</Text>
            <Pressable
              style={{
                borderBottomColor: '#5F90CA',
                borderBottomWidth: 1,
                marginLeft: 4,
                paddingHorizontal: 5,
              }}
              onPress={() => props.navigation.navigate('LoginCom')}>
              <Text>{newTranslation?.logIn}</Text>
            </Pressable>
          </View>
        </View>
        <Toast ref={ref => Toast.setRef(ref)} />
      </View>
    </View>
  );
};

export default SignUp;

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
  errorMessage: {
    color: 'red',
    fontFamily: 'Noto Sans',
    fontSize: 10,
    position: 'relative',
    bottom: 15,
  },
});
