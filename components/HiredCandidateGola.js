import { StyleSheet, Text,Image, View } from 'react-native'
import React from 'react'

const HiredCandidateGola = () => {
  return (
    <View style={{marginRight:6}}>
      <Image source={require("../images/hiredCondidate.png")} style={{height:70, width:87, borderRadius:5}}/>
    </View>
  )
}

export default HiredCandidateGola

const styles = StyleSheet.create({})