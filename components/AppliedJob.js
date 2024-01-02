import {StyleSheet, Text, Image, View} from 'react-native';
import React from 'react';
import { useGlobalState } from '../GlobalProvider';
const AppliedJob = () => {
  const {translation } = useGlobalState();
  return (
    <View style={styles.main}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.heading}>{translation.welder}</Text>
          <Text style={styles.date}>{translation.appliedOn} - 23/12/22</Text>
        </View>
        <Text style={styles.companyName}>R C Chandra Sons</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:10}}>
          <Image
            source={require('../images/malaysiaFlag.png')}
            style={{marginRight: 8, height: 26, width: 26, borderRadius: 13}}
          />
          <Text style={styles.countryText}>Malaysia</Text>
        </View>
        <Text style={styles.currency}>1400 SAR = 30,325 INR</Text>
        <View style={{marginTop:5}}>
          <Text style={styles.countryText}>{translation.status}</Text>
          <View style={{flexDirection:"row", marginTop:10, alignItems:"center"}}>
            <View style={[styles.highlight , styles.backgroundColorGreen]}></View>
            <Text style={styles.textGreen}>{translation.applicationSendtoHr}</Text>
          </View>
          <View style={styles.grayDot}></View>
          <View style={styles.grayDot}></View>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <View style={styles.highlight}></View>
            <Text>{translation.applicationUnderReview}</Text>
          </View>
          <View style={styles.grayDot}></View>
          <View style={styles.grayDot}></View>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <View style={styles.highlight}></View>
            <Text>{translation.shortlistedInInterview}</Text>
          </View>
          <View style={styles.grayDot}></View>
          <View style={styles.grayDot}></View>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <View style={styles.highlight}></View>
            <Text>{translation.selected}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AppliedJob;

const styles = StyleSheet.create({
  main: {
    padding: 15,
    borderColor: '#B3B3B3',
    borderWidth: 1,
    borderRadius:5,
    marginBottom:20,
    backgroundColor:"#fff"
  },
  heading: {
    color: '#0F0C0C',
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Nato Sans',
  },
  date: {
    color: '#000',
    fontSize: 10,
    fontWeight: '300',
    fontFamily: 'Nato Sans',
  },
  grayDot: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor:'gray',
    marginRight:10,
    marginVertical:3,
    marginLeft:3
  },
  highlight:{
    height:10,
    width:10,
    borderRadius:5,
    marginRight:7,
    borderColor:"black",
    borderWidth:1
  },
  backgroundColorGreen:{
    backgroundColor:"#4FB988"
  },
  currency:{
    marginVertical:10,
    color: '#0F0C0C',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Nato Sans',
  },
  countryText:{
    color: '#0F0C0C',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  },
  
  companyName:{
    color: '#0F0C0C',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
    marginTop:10
  },
  textGreen:{
    color: '#4FB988',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  }
});
