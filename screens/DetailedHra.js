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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getJobByHra} from '../services/hra.service';
import WebView from 'react-native-webview';
import {useFocusEffect} from '@react-navigation/native';
import {
  getFollowerCount,
  handleFollow,
  getHraList,
} from '../services/hra.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchResult from '../components/SearchResult';
const DetailedHra = props => {
  const {params} = props.route;
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showClientName, setShowClientName] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [showFacebook, setShowFacebook] = useState(false);
  const [followDetails, setFollowDetails] = useState(null);
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
        getFollowCountFunc();
      } else {
        console.warn('Something went wrong');
      }
    } catch (error) {
      console.warn('Something went wrong');
    }
  };
  const [hraJobList, setHraJobList] = useState([]);
  const getJobByHraFunc = async cmpID => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getJobByHra({
        access_token: JSON.parse(user).access_token,
        cmpID: params?.id,
      });
      if (response?.status == 200) {
        setHraJobList(response?.data?.jobs);
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
      getJobByHraFunc(params?.cmpId);
    }, []),
  );
  const renderStars = numRatings => {
    const stars = [];
    for (let i = 0; i < numRatings; i++) {
      stars.push(
        <Image
          key={i}
          source={require('../images/starIcon.png')} // You might need to adjust the source based on your project structure
          style={{width: 20, height: 20, resizeMode: 'contain'}}
        />,
      );
    }
    return stars;
  };
  return (
    <View style={styles.main}>
      <View style={styles.flex}>
        {params?.cmpLogoS3 != 'placeholder/logo.png' ? (
          <Image
            source={{
              uri: params?.cmpLogoS3,
            }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
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
              height: 100,
              width: 100,
              borderRadius: 50,
              resizeMode: 'contain',
              marginRight: 15,
              borderWidth: 0.5,
              borderColor: 'gray',
            }}
          />
        )}

        <View>
          <View style={[styles.flex, {alignItems: 'center'}]}>
            <Text style={styles.hraName}>{params?.cmpName}</Text>
          </View>

          <View style={[styles.flex, {alignItems: 'center'}]}>
            <Text style={styles.hraName}>{followDetails?.totalFollowers}</Text>
            <Text style={styles.countryName}>followers</Text>
          </View>
          <Text style={styles.countryName}>{params?.state_name?.name}</Text>
          <View style={[styles.flex, {alignItems: 'center'}]}>
            <Text style={styles.lightText}>Since {params?.cmpWorkingFrom}</Text>
            <View style={[styles.flex, {marginLeft: 5}]}>
              {renderStars(params?.cmpRating)}
            </View>
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
          {followDetails?.followStatus ? 'Unfollow' : 'Follow'}
        </Text>
      </TouchableOpacity>

      {/* <Text style={[{marginTop: 20}, styles.clientLink]}>
        List of Clients of the HRA
      </Text> */}

      <ScrollView>
        <View style={styles.otherDetailsContainer}>
          <View style={[styles.tableItemPadding, styles.borderBottom]}>
            <Text style={[styles.tableText]}>Country Presence :</Text>
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

          <View
            style={[
              styles.flex,
              styles.tableItemPadding,
              styles.borderBottom,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={styles.tableText}>Industries Served</Text>
            <TouchableOpacity
              onPress={() => setShowJobDetails(!showJobDetails)}>
              <Image
                source={
                  !showJobDetails
                    ? require('../images/downArrow.png')
                    : require('../images/upArrow.png')
                }
              />
            </TouchableOpacity>
          </View>
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
            <Text style={[styles.tableText]}>
              No. of average candidates {'\n'}placed yearly
            </Text>
            <Text style={[styles.tableText]}>{params?.cmpYearlyPlacement}</Text>
          </View>

          {/* <View
          style={[
            styles.flex,
            styles.tableItemPadding,
            styles.borderBottom,
            {justifyContent: 'space-between'},
          ]}>
          <Text style={[styles.tableText]}>
            Average salary for different job title
          </Text>
          <Text style={[styles.tableText]}>Rs. 10,000</Text>
        </View> */}
          <View
            style={[
              styles.flex,
              styles.tableItemPadding,
              styles.borderBottom,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={styles.tableText}>List of Clients of the HRA</Text>
            <TouchableOpacity
              onPress={() => setShowClientName(!showClientName)}>
              <Image
                source={
                  !showJobDetails
                    ? require('../images/downArrow.png')
                    : require('../images/upArrow.png')
                }
              />
            </TouchableOpacity>
          </View>
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
          {/* <View
          style={[
            styles.flex,
            styles.tableItemPadding,
            styles.borderBottom,
            {justifyContent: 'space-between'},
          ]}>
          <Text style={[styles.tableText]}>Average service charge</Text>
          <Text style={[styles.tableText]}>Rs. 10,000</Text>
        </View>
        <View
          style={[
            styles.flex,
            styles.tableItemPadding,
            {justifyContent: 'space-between'},
          ]}>
          <Text style={[styles.tableText]}>Percentage of free job</Text>
          <Text style={[styles.tableText]}>60%</Text>
        </View> */}
        </View>
        <View style={{marginVertical: 30}}>
          <Text style={[styles.hraName]}>
            Jobs posted by HRA : <Text>{hraJobList?.length}</Text>
          </Text>
        </View>

        {hraJobList?.map((v, i) => {
          return <SearchResult value={v} />;
        })}
      </ScrollView>

      {/* <View>
        <Text style={[styles.hraName, {marginBottom: 8}]}>Rate HRA</Text>
        <View style={styles.flex}>
          <Image
            source={require('../images/whiteStar.png')}
            style={{marginRight: 3}}
          />
          <Image
            source={require('../images/whiteStar.png')}
            style={{marginRight: 3}}
          />
          <Image
            source={require('../images/whiteStar.png')}
            style={{marginRight: 3}}
          />
          <Image
            source={require('../images/whiteStar.png')}
            style={{marginRight: 3}}
          />
          <Image
            source={require('../images/whiteStar.png')}
            style={{marginRight: 3}}
          />
        </View>
      </View> */}
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
