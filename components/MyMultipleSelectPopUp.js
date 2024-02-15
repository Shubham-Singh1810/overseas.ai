import {
  StyleSheet,
  Text,
  Modal,
  Image,
  Pressable,
  Button,
  View,
  TouchableOpacity,
} from 'react-native';
import React,{useState} from 'react';
const MyMultipleSelectPopUp = ({
  title,
  toggle,
  setToggle,
  inputOption,
  callBackFunck,
}) => {
  const [selectedInput, setSelectedInput]=useState([]);
  const handleInputSelect = input => {
    if (selectedInput.includes(input)) {
      const updatedInput = selectedInput.filter(
        inp => inp !== input,
      );
      setSelectedInput(updatedInput);
    } else {
        setSelectedInput([...selectedInput, input],
      );
    }
  };
  const handleSubmit=()=>{
    callBackFunck(selectedInput);
    setToggle(false);
  }
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
                //   setFormData({...formData, empLanguage: []});
                setToggle(false);
              }}>
              <Image source={require('../images/close.png')} />
            </TouchableOpacity>
          </View>
          {inputOption?.map((v, i) => {
            return (
              <View key={i}>
                <Pressable
                  onPress={() => handleInputSelect(v?.value)}
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 18, color: 'black'}}>{v?.label}</Text>
                  <View
                    style={[
                      {
                        height: 15,
                        width: 15,
                        borderRadius: 7.5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                      },
                      selectedInput.includes(v?.value) &&
                        styles.backgroundBlue,
                    ]}></View>
                </Pressable>
              </View>
            );
          })}

          <View style={{marginHorizontal: 18, marginTop: 10}}>
            <Button
              title="Save"
              onPress={handleSubmit}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MyMultipleSelectPopUp;

const styles = StyleSheet.create({
    backgroundBlue: {
        backgroundColor: '#5F90CA',
      },
});
