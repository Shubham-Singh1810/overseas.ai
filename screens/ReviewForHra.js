import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TextInput,
  Pressable,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {getReviewOfHra, addReviewForHra, editReviewForHra} from '../services/hra.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import Toast from 'react-native-toast-message';
import {useGlobalState} from '../GlobalProvider';
const ReviewForHra = props => {
  useAndroidBackHandler(() => {
    props.navigation.navigate(
      'DetailedHra',
      (detailedHra = props?.route.params.detailedHra),
    );
    return true;
  });
  const [showRatingPop, setShowRattingPop] = useState(false);
  const [showEditRatingPop, setShowEditRattingPop] =useState(false)
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
  const {translation, newTranslation, globalState, setGlobalState} =
    useGlobalState();
  const renderAverageStars = numRatings => {
    let colorStar = parseInt(numRatings);
    let blankStar = 5 - Math.ceil(numRatings);
    const stars = [];
    let num = parseFloat(numRatings); // Convert string to a floating-point number
    let decimalPart = num - Math.floor(num);

    for (let i = 0; i < colorStar; i++) {
      stars.push(
        <Image
          key={i}
          source={require('../images/fullstar.png')}
          style={{width: 45, height: 45, resizeMode: 'contain'}}
        />,
      );
    }
    if (decimalPart > 0 && decimalPart < 0.33) {
      stars.push(
        <Image
          key={0}
          source={require('../images/quaterstar.png')}
          style={{width: 45, height: 45, resizeMode: 'contain'}}
        />,
      );
    }
    if (decimalPart >= 0.33 && decimalPart < 0.66) {
      stars.push(
        <Image
          key={90}
          source={require('../images/halfstar.png')}
          style={{width: 45, height: 45, resizeMode: 'contain'}}
        />,
      );
    }
    if (decimalPart >= 0.66) {
      stars.push(
        <Image
          key="s"
          source={require('../images/secondquaterstar.png')}
          style={{width: 45, height: 45, resizeMode: 'contain'}}
        />,
      );
    }

    for (let i = 0; i < blankStar; i++) {
      stars.push(
        <Image
          key={i}
          source={require('../images/emptystar.png')}
          style={{width: 45, height: 45, resizeMode: 'contain'}}
        />,
      );
    }
    return stars;
  };
  const handleReviewSubmit = async () => {
    let user = await AsyncStorage.getItem('user');
    if (userratting == 0) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Please add rating',
        visibilityTime: 3000,
      });
      return;
    }
    try {
      let response = await addReviewForHra(
        {
          cmpId: props?.route?.params?.detailedHra?.id,
          rating: userratting,
          review: userReview,
        },
        JSON.parse(user).access_token,
      );
      if (response?.data) {
        setShowRattingPop(false);
        setRatting(0);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Rating review added successfully.',
          visibilityTime: 3000,
        });
        getReviewOFHra(props?.route?.params?.detailedHra?.id);
      }
    } catch (error) {
      setShowRattingPop(false);
      setRatting(0);
      Toast.show({
        type: 'info',
        position: 'top',
        text1: error.response.data.msg,
        visibilityTime: 3000,
      });
    }
  };
  const [editReviewId, setEditReviewId]=useState('')
  const handleReviewUpdate = async () => {
    let user = await AsyncStorage.getItem('user');
    if (userratting == 0) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Please add rating',
        visibilityTime: 3000,
      });
      return;
    }
    try {
      let response = await editReviewForHra(
        {
          // cmpId: props?.route?.params?.detailedHra?.id,
          rating: userratting,
          review: userReview,
          id:editReviewId
        },
        JSON.parse(user).access_token,
      );
      if (response?.data) {
        setShowEditRattingPop(false)
        // RattingPop(false);
        setRatting(0);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Rating review updated successfully.',
          visibilityTime: 3000,
        });
        getReviewOFHra(props?.route?.params?.detailedHra?.id);
      }
    } catch (error) {
      setShowEditRattingPop(false);
      setRatting(0);
      Toast.show({
        type: 'info',
        position: 'top',
        text1: error.response.data.msg,
        visibilityTime: 3000,
      });
    }
  };
  
  const [userratting, setRatting] = useState(0);
  const [userReview, setUserReview] = useState('');
  const handleRattingSelect = rate => {
    setRatting(rate);
  };
  const [reviewList, setReviewList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const getReviewOFHra = async cmpId => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await getReviewOfHra(cmpId, JSON.parse(user).access_token);
      setReviewList(response?.data?.allReviews);
      setAverageRating(response?.data?.averageRating);
      renderAverageStars(response?.data?.averageRating);
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getReviewOFHra(props?.route?.params?.detailedHra?.id);
    }, [props?.route]),
  );
  
  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.heading}>Ratings & Reviews : {averageRating}</Text>
      </View>
      <View style={{flexDirection: 'row', marginLeft: -10, marginBottom: 10}}>
        <View style={{flexDirection: 'row'}}>
          {renderAverageStars(averageRating)}
        </View>
      </View>
      {reviewList?.length == 0 && (
        <Text style={{color: 'gray'}}>
          No reviews available. You're welcome to be the first to share your
          thoughts! Feel free to initiate the conversation with your insights.
        </Text>
      )}
      <ScrollView>
        {reviewList?.map((v, i) => {
          return (
            <View
              style={{
                marginVertical: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      backgroundColor: i % 2 == 0 ? 'black' : 'brown',
                      height: 26,
                      width: 26,
                      borderRadius: 13,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'white'}}>{v?.reviewerName[0]}</Text>
                  </View>
                  <Text style={{color: 'black', fontSize: 16, marginLeft: 15}}>
                    {v?.reviewerName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    {renderStars(v?.rating)}
                  </View>
                  <Text style={{color: 'gray'}}>{v?.created_date}</Text>
                </View>
                <Text style={{color: 'black'}}>{v?.review}</Text>
              </View>
              {JSON.parse(globalState?.user)?.empData?.personId == v?.userId && (
                <Pressable onPress={()=>{setShowEditRattingPop(true); setUserReview(v?.review);setEditReviewId(v?.id); setRatting(v?.rating)}}>
                  <Image
                    source={require('../images/edit.png')}
                    style={{height: 20, width: 20, resizeMode: 'contain'}}
                  />
                </Pressable>
              )}
            </View>
          );
        })}
      </ScrollView>
      <View style={{marginTop: 20, marginBottom: 10}}>
        <Button
          title="Rate now"
          color="#035292"
          onPress={() => setShowRattingPop(true)}
        />
      </View>
      <Modal transparent={true} visible={showRatingPop} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              width: 330,
              backgroundColor: 'white',
              borderRadius: 5,
              elevation: 1,
            }}>
            <View
              style={{
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '500', fontSize: 20, color: 'black'}}>
                Rate HRA
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowRattingPop(false);
                }}>
                <Image source={require('../images/close.png')} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
                paddingHorizontal: 25,
              }}>
              {[1, 2, 3, 4, 5].map((v, i) => {
                return (
                  <Pressable onPress={() => handleRattingSelect(i + 1)}>
                    <Image
                      source={
                        userratting >= i + 1
                          ? require('../images/starIcon.png')
                          : require('../images/whiteStar.png')
                      }
                      style={{height: 40, width: 40, resizeMode: 'contain'}}
                    />
                  </Pressable>
                );
              })}
            </View>
            <View style={{margin: 10, marginBottom: 25}}>
              <TextInput
                placeholder="Write a review"
                multiline={true}
                numberOfLines={3}
                textAlignVertical="top"
                placeholderTextColor="gray"
                onChangeText={text => setUserReview(text)}
                style={{
                  borderWidth: 1,
                  paddingLeft: 10,
                  color: 'black',
                  marginBottom: 15,
                  borderColor: 'gray',
                  borderRadius: 3,
                }}
              />
              <Button title="Submit" onPress={handleReviewSubmit} />
            </View>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} visible={showEditRatingPop} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              width: 330,
              backgroundColor: 'white',
              borderRadius: 5,
              elevation: 1,
            }}>
            <View
              style={{
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                paddingHorizontal: 20,
                paddingVertical: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '500', fontSize: 20, color: 'black'}}>
                Rate HRA
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowEditRattingPop(false);
                }}>
                <Image source={require('../images/close.png')} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
                paddingHorizontal: 25,
              }}>
              {[1, 2, 3, 4, 5].map((v, i) => {
                return (
                  <Pressable onPress={() => handleRattingSelect(i + 1)}>
                    <Image
                      source={
                        userratting >= i + 1
                          ? require('../images/starIcon.png')
                          : require('../images/whiteStar.png')
                      }
                      style={{height: 40, width: 40, resizeMode: 'contain'}}
                    />
                  </Pressable>
                );
              })}
            </View>
            <View style={{margin: 10, marginBottom: 25}}>
              <TextInput
                placeholder="Write a review"
                multiline={true}
                numberOfLines={3}
                textAlignVertical="top"
                placeholderTextColor="gray"
                onChangeText={text => setUserReview(text)}
                style={{
                  borderWidth: 1,
                  paddingLeft: 10,
                  color: 'black',
                  marginBottom: 15,
                  borderColor: 'gray',
                  borderRadius: 3,
                }}
                value={userReview}
              />
              <Button title="Update" onPress={handleReviewUpdate} />
            </View>
          </View>
        </View>
      </Modal>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default ReviewForHra;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  heading: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
});
