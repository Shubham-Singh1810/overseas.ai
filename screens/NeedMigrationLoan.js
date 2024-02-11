import {StyleSheet,Button, Text, TextInput, View, ScrollView} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';
const NeedMigrationLoan = () => {
  return (
    <View style={styles.main}>
      <Text
        style={{
          color: '#333333',
          fontWeight: '500',
          fontSize: 17,
        }}>
        Initiate migration loan application.
      </Text>
      <ScrollView style={{marginVertical:20}}>
      <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                position: 'relative',
                top: 7,
                zIndex: 1,
                left: 7,
                paddingHorizontal: 4,
                backgroundColor: 'white',
                color: 'black',
              }}>
              Applicant Name
            </Text>
          </View>
        <TextInput style={styles.input} />
        <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                position: 'relative',
                top: 7,
                zIndex: 1,
                left: 7,
                paddingHorizontal: 4,
                backgroundColor: 'white',
                color: 'black',
              }}>
              Contact Number
            </Text>
          </View>
        <TextInput  style={styles.input} />
        <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                position: 'relative',
                top: 7,
                zIndex: 1,
                left: 7,
                paddingHorizontal: 4,
                backgroundColor: 'white',
                color: 'black',
              }}>
              Do you have loan garenter
            </Text>
          </View>
          <View style={[styles.picker]}>
            <Picker
              // selectedValue={formData.empMS}
              // onValueChange={(itemValue, itemIndex) => {
              //   setFormData({...formData, empMS: itemValue});
              // }}
              >
              <Picker.Item
                label="Select"
                value=""
                style={{color: 'gray'}}
              />
              <Picker.Item
                label="Yes"
                value="Yes"
                style={{color: 'gray'}}
              />
              <Picker.Item
                label="No"
                value="No"
                style={{color: 'gray'}}
              />

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
        <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                position: 'relative',
                top: 7,
                zIndex: 1,
                left: 7,
                paddingHorizontal: 4,
                backgroundColor: 'white',
                color: 'black',
              }}>
              Gatrenter Name
            </Text>
          </View>
        <TextInput  style={styles.input} />
        <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                position: 'relative',
                top: 7,
                zIndex: 1,
                left: 7,
                paddingHorizontal: 4,
                backgroundColor: 'white',
                color: 'black',
              }}>
              Gatrenter Name
            </Text>
          </View>
        <TextInput  style={styles.input} />
        <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                position: 'relative',
                top: 7,
                zIndex: 1,
                left: 7,
                paddingHorizontal: 4,
                backgroundColor: 'white',
                color: 'black',
              }}>
              Gatrenter Name
            </Text>
          </View>
        <TextInput style={styles.input} />
        <Button title="Submit" color="#035292"/>
      </ScrollView>
    </View>
  );
};
export default NeedMigrationLoan;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    padding: 18,
    flex: 1,
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 18,
    backgroundColor: 'white',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    width: '100%',
    marginBottom: 18,
    backgroundColor: 'white',
    zIndex: -1,
  },
});
