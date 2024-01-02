import {Image, StyleSheet, Text, Pressable, View} from 'react-native';
import React from 'react';
import { useGlobalState } from '../GlobalProvider';

const FooterNav = ({props}) => {
  const {translation } = useGlobalState();
  return (
    <View style={styles.main}>
      <Pressable onPress={() => props.navigation.navigate('Home')}>
        <View style={styles.navItem}>
          <Image source={require('../images/homeIcon.png')} />
          <Text style={styles.navText}>{translation.home}</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => props.navigation.navigate('Video')}>
        <View style={styles.navItem}>
          <Image source={require('../images/videoIcon.png')} />
          <Text style={styles.navText}>{translation.video}</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => props.navigation.navigate('JobApplied')}>
        <View style={styles.navItem}>
          <Image source={require('../images/jobIcon.png')} />
          <Text style={styles.navText}>{translation.jobApplied}</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => props.navigation.navigate('Documents')}>
        <View style={styles.navItem}>
          <Image source={require('../images/documentIcon.png')} />
          <Text style={styles.navText}>{translation.documents}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default FooterNav;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 8,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 10
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#B3B3B3',
    fontSize: 10,
    fontFamily: 'Noto Sans',
    lineHeight: 16,
    fontWeight: '400',
  },
});
