import { StyleSheet, Text,Image, View } from 'react-native'
import React from 'react'

const CandidateGola = () => {
  return (
    <View style={{marginRight:6}}>
      <Image source={require("../images/candidate.png")} style={{height:70, width:87, borderRadius:5}}/>
    </View>
  )
}

export default CandidateGola

const styles = StyleSheet.create({})