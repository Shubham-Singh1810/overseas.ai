import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Image, Text, Animated, View} from 'react-native';

const Welcome = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const [brandName, setBrandName] = useState('');
  const[width, setWidth]=useState(0)
  const getBrandName = () => {
    let name = 'verseas.ai';
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
    setTimeout(() => {
      setWidth(2.5)
    }, 1500);
  };
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ).start();
    getBrandName();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 0.5 , 1],
    outputRange: ['0deg', "180deg", '360deg'],
  });

  const scale = spinValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1.3],
  });

  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom:0,
          paddingHorizontal:5

        }}>
        <Animated.View style={{transform: [{rotate: spin}, {scale: scale}]}}>
          <Image
            source={require('../images/overseas-wrold.gif')}
            style={{height: 30, width: 30}}
          />
        </Animated.View>
        <Text style={styles.text}>{brandName}</Text>
      </View>
    </View>
  );
};

export default Welcome;

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
