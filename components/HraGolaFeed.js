import {StyleSheet, Image, Text, View, Button} from 'react-native';
import React from 'react';
import {useGlobalState} from '../GlobalProvider';
const HraGolaFeed = ({value, props}) => {
  const {globalState, translation,newTranslation, notifications, setGlobalState} =
    useGlobalState();
  const renderStars = numRatings => {
    const stars = [];
    for (let i = 0; i < numRatings; i++) {
      stars.push(
        <Image
          key={i}
          source={require('../images/starIcon.png')} // You might need to adjust the source based on your project structure
          style={{width: 20, height: 20, resizeMode: 'contain'}}
        />,
      );
    }
    return stars;
  };
  return (
    <View style={styles.main}>
      <View style={[styles.hraBox]}>
      <Text
        style={{
          position: 'absolute',
          top: 10,
          zIndex:1,
          left:10,
          fontSize: 10,
          backgroundColor: 'gold',
          width: 60,
          textAlign: 'center',
          padding: 3,
          borderRadius: 4,
          color: '#000',
        }}>
        HRA
      </Text>
        {value?.cmpLogoS3 != 'placeholder/logo.png' ? (
          <Image
            source={{
              uri: value?.cmpLogoS3,
            }}
            style={{
              height: 200,
              width: '100%',
              borderRadius: 2,
              resizeMode: 'stretch',
            }}
          />
        ) : (
          <Image
            source={require('../images/hraDummyIcon.png')}
            style={{
              height: 200,
              width: '100%',
              borderRadius: 2,
              resizeMode: 'stretch',
            }}
          />
        )}
        <View>
          <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginVertical: 8 }}>
            <Text style={{color: '#000',width:180, fontSize: 15}}>
            {value?.cmpName}
            </Text>
            <Button title={newTranslation?.view} onPress={() =>
                      props.navigation.navigate(
                        'DetailedHra',
                        (detailedHra = value),
                      )
                    }/>
          </View>
          
          <Text style={styles.experience}>{newTranslation?.since} {value?.cmpWorkingFrom}</Text>
          <View style={{flexDirection: 'row', marginTop: -3}}>
            {renderStars(value?.cmpRating)}
          </View>
        </View>
      </View>
    </View>
  );
};

export default HraGolaFeed;

const styles = StyleSheet.create({
  main: {
    padding: 12,
    borderRadius: 3,
    backgroundColor: '#fff',
    elevation: 4,
    marginVertical:20
  },
  experience: {
    fontSize: 10,
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    color: '#6F6F6F',
  },
  name: {
    fontSize: 15,
    fontFamily: 'Noto Sans',
   
    fontWeight: '400',
    color: 'black',
  },
});
