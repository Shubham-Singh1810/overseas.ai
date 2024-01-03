import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import { useGlobalState } from '../GlobalProvider';
const LanguageSelect = (props) => {
  const { globalState, setGlobalState } = useGlobalState();
  return (
    <View style={styles.main}>
      <View>
        <Text style={styles.languagetext}>Please select your language</Text>
        <Text style={styles.languagetext}>कृपया अपनी भाषा चुनें</Text>
        <Text style={styles.languagetext}>আপনার ভাষা নির্বাচন করুন</Text>
      </View>
      <View style={{marginTop:20}}>
        <TouchableOpacity style={styles.selectBox} onPress={()=>{props.navigation.navigate("Login"); setGlobalState({...globalState, selectedLanguage:"english"})}}>
          <Text style={styles.textCenter}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectBox} onPress={()=>{props.navigation.navigate("Login"); setGlobalState({...globalState, selectedLanguage:"hindi"})}}>
          <Text style={styles.textCenter}>हिंदी </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectBox} onPress={()=>{props.navigation.navigate("Login"); setGlobalState({...globalState, selectedLanguage:"bangla"})}}>
          <Text style={styles.textCenter}>বাংলা</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectBox} onPress={()=>{props.navigation.navigate("CandidateDetails1"); }}>
          <Text style={styles.textCenter}>Step 1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LanguageSelect;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F5F5FA',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languagetext: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Noto Sans',
    fontSize: 16,
    marginBottom:17
  },
  textCenter:{
    textAlign:"center"
  },
  selectBox:{
    borderWidth:1,
    borderColor:"rgba(167, 167, 167, 0.50)",
    padding:12,
    borderRadius:5,
    width:250,
    marginBottom:35
  }
});
