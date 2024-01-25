import {
  Pressable,
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import {useGlobalState} from '../GlobalProvider';
import FooterNav from '../components/FooterNav';
import { TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Help = props => {
  
  const {translation, globalState, setGlobalState } = useGlobalState();
  const[formData, setFormData]=useState({
      user_contact:JSON.parse(globalState?.user)?.empData?.empPhone,
      help_subject:"",
      help_query:"",
      help_video:"",
      help_audio:""
  })
  return (
    <>
      <View
        style={{
          backgroundColor: '#035292',
          paddingHorizontal: 18,
          paddingVertical: 25,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
          {/* <Pressable onPress={() => props.navigation.navigate('Feed')} style={{flexDirection:"row", alignItems:"center", marginBottom:10}}>
            <Text style={{color:"white", textDecorationLine:"underline"}}>&#x2190; Back</Text>
          </Pressable> */}
        <Text style={styles.headingText}>Our advisor is just a call away</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
            paddingBottom: 15,
          }}>
          <View
            style={{padding: 10, borderRadius: 5, backgroundColor: 'white'}}>
            <Image
              source={require('../images/call.png')}
              style={{height: 40, width: 40, resizeMode: 'contain'}}
            />
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={styles.phoneNumberText}>+91 9087654321</Text>
            <Text style={styles.text}>Available 24X7 for your quires</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.main}>
        <Text style={styles.blackText}>Have a query? Let’s Solve this</Text>
        <TextInput style={styles.inputBox} value={formData?.user_contact} editable={false}/>
        <TextInput style={styles.inputBox} placeholder="Subject*" onChangeText={(text)=>setFormData({...formData, help_subject:text})}/>
        <TextInput
          style={styles.inputBox}
          placeholder="Write your query here"
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          onChangeText={(text)=>setFormData({...formData, help_query:text})}
        />
        <View
          style={{
            marginVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={[styles.btn]}>
            <View style={{backgroundColor: '#333333', borderRadius: 15}}>
              <Image source={require('../images/play_circle_outline.png')} />
            </View>

            <Text style={styles.btnText}>Upload Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn]}>
            <View style={{backgroundColor: '#333333', borderRadius: 15}}>
              <Image source={require('../images/mic.png')} />
            </View>

            <Text style={styles.btnText}>Upload Audio</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.subBtnText}>Submit</Text>
        </TouchableOpacity>
        
      </ScrollView>
      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            position:"absolute",
            width:"100%",
            padding:20,
            // backgroundColor:"#035292",
            bottom:0,
            borderTopRightRadius:20,
            borderTopLeftRadius:20
          }}>
          <Text style={{color: '#000'}}>Need</Text>
          <Text
            onPress={() => props.navigation.navigate('Support')}
            style={{
              color: '#035292',
              marginHorizontal: 7,
              textDecorationLine: 'underline',
            }}>
            Support?
          </Text>
        </View>
    </>
  );
};

export default Help;

const styles = StyleSheet.create({
  headingText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
  },
  blackText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 15,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  phoneNumberText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '600',
  },
  main: {
    padding: 15,
    backgroundColor: 'white',
    flex: 1,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#8598A7',
    marginVertical: 12,
    padding: 10,
    borderRadius: 5,
  },
  btn: {
    backgroundColor: '#F1F7FF',
    flexDirection: 'row',
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 11,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333333',
  },
  submitBtn: {
    backgroundColor: '#035292',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 5,
  },
  btnText: {
    fontWeight: '400',
    marginLeft: 10,
    color: '#333333',
  },
  subBtnText: {
    color: 'white',
    fontWeight: '500',
  },
});

// const styles = StyleSheet.create({
