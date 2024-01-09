import {
  Pressable,
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
} from 'react-native';
import React from 'react';
import {useGlobalState} from '../GlobalProvider';
import FooterNav from '../components/FooterNav';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Help = props => {
  const {translation} = useGlobalState();
  return (
    <View style={styles.main}>
      <View >
        <Text style={styles.headingText}>Have a query? Let’s Solve this</Text>
        <TextInput
          style={styles.inputBox}
          placeholder="Subject*"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top" 
        />
        <TextInput
          style={styles.inputBox}
          placeholder="Write your query here"
          multiline={true}
          numberOfLines={8}
          textAlignVertical="top" 
        />
        <View style={{flexDirection:"row", justifyContent:"space-between", marginVertical:12, alignItems:"center"}}>
          <TouchableOpacity style={[styles.btn, {marginRight:10}]}>
            <Image source={require("../images/play_circle_outline.png")}/>
            <Text style={styles.btnText}>Upload Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, {marginLeft:10}]}>
            <Image source={require("../images/mic.png")}/>
            <Text style={styles.btnText}>Upload Audio</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
          <View style={{flexDirection:"row",marginTop:50, justifyContent:"center"}}>
            <Text style={{color:"#000"}}>Need</Text><Text onPress={() => props.navigation.navigate('Support')} style={{color:"#035292", marginHorizontal:7,textDecorationLine:"underline"}}>Support?</Text>
          </View>
      </View>
    </View>
  );
};

export default Help;

const styles = StyleSheet.create({
  main: {
    // padding: 15,
    backgroundColor: 'white',
    flex: 1,
    alignItems:"center",
    justifyContent: 'center',
    
  },
  headingText:{
    fontFamily:" Noto Sans Arabic",
    fontWeight:"500",
    fontSize:16,
    color:"#00111F",
    textAlign:"center",
    marginBottom:35
  },
  inputBox: {
    borderWidth: 1,
    borderColor:"#8598A7",
    marginVertical:12,
    padding:10,
  },
  btn:{
    backgroundColor:"#035292",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20,
    paddingVertical:11,
  },
  submitBtn:{
    backgroundColor:"#035292",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal:20,
    paddingVertical:11,
    marginHorizontal:85,
    marginVertical:12
  },
  btnText:{
    color:"white",
    marginLeft:10
  }
});
