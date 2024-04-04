import {
  StyleSheet,
  ScrollView,
  Image,
  Text,
  View,
  Modal,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useState, useRef} from 'react';
import NewsFeedComponent from '../components/NewsFeedComponent';
import Typewriter from 'react-native-typewriter';

import {useGlobalState} from '../GlobalProvider';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import {getNewsFeedData} from '../services/info.service';
import {useFocusEffect} from '@react-navigation/native';
const NewsFeed = props => {
  useAndroidBackHandler(() => {
    props.navigation.navigate('Home');
    return true;
  });
  const {newTranslation} = useGlobalState();
  const [loader, setLoader] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const handleGetNews = async () => {
    setLoader(true);
    try {
      let response = await getNewsFeedData();
      setNewsData(response?.data?.newsData);
      setLoader(false);
      console.log(response?.data?.newsData.length);
    } catch (error) {
      console.log(error);
    }
  };
  const [pageNo, setPageNo] = useState(1);
  const scrollViewRef = useRef(null);
  const [showPageLoader, setShowPageLoader] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      handleGetNews();
    }, []),
  );
  // const [refreshing, setRefreshing] = useState(false);
  const handleScroll = ({nativeEvent}) => {
    const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isEndReached) {
      setShowPageLoader(true);
      setTimeout(() => {
        setPageNo(pageNo + 1);
        setShowPageLoader(true);
        if(newsData.length<pageNo*10){
          setNewsData(newsData.concat(newsData))
        }
      }, 1000);
    }
  };

  return (
    <ScrollView
      style={{backgroundColor: '#fff', padding: 16}}
      ref={scrollViewRef}
      onScroll={handleScroll}>
      <View
        style={{
          paddingBottom: 10,
          borderBottomWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{height: 26, borderRadius: 13, width: 26}}
          source={require('../images/overseas-wrold.gif')}
        />
        <Text
          style={{
            color: '#333333',
            fontWeight: '500',
            fontSize: 17,
            marginLeft: 10,
          }}>
          {newTranslation?.discoverFreshFeedDelightsNow}
        </Text>
      </View>
      {newsData?.slice(0, pageNo * 10).map((v, i) => {
        return <NewsFeedComponent value={v} key={i} />;
      })}
      {showPageLoader && (
        <View style={{marginVertical: 50}}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <Modal transparent={true} visible={loader} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default NewsFeed;

const styles = StyleSheet.create({
  header: {
    margin: 15,
    marginBottom: 0,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  brandName: {
    marginBottom: 5,
    color: '#194a81',
    fontSize: 25,
    fontWeight: '700',
  },
  welcome: {
    color: '#194a81',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
    marginLeft: 5,
  },
});
