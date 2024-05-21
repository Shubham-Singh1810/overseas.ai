import {StyleSheet, Text, Image, Pressable, View, Modal} from 'react-native';
import React, {useState} from 'react';
import Video from 'react-native-video';
import WebView from 'react-native-webview';
const CandidateVideoGola = ({value, index}) => {
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  
  return (
    <>
      <Pressable
        style={{marginRight: 10, marginTop: 20}}
        onPress={() => setShowVideoPlayer(true)}>
        <Image
          // source={require('../images/candidate.png')}
          source={{
            uri: value?.thumbAfterDepartureVideos
              ? value?.thumbAfterDepartureVideos
              : value?.thumbBeforeDepartureVideo,
          }}
          style={{height: 85, width: 100, borderRadius: 5}}
        />
        <View style={styles.playIcon}>
          <Image source={require('../images/playVideoIcon.png')} />
        </View>
        <Text
          style={{
            fontSize: 10,
            color: '#000',
            marginTop: 5,
            textAlign: 'center',
          }}>
          {value?.empName}
        </Text>
      </Pressable>
      <Modal transparent={true} visible={showVideoPlayer}>
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            flex: 1,
            padding:18,
            
          }}>
          <View style={{backgroundColor:"white",padding: 18,width:350}}>
            <Pressable
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent:"space-between"
              }}
              onPress={() => setShowVideoPlayer(false)}>
                <Text style={{fontSize: 16,fontWeight:"500", color: 'black'}}>
              You are listening to {value?.empName} 
            </Text>
              <Image source={require('../images/close.png')} />
              
            </Pressable>
            <Video
              style={{
                height: 300,
                width: '100%',
                marginVertical: 15,
              }}
              resizeMode="contain"
              controls={true}
              source={{
                uri: value?.beforeDepartureVideo
                  ? value?.beforeDepartureVideo
                  : value?.afterDepartureVideo,
              }}></Video>
            
      
      
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CandidateVideoGola;

const styles = StyleSheet.create({
  playIcon: {
    position: 'absolute',
    top: '35%',
    left: '35%',
    height: 24,
    width: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
  },
});
