import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Voice from '@react-native-voice/voice';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import WebView from 'react-native-webview';
const Assignment2 = (props) => {
  useAndroidBackHandler(() => {
    props.navigation.navigate('Select Training Occu');
    return true;
  });
  const imagesData = props?.route?.params?.data?.slideImage || [];
  const [recognized, setRecognized] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Reset state when screen is focused
      setRecognized('');
      setStarted('');
      setResults('');
      setCurrentImageIndex(0);
      setScore(0);
    }, [])
  );

  const onSpeechStart = (e) => {
    console.log('onSpeechStart:', e);
    setStarted('√');
  };

  const onSpeechRecognized = (e) => {
    console.log('onSpeechRecognized:', e);
    setRecognized('√');
  };

  const onSpeechResults = (e) => {
    console.log('onSpeechResults:', e);
  
    if (e.value && Array.isArray(e.value) && e.value.length > 0) {
      const spokenWord = e.value[0].toLowerCase();
  
      setCurrentImageIndex((prevIndex) => {
        const currentImageName = imagesData[prevIndex]?.name?.toLowerCase();
        console.warn(spokenWord, currentImageName, prevIndex);
        if (spokenWord === currentImageName) {
          setResults(`Correct! This is a ${spokenWord}.`);
          setScore((prevScore) => {
            const newScore = prevScore + 1;
            if (prevIndex + 1 >= imagesData.length) {
              // If it's the last image, check the results
              checkResults(newScore);
            }
            return newScore;
          });
        } else {
          setResults(`Incorrect. This is not a ${spokenWord}.`);
          if (prevIndex + 1 >= imagesData.length) {
            
            setScore((prevScore) => {
              const newScore = prevScore + 1;
              if (prevIndex + 1 >= imagesData.length) {
                checkResults(prevScore);
              }
              return newScore;
            });
          }
        }
  
        const nextIndex = prevIndex + 1;
        if (nextIndex < imagesData.length) {
          return nextIndex;
        } else {
          return prevIndex; // Keep it the same if we reach the end
        }
      });
    } else {
      setResults('No speech detected.');
    }
  };

  const onSpeechEnd = (e) => {
    console.log('onSpeechEnd:', e);
  };

  const onSpeechError = (e) => {
    console.log('onSpeechError:', e);
    if (e.error && e.error.code === '7') {
      setResults('No match found. Please speak clearly.');
    } else {
      setResults('An error occurred during speech recognition.');
    }
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('en-US');
      setRecognized('');
      setStarted('');
      setResults('');
    } catch (e) {
      console.error('startRecognizing error:', e);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error('stopRecognizing error:', e);
    }
  };

  const checkResults = (finalScore) => {
    if (finalScore >= 7) {
      Alert.alert(
        'Success',
        `You passed the assignment with ${finalScore} correct answers!`
      );
      setTimeout(() => {
        props.navigation.navigate("Phase 2", {data:props?.route?.params?.data});
      }, 2000);
    } else {
      Alert.alert(
        'Failure',
        `You failed the assignment with only ${finalScore} correct answers.`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => props.navigation.navigate('Select Training Occu')}
        style={styles.goBackButton}
      >
        <Image source={require('../images/backIcon.png')} />
        <Text style={styles.goBackText}>Go Back</Text>
      </Pressable>
      {/* <Text style={styles.headerText}>Identify The Objects</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imagesData[currentImageIndex]?.path }}
          style={styles.image}
        />
      </View> */}
      <View style={{flexDirection:"row", height:300,width:300,  marginBottom: 20, justifyContent:"center"}}>
      <WebView
          source={{
            uri: "https://youtu.be/EngW7tLk6R8",
          }}
          style={{height:300, width:300}}
          javaScriptEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
        />
      </View>
      <Pressable onPress={startRecognizing} style={styles.micButton}>
        <Image source={require('../images/blueMic.png')} />
      </Pressable>
      <Text style={styles.stat}>{`Tap to speak: ${started}`}</Text>
      <Text style={styles.stat}>{results}</Text>
      <Pressable onPress={stopRecognizing} style={styles.stopButton}>
        <Text style={styles.stopButtonText}>Stop Listening</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#19487C',
  },
  goBackButton: {
    backgroundColor: '#19487C',
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  goBackText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  headerText: {
    color: 'white',
    marginBottom: 20,
    fontWeight: '500',
    fontSize: 20,
  },
  imageContainer: {
    margin: 20,
  },
  image: {
    resizeMode: 'contain',
    height: 100,
    width: 100,
  },
  micButton: {
    backgroundColor: 'white',
    borderRadius: 75,
    padding: 10,
  },
  stat: {
    textAlign: 'center',
    color: 'white',
    marginBottom: '1%',
    fontWeight: '700',
    marginTop: 10,
  },
  stopButton: {
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
  },
  stopButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default Assignment2;
