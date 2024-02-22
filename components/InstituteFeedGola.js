import {Image, StyleSheet, Button, Text, View} from 'react-native';
import React from 'react';
import {useGlobalState} from '../GlobalProvider';
const InstituteFeedGola = ({value, props}) => {
  const {globalState, translation,newTranslation, notifications, setGlobalState} =
  useGlobalState();
  return (
    <View style={styles.main}>
      <Text
        style={{
          position: 'absolute',
          top: 20,
          zIndex:1,
          left:20,
          fontSize: 10,
          backgroundColor: '#007BFF',
          width: 60,
          textAlign: 'center',
          padding: 3,
          borderRadius: 4,
          color: '#fff',
        }}>
        Institute
      </Text>
      {value?.profileImage ? (
        <Image
          source={{
            uri: value?.profileImageUrl,
          }}
          style={{
            height: 200,
            width: '100%',
            borderRadius: 5,
            resizeMode: 'contain',
            borderWidth: 0.5,
            borderColor: 'gray',
          }}
        />
      ) : (
        <Image
          source={require('../images/hraDummyIcon.png')}
          style={{
            height: 200,
            width: '100%',
            borderRadius: 5,
            resizeMode: 'contain',
            borderWidth: 0.5,
            borderColor: 'gray',
          }}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 8,
        }}>
        <Text style={{color: '#000',width:180, fontSize: 15}}>
          {value?.instituteName}
        </Text>
        <Button
          title={newTranslation.view}
          onPress={() =>
            props.navigation.navigate(
              'Get Institute By Id',
              (instituteDetails = value),
            )
          }
        />
      </View>
    </View>
  );
};

export default InstituteFeedGola;

const styles = StyleSheet.create({
  main: {
    padding: 12,
    borderRadius: 3,
    backgroundColor: '#fff',
    elevation: 4,
    marginVertical: 20,
  },
});
