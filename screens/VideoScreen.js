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
import React, {useState} from 'react';
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
import {useAndroidBackHandler} from 'react-navigation-backhandler';
const VideoScreen = props => {
  useAndroidBackHandler(() => {
    if (props?.route?.params?.backTo) {
      props.navigation.navigate(props?.route?.params?.backTo);
      return true;
    } else {
      props.navigation.navigate('Home');
      return true;
    }
  });
  const [showLoadingForIntroLoading, setShowLoadingForIntroLoading] =
    useState(true);
  const [showLoadingForWorkLoading, setShowLoadingForWorkLoading] =
    useState(true);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const {translation, globalState,newTranslation, setGlobalState} = useGlobalState();
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
    relatedSkill: '',
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

    if (formData.relatedSkill && formData.video) {
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
            relatedSkill: '',
          });
          getProfileStrengthFunc();
        } else {
          Toast.show({
            type: 'error', // 'success', 'error', 'info', or any custom type you define
            // position: 'top',
            text1: 'Something went wrong',
            visibilityTime: 3000, // Duration in milliseconds
          });
          setWorkVideoPopUp(false);
        }
      } catch (error) {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          // position: 'top',
          text1: 'Internal server error',
          visibilityTime: 3000, // Duration in milliseconds
        });
        setWorkVideoPopUp(false);
      }
    } else {
      Toast.show({
        type: 'error', // 'success', 'error', 'info', or any custom type you define
        // position: 'top',
        text1: 'Both fields are required',
        visibilityTime: 3000, // Duration in milliseconds
      });
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
    if (introformData.video && introformData.videoLanguage) {
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
        } else {
          Toast.show({
            type: 'error', // 'success', 'error', 'info', or any custom type you define
            // position: 'top',
            text1: 'Something went wrong',
            visibilityTime: 3000, // Duration in milliseconds
          });
          setIntroVideoPopUp(false);
        }
      } catch (error) {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          // position: 'top',
          text1: 'Internal server error',
          visibilityTime: 3000, // Duration in milliseconds
        });
        setIntroVideoPopUp(false);
      }
    } else {
      Toast.show({
        type: 'error', // 'success', 'error', 'info', or any custom type you define
        // position: 'top',
        text1: 'Both fields are required',
        visibilityTime: 3000, // Duration in milliseconds
      });
    }
    setShowLoading(false);
  };
  const [workVideoList, setWorkVideoList] = useState([]);
  const getUserWorkVideoList = async () => {
    setShowLoadingForWorkLoading(true)
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getWorkVideo(JSON.parse(user).access_token);
      setWorkVideoList(response?.data?.videos);
      getUserIntroVideoList();
      setShowLoadingForWorkLoading(false)
    } catch (error) {}
    setShowLoadingForWorkLoading(false)
  };
  const [introVideoList, setIntroVideoList] = useState([]);
  const [showIntroInput, setShowIntroInput] = useState([]);
  const getUserIntroVideoList = async () => {
    setShowLoadingForIntroLoading(true);
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getIntroVideo(JSON.parse(user).access_token);
      if (response?.data?.msg == 'List of all introduction videos.') {
        setIntroVideoList(response?.data?.videos);
        setShowLoadingForIntroLoading(false);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        visibilityTime: 3000,
      });
    }
    setShowLoadingForIntroLoading(false);
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
        getProfileStrengthFunc();
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
        getProfileStrengthFunc();
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
  const [videoPlayUrl, setVideoPlayUrl] = useState('');
  return (
    <>
      <View style={styles.main}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.title, {color: '#000'}]}>
            {newTranslation?.introductoryVideo}
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
                {newTranslation?.uploadIntroVideo}
              </Text>
            </TouchableOpacity>

            {showLoadingForIntroLoading ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 100,
                  width: 160,
                }}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            ) : (
              introVideoList?.map((v, i) => {
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
                      <Pressable
                        onPress={() => {
                          setVideoPlayUrl(v?.videoUrl);
                          setShowVideoPlayer(true);
                        }}>
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
              })
            )}
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
            <Text style={[styles.title, {color: '#000'}]}>{newTranslation?.workVideo}</Text>
            <Button
              title={newTranslation?.upload}
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
              {showLoadingForWorkLoading?<View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                  width: '100%'
                }}>
                <ActivityIndicator size="small" color="#0000ff" />
              </View> : workVideoList?.map((v, i) => {
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
                    <Pressable
                      onPress={() => {
                        setVideoPlayUrl(v?.videoUrl);
                        setShowVideoPlayer(true);
                      }}>
                      <Image
                        style={{
                          height: 200,
                          width: '100%',
                          borderRadius: 5,
                          borderWidth: 1,
                          resizeMode: 'stretch',
                        }}
                        source={require('../images/workVideoThum.png')}
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
              <Text style={styles.nameText}>{newTranslation?.uploadWorkVideo}</Text>
              <Pressable onPress={() => setWorkVideoPopUp(false)}>
                <Image source={require('../images/close.png')} />
              </Pressable>
            </View>
            <TouchableOpacity
              style={styles.input}
              onPress={pickMediaForWorkVideo}>
              <Text>
                {formData.video == null
                  ? newTranslation?.chooseVideoFile
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
                  label={newTranslation?.selectSkill}
                  value=""
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
              title={newTranslation?.save}
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
              <Text style={styles.nameText}>{newTranslation?.uploadIntroVideo}</Text>
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
                      ? newTranslation?.chooseVideoFile
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
                      label={newTranslation?.selected}
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
                  title={newTranslation?.save}
                  onPress={handleIntroVideoUpload}
                  color="#035292"
                />
              </View>
            ) : (
              <View>
                <Text>
                  You have already uploaded all the introduction video in
                  different languages. {'\n'}
                </Text>
                <Text style={{fontWeight: '600', marginBottom: 10}}>
                  Edit Known language to add more intro video
                </Text>
                <Button
                  title="Edit Profile"
                  onPress={() => {
                    props.navigation.navigate('Edit Profile');
                  }}
                />
              </View>
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
                {newTranslation?.areYouSureWantToDeleteThisVideo}
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
                  title={newTranslation?.no}
                  onPress={() => {
                    setShowDeleteConfirmPop(false), setvideoToBeDeleted('');
                  }}
                  color="#dc3545"
                />
              </View>

              <View style={{width: '45%'}}>
                <Button
                  title={newTranslation?.yes}
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
               {newTranslation?.areYouSureWantToDeleteThisVideo}
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
                  title={newTranslation?.no}
                  onPress={() => {
                    setShowDeleteWorkVideoConfirmPop(false),
                      setWorkVideoToBeDeleted('');
                  }}
                  color="#dc3545"
                />
              </View>

              <View style={{width: '45%'}}>
                <Button
                  title={newTranslation?.yes}
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
                {newTranslation?.myWorkVideo}
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
              <Text style={{color: 'black', fontWeight: '600'}}>{newTranslation?.share} </Text>
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
              <Text style={{color: 'black', fontWeight: '600'}}>{newTranslation?.delete}</Text>
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
                {newTranslation?.myWorkVideo}
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
              <Text style={{color: 'black', fontWeight: '600'}}>{newTranslation?.share}</Text>
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
              <Text style={{color: 'black', fontWeight: '600'}}>{newTranslation?.delete}</Text>
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
              source={{
                uri: videoPlayUrl,
              }}></Video>
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
