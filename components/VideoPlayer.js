import {
  Pressable,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Video from 'react-native-video';

const VideoPlayer = ({langData}) => {
  const [clicked, setClicked] = useState(false);
  const [play, setPlay] = useState(false);
  const [progress, setProgress] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const videoRef = useRef();
  function convertSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    if (minutes > 0) {
      return `${minutes} min ${remainingSeconds} sec`;
    } else {
      return `${remainingSeconds} sec`;
    }
  }
  const [count, setCount] = useState(10);
  useEffect(() => {
    if (count > 0) {
      const interval = setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);
      return () => clearInterval(interval); // Cleanup the interval on unmount or when count changes
    }
  }, [count]);
  
  const [selectedDate, setSelectedDate]=useState(1)
  return (
    <View style={styles.main}>
      {!progress && (
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            height: fullScreen ? '100%' : 250,
            position: 'absolute',
            zIndex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <ActivityIndicator size="large" />
            <Text style={{color: 'black'}}>Processing your video</Text>
          </View>
        </View>
      )}
      <Pressable onPress={() => setClicked(true)}>
        <Video
          ref={videoRef}
          paused={play}
          onProgress={x => setProgress(x)}
          source={{
            // uri: 'https://overseasdata.s3.ap-south-1.amazonaws.com/LanguageTraining/145/phase1/6672581fac242.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWDCXZNCOULZNVOK6%2F20240627%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240627T055737Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Signature=72e1b3a02850b7bf6561f2acf7b3b50820e43d789462c2d6d641cca5d6c69d10',
            // uri: 'https://res.cloudinary.com/dglkjvsk4/video/upload/v1719475820/scbulinkka7y8wzjthfm.mp4',
            uri:"https://res.cloudinary.com/dglkjvsk4/video/upload/v1719476833/sk8ychxjubv9aqjvnm7j.mp4"
          }}
          style={{width: '100%', height: fullScreen ? '100%' : 250}}
          resizeMode="contain"
          repeat
          // controls
        />
        {clicked && (
          <Pressable
            onPress={() => setClicked(false)}
            style={{
              width: '100%',
              height: fullScreen ? '100%' : 250,
              position: 'absolute',
              backgroundColor: 'rgba(0, 0, 0, .2)',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Pressable
              onPress={() => setFullScreen(!fullScreen)}
              style={{
                position: 'absolute',
                top: 20,
                left: 20,
                backgroundColor: 'white',
                padding: 2,
                borderRadius: 5,
              }}>
              {fullScreen ? (
                <Image
                  source={require('../images/minimise.png')}
                  style={{height: 18, width: 18, resizeMode: 'contain'}}
                />
              ) : (
                <Image
                  source={require('../images/maximise.png')}
                  style={{height: 18, width: 18, resizeMode: 'contain'}}
                />
              )}
            </Pressable>
            {/* <View style={{flexDirection: 'row'}}>
              <Pressable
                style={{padding: 4, borderRadius: 13, backgroundColor: 'white'}}
                onPress={() =>
                  videoRef.current.seek(progress.currentTime - 10)
                }>
                <Image
                  source={require('../images/previous.png')}
                  style={{height: 18, width: 18, resizeMode: 'contain'}}
                />
              </Pressable>
              <Pressable
                style={{
                  marginHorizontal: 60,
                  padding: 2,
                  borderRadius: 13,
                  backgroundColor: 'white',
                }}
                onPress={() => setPlay(!play)}>
                {play ? (
                  <Image
                    source={require('../images/playIcon.png')}
                    style={{height: 22, width: 22, resizeMode: 'contain'}}
                  />
                ) : (
                  <Image
                    source={require('../images/pauseIcon.png')}
                    style={{height: 22, width: 22, resizeMode: 'contain'}}
                  />
                )}
              </Pressable>
              <Pressable
                style={{padding: 4, borderRadius: 13, backgroundColor: 'white'}}
                onPress={() =>
                  videoRef.current.seek(progress.currentTime + 10)
                }>
                <Image
                  source={require('../images/fast-forward.png')}
                  style={{height: 18, width: 18, resizeMode: 'contain'}}
                />
              </Pressable>
            </View> */}
            {/* <View
              style={{
                position: 'absolute',
                bottom: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <Text style={{color: 'white', fontWeight: '500', marginLeft: 10}}>
                {convertSeconds(progress.currentTime)}
                
              </Text>
              <View
                style={{
                  width: '50%',
                  height: 3,
                  borderWidth: 0.2,
                  borderColor: 'white',
                  backgroundColor: 'gray',
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    height: 3,
                    // width:"100%"
                    width:
                      (progress.currentTime / progress.seekableDuration) * 100 +
                      '%',
                  }}></View>
              </View>
              <Text
                style={{color: 'white', fontWeight: '500', marginRight: 10}}>
                {convertSeconds(progress.seekableDuration)}
                
              </Text>
              
            </View> */}
          </Pressable>
        )}
      </Pressable>
      <View style={{paddingHorizontal: 16, marginTop: 10}}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
          Introduction
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginRight: 10,
            }}>
            Base Language
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontWeight: '400',
              color: 'white',
              paddingHorizontal: 4,
              borderRadius: 5,
              backgroundColor: '#19487C',
            }}>
            {langData?.selectedBaseLang}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginRight: 10,
            }}>
            Preferred Accent
          </Text>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              fontWeight: '400',
              color: 'white',
              paddingHorizontal: 4,
              borderRadius: 5,
              backgroundColor: '#19487C',
            }}>
            {langData?.selectedPrefAccent} English
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginVertical: 15,
            }}>
            Select Day
          </Text>
        </View>
        
      </View>
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    backgroundColor: 'white',
    flex: 1,
  },
});
