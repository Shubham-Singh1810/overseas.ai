import { StyleSheet,Modal,TouchableOpacity,Image, Text, View,Button } from 'react-native'
import React from 'react'

const MyFileViewer = ({title, url, toggle, setToggle}) => {
  return (
    <Modal
        transparent={true}
        visible={toggle}
        animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFF',
          }}>
          <View style={styles.modalMain}>
            
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 15,
              }}>
              <Text style={{fontSize: 20, color: 'black', fontWeight: '600'}}>
                 {title}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setToggle(false);
                }}>
                <Image source={require('../images/close.png')} />
              </TouchableOpacity>
            </View>
            <Image source={require("../images/hraDummyIcon.png")} style={{height:300, width:"100%", marginBottom:20}}/>
            <Button title="Save"/>
            </View>
          </View>
       
        
      </Modal>
  )
}

export default MyFileViewer

const styles = StyleSheet.create({
    modalMain:{
        paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: '#fff',
    
    }
})