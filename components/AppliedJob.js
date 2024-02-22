import {StyleSheet, Text, Image, View, TouchableOpacity, Pressable} from 'react-native';
import {useState} from 'react';
import {useGlobalState} from '../GlobalProvider';
const AppliedJob = ({props, value}) => {
  const {translation, newTranslation} = useGlobalState();
  const showStatusMessage =(value)=>{
    if(value==0){
      return newTranslation?.applicationRejected
     }
     if(value==1){
      return newTranslation?.applicationInProgress
     }
     if(value==2){
      return newTranslation?.medicalAndPccUploaded
     }
     if(value==3){
      return newTranslation?.applicationSentToHr
     }
     if(value==4){
      return newTranslation?.visaAndTicketReleased
     }
     if(value==5){
      return newTranslation?.placed
     }
  }
  return (
    <View style={styles.main}>
      <View>
        <Pressable
        onPress={() =>
          props.navigation.navigate('Applied Job By Id', {id: value?.id})
        }
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[styles.heading]}>
            {value?.jobTitle.length > 15 ? (
              <>{value?.jobTitle?.substring(0, 15)}...</>
            ) : (
              value?.jobTitle
            )}
          </Text>
          <Text style={styles.date}>
            {newTranslation.appliedOn} - {value?.appliedOn}
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={[styles.companyName, {maxWidth: 150, flexWrap: 'wrap'}]}>
              {value?.jobCompany}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Image
                source={{
                  uri: `https://overseas.ai/storage/uploads/countryFlag/${value?.countryFlag}`,
                }}
                style={{
                  marginRight: 8,
                  height: 26,
                  width: 26,
                  borderRadius: 13,
                }}
              />
              <Text style={styles.countryText}>{value?.jobCountry}</Text>
            </View>
            <Text style={styles.currency}>
              {value?.jobWages} {value?.jobWagesCurrencyType}
            </Text>
          </View>
          <View>
            <Image
              style={{
                height: 80,
                width: 80,
                marginBottom: 10,
                borderRadius: 10,
              }}
              source={{
                uri: value?.jobPhoto,
              }}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.countryText}>{newTranslation?.status} : </Text>
            <Text style={value?.interviewStatus==0? {color:"red"}: styles.textGreen}>{showStatusMessage(value?.interviewStatus)}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Applied Job By Id', {id: value?.id})
            }>
            <Text
              style={{
                backgroundColor: '#035292',
                borderRadius: 4,
                color: 'white',
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}>
              {newTranslation?.view}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AppliedJob;

const styles = StyleSheet.create({
  main: {
    padding: 15,
    borderColor: '#B3B3B3',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  heading: {
    color: '#0F0C0C',
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Nato Sans',
  },
  date: {
    color: '#000',
    fontSize: 10,
    fontWeight: '300',
    fontFamily: 'Nato Sans',
  },
  grayDot: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: 'gray',
    marginRight: 10,
    marginVertical: 3,
    marginLeft: 3,
  },
  highlight: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 7,
    borderColor: 'black',
    borderWidth: 1,
  },
  backgroundColorGreen: {
    backgroundColor: '#4FB988',
  },
  currency: {
    marginVertical: 10,
    color: '#0F0C0C',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Nato Sans',
  },
  countryText: {
    color: '#0F0C0C',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  },

  companyName: {
    color: '#0F0C0C',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
    marginTop: 10,
  },
  textGreen: {
    color: '#4FB988',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  },
});
