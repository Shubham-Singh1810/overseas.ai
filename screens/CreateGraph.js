import {StyleSheet, Text, View, TextInput, Button, ScrollView} from 'react-native';
import React from 'react';

const CreateGraph = () => {
  const input = [
    {label: 'Enter department'},
    {label: 'Enter skill'},
    {label: 'Enter year of experience'},
    {label: 'Enter preferred job location'},
    {label: 'Enter current salary'},
    {label: 'Enter your age'},
  ];
  return (
    <View style={styles.main}>
      <Text style={{color: 'black', fontSize: 18}}>
        Create your customise career graph with overseas.ai
      </Text>
      <ScrollView>
      {input?.map((v, i) => {
        return (
          <View style={{marginTop:20}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: 'black',
                  position: 'relative',
                  paddingHorizontal: 5,
                  top: 9,
                  left: 10,
                  backgroundColor: 'white',
                  zIndex: 1,
                  fontSize: 15,
                }}>
                {v.label}
              </Text>
            </View>
            <TextInput
              style={{borderWidth: 1, borderColor: 'gray', borderRadius: 4}}
              placeholder=""
              placeholderTextColor="gray"
            />
          </View>
        );
      })}
      </ScrollView>
      
      <Button title="Submit" color="#1877F2"/>
    </View>
  );
};

export default CreateGraph;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
});
