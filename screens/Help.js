import {
  Pressable,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TextInput,
  Share,
  Alert,
  Linking
} from 'react-native';
import React, {useState} from 'react';
import {useGlobalState} from '../GlobalProvider';
import FooterNav from '../components/FooterNav';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AudioRecord from 'react-native-audio-record';
import {submitContactQuery} from '../services/user.service';
import Toast from 'react-native-toast-message';
import {pick} from 'react-native-document-picker';
import DocumentPicker from 'react-native-document-picker';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
const Help = props => {
  useAndroidBackHandler(() => {
    if(props?.route?.params?.backTo){
      props.navigation.navigate(props?.route?.params.backTo);
      return true;
    }else{
      props.navigation.navigate("MyProfile") 
      return true;
    }
  });
  const {globalState, newTranslation} = useGlobalState();
  const [formData, setFormData] = useState({
    user_contact: JSON.parse(globalState?.user)?.empData?.empPhone,
    help_subject: '',
    help_query: '',
    help_video: '',
    help_audio: '',
  });
  const pickMediaForHelpVideo = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      // Set the selected media URI
      console.log(result[0]);
      setFormData({...formData, help_video: result[0]});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('User cancelled media picker');
      } else {
        console.error('Error picking media', err);
      }
    }
  };
  const pickMediaForHelpaAudio = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });
      // Set the selected media URI
      console.log(result[0]);
      setFormData({...formData, help_audio: result[0]});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('User cancelled media picker');
      } else {
        console.error('Error picking media', err);
      }
    }
  };
  const sendQuery = async () => {
    let user = await AsyncStorage.getItem('user');
    if (formData.help_subject == '') {
      Toast.show({
        type: 'error', // 'success', 'error', 'info', or any custom type you define
        // position: 'top',
        text1: newTranslation?.subjectisrequiredfield,
        visibilityTime: 3000, // Duration in milliseconds
      });
      return;
    }
    if (formData.help_query == '') {
      Toast.show({
        type: 'error', // 'success', 'error', 'info', or any custom type you define
        // position: 'top',
        text1: newTranslation?.queryIsRequiredField,
        visibilityTime: 3000, // Duration in milliseconds
      });
      return;
    }
    try {
      let helpFormData = new FormData();
      helpFormData.append('user_contact', formData.user_contact);
      helpFormData.append('help_subject', formData.help_subject);
      helpFormData.append('help_query', formData.help_query);
      if (formData.help_video != '') {
        helpFormData.append('help_video', {
          uri: formData.help_video.uri,
          type: formData.help_video.type,
          name: formData.help_video.name,
        });
      }
      if (formData.help_audio != '') {
        helpFormData.append('help_audio', {
          uri: formData.help_audio.uri,
          type: formData.help_audio.type,
          name: formData.help_audio.name,
        });
      }

      let response = await submitContactQuery({
        formData: helpFormData,
        access_token: JSON.parse(user).access_token,
      });
      console.log(response?.data?.message);
      if (response?.data?.message == 'Help request submitted successfully!') {
        setFormData({
          user_contact: JSON.parse(globalState?.user)?.empData?.empPhone,
          help_subject: '',
          help_query: '',
          help_video: '',
          help_audio: '',
        });
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          // position: 'top',
          text1: newTranslation?.Helprequestsubmittedsuccessfully,
          text2: newTranslation?.Ourteammemberwillgetbacktoyousoon,
          visibilityTime: 3000, // Duration in milliseconds
        });
      } else {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          // position: 'top',
          text1: newTranslation.somethingWentWrong,
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error', // 'success', 'error', 'info', or any custom type you define
        // position: 'top',
        text1: newTranslation.somethingWentWrong,
        visibilityTime: 3000, // Duration in milliseconds
      });
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: '#035292',
          paddingHorizontal: 18,
          paddingVertical: 25,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <Text style={styles.headingText}>{newTranslation?.ourAdvisorIsJustACallAway}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
            paddingBottom: 15,
          }}>
          <View
            style={{padding: 10, borderRadius: 5, backgroundColor: 'white'}}>
            <Image
              source={require('../images/call.png')}
              style={{height: 40, width: 40, resizeMode: 'contain'}}
            />
          </View>
          <Pressable onPress={()=>Linking.openURL(`tel:18008904788`)} style={{marginLeft: 10}}>
            <Text style={styles.phoneNumberText}>1800 890 4788</Text>
            <Text style={[styles.text, {width:"80%"}]}>{newTranslation?.available24X7forYourQuires}</Text>
          </Pressable>
        </View>
      </View>
      <ScrollView style={styles.main}>
        <Text style={styles.blackText}>{newTranslation?.haveAQueryLetsSolveThis}</Text>
        <TextInput
          style={styles.inputBox}
          value={formData?.user_contact}
          onChangeText={text => setFormData({...formData, user_contact: text})}
          placeholder={newTranslation?.mobileNumber+"*"}
          placeholderTextColor="gray"
          keyboardType='numeric'
          maxLength={13}
        />
        <TextInput
          style={styles.inputBox}
          placeholder={newTranslation?.subject+"*"}
          placeholderTextColor="gray"
          value={formData.help_subject}
          onChangeText={text => setFormData({...formData, help_subject: text})}
        />
        <TextInput
          style={styles.inputBox}
          placeholder={newTranslation?.writeyourqueryhere+"*"} 
          placeholderTextColor="gray"
          value={formData.help_query}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          onChangeText={text => setFormData({...formData, help_query: text})}
        />
        <View
          style={{
            marginVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={[styles.btn]}
            onPress={pickMediaForHelpVideo}>
            <View style={{backgroundColor: '#333333', borderRadius: 15}}>
              {formData.help_video != '' ? (
                <Pressable
                  onPress={() => setFormData({...formData, help_video: ''})}
                  style={{backgroundColor: '#fff', borderRadius: 15}}>
                  <Image source={require('../images/close.png')} />
                </Pressable>
              ) : (
                <Image source={require('../images/play_circle_outline.png')} />
              )}
            </View>

            <Text style={styles.btnText}>
              {formData.help_video != '' ? newTranslation?.selected : newTranslation?.uploadVideo}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn]}
            onPress={pickMediaForHelpaAudio}>
            <View style={{backgroundColor: '#333333', borderRadius: 15}}>
              {formData.help_audio != '' ? (
                <Pressable
                  onPress={() => setFormData({...formData, help_audio: ''})}
                  style={{backgroundColor: '#fff', borderRadius: 15}}>
                  <Image source={require('../images/close.png')} />
                </Pressable>
              ) : (
                <Image source={require('../images/mic.png')} />
              )}
            </View>

            <Text style={styles.btnText}>
              {formData.help_audio != '' ? newTranslation?.selected : newTranslation?.audioVideo}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={sendQuery}>
          <Text style={styles.subBtnText}>{newTranslation?.submit}</Text>
        </TouchableOpacity>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'white',
            width: '100%',
            marginTop: 20,
            padding: 20,
            // backgroundColor:"#035292",
          }}>
          <Text style={{color: '#000'}}>Need</Text>
          <Text
            onPress={() => props.navigation.navigate('Support')}
            style={{
              color: '#035292',
              marginHorizontal: 7,
              textDecorationLine: 'underline',
            }}>
            Support?
          </Text>
        </View> */}
      </ScrollView>

      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default Help;

const styles = StyleSheet.create({
  headingText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
  },
  blackText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 15,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  phoneNumberText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '600',
  },
  main: {
    padding: 15,
    backgroundColor: 'white',
    flex: 1,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#8598A7',
    marginVertical: 12,
    padding: 10,
    borderRadius: 5,
    color:"gray"
  },
  btn: {
    backgroundColor: '#F1F7FF',
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 11,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333333',
  },
  submitBtn: {
    backgroundColor: '#035292',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 5,
  },
  btnText: {
    fontWeight: '400',
    marginLeft: 10,
    color: '#333333',
  },
  subBtnText: {
    color: 'white',
    fontWeight: '500',
  },
});

// const styles = StyleSheet.create({
