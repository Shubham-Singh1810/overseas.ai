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
import {useState, useRef} from 'react';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import {useGlobalState} from '../GlobalProvider';
const BuildProfile = props => {
  const {translation, globalState, setUserData, setGlobalState} =
    useGlobalState();
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
  const renderStar = () => {
    const strength = globalState?.profileStrength?.profileStrength;
    if (strength <= 20) {
      return <Image source={require('../images/starIcon.png')} />;
    } else if (strength > 20 && strength <= 40) {
      return (
        <>
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
        </>
      );
    } else if (strength > 40 && strength <= 60) {
      return (
        <>
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
        </>
      );
    } else if (strength > 60 && strength <= 80) {
      return (
        <>
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
        </>
      );
    } else {
      return (
        <>
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
          <Image source={require('../images/starIcon.png')} />
        </>
      );
    }
  };
  return (
    <ScrollView style={styles.main}>
      <View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 15,
              alignItems: 'center',
            }}>
            <View>
              <View>
                {JSON.parse(globalState?.user)?.empData?.empPhoto == null ? (
                  <Image
                    source={require('../images/dummyUserProfile.jpg')}
                    style={styles.myPic}
                  />
                ) : (
                  <Image
                    source={{
                      uri: JSON.parse(globalState?.user)?.empData?.empPhoto,
                    }}
                    style={styles.myPic}
                  />
                )}
              </View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Edit Profile')}>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    color: '#035292',
                    textAlign: 'center',
                    marginTop: 8,
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{marginLeft: 15}}>
              <Text style={styles.name}>
                {JSON.parse(globalState?.user)?.empData?.empName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: -6,
                  marginBottom: 3,
                }}>
                {renderStar()}
              </View>

              <Text style={[styles.welderText]}>
                {
                  JSON.parse(globalState?.user)?.empData?.empOccupationModel
                    ?.occupation
                }
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  //  marginTop:-10
                }}>
                <Image
                  source={require('../images/greenPhoneIcon.png')}
                  style={{marginRight: 5}}
                />
                <Text style={styles.welderText}>
                  {JSON.parse(globalState?.user)?.empData?.empPhone}
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginBottom: 5}}>
            <View
              style={{
                width: globalState?.profileStrength?.profileStrength + '%',
                flexDirection: 'row',
                marginBottom: 2,
                justifyContent: 'flex-end',
              }}>
              <Text
                style={[
                  styles.nameText,
                  {
                    color:
                      globalState?.profileStrength?.profileStrength < 30
                        ? '#dc3545'
                        : globalState?.profileStrength?.profileStrength > 70
                        ? '#079E3F'
                        : '#007BFF',
                    fontSize: 12,
                  },
                ]}>
                {globalState?.profileStrength?.profileStrength}%
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                backgroundColor: '#fff',
                borderWidth: 0.3,
                height: 5,
              }}></View>
            <View
              style={{
                backgroundColor:
                  globalState?.profileStrength?.profileStrength < 30
                    ? '#dc3545'
                    : globalState?.profileStrength?.profileStrength > 70
                    ? '#079E3F'
                    : '#007BFF',
                borderRadius: 3,
                height: 5,
                width: globalState?.profileStrength?.profileStrength + '%',
                position: 'relative',
                bottom: 5,
              }}></View>
            <Text
              style={[
                styles.nameText,
                styles.fontWeight500,
                {marginTop: 5, marginBottom: -5, fontSize: 12},
              ]}>
              Profile Strength
            </Text>
          </View>
        </View>
        {globalState.profileStrength?.emptyFields
          ?.filter((v, i) => !v.complete)
          .map((v, i) => {
            return (
              <Pressable style={styles.notificationBox}>
                <Text style={styles.notificationBoxText}>{v?.message}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'flex-end',
                  }}>
                  <Button
                    title="Upload"
                    color="#035292"
                    onPress={() => props.navigation.navigate(v.type)}
                  />
                </View>
              </Pressable>
            );
          })}
          
        {globalState.profileStrength?.emptyFields
          ?.filter((v, i) => v.complete)
          .map((v, i) => {
            return (
              <Pressable style={styles.notificationBox}>
                <Text style={styles.notificationBoxText}>{v?.message}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'flex-end',
                  }}>
                  <Pressable onPress={() => props.navigation.navigate(v.type)}>
                    <Text style={{color:"#000", fontWeight:"500",fontSize:12, textDecorationLine:"underline"}}>View</Text>
                  </Pressable>
                </View>
              </Pressable>
            );
          })}

        {/* <View style={{marginVertical: 10}}>
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
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setShowVideoModal(true)}>
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
        </View> */}
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
              <Pressable onPress={() => setShowVideoModal(false)}>
                <Image source={require('../images/close.png')} />
              </Pressable>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TouchableOpacity
                onPress={pickMedia}
                style={{borderColor: '#035292', borderWidth: 1, padding: 10}}>
                <Text>Select File</Text>
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
                <Button title="Submit" color="#035292" />
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
  myPic: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 22,
    fontWeight: '500',
    fontFamily: 'Nato Sans',
    color: '#000',
    marginBottom: 5,
  },
  welderText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
    color: '#000',
  },
  notificationBox: {
    // backgroundColor: '#dfeaf2',
    padding: 10,
    borderBottomWidth: 0.2,
    // elevation: 2,
    marginVertical: 15,
  },
  notificationBoxText: {
    color: '#000',
    fontWeight: '400',
    fontSize: 15,
    letterSpacing: 0.5,
    lineHeight: 19,
  },
});
