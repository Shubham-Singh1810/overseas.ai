import {
  StyleSheet,
  Text,
  Modal,
  Image,
  Pressable,
  Button,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import React, {useEffect, useState} from 'react';


const MySingleSelectPopUp = ({
  title,
  toggle,
  setToggle,
  inputOption,
  callBackFunck,
  showSearch,
}) => {
    const [showInputOption, setShowInputOption] = useState(inputOption);
    useEffect(()=>{
        setShowInputOption(inputOption)
    },[inputOption])
    const [selectedInput, setSelectedInput] = useState("");
    const [searchKey, setSearchKey] = useState('');
    const handleSubmit = () => {
      callBackFunck(selectedInput);
      setToggle(false); 
      setSearchKey('');
      setShowInputOption(inputOption);
    };
   
    
    const handleSearch = text => {
      setSearchKey(text);
      let filteredArray = inputOption?.filter(v => {
        return v.label.toLowerCase().includes(text.toLowerCase());
      });
      setShowInputOption(filteredArray);
    };
  return (
    <Modal transparent={true} visible={toggle}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0, 0, 0.5)',
        }}>
        <View
          style={{
            width: 330,
            borderRadius: 10,
            paddingBottom: 20,
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              paddingHorizontal: 20,
              paddingVertical: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: '500', fontSize: 20}}>{title}</Text>
            <TouchableOpacity
              onPress={() => {
                setToggle(false);
                // setSearchKey('');
                // setShowInputOption(inputOption);
              }}>
              <Image source={require('../images/close.png')} />
            </TouchableOpacity>
          </View>
          {showSearch && (
            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: 5,
                },
                styles.input,
              ]}>
              <TextInput
                placeholder="Search"
                style={{fontSize: 15, padding: 5}}
                onChangeText={text => handleSearch(text)}
                value={searchKey}
              />
              <Image
                source={require('../images/searchIcon.png')}
                style={{height: 20, width: 20, resizeMode: 'contain'}}
              />
            </View>
          )}
          <ScrollView style={{maxHeight:500}}>
          {showInputOption?.map((v, i) => {
            return (
              <View>
                <Pressable
                  onPress={() =>{setSelectedInput(v.value)} }
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 18, color: 'black'}}>{v.label}</Text>
                  <View
                    style={[
                      {
                        height: 15,
                        width: 15,
                        borderRadius: 7.5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                      },
                      selectedInput==v?.value && styles.backgroundBlue,
                    ]}></View>
                </Pressable>
              </View>
            );
          })}
          </ScrollView>
          

          <View style={{marginHorizontal: 18, marginTop: 10}}>
            <Button title="Save" onPress={handleSubmit}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MySingleSelectPopUp;

const styles = StyleSheet.create({
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  backgroundBlue: {
    backgroundColor: '#5F90CA',
  },
});
