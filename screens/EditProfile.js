import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';
const EditProfile = () => {
  return (
    <ScrollView style={styles.main}>
      <View style={styles.body}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Pressable>
            <Image source={require('../images/circle.png')} />
            <Text
              style={{
                color: '#035292',
                marginTop: 5,
                textDecorationLine: 'underline',
              }}>
              Edit Profile Pic
            </Text>
          </Pressable>
          <View style={{marginLeft: 20}}>
            <Text style={styles.heading}>Shubham Singh</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={require('../images/maleIcon.png')} />
              <Text style={styles.heading}>Male</Text>
            </View>
            <Text style={styles.heading}>776042085</Text>
            <Text style={styles.heading}>hittheshubham1810@...</Text>
          </View>
        </View>
        <View>
          <View style={styles.picker}>
            <Picker
              //   selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {}}>
              <Picker.Item
                label="Are you intrested in international migration ?"
                value=""
                style={{color: 'gray'}}
              />
              <Picker.Item label="Yes" value="Yes" style={{color: 'gray'}} />
              <Picker.Item label="No" value="No" style={{color: 'gray'}} />

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
          <View style={styles.picker}>
            <Picker
              //   selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {}}>
              <Picker.Item
                label="Are you intrested in international migration ?"
                value=""
                style={{color: 'gray'}}
              />
              <Picker.Item label="Yes" value="Yes" style={{color: 'gray'}} />
              <Picker.Item label="No" value="No" style={{color: 'gray'}} />

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
          <View style={styles.picker}>
            <Picker
              //   selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {}}>
              <Picker.Item
                label="Are you intrested in international migration ?"
                value=""
                style={{color: 'gray'}}
              />
              <Picker.Item label="Yes" value="Yes" style={{color: 'gray'}} />
              <Picker.Item label="No" value="No" style={{color: 'gray'}} />

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
          <View style={styles.picker}>
            <Picker
              //   selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {}}>
              <Picker.Item
                label="Are you intrested in international migration ?"
                value=""
                style={{color: 'gray'}}
              />
              <Picker.Item label="Yes" value="Yes" style={{color: 'gray'}} />
              <Picker.Item label="No" value="No" style={{color: 'gray'}} />

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
          <View style={styles.picker}>
            <Picker
              //   selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {}}>
              <Picker.Item
                label="Are you intrested in international migration ?"
                value=""
                style={{color: 'gray'}}
              />
              <Picker.Item label="Yes" value="Yes" style={{color: 'gray'}} />
              <Picker.Item label="No" value="No" style={{color: 'gray'}} />

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
          <View style={styles.picker}>
            <Picker
              //   selectedValue={formData.empRelocationIntQ}
              onValueChange={(itemValue, itemIndex) => {}}>
              <Picker.Item
                label="Are you intrested in international migration ?"
                value=""
                style={{color: 'gray'}}
              />
              <Picker.Item label="Yes" value="Yes" style={{color: 'gray'}} />
              <Picker.Item label="No" value="No" style={{color: 'gray'}} />

              {/* Add more Picker.Item as needed */}
            </Picker>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    padding: 18,
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 18,
    backgroundColor: 'white',
  },
  heading: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 15,
    fontFamily: '600',
    marginVertical: 1,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    width: '100%',
    marginBottom: 18,
    backgroundColor: 'white',
  },
});
