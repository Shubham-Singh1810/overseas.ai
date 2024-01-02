import {Pressable, StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';
import {useGlobalState} from '../GlobalProvider';
import FooterNav from '../components/FooterNav';
const Help = (props) => {
  const {translation} = useGlobalState();
  return (
    <>
    <View style={styles.main}>
      <Text style={styles.text}>{translation.tellUsHowCanWehelpYou}</Text>
      <Pressable
        onPress={() => console.warn('Calling agent')}
        style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View style={styles.button}>
          <Image source={require('../images/whiteMobileIcon.png')} />
          <Text style={styles.btnText}>{translation.callOurAgents}</Text>
        </View>
      </Pressable>
    </View>
      <FooterNav props={props}/>
      </>
  );
};

export default Help;

const styles = StyleSheet.create({
  main: {
    padding: 15,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Noto Sans',
    fontWeight: '600',
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: '#EB4343',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 3,
    flexDirection: 'row',
  },
  btnText: {
    fontSize: 12,
    fontFamily: 'Noto Sans',
    fontWeight: '600',
    color: '#fff',
    marginLeft: 15,
  },
});
