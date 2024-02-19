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
  Share,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
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
import {getProfileStrength, getNotification} from '../services/user.service';
const VideoScreen = () => {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const {translation, globalState, setGlobalState} = useGlobalState();
  const getProfileStrengthFunc = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getProfileStrength(JSON.parse(user).access_token);
      if (
        response?.data.msg == 'Some fields are empty' ||
        response?.data.msg ==
          'Profile strength calculated successfully and updated in records'
      ) {
        setGlobalState({...globalState, profileStrength: response?.data});
      }
    } catch (error) {
      console.log('NEW', error);
    }
  };
  const [videoToBeDeleted, setvideoToBeDeleted] = useState('');
  const [workVideoToBeDeleted, setWorkVideoToBeDeleted] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [introActionValue, setIntroActionValue] = useState(null);
  const [workActionValue, setWorkActionValue] = useState(null);
  const [formData, setFormData] = useState({
    video: null,
    relatedSkill: 'unKnown',
  });
  const [introformData, setIntroFormData] = useState({
    video: null,
    videoLanguage: '',
  });
  const [showLoading, setShowLoading] = useState(false);
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
  const pickMediaForIntroVideo = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      });
      // Set the selected media URI
      console.log(result[0]);
      setIntroFormData({...introformData, video: result[0]});
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
  const [introVideoPopUp, setIntroVideoPopUp] = useState(false);
  const handleWorkVideoUpload = async () => {
    setShowLoading(true);
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
        setFormData({
          video: null,
          relatedSkill: 'unKnown',
        });
        getProfileStrengthFunc();
      }
    } catch (error) {
      console.warn('Something went wrong');
    }
    setShowLoading(false);
  };
  const handleIntroVideoUpload = async () => {
    setShowLoading(true);
    let user = await AsyncStorage.getItem('user');
    const videoFormData = new FormData();
    videoFormData.append('video', {
      uri: introformData.video.uri,
      type: introformData.video.type,
      name: introformData.video.name,
    });
    videoFormData.append('videoLanguage', introformData.videoLanguage);
    try {
      let response = await uploadIntroVideo(
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
        setIntroFormData({
          video: null,
          videoLanguage: '',
        });
        getUserIntroVideoList();
        setIntroVideoPopUp(false);
        getProfileStrengthFunc();
      }
    } catch (error) {
      console.warn('Something went wrong');
    }
    setShowLoading(false);
  };
  const [workVideoList, setWorkVideoList] = useState([]);
  const getUserWorkVideoList = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getWorkVideo(JSON.parse(user).access_token);
      setWorkVideoList(response?.data?.videos);
      getUserIntroVideoList();
    } catch (error) {}
  };
  const [introVideoList, setIntroVideoList] = useState([]);
  const [showIntroInput, setShowIntroInput] = useState([]);
  const getUserIntroVideoList = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getIntroVideo(JSON.parse(user).access_token);
      if (response?.data?.msg == 'List of all introduction videos.') {
        setIntroVideoList(response?.data?.videos);
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
    setShowLoading(true);
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
    setShowLoading(false);
  };
  const [languageKnown, setLanguageKnown] = useState([]);
  const setLanguageKnownFunc = async () => {
    let user = await AsyncStorage.getItem('user');
    let stringArr = JSON.parse(user)?.empData?.empLanguage;
    setLanguageKnown(JSON.parse(stringArr));
  };
  const handleDeleteIntroVideo = async videoId => {
    setShowLoading(true);
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
    setShowLoading(false);
  };
  const [showInroAction, setShowIntroAction] = useState(false);
  const [showWorkAction, setShowWorkAction] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      getUserWorkVideoList();
      getOccList();
      setLanguageKnownFunc();
      getUserIntroVideoList();
    }, []),
  );
  const onShare = async link => {
    try {
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const [videoPlayUrl, setVideoPlayUrl]=useState("")
  return (
    <>
      <View style={styles.main}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.title, {color: '#000'}]}>
            Introductry Videos
          </Text>
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
            <TouchableOpacity
              onPress={() => {
                setIntroVideoPopUp(true);
                setShowIntroInput(
                  languageKnown.filter(
                    itemA =>
                      !introVideoList?.some(
                        itemB => itemB?.videoLanguage == itemA,
                      ),
                  ),
                );
              }}>
              <View>
                <Image
                  source={require('../images/rectangle.png')}
                  style={{
                    height: 100,
                    width: 160,
                    borderRadius: 5,
                    marginRight: 10,
                    borderWidth: 1,
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
                Upload Intro Video
              </Text>
            </TouchableOpacity>

            {introVideoList?.map((v, i) => {
              return (
                <View key={i} style={{marginRight: 10}}>
                  <View style={{position: 'relative'}}>
                    {/* <Video
                      source={{
                        uri: v?.videoUrl,
                      }}
                      style={{
                        height: 100,
                        width: 160,
                        borderRadius: 5,
                        borderWidth: 1,
                      }}
                      controls={true}
                      paused={true}
                      resizeMode="cover"
                    /> */}
                    <Pressable onPress={()=>{setVideoPlayUrl(v?.videoUrl); setShowVideoPlayer(true)}}>
                      <Image
                        style={{
                          height: 100,
                          width: 160,
                          borderRadius: 5,
                          borderWidth: 1,
                          // resizeMode: 'contain',
                        }}
                        source={require('../images/introVideoThum.png')}
                      />
                    </Pressable>
                  </View>
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
                      onPress={() => {
                        setIntroActionValue(v), setShowIntroAction(true);
                      }}>
                      {/* <Image source={require('../images/delete.png')} /> */}
                      <Text
                        style={{
                          fontWeight: '900',
                          color: 'black',
                        }}>
                        ...
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View
          style={{
            marginTop: 20,
            paddingTop: 20,
            borderTopWidth: 1.5,
            borderColor: 'gray',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[styles.title, {color: '#000'}]}>Work Videos</Text>
            <Button
              title="Upload"
              color="#035292"
              onPress={() => setWorkVideoPopUp(true)}
            />
          </View>

          <View>
            {/* <TouchableOpacity onPress={() => setWorkVideoPopUp(true)}>
              <View style={{}}>
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
                <Text
                  style={{marginVertical: 5, width: 160, textAlign: 'center'}}>
                  Upload Work
                </Text>
              </View>
            </TouchableOpacity> */}
            <ScrollView style={{marginTop: 10, marginBottom: 250}}>
              {workVideoList?.map((v, i) => {
                return (
                  <View style={{width: '100%', marginBottom: 15}}>
                    {/* <Video
                      source={{
                        uri: v?.videoUrl,
                      }}
                      style={{
                        height: 200,
                        width: '100%',
                        borderRadius: 5,
                        marginRight: 10,
                        borderWidth: 1,
                      }}
                      controls={true}
                      resizeMode="cover"
                      paused={true}
                    /> */}
                    <Pressable onPress={()=>{setVideoPlayUrl(v?.videoUrl); setShowVideoPlayer(true)}}>
                      <Image
                        style={{
                          height: 200,
                        width: '100%',
                          borderRadius: 5,
                          borderWidth: 1,
                          resizeMode:"stretch",
                        }}
                        source={require('../images/introVideoThum.png')}
                      />
                    </Pressable>
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
                          setShowWorkAction(true);
                          setWorkActionValue(v);
                        }}>
                        <Text
                          style={{
                            fontWeight: '900',
                            color: 'black',
                            position: 'relative',
                            bottom: 3,
                            right: 2,
                          }}>
                          ...
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
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
      <Modal transparent={true} visible={introVideoPopUp} animationType="slide">
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
              <Text style={styles.nameText}>Upload Intro Video</Text>
              <Pressable onPress={() => setIntroVideoPopUp(false)}>
                <Image source={require('../images/close.png')} />
              </Pressable>
            </View>
            {showIntroInput.length > 0 ? (
              <View>
                <TouchableOpacity
                  style={styles.input}
                  onPress={pickMediaForIntroVideo}>
                  <Text>
                    {introformData.video == null
                      ? 'Choose Video File'
                      : introformData.video.name}
                  </Text>
                </TouchableOpacity>
                <View style={styles.picker}>
                  <Picker
                    selectedValue={introformData.videoLanguage}
                    onValueChange={(itemValue, itemIndex) => {
                      setIntroFormData({
                        ...introformData,
                        videoLanguage: itemValue,
                      });
                    }}>
                    <Picker.Item
                      label="Select Language"
                      value="Unknown"
                      style={{color: 'gray'}}
                    />
                    {showIntroInput?.map((v, i) => {
                      return (
                        <Picker.Item
                          label={v}
                          value={v}
                          style={{color: 'gray'}}
                        />
                      );
                    })}

                    {/* Add more Picker.Item as needed */}
                  </Picker>
                </View>
                <Button
                  title="Submit"
                  onPress={handleIntroVideoUpload}
                  color="#035292"
                />
              </View>
            ) : (
              <Text>
                You have already uploaded all the introduction video in
                different languages.
              </Text>
            )}
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
      <Modal transparent={true} visible={showInroAction} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={styles.modalMain}>
            <Pressable
              onPress={() => setShowIntroAction(false)}
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 18,
              }}>
              <Image source={require('../images/backIcon.png')} />
              <Text
                style={[{textDecorationLine: 'underline'}, styles.nameText]}>
                My intro video
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                onShare(introActionValue?.videoUrl);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                borderWidth: 1,
                borderColor: '#f0f7ff',
                backgroundColor: '#f0f7ff',
                borderRadius: 5,
                marginVertical: 4,
              }}>
              <Text style={{color: 'black', fontWeight: '600'}}>Share </Text>
              <Image source={require('../images/shareIcon.png')} />
            </Pressable>
            <Pressable
              onPress={() => {
                setvideoToBeDeleted(introActionValue?.id);
                setShowDeleteConfirmPop(true);
                setShowIntroAction(false);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                borderWidth: 1,
                borderColor: '#FFCCCC',
                backgroundColor: '#FFCCCC',
                borderRadius: 5,
                marginVertical: 4,
              }}>
              <Text style={{color: 'black', fontWeight: '600'}}>Delete</Text>
              <Image source={require('../images/delete.png')} />
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={showWorkAction} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={styles.modalMain}>
            <Pressable
              onPress={() => setShowWorkAction(false)}
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 18,
              }}>
              <Image source={require('../images/backIcon.png')} />
              <Text
                style={[{textDecorationLine: 'underline'}, styles.nameText]}>
                My work video
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                onShare(workActionValue?.videoUrl);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                borderWidth: 1,
                borderColor: '#f0f7ff',
                backgroundColor: '#f0f7ff',
                borderRadius: 5,
                marginVertical: 4,
              }}>
              <Text style={{color: 'black', fontWeight: '600'}}>Share</Text>
              <Image source={require('../images/shareIcon.png')} />
            </Pressable>
            <Pressable
              onPress={() => {
                setShowDeleteWorkVideoConfirmPop(true);
                setWorkVideoToBeDeleted(workActionValue?.id);
                setShowWorkAction(false);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                borderWidth: 1,
                borderColor: '#FFCCCC',
                backgroundColor: '#FFCCCC',
                borderRadius: 5,
                marginVertical: 4,
              }}>
              <Text style={{color: 'black', fontWeight: '600'}}>Delete</Text>
              <Image source={require('../images/delete.png')} />
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={showVideoPlayer}>
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            flex: 1,
            padding: 18,
          }}>
          <View style={{backgroundColor: 'white', padding: 18, width: 350}}>
            <Pressable
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onPress={() => setShowVideoPlayer(false)}>
              <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
                Video Player
              </Text>
              <Image source={require('../images/close.png')} />
            </Pressable>
            <Video
              style={{
                height: 300,
                width: '100%',
                marginVertical: 15,
              }}
              resizeMode="contain"
              controls={true}
              source={
                {
                  uri: videoPlayUrl
                }
              }></Video>
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
    backgroundColor: '#fff',
    flex: 1,
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
