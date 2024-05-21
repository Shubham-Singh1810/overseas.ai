import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview';
const Phase1 = () => {
  return (
    <View style={styles.main}>
      <View style={{flex: 1}}>
      <WebView
      source={{ uri: ' https://overseasdata.s3.ap-south-1.amazonaws.com/EmpData/2/3/OV1111259/beforeDepartureVideo.mp4?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWDCXZNCOULZNVOK6%2F20240520%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240520T104123Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604800&X-Amz-Signature=1359ce1c8fc0320be59aab2fce9aaa2f4a9166030aed6c0f2f920eabb59be1b3' }}
      style={{ flex: 1 }}
      javaScriptEnabled={true} // Enable JavaScript
      allowsInlineMediaPlayback={true} // Allow inline media playback
      mediaPlaybackRequiresUserAction={false} // Automatically play videos without user interaction
    />
      </View>
    </View>
  )
}

export default Phase1

const styles = StyleSheet.create({
    main:{
        flex:1
    }
})