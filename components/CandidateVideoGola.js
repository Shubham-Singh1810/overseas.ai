import {StyleSheet, Text, Image, View} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
const CandidateVideoGola = ({value, index}) => {
  console.log(index, value?.thumbAfterDepartureVideos)
  return (
    <View style={{marginRight: 10, marginTop: 20}}>
      <Image
        // source={require('../images/candidate.png')}
        source={{
          uri:value?.thumbAfterDepartureVideos? value?.thumbAfterDepartureVideos: value?.thumbBeforeDepartureVideo,
        }}
        style={{height: 85, width: 100, borderRadius: 5}}
      />
      <View style={styles.playIcon}>
      <Image
      source={require('../images/playVideoIcon.png')}
      
      />
      </View>
      
      {/* <Video
        source={{ uri: value?.beforeDepartureVideo }}
        style={{height: 85, width: 100, borderRadius: 5}}
        controls={false} // Show video controls (play, pause, etc.)
        resizeMode="contain" // or "cover" for different video resizing options
      /> */}
      <Text style={{fontSize:10,color:"#000", marginTop:5, textAlign:"center"}} >{value?.empName}</Text>
    </View>
  );
};

export default CandidateVideoGola;

const styles = StyleSheet.create({
  playIcon: {
    position: 'absolute',
    top: '35%',
    left: '35%',
    height:24,
    width:24,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#D9D9D9",
    borderRadius:12
  },
});