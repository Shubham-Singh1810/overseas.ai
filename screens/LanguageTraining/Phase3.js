import {Pressable, StyleSheet, Text, Image, View} from 'react-native';
import React,{useState, useEffect} from 'react';
import WebView from 'react-native-webview';
import VoiceToText from '../../components/VoiceToText';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
const Phase3 = props => {
  useAndroidBackHandler(() => {
    props.navigation.navigate('Select Language Training Occu');
    return true;
  });
  const langData = props?.route?.params?.data
  return (
    <View style={styles.main}>
      <View style={{flex: 1, padding: 30, backgroundColor: '#19487C'}}>
        <Pressable
          onPress={() => props.navigation.navigate('Select Language Training Occu')}
          style={{
            backgroundColor: '#19487C',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <View style={{backgroundColor:"white", borderRadius:10, marginRight:10}}>
            <Image source={require("../../images/backIcon.png")} style={{height:20, width:20, resizeMode:"contain"}}/>
            </View>
          <Text style={{color: '#fff', fontWeight: '500'}}>Basic Conversation</Text>
        </Pressable>
        <WebView
          source={{
            uri: langData?.phase3Video[0]?.path,
          }}
          style={{flex: 1}}
          javaScriptEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
        />
        <Pressable
          onPress={() => props.navigation.navigate('Assignment 1', {data: props?.route?.params?.data})}
          style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
            padding:10,
            justifyContent:"center",
            borderRadius:6
          }}>
          
          <Text style={{color: '#19487C', fontWeight: '500'}}>Take Assignment</Text>
        </Pressable>
        {/* <VoiceToText/> */}
      </View>
    </View>
  );
};

export default Phase3;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});