import {StyleSheet, Image, TouchableOpacity, Text, View, Button} from 'react-native';
import {useState, useEffect} from 'react';
import {appliedJobById} from '../services/job.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AppliedJobById = props => {
  const [appliedJobDetails, setAppliedJobDetails] = useState();
  const getAppliedJobById = async id => {
    console.warn(id.id);
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await appliedJobById(id.id, JSON.parse(user).access_token);
      setAppliedJobDetails(response.data.job);
      console.log(response.data.job)
    } catch (error) {}
  };
  useEffect(() => {
    getAppliedJobById(props.route.params);
  }, []);
  return (
    <View style={styles.main}>
      <View style={{marginTop:0}}>
      <Text style={[styles.heading,]}>{appliedJobDetails?.jobTitle}</Text>       
        <View
          style={{
            flexDirection: 'row',
            // alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={[styles.companyName, {maxWidth: 150, flexWrap: 'wrap'}]}>
              {appliedJobDetails?.jobCompany}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Image
                source={{
                  uri: `https://overseas.ai/storage/uploads/countryFlag/${appliedJobDetails?.countryFlag}`,
                }}
                style={{
                  marginRight: 8,
                  height: 26,
                  width: 26,
                  borderRadius: 13,
                }}
              />
              <Text style={styles.countryText}>
                {appliedJobDetails?.jobCountry}
              </Text>
            </View>
            <Text style={styles.currency}>
              {appliedJobDetails?.jobWages}{' '}
              {appliedJobDetails?.jobWagesCurrencyType}
            </Text>
            <Button title="View Details" color="#035292" onPress={()=>{props.navigation.navigate('Job Details', {jobId: appliedJobDetails.mainJobId})}}/>
          </View>
          <View>
            <Image
              style={{
                
                height: 120,
                width: 120,
                marginVertical: 10,
                borderRadius: 10,
              }}
              source={{
                uri: appliedJobDetails?.jobPhoto,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight:10
          }}>
          <Text style={styles.date}>
            Applied on - {appliedJobDetails?.appliedOn}
          </Text>
        </View> 
      </View>
      <View style={{marginTop: 15}}>
        <Text style={styles.countryText}>Status</Text>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <View style={[styles.highlight, styles.backgroundColorGreen]}></View>
          <Text style={styles.textGreen}>Application Sent to HRA</Text>
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.highlight}></View>
          <Text>Interview Scheduled</Text>
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.highlight}></View>
          <Text>Selected or Rejected</Text>
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.highlight}></View>
          <Text>Pay Caution Money</Text>
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.highlight}></View>
          <Text>Upload Documents</Text>
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.highlight}></View>
          <Text>Visa Relised</Text>
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.highlight}></View>
          <Text>Apply for caution money</Text>
        </View>
        <View style={styles.grayDot}></View>
        <View style={styles.grayDot}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.highlight}></View>
          <Text>Caution Money Repay</Text>
        </View>
      </View>
    </View>
  );
};

export default AppliedJobById;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
    flex: 1,
    padding: 18,
  },
  heading: {
    color: '#0F0C0C',
    fontSize: 24,
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
