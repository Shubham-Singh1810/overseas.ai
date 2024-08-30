import {StyleSheet,TouchableOpacity, Image, Text, View} from 'react-native';
import React from 'react';

const CountryGola = ({value, props}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Jobs By Country', {
          countryId: value?.id,
          countryName: value?.name,
        })
      }>
      <View style={{marginRight: 25, marginTop: 20}}>
        <View style={{borderWidth:.5,borderColor:"gray", borderRadius: 40, }}>
        <Image
          source={{
            uri: `https://backend.overseas.ai/storage/uploads/countryFlag/${value?.countryFlag}`,
          }}
          style={{height: 80, width: 80, borderRadius: 40}}
        />
        </View>
        
        <Text numberOfLines={value?.name?.length>13 ? 1: 2} style={[styles.countryName, {width:80, overflow:"hidden"}]}>{value?.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CountryGola;

const styles = StyleSheet.create({
  countryName: {
    marginTop: 5,
    textAlign: 'center',
    color: '#000',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  },
});
