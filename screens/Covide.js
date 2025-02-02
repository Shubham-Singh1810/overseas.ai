import {Image,Linking, StyleSheet, Button, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Pdf from 'react-native-pdf';
import {addCovidCertificateApi} from '../services/user.service';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import DocumentPicker from 'react-native-document-picker';
import { useGlobalState } from '../GlobalProvider';
import {useFocusEffect} from '@react-navigation/native';
const Covid = props => {
  const {newTranslation, translation} = useGlobalState();
  useAndroidBackHandler(() => {
    props.navigation.navigate('My Documents');
    return true;
  });
  const [uri, setUri]=useState(props?.route?.params?.uri);
  useFocusEffect(
    React.useCallback(() => {
        setUri(props?.route?.params?.uri)
    }, [props?.route?.params?.uri]),
  );
  // function to upload covid
  const uploadCovid = async () => {
    let user = await AsyncStorage.getItem('user');
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf], // You can specify the types of documents to pick
      });
      const formData = new FormData();
      formData.append('covidCertificate', {
        uri: result[0].uri,
        type: result[0].type,
        name: result[0].name,
      });
      let response = await addCovidCertificateApi(
        formData,
        JSON.parse(user).access_token,
      );
      if (response.data.msg == 'Covid certificate uploaded successfully.') {
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Covid certificate uploaded successfully.',
          visibilityTime: 3000, // Duration in milliseconds
        });
        setUri(response.data?.covidUrl)
      }
      if (response.data.msg == 'Covid certificate already uploaded.') {
        Toast.show({
          type: 'info', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Covid certificate already uploaded.',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'No file selected',
          visibilityTime: 3000, // Duration in milliseconds
        });
      } else {
        Toast.show({
          type: 'error', // 'success', 'error', 'info', or any custom type you define
          position: 'top',
          text1: 'Internal server error',
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
    }
  };
  const handleFileDownload = async value => {
    Linking.openURL(value)
      .then(supported => {
        if (!supported) {
          console.warn(`Cannot handle URL: ${value}`);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };
  return (
    <View style={styles?.main}>
      <View
        style={{
          borderWidth: 2,
          borderRadius: 15,
          borderColor: 'gray',
          borderStyle: 'dashed',
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Pdf
          trustAllCerts={false}
          source={{
            uri: uri, 
            cache: false,
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link presse: ${uri}`);
          }}
          style={{height: 400, width: 300}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 30,
        }}>
        <View style={{width: '100%'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: '45%'}}>
              <Button title={newTranslation?.download} color="#28a745" onPress={()=>handleFileDownload(uri)}/>
            </View>
            <View style={{width: '45%'}}>
              <Button title={newTranslation?.update} color="#035292" onPress={uploadCovid} />
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.grayText}>{translation.allYourDocumentsAreSafeWithUs}</Text>
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

export default Covid;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 18,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  grayText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Nato Sans',
    marginVertical: 20,
    color: 'black',
  },
});
