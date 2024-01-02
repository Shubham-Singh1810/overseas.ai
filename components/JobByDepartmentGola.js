import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';

const JobByDepartmentGola = ({value}) => {
  console.log('hello', value);
  return (
    <View style={styles.main}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Image
          style={{height: 180, width: 180, borderRadius: 10}}
          // source={uri(value.jobPhoto)}
          source={{
            uri: value.jobPhoto,
          }}
        />
        <View>
          <Text style={styles.dateText}>
            Apply Before : {value?.jobDeadline}
          </Text>
          <Text style={styles.countryName}>
             {value?.country_location}
          </Text>
        </View>
      </View>
      <View style={styles.navTop}>
        <Text style={styles.jobName}>{value?.jobTitle}</Text>
      </View>
    </View>
  );
};

export default JobByDepartmentGola;

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#B3B3B3',

    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  newText: {
    backgroundColor: 'maroon',
    paddingHorizontal: 10,
    color: 'white',
    borderRadius: 4,
    fontFamily: 'monospace',
    margin: 5,
  },
  navTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  jobName: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: '500',
    fontFamily: 'Noto Sans',
    color: '#000',
  },
  dateText: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Noto Sans',
    color: '#F00',
  },
  currencyText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Noto Sans',
    color: '#000',
    marginBottom: 3,
  },
  countryName: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Noto Sans',
    color: '#000',
  },
  messageText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Noto Sans',
    color: '#F00',
    marginBottom: 14,
  },
  boldText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Noto Sans',
    color: '#000',
    marginTop: 8,
    marginBottom: 4,
  },
  lightText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Noto Sans',
    color: '#000',
  },
  marginFix: {
    marginTop: -6,
    marginBottom: 6,
  },
  dot: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#000',
    marginHorizontal: 8,
  },
  modalMain: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    width: 350,
    borderColor: '#CCC',
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  modelText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Noto Sans',
  },
  docText: {
    marginVertical: 5,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Noto Sans',
    color: '#000',
  },
});
