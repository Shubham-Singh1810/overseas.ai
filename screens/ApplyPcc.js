import {Button, StyleSheet, TextInput, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const ApplyPcc = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.headingText}>"Police Clearance Certificate Application Form"</Text>
      <ScrollView>
        <Text style={styles.labal}>Full Name*</Text>
        <TextInput
          value="Shubham Singh"
          style={styles.input}
          editable={false}
        />
        <Text style={styles.labal}>Contact Number*</Text>
        <TextInput value="7762042085" style={styles.input} editable={false} />
        <Text style={styles.labal}>Alternative Number</Text>
        <TextInput
          value=""
          placeholder="Alternative Phone Number"
          style={styles.input}
        />
        <Text style={styles.labal}>Your Email</Text>
        <TextInput value="" placeholder="Email" style={styles.input} />
        <Text style={styles.labal}>Date of Birth</Text>
        <TextInput value="18/10/2001" style={styles.input} editable={false} />
        <Text style={styles.labal}>Police Station</Text>
        <TextInput value="" placeholder="P/O" style={styles.input} />
        <Text style={styles.labal}>Enter Preffered Location</Text>
        <TextInput
          value=""
          placeholder="Preffered Location"
          style={styles.input}
        />
        <Text style={styles.labal}>Why you required PCC?</Text>
        <TextInput value="" placeholder="Required For" style={styles.input} />
        <Button title="Submit" color="#5F90CA" />
      </ScrollView>
    </View>
  );
};

export default ApplyPcc;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    flex: 1,
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
  headingText:{
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 17,
    fontFamily: '600',
    marginTop: 10,
    marginBottom: 30,
    textAlign:"center"
  },
  labal:{
    color:"#000",
    marginBottom:5
  }
});
