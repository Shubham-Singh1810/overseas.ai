import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';

const LanguageTraining = props => {
  return (
    <View style={styles.main}>
      <View>
        <View style={{flexDirection:"row", alignItems:"center"}}>
        <Text style={styles.title}>Welcome to </Text>
        <View style={{paddingHorizontal:8,marginLeft:5,borderRadius:15, backgroundColor:"white"}}>

        <Image source={require("../images/brandLogo.jpeg")} style={{height:32, width:120,borderRadius:6, resizeMode:"contain"}}/>
        </View>
        {/* <Text style={[styles.title, {backgroundColor:"white", color:"#19487C", paddingHorizontal:10, borderRadius:15}]}>overseas.ai</Text> */}
        </View>
        <Text style={{color:"#F8F8F8", textAlign:"center", marginTop:5}}>A video based job portal.</Text>
        
        <View style={{marginVertical:30, flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <Text style={styles.subTitle}>Easy Spoken English</Text>
        <Text style={styles.subTitle}>Learning Program</Text>
        </View>
        <Image source={require('../images/languageBanner.png')} />
        <Pressable onPress={()=>props.navigation.navigate('Select Training Occu')} style={{backgroundColor:"white", marginTop:40,elevation:10, padding:5,paddingVertical:8, borderRadius:20}}>
            <Text style={{color:"#19487C", fontWeight:"600", fontSize:20, textAlign:"center"}}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LanguageTraining;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#19487C',
  },
  title: {
    color: 'white',
    fontWeight: '600',
    fontSize: 35,
    textAlign:"center"
  },
  subTitle: {
    color: 'whitesmoke',
    fontWeight: '600',
    fontSize: 18,
    fontFamily:"monospace"
  },
});
