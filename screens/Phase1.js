import {Pressable, StyleSheet, Text, Image, View} from 'react-native';
import React,{useState, useEffect} from 'react';
import WebView from 'react-native-webview';
import VoiceToText from '../components/VoiceToText';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
const Phase1 = props => {
  useAndroidBackHandler(() => {
    props.navigation.navigate('Select Training Occu');
    return true;
  });
  const langData = props?.route?.params?.data
  return (
    <View style={styles.main}>
      <View style={{flex: 1, padding: 30, backgroundColor: '#19487C'}}>
        <Pressable
          onPress={() => props.navigation.navigate('Select Training Occu')}
          style={{
            backgroundColor: '#19487C',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Image source={require('../images/backIcon.png')} />
          <Text style={{color: '#fff', fontWeight: '500'}}>Learn about basic words</Text>
        </Pressable>
        <WebView
          source={{
            uri: langData?.phase1Video[0]?.path,
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

export default Phase1;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
