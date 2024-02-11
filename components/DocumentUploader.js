import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';

const DocumentUploader = ({showPopup, type, name, apiUrl}) => {
  return (
    <Modal transparent={true} visible={showPopup} animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View style={styles.modalMain}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom:15
            }}>
            <Text style={{fontSize:20, color:"black", fontWeight:"600"}}>Upload {name}</Text>
            <Image source={require('../images/close.png')} />
          </View>

          <TouchableOpacity
            style={styles.input}
            //   onPress={pickMediaForWorkVideo}
          >
            <Text>Choose File</Text>
          </TouchableOpacity>

          <Button title="Save" color="#035292" />
        </View>
      </View>
    </Modal>
  );
};

export default DocumentUploader;

const styles = StyleSheet.create({
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 18,
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  modalMain: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: 350,
    borderColor: '#CCC',
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
});
