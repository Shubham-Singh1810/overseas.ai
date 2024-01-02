import { StyleSheet,ScrollView, Text,Image, View } from 'react-native'
import React from 'react'
import FooterNav from '../components/FooterNav'

const SavedVideo = (props) => {
  return (
    <>
    <ScrollView>
      <View style={{flex:1, justifyContent:"space-between", padding:20, flexWrap:"wrap", flexDirection:"row"}}>
        <View style={styles.videoBox}>
          <Image source={require("../images/candidate1.png")}/>
        </View>
        <View style={styles.videoBox}>
          <Image source={require("../images/candidate2.png")}/>
        </View>
        <View style={styles.videoBox}>
          <Image source={require("../images/candidate1.png")}/>
        </View>
        <View style={styles.videoBox}>
          <Image source={require("../images/candidate2.png")}/>
        </View>
      </View>
    </ScrollView>
    <FooterNav props={props}/>
    </>
  )
}

export default SavedVideo

const styles = StyleSheet.create({
  videoBox:{
    marginBottom:20
  }
})