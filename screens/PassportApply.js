import {Button, StyleSheet, TextInput, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
const PassportApply = () => {
  return (
    <View style={styles.main}>
      <View style={{flex: 1}}>
        <WebView
          source={{uri: 'https://portal2.passportindia.gov.in/AppOnlineProject/online/pccOnlineApp'}}
          style={{flex: 1}}
        />
      </View>
    </View>
  );
}

export default PassportApply

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