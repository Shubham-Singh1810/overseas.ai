import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MyCertificate = props => {
  return (
    <View style={styles.main}>
      <Text style={styles.nameText}>
        List of all Certificate you have recived
      </Text>
      <View
        style={{
          height: 500,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Text style={styles.messageText}>
            You haven't recived any {'\n'} certificate yet!
          </Text>
          <Pressable onPress={() => props.navigation.navigate('Get Certificate')}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                textDecorationLine: 'underline',
                color: '#035292',
              }}>
              Get certified{' '}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MyCertificate;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
    padding: 18,
  },
  nameText: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 16,
    fontWeight: '500',
  },
  messageText: {
    // color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
});
