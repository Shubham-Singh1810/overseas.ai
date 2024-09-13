import {Pressable, StyleSheet, Text, Image, Modal, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import AudioVideoPlayer from '../../components/AudioVideoPlayer';
const Phase1 = props => {
  useAndroidBackHandler(() => {
    props.navigation.navigate('Select Language Training Occu');
    return true;
  });
  const langData = props?.route?.params?.data;
  // const videoSource = "https://overseasdata.s3.ap-south-1.amazonaws.com/LanguageTrainingContent/Video/1/4/667cfb8b43582.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWDCXZNCOULZNVOK6%2F20240628%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240628T062852Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=27e5bf5b665edce0b9da60fedd954d2c8bac857a5004a91263805a2d7ea89aaf"
  const videoSource =
    'https://res.cloudinary.com/dglkjvsk4/video/upload/v1719565387/yb5xox6eahgvidpsxny5.mp4';
  // const audioSource1 = "https://overseasdata.s3.ap-south-1.amazonaws.com/LanguageTrainingContent/Audio/1/4/667cfb8bc9c03.mp3?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWDCXZNCOULZNVOK6%2F20240628%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240628T071536Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=a4d774485978d55d328dd772e6a5af27985c3e53b42f849f0f1c6b3cb6b0d42b"
  const audioSource1 =
    'https://res.cloudinary.com/dglkjvsk4/video/upload/v1719564537/fqplbcieruoujxxqfoyp.mp3';
  const audioSource2 =
    'https://res.cloudinary.com/dglkjvsk4/video/upload/v1719564619/un3w1dftb6idqyafvraf.mp3';
  return (
    <View style={styles.main}>
      <View
        style={{
          marginVertical: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{flexDirection: 'row', marginLeft: 10, alignItems: 'center'}}>
          <Pressable
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              marginRight: 10,
            }}
            onPress={() => props.navigation.navigate('Select Language Training Occu')}>
            <Image
              source={require('../../images/backIcon.png')}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          </Pressable>
          <Text style={styles.subTitle}>Start Over</Text>
        </View>
        <Pressable style={{marginRight: 10, position: 'relative', bottom: 5}}>
          <Text style={{fontWeight: '600', fontSize: 22, color: 'white'}}>
            . . .
          </Text>
        </Pressable>
      </View>
      <AudioVideoPlayer
        videoSource={videoSource}
        audioSource1={audioSource1}
        audioSource2={audioSource2}
      />
      {/* <Modal transparent={true} visible={true} animationType="slide">
        <View
          style={{
            backgroundColor: 'rgba(0,0,0, 0.5)',
            flex: 1,
            alignItems: 'flex-end',
            flexDirection: 'row',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              height: 100,
              width: '100%',
            }}></View>
        </View>
      </Modal> */}
    </View>
  );
};

export default Phase1;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#19487C',
  },
  subTitle: {
    color: 'whitesmoke',
    fontWeight: '600',
    fontSize: 18,
    fontFamily: 'monospace',
  },
});
