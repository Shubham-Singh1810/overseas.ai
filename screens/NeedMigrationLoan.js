import {StyleSheet,Button, Text, TextInput, View, ScrollView} from 'react-native';
import React from 'react';

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
        <TextInput placeholder="Applicant Name" style={styles.input} />
        <TextInput placeholder="Applicant Phone Number" style={styles.input} />
        <TextInput placeholder="Applicant Name" style={styles.input} />
        <TextInput placeholder="Applicant Name" style={styles.input} />
        <TextInput placeholder="Applicant Name" style={styles.input} />
        <TextInput placeholder="Applicant Name" style={styles.input} />
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
});
