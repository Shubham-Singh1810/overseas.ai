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
        <Image
          source={{
            uri: `https://overseas.ai/storage/uploads/countryFlag/${value?.countryFlag}`,
          }}
          style={{height: 80, width: 80, borderRadius: 40}}
        />
        <Text style={styles.countryName}>{value?.name}</Text>
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
