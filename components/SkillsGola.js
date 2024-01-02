import { StyleSheet,Image, Text, View } from 'react-native'
import React from 'react'

const SkillsGola = () => {
  return (
    <View style={{marginRight:15, marginTop:20}}>
      <Image source={require("../images/skillIcon.png")} style={{height:70, width:100, borderRadius:5}}/>
    </View>
  )
}

export default SkillsGola

const styles = StyleSheet.create({})