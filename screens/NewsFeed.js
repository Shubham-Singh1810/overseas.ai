import {StyleSheet, ScrollView, Image, Text, View} from 'react-native';
import React from 'react';
import NewsFeedComponent from '../components/NewsFeedComponent';
import Typewriter from 'react-native-typewriter';
import {newsData} from '../services/migrating_workers (2) (1)';
import {useGlobalState} from '../GlobalProvider';
const NewsFeed = () => {
  return (
    <ScrollView style={{backgroundColor:"#fff", padding:16}}>
      <View style={{paddingBottom: 10, borderBottomWidth: 1, flexDirection:"row", alignItems:"center"}}>
        <Image style={{height:26,borderRadius:13, width:26}} source={require("../images/overseas-wrold.gif")}/>
        <Text
          style={{
            color: '#333333',
            fontWeight: '500',
            fontSize: 17,
            marginLeft:10
          }}>
          Discover Fresh Feed Delights Now!
        </Text>
      </View>
      {newsData.map((v, i) => {
        return <NewsFeedComponent value={v} key={i} />;
      })}
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
