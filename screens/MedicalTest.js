import {Button, StyleSheet, TextInput, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
const MedicalTest = () => {
  return (
    <View style={styles.main}>
      <View style={{flex: 1}}>
        <WebView
          source={{uri: 'https://wafid.com/book-appointment/'}}
          style={{flex: 1}}
        />
      </View>
    </View>
  );
}

export default MedicalTest

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    flex: 1,
    
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 18,
    backgroundColor: 'white',
  },
  headingText:{
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 17,
    fontFamily: '600',
    marginTop: 10,
    marginBottom: 30,
    textAlign:"center"
  },
  labal:{
    color:"#000",
    marginBottom:5
  }
});