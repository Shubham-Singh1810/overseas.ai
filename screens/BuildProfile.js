import {
  Button,
  Modal,
  Animated,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native';
import {useState, useEffect, useRef} from 'react';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
const BuildProfile = () => {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const pickMedia = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.video],
      });
      // Set the selected media URI
      setMediaUri(result.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('User cancelled media picker');
      } else {
        console.error('Error picking media', err);
      }
    }
  };
  return (
    <ScrollView style={styles.main}>
      <View>
        <View style={styles.profileNav}>
          <View>
            <Image source={require('../images/circle.png')} />
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-end',
              marginBottom: 10,
              marginLeft: 10,
            }}>
            <Text style={styles.nameText}>Shubham Singh</Text>
            <Text style={styles.nameText}>Heavy Developer</Text>
          </View>
        </View>
        <View style={{marginBottom: 5}}>
          <Text
            style={[
              styles.nameText,
              styles.fontWeight500,
              {marginTop: 16, marginBottom: -2},
            ]}>
            Profile Strength
          </Text>
          <View
            style={{
              width: '70%',
              flexDirection: 'row',
              marginBottom: 2,
              justifyContent: 'flex-end',
            }}>
            <Text style={[styles.nameText, {color: '#079E3F', fontSize: 12}]}>
              78%
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              backgroundColor: '#ADE9C4',
              height: 2,
            }}></View>
          <View
            style={{
              backgroundColor: '#13C756',
              borderRadius: 3,
              height: 6,
              width: '70%',
              position: 'relative',
              bottom: 4,
            }}></View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={[styles.nameText, styles.fontWeight500]}>
            Your Introduction Video
          </Text>
          <Image
            style={{height: 55, marginTop: 7, marginBottom: 5, width: 78}}
            source={require('../images/hraDummyIcon.png')}
          />
          <Text style={styles.messageText}>
            Upload your video in other languages too to increase your chance of
            getting noticed
          </Text>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <TouchableOpacity style={styles.btn} onPress={()=>setShowVideoModal(true)}>
              <Text style={styles.btnText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={[styles.nameText, styles.fontWeight500]}>
            Upload passport
          </Text>
          <Text style={[styles.messageText, {marginTop: 7, marginBottom: 15}]}>
            Upload passport to improve your profile by 30%. Recruiters will
            start noticing you.
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Upload Passport Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={[styles.nameText, styles.fontWeight500]}>
            Upload video of your skills
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 8,
              alignItems: 'center',
            }}>
            <Image
              style={{height: 55, width: 78}}
              source={require('../images/hraDummyIcon.png')}
            />
            <View
              style={{
                height: 35,
                marginLeft: 10,
                width: 35,
                backgroundColor: '#A6A6A6',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>+</Text>
            </View>
          </View>
          <Text style={styles.watchVideoLink}>Watch sample video</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>
                Get certificates for your skills
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal transparent={true} visible={showVideoModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0, 0, 0.5)',
          }}>
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: '#fff',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.nameText}>Upload Video</Text>
              <Pressable onPress={()=>setShowVideoModal(false)}>

              <Image source={require('../images/close.png')} />
              </Pressable>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TouchableOpacity onPress={pickMedia} style={{borderColor:"#035292", borderWidth:1, padding:10}}>
                <Text >Select File</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={styles.nameText}>Select Language</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 6,
                  marginTop: 10,
                  borderColor: '#8598A7',
                }}>
                <Picker
                  // selectedValue={userDeatils.empState}
                  onValueChange={(itemValue, itemIndex) => {}}>
                  <Picker.Item
                    label="English"
                    value="hello"
                    style={{color: 'gray'}}
                  />
                  <Picker.Item
                    label="Hindi"
                    value="hello"
                    style={{color: 'gray'}}
                  />
                  <Picker.Item
                    label="Bangla"
                    value="hello"
                    style={{color: 'gray'}}
                  />
                </Picker>
              </View>
              <View style={{marginTop: 15}}>
                <Button title="Submit" color="#035292"/>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default BuildProfile;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    padding: 15,
  },
  profileNav: {
    flexDirection: 'row',
  },
  nameText: {
    fontFamily: 'Noto Sans',
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  fontWeight500: {
    fontWeight: '500',
  },
  messageText: {
    fontFamily: 'Noto Sans',
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
  },
  btn: {
    backgroundColor: '#035292',
    paddingHorizontal: 14,
    paddingVertical: 8,
    elevation: 5,
  },
  btnText: {
    fontFamily: 'Noto Sans',
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
  },
  watchVideoLink: {
    fontFamily: 'Noto Sans',
    fontSize: 14,
    fontWeight: '400',
    color: '#1877F2',
    textDecorationLine: 'underline',
  },
});
