import {
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useEffect, useState} from 'react';
import Video from 'react-native-video';
import {getOccupations} from '../services/info.service';
import DocumentPicker from 'react-native-document-picker';
import {useGlobalState} from '../GlobalProvider';
import {uploadWorkVideo} from '../services/user.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import {
  getWorkVideo,
  getIntroVideo,
  deleteWorkVideo,
  uploadIntroVideo,
  deleteIntroVideo,
} from '../services/userVideo.service';
const VideoScreen = () => {
  const [videoToBeDeleted, setvideoToBeDeleted] = useState('');
  const [workVideoToBeDeleted, setWorkVideoToBeDeleted] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    video: null,
    relatedSkill: 'abc',
  });
  const [showLoading, setShowLoading] = useState(false)
  const [showDeleteConfirmPop, setShowDeleteConfirmPop] = useState(false);
  const pickMediaForWorkVideo = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      // Set the selected media URI
      console.log(result[0]);
      setFormData({...formData, video: result[0]});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('User cancelled media picker');
      } else {
        console.error('Error picking media', err);
      }
    }
  };
  const [workVideoPopUp, setWorkVideoPopUp] = useState(false);
  const handleWorkVideoUpload = async () => {
    setShowLoading(true)
    let user = await AsyncStorage.getItem('user');
    const videoFormData = new FormData();
    videoFormData.append('video', {
      uri: formData.video.uri,
      type: formData.video.type,
      name: formData.video.name,
    });
    videoFormData.append('relatedSkill', formData.relatedSkill);
    try {
      let response = await uploadWorkVideo(
        videoFormData,
        JSON.parse(user).access_token,
      );
      if (response?.data?.msg == 'Video Added Successfully.') {
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          // position: 'top',
          text1: 'Video Added Successfully.',
          visibilityTime: 3000, // Duration in milliseconds
        });
        setWorkVideoPopUp(false);
        getUserWorkVideoList();
      }
    } catch (error) {
      console.warn('Something went wrong');
    }
    setShowLoading(false)
  };
  const [workVideoList, setWorkVideoList] = useState([]);
  const getUserWorkVideoList = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getWorkVideo(JSON.parse(user).access_token);
      setWorkVideoList(response?.data?.videos);
      getUserIntroVideoList()
    } catch (error) {}
  };
  const [introVideoList, setIntroVideoList] = useState([]);
  const [showIntroInput, setShowIntroInput] = useState([]);
  const getUserIntroVideoList = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getIntroVideo(JSON.parse(user).access_token);
      if(response?.data?.msg=="List of all introduction videos."){
        setIntroVideoList(response?.data?.videos);
        setShowIntroInput(
          languageKnown.filter(
            itemA =>
              !response?.data?.videos.some(itemB => itemB.videoLanguage == itemA),
          ),
        );
      }
      
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        visibilityTime: 3000,
      });
    }
  };
  const [occuListArr, setOccuListArr] = useState([]);
  const [showDeleteWorkVideoConfirmPop, setShowDeleteWorkVideoConfirmPop] =
    useState(false);
  const getOccList = async () => {
    try {
      let response = await getOccupations();
      setOccuListArr(response?.occupation);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteVideo = async videoId => {
    setShowLoading(true)
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await deleteWorkVideo(
        videoId,
        JSON.parse(user).access_token,
      );
      if (response?.data?.msg == 'Video successfully deleted.') {
        setShowDeleteWorkVideoConfirmPop(false);
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          // position: 'top',
          text1: 'Video Deleted Successfully.',
          visibilityTime: 3000, // Duration in milliseconds
        });
        getUserWorkVideoList();
      }
    } catch (error) {
      console.warn('Something went wrong');
    }
    setShowLoading(false)
  };
  const [languageKnown, setLanguageKnown] = useState([]);
  const setLanguageKnownFunc = async () => {
    let user = await AsyncStorage.getItem('user');
    let stringArr = JSON.parse(user)?.empData?.empLanguage;
    setLanguageKnown(JSON.parse(stringArr));
  };
  const handleDeleteIntroVideo = async videoId => {
    setShowLoading(true)
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await deleteIntroVideo(
        videoId,
        JSON.parse(user).access_token,
      );
      if (response?.data?.msg == 'Video successfully deleted.') {
        getUserIntroVideoList();
        setShowDeleteConfirmPop(false);
        setvideoToBeDeleted('');
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          // position: 'top',
          text1: 'Video Deleted Successfully.',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    } catch (error) {
      console.warn('Something went wrong');
    }
    setShowLoading(false)
  };
  const pickMediaForIntroVideo = async language => {
    setShowLoading(true)
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      let user = await AsyncStorage.getItem('user');
      const videoFormData = new FormData();
      videoFormData.append('video', {
        uri: result[0].uri,
        type: result[0].type,
        name: result[0].name,
      });
      videoFormData.append('videoLanguage', language);
      let response = await uploadIntroVideo(
        videoFormData,
        JSON.parse(user).access_token,
      );
      if (response?.data?.msg == 'Video Added Successfully.') {
        getUserIntroVideoList();
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          // position: 'top',
          text1: 'Video Added Successfully.',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('User cancelled media picker');
      } else {
        console.error('Error picking media', err);
      }
    }
    setShowLoading(false)
  };
  useEffect(() => {
    getUserWorkVideoList();
    getOccList();
    setLanguageKnownFunc();
    getUserIntroVideoList()
  }, []);
  
  return (
    <>
      <View style={styles.main}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>Introductry Videos</Text>
          <Pressable
            onPress={() => setShowModal(true)}
            style={{
              backgroundColor: '#035292',
              padding: 8,
              elevation: 10,
              borderRadius: 3,
            }}>
            <Text style={{color: 'white', fontWeight: '500'}}>
              Video Tutorial
            </Text>
          </Pressable>
        </View>

        <View>
          <ScrollView horizontal={true} style={{marginTop: 10}}>
            {showIntroInput?.map((v, i) => {
              return (
                <TouchableOpacity onPress={() => pickMediaForIntroVideo(v)}>
                  <View>
                    <Image
                      source={require('../images/rectangle.png')}
                      style={{
                        height: 100,
                        width: 160,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                    />
                    <View
                      style={{
                        position: 'absolute',
                        top: 40,
                        left: 70,
                        padding: 6,
                        backgroundColor: 'white',
                        borderRadius: 11,
                      }}>
                      <Image
                        source={require('../images/playVideoIcon.png')}
                        style={{height: 10, width: 10}}
                      />
                    </View>
                    <Text style={{textAlign: 'center'}}>Upload in {v}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
            {introVideoList?.map((v, i) => {
              return (
                <>
                  <View style={{display: 'flex'}}>
                    <Video
                      source={{
                        uri: v?.videoUrl,
                      }}
                      style={{
                        height: 100,
                        width: 160,
                        borderRadius: 5,
                        marginRight: 10,
                        borderWidth: 1,
                      }}
                      controls={true}
                      resizeMode="cover"
                    />
                    {/* <Image
                      source={require('../images/rectangle.png')}
                      style={{
                        height: 100,
                        width: 160,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                    /> */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingRight: 5,
                        marginVertical: 5,
                      }}>
                      <Text style={{color: '#000'}}>{v?.videoLanguage}</Text>
                      <TouchableOpacity
                        style={{position: 'relative', right: 5}}
                        onPress={() => {
                          setvideoToBeDeleted(v?.id);
                          setShowDeleteConfirmPop(true);
                        }}>
                        <Image source={require('../images/delete.png')} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              );
            })}
          </ScrollView>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.title}>Work Videos</Text>
          <View>
            <ScrollView horizontal={true} style={{marginTop: 10}}>
              <TouchableOpacity onPress={() => setWorkVideoPopUp(true)}>
                <View>
                  <Image
                    source={require('../images/rectangle.png')}
                    style={{
                      height: 100,
                      width: 160,
                      borderRadius: 5,
                      marginRight: 10,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 40,
                      left: 70,
                      padding: 6,
                      backgroundColor: 'white',
                      borderRadius: 11,
                    }}>
                    <Image
                      source={require('../images/playVideoIcon.png')}
                      style={{height: 10, width: 10}}
                    />
                  </View>
                </View>
                <Text style={{textAlign: 'center', marginVertical: 5}}>
                  Upload Work
                </Text>
              </TouchableOpacity>
              {workVideoList?.map((v, i) => {
                return (
                  <>
                    <View style={{display: 'flex'}}>
                      <Video
                        source={{
                          uri: v?.videoUrl,
                        }}
                        style={{
                          height: 100,
                          width: 160,
                          borderRadius: 5,
                          marginRight: 10,
                          borderWidth: 1,
                        }}
                        controls={true}
                        resizeMode="cover"
                      />
                      {/* <Image
                        source={require('../images/rectangle.png')}
                        style={{
                          height: 100,
                          width: 160,
                          borderRadius: 5,
                          marginRight: 10,
                        }}
                      /> */}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingRight: 5,
                          marginVertical: 5,
                        }}>
                        <Text style={{color: '#000'}}>
                          {v?.relatedSkill.length > 15 ? (
                            <>{v?.relatedSkill?.substring(0, 15)}...</>
                          ) : (
                            v?.relatedSkill
                          )}
                        </Text>
                        <TouchableOpacity
                          style={{position: 'relative', right: 5}}
                          onPress={() => {
                            setShowDeleteWorkVideoConfirmPop(true);
                            setWorkVideoToBeDeleted(v?.id);
                          }}>
                          <Image source={require('../images/delete.png')} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                );
              })}
            </ScrollView>
          </View>
        </View>
        <Modal transparent={true} visible={showModal} animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View style={styles.main}>
              <View>
                <Text style={styles.languagetext}>
                  This video tutorial guides you through the process of
                  utilizing this specific section.
                </Text>
              </View>
              <View style={{marginVertical: 10}}>
                <Image
                  source={require('../images/hraDummyIcon.png')}
                  style={{height: 180, width: 300}}
                />
              </View>
              <View
                style={{
                  width: 300,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <Button title="Close" onPress={() => setShowModal(false)} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <Modal transparent={true} visible={workVideoPopUp} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={styles.modalMain}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 18,
              }}>
              <Text style={styles.nameText}>Upload Work Video</Text>
              <Pressable onPress={() => setWorkVideoPopUp(false)}>
                <Image source={require('../images/close.png')} />
              </Pressable>
            </View>
            <TouchableOpacity
              style={styles.input}
              onPress={pickMediaForWorkVideo}>
              <Text>
                {formData.video == null
                  ? 'Choose Video File'
                  : formData.video.name}
              </Text>
            </TouchableOpacity>
            <View style={styles.picker}>
              <Picker
                selectedValue={formData.relatedSkill}
                onValueChange={(itemValue, itemIndex) => {
                  setFormData({...formData, relatedSkill: itemValue});
                }}>
                <Picker.Item
                  label="Select Skill"
                  value="Unknown"
                  style={{color: 'gray'}}
                />
                {occuListArr?.map((v, i) => {
                  return (
                    <Picker.Item
                      label={v.occupation}
                      value={v.occupation}
                      style={{color: 'gray'}}
                    />
                  );
                })}

                {/* Add more Picker.Item as needed */}
              </Picker>
            </View>
            <Button
              title="Submit"
              onPress={handleWorkVideoUpload}
              color="#035292"
            />
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={showLoading} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={showDeleteConfirmPop}
        animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={styles.modalMain}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 18,
              }}>
              <Text style={styles.nameText}>
                Are you sure you want to delete this video ?
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '45%'}}>
                <Button
                  title="No"
                  onPress={() => {
                    setShowDeleteConfirmPop(false), setvideoToBeDeleted('');
                  }}
                  color="#dc3545"
                />
              </View>

              <View style={{width: '45%'}}>
                <Button
                  title="Yes"
                  // onPress={handleDeleteIntroVideo(videoToBeDeleted)}
                  onPress={() => handleDeleteIntroVideo(videoToBeDeleted)}
                  color="#28a745"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={showDeleteWorkVideoConfirmPop}
        animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={styles.modalMain}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 18,
              }}>
              <Text style={styles.nameText}>
                Are you sure you want to delete this video ?
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-between',
              }}>
              <View style={{width: '45%'}}>
                <Button
                  title="No"
                  onPress={() => {
                    setShowDeleteWorkVideoConfirmPop(false),
                      setWorkVideoToBeDeleted('');
                  }}
                  color="#dc3545"
                />
              </View>

              <View style={{width: '45%'}}>
                <Button
                  title="Yes"
                  // onPress={handleDeleteIntroVideo(videoToBeDeleted)}
                  onPress={() => handleDeleteVideo(workVideoToBeDeleted)}
                  color="#28a745"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  main: {
    padding: 15,
  },
  title: {
    fontFamily: 'Noto Sans',
    fontSize: 20,
    fontWeight: '500',
  },
  modalMain: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    width: 350,
    borderColor: '#CCC',
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    width: '100%',
    marginBottom: 18,
    backgroundColor: 'white',
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 18,
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  nameText: {
    fontFamily: 'Noto Sans',
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});
