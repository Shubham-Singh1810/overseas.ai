import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getJobByHra} from '../services/hra.service';
import WebView from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {getFollowerCount, handleFollow} from '../services/hra.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchResult from '../components/SearchResult';
import {useGlobalState} from '../GlobalProvider';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import {TextInput} from 'react-native-gesture-handler';
const DetailedHra = props => {
  useAndroidBackHandler(() => {
    props.navigation.navigate('Your HRA');
    return true;
  });
  const [params, setParams] = useState(
    props?.route.params.hraDetails || props?.route.params,
  );
  
  useFocusEffect(
    React.useCallback(() => {
      if (props?.route.params.hraDetails) {
        setParams(props?.route.params.hraDetails);
      } else {
        setParams(props?.route.params);
      }
    }, [props?.route]),
  );

  const {newTranslation} = useGlobalState();
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showClientName, setShowClientName] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [showFacebook, setShowFacebook] = useState(false);
  const [followDetails, setFollowDetails] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const getFollowCountFunc = async () => {
    let user = await AsyncStorage.getItem('user');
  
    try {
      let response = await getFollowerCount({
        access_token: JSON.parse(user).access_token,
        cmpId: params?.id,
      });
      if (response?.status == 200) {
        setFollowDetails(response?.data);
      } else {
        console.warn('something went wrong');
      }
    } catch (error) {
      console.warn('something went wrong');
    }
  };
  const followFunc = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await handleFollow({
        access_token: JSON.parse(user).access_token,
        cmpId: params?.id,
      });
      if (response.status == 200) {
        Toast.show({
          type: 'info',
          position: 'top',
          text1: response?.data?.message,
          visibilityTime: 3000,
        });
        getFollowCountFunc();
      } else {
        console.warn('Something went wrong');
      }
    } catch (error) {
      console.warn('Something went wrong');
    }
  };
  const [hraJobList, setHraJobList] = useState([]);
  const getJobByHraFunc = async id => {
    setShowLoader(true);
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getJobByHra({
        access_token: JSON.parse(user).access_token,
        cmpID: id,
      });
      if (response?.status == 200) {
        setHraJobList(response?.data?.jobs);
        setShowLoader(false);
      } else {
        console.warn('something went wrong');
      }
    } catch (error) {
      console.warn('something went wrong');
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getFollowCountFunc();
      getJobByHraFunc();
    }, []),
  );
  useFocusEffect(
    React.useCallback(() => {
      getJobByHraFunc(params?.id);
    }, [params?.id]),
  );
  const renderStars = numRatings => {
    const stars = [];
    for (let i = 0; i < numRatings; i++) {
      stars.push(
        <Image
          key={i}
          source={require('../images/starIcon.png')}
          style={{width: 20, height: 20, resizeMode: 'contain'}}
        />,
      );
    }
    return stars;
  };
  
  
  return (
    <>
      <View style={styles.main}>
        <View style={styles.flex}>
          <Pressable onPress={() => props.navigation.navigate('Hra review',{detailedHra:params})}>
            {params?.cmpLogoS3 != 'placeholder/logo.png' ? (
              <Image
                source={{
                  uri: params?.cmpLogoS3,
                }}
                style={{
                  height: 110,
                  width: 110,
                  borderRadius: 55,
                  resizeMode: 'contain',
                  marginRight: 15,
                  borderWidth: 0.5,
                  borderColor: 'gray',
                }}
              />
            ) : (
              <Image
                source={require('../images/hraDummyIcon.png')}
                style={{
                  height: 110,
                  width: 110,
                  borderRadius: 55,
                  resizeMode: 'contain',
                  marginRight: 15,
                  borderWidth: 0.5,
                  borderColor: 'gray',
                }}
              />
            )}
            <View style={{marginVertical: 2, marginRight: 15}}>
              <Text
                style={{
                  color: 'black',
                  textDecorationLine: 'underline',
                  fontSize: 12,
                  fontWeight: '500',
                  textAlign: 'center',
                }}>
               Rate & Review
              </Text>
            </View>
          </Pressable>

          <View>
            <View style={[styles.flex, {alignItems: 'center'}]}>
              <Text style={[styles.hraName, {width:"80%"}]}>{params?.cmpName}</Text>
            </View>
            <View style={[styles.flex, {marginLeft: 0, alignItems: 'center'}]}>
              {renderStars(params?.cmpRating)}
            </View>

            <View style={[styles.flex, {alignItems: 'center'}]}>
              <Text style={styles.hraName}>
                {followDetails?.totalFollowers}
              </Text>
              <Text style={styles.countryName}>
                {newTranslation?.followers}
              </Text>
            </View>
            <Text style={styles.countryName}>{params?.state_name?.name}</Text>
            <View style={[styles.flex, {alignItems: 'center'}]}>
              <Text style={styles.lightText}>
                {newTranslation?.since} {params?.cmpWorkingFrom}
              </Text>
            </View>

            <View style={[styles.flex]}>
              {params?.cmpWebsiteLink && (
                <Pressable onPress={() => setShowWebsite(true)}>
                  <Image
                    source={require('../images/globleIcon.png')}
                    style={{marginRight: 5}}
                  />
                </Pressable>
              )}
              {params?.cmpFBLink && (
                <Pressable onPress={() => setShowFacebook(true)}>
                  <Image source={require('../images/facebookLogo.png')} />
                </Pressable>
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            followDetails?.followStatus
              ? {
                  backgroundColor: '#F1F7FF',
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: '#035292',
                }
              : {color: '#035292'},
          ]}
          onPress={() => followFunc()}>
          <Text
            style={[
              !followDetails?.followStatus
                ? styles.buttonText
                : {color: '#035292'},
            ]}>
            {followDetails?.followStatus
              ? newTranslation?.unfollow
              : newTranslation?.follow}
          </Text>
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.otherDetailsContainer}>
            <View style={[styles.tableItemPadding, styles.borderBottom]}>
              <Text style={[styles.tableText]}>
                {newTranslation?.countryPresence} :
              </Text>
              <View style={[styles.flex, {marginTop: 5}]}>
                {params?.cmpWorkingCountryNames?.map((v, i) => {
                  return (
                    <Text
                      style={[
                        styles.tableText,
                        {
                          marginRight: 6,
                          paddingHorizontal: 4,
                          paddingVertical: 2,
                          elevation: 2,
                          backgroundColor: '#fff',
                          borderRadius: 4,
                        },
                      ]}>
                      {v}
                    </Text>
                  );
                })}
              </View>
            </View>

            <Pressable
              onPress={() => setShowJobDetails(!showJobDetails)}
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={styles.tableText}>
                {newTranslation?.industriesServed}
              </Text>
              <View>
                <Image
                  source={
                    !showJobDetails
                      ? require('../images/downArrow.png')
                      : require('../images/upArrow.png')
                  }
                />
              </View>
            </Pressable>
            {showJobDetails &&
              params.cmpWorkingDepartmentNames.map((v, i) => {
                return (
                  <View
                    style={[
                      styles.tableItemPadding,
                      styles.borderBottom,
                      {backgroundColor: '#fff'},
                    ]}>
                    <Text style={styles.tableText}>{v}</Text>
                  </View>
                );
              })}

            <View
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={[styles.tableText, {width: 280}]}>
                {newTranslation?.numberOfAverageCandidatesPlacedYearly}
              </Text>
              <Text style={[styles.tableText]}>
                {params?.cmpYearlyPlacement}
              </Text>
            </View>
            <Pressable
              onPress={() => setShowClientName(!showClientName)}
              style={[
                styles.flex,
                styles.tableItemPadding,
                styles.borderBottom,
                {justifyContent: 'space-between'},
              ]}>
              <Text style={styles.tableText}>
                {newTranslation?.listOfClientsOfTheHra}
              </Text>
              <View>
                <Image
                  source={
                    !showClientName
                      ? require('../images/downArrow.png')
                      : require('../images/upArrow.png')
                  }
                />
              </View>
            </Pressable>
            {showClientName &&
              JSON.parse(params?.clientName)?.map((v, i) => {
                return (
                  <View
                    style={[
                      styles.tableItemPadding,
                      styles.borderBottom,
                      {backgroundColor: '#fff'},
                    ]}>
                    <Text style={styles.tableText}>{v}</Text>
                  </View>
                );
              })}
          </View>
          {showLoader ? (
            <View
              style={{
                height: 350,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <View>
              <View style={{marginVertical: 30}}>
                <Text style={[styles.hraName]}>
                  {newTranslation?.jobsPostedByHra}{' '}
                  <Text>{!showLoader && hraJobList?.length}</Text>
                </Text>
              </View>
              <View style={{paddingBottom: 200}}>
                {hraJobList?.map((v, i) => {
                  return (
                    <SearchResult
                      backTo="DetailedHra"
                      hraDetails={params}
                      value={v}
                      props={props}
                    />
                  );
                })}
              </View>
            </View>
          )}
        </ScrollView>
        <Modal transparent={false} visible={showWebsite} animationType="slide">
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <Pressable
              style={{
                backgroundColor: 'white',
                padding: 18,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => setShowWebsite(false)}>
              <Image source={require('../images/backIcon.png')} />
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: '#035292',
                  fontWeight: '700',
                }}>
                Back
              </Text>
            </Pressable>
            <WebView source={{uri: params?.cmpWebsiteLink}} style={{flex: 1}} />
          </View>
        </Modal>
        <Modal transparent={false} visible={showFacebook} animationType="slide">
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <Pressable
              style={{
                backgroundColor: 'white',
                padding: 18,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => setShowFacebook(false)}>
              <Image source={require('../images/backIcon.png')} />
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: '#035292',
                  fontWeight: '700',
                }}>
                Back
              </Text>
            </Pressable>
            <WebView source={{uri: params?.cmpFBLink}} style={{flex: 1}} />
          </View>
        </Modal>
        
      </View>
      <Toast ref={ref => Toast.setRef(ref)} />
    </>
  );
};

export default DetailedHra;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  flex: {
    flexDirection: 'row',
  },
  hraName: {
    fontSize: 16,
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    color: '#000',
    marginRight: 3,
    // width:"80%"
  },
  countryName: {
    fontSize: 12,
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    color: '#000',
  },
  lightText: {
    fontSize: 10,
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    color: '#6F6F6F',
  },
  button: {
    backgroundColor: '#035292',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
  },
  otherDetailsContainer: {
    backgroundColor: '#F1F7FF',
    paddingVertical: 10,
  },
  tableItemPadding: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#A6A6A6',
  },
  tableText: {
    fontSize: 14,
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    color: '#000',
  },
  clientLink: {
    fontSize: 16,
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    color: '#1877F2',
    textDecorationLine: 'underline',
  },
});
