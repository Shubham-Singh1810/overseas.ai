import {Button, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CourseGola = () => {
  return (
    <View style={styles.main}>
      <Text style={{textAlign: 'right', color:"red", fontSize:12, marginVertical:3}}>Submit Till : 22/08/2023</Text>
      <View style={{flexDirection: 'row', alignItems: 'center', marginVertical:15}}>
        <Image source={require('../images/hraDummyIcon.png')} style={{height:100, width:150}}/>
        <View style={{marginLeft: 15}}>
          <Text style={[styles.listText]}>Course Name</Text>
          <Text style={[styles.listText]}>Duration : 3 months</Text>
          <Text style={[styles.listText]}>Exam Mode : Viva</Text>
          <Text style={[styles.listText]}>Course Type : Online</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical:5
        }}>
        <Pressable style={{width: '40%'}}>
          <Button title="Apply" color="#035292" style={{width: '50%'}} />
        </Pressable>
        <Pressable style={{width: '50%'}}>
          <Text style={[{textAlign:"right", textDecorationLine:"underline"}, styles.clientLink]}>Learn More</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CourseGola;

const styles = StyleSheet.create({
  main: {
    padding: 10,
    backgroundColor: '#F1F7FF',
    elevation: 10,
    borderWidth: 1,
    borderColor: '#035292',
    borderRadius: 5,
    marginVertical:8
  },
  listText:{
    color:"#000",
    fontSize:15,
    fontWeight:400
  },
  clientLink: {
    fontSize: 16,
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    color: '#1877F2',
    textDecorationLine: 'underline',
  },
});
