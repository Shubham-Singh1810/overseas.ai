import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const Support = () => {
  return (
    <View style={styles.main}>
      <View>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.btnText}>Raise a Ticket</Text>
        </TouchableOpacity>
        <ScrollView style={{marginTop:20, marginBottom:120}}>
          <View style={styles.myMessage}>
            <Text style={styles.myMessageText}>I am gopal</Text>
          </View>
          <View style={styles.adminMessage}>
            <Text style={styles.adminMessageText}>Hii, I am Dr. Ramakrishna. </Text>
          </View>
          <View style={styles.myMessage}>
            <Text style={styles.myMessageText}>I am gopal</Text>
          </View>
          <View style={styles.adminMessage}>
            <Text style={styles.adminMessageText}>Hii, I am Dr. Ramakrishna. </Text>
          </View>
          <View style={styles.myMessage}>
            <Text style={styles.myMessageText}>I am gopal</Text>
          </View>
          <View style={styles.adminMessage}>
            <Text style={styles.adminMessageText}>Hii, I am Dr. Ramakrishna. </Text>
          </View>
          <View style={styles.myMessage}>
            <Text style={styles.myMessageText}>I am gopal</Text>
          </View>
          <View style={styles.adminMessage}>
            <Text style={styles.adminMessageText}>Hii, I am Dr. Ramakrishna. </Text>
          </View>
          <View style={styles.myMessage}>
            <Text style={styles.myMessageText}>I am gopal</Text>
          </View>
          <View style={styles.adminMessage}>
            <Text style={styles.adminMessageText}>Hii, I am Dr. Ramakrishna. </Text>
          </View>
          <View style={styles.myMessage}>
            <Text style={styles.myMessageText}>I am gopal</Text>
          </View>
          <View style={styles.adminMessage}>
            <Text style={styles.adminMessageText}>Hii, I am Dr. Ramakrishna. </Text>
          </View>
          <View style={styles.myMessage}>
            <Text style={styles.myMessageText}>I am gopal</Text>
          </View>
          <View style={styles.adminMessage}>
            <Text style={styles.adminMessageText}>Hii, I am Dr. Ramakrishna. </Text>
          </View>
          <View style={styles.myMessage}>
            <Text style={styles.myMessageText}>I am gopal</Text>
          </View>
          <View style={styles.adminMessage}>
            <Text style={styles.adminMessageText}>Hii, I am Dr. Ramakrishna. </Text>
          </View>
          <View style={styles.myMessage}>
            <Text style={styles.myMessageText}>I am gopal</Text>
          </View>
          <View style={styles.adminMessage}>
            <Text style={styles.adminMessageText}>Hii, I am Dr. . </Text>
          </View>
        </ScrollView>
        <View style={{position:"absolute", bottom:0, width:"100%",flexDirection:"row",justifyContent:"space-between",alignItems:"center",  marginBottom:50}}>
        <TextInput style={[styles.inputBox, {width:"80%"}]} placeholder="Type your message here"/>
        <TouchableOpacity style={{backgroundColor:"#035292", width:"20%",height:50, alignItems:"center", justifyContent:"center"}}>
            <Text style={{color:"white"}}>Send</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({
  main: {
    padding: 15,
    backgroundColor: 'white',
    flex: 1,
  },
  adminMessage:{
    flexDirection: 'row',
    justifyContent:"flex-start",
    marginBottom:10
  },
  myMessage: {
    flexDirection: 'row',
    justifyContent:"flex-end",
    marginBottom:10
  },
  myMessageText:{
    backgroundColor:"#CCCCD0",
    paddingVertical:10,
    paddingHorizontal:25,
    borderRadius:20
  },
  adminMessageText:{
    backgroundColor:"#035292",
    paddingVertical:10,
    paddingHorizontal:25,
    borderRadius:20,
    color:"white"
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#8598A7',
    marginVertical: 12,
    padding: 10,
    height:50
  },
  btn: {
    backgroundColor: '#035292',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 11,
  },
  submitBtn: {
    backgroundColor: '#035292',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 11,
    marginHorizontal: 85,
    marginVertical: 12,
  },
  btnText: {
    color: 'white',
    marginLeft: 10,
  },
});
