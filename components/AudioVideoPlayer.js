import React, {useRef, useState, useEffect} from 'react';
import {View, Image, StyleSheet, Pressable} from 'react-native';
import Video from 'react-native-video';
import Sound from 'react-native-sound';
import {useFocusEffect} from '@react-navigation/native';
const AudioVideoPlayer = ({videoSource, audioSource1, audioSource2}) => {
  const videoRef = useRef(null);
  const [audio1, setAudio1] = useState(null);
  const [audio2, setAudio2] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      // Load the first audio file
      const sound1 = new Sound(audioSource1, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('Failed to load sound1', error);
          return;
        }
        setAudio1(sound1);
      });

      // Load the second audio file
      const sound2 = new Sound(audioSource2, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('Failed to load sound2', error);
          return;
        }
        setAudio2(sound2);
      });

      // Cleanup on unfocus
      return () => {
        sound1.release();
        sound2.release();
      };
    }, [audioSource1, audioSource2]),
  );
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const handleVideoLoad = () => {
    // Play the audio tracks when the video is loaded
    audio1?.play();
    audio2?.play();
    setIsVideoLoaded(true);
  };

  const handleVideoEnd = () => {
    // Stop the audio tracks when the video ends
    audio1?.stop();
    audio2?.stop();
  };

  const handleAudioControl = () => {
      if (play) {
        audio1?.play();
        audio2?.play();
      } else {
        audio1?.pause();
        audio2?.pause();
      }
  };
  const [clicked, setClicked] = useState(false);
  const [play, setPlay] = useState(false);
  return (
    <Pressable onPress={() => setClicked(!clicked)} style={styles.container}>
      <Video
        ref={videoRef}
        source={{uri: videoSource}}
        style={styles.video}
        onLoad={handleVideoLoad}
        onEnd={handleVideoEnd}
        resizeMode="contain"
        paused={play}
        // controls
      />
      {clicked && (
        <Pressable
          onPress={() => setClicked(false)}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            backgroundColor: 'rgba(0, 0, 0, .2)',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={{
                marginHorizontal: 60,
                padding: 2,
                borderRadius: 13,
                backgroundColor: 'white',
              }}
              onPress={() => {setPlay(!play); handleAudioControl()}}>
              {play ? (
                <Image
                  source={require('../images/playIcon.png')}
                  style={{height: 30, width: 30, resizeMode: 'contain'}}
                />
              ) : (
                <Image
                  source={require('../images/pauseIcon.png')}
                  style={{height: 30, width: 30, resizeMode: 'contain'}}
                />
              )}
            </Pressable>
          </View>
        </Pressable>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default AudioVideoPlayer;
