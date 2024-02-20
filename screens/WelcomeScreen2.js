import React, {useRef, useState} from 'react';
import {StyleSheet, Image, Text, Animated, View} from 'react-native';
import {useGlobalState} from '../GlobalProvider';
import {useFocusEffect} from '@react-navigation/native';
const WelcomeScreen2 = () => {
  const {globalState} =
    useGlobalState();
  const spinValue = useRef(new Animated.Value(0)).current;
  const [brandName, setBrandName] = useState('');
  const getBrandName = () => {
    let name = 'Welcome, ' + JSON.parse(globalState?.user)?.user?.name;
    let res = '';
    for (let i = 0; i < name.length; i++) {
      // Use a closure to capture the value of i
      setTimeout(
        index => {
          res = res + name[index];
          setBrandName(res);
        },
        i * 50,
        i,
      );
    }
  };
  const [width, setWidth]=useState(0)
  useFocusEffect(
    React.useCallback(() => {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ).start();
      getBrandName();
    }, [spinValue]),
  );
  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 0,
          paddingHorizontal: 5,
        }}>
        <Text style={styles.text}>{brandName}</Text>
      </View>
      
    </View>
  );
};

export default WelcomeScreen2;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#194a81',
    fontSize: 35,
    fontWeight: '700',
    marginLeft: 12,
    marginTop: 0,
  },
});
