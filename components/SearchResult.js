import {
  Image,
  StyleSheet,
  Button,
  Modal,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useState} from 'react';
import {useGlobalState} from '../GlobalProvider';
import {applyJobApi} from '../services/job.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {saveJobById} from '../services/job.service';
const SearchResult = ({value,countryId,countryName,hraId,hraDetails, getListOfSavedJobs, saved, favroite, props , backTo,departmentName, departmentId}) => {
  const [showModal, setShowModal] = useState(false);
  const {translation, newTranslation} = useGlobalState();
  const handleApplyJob = async jobId => {
    try {
      let user = await AsyncStorage.getItem('user');
      let payload = {
        id: jobId,
        'apply-job': '',
      };
      let response = await applyJobApi(payload, JSON.parse(user).access_token);
      if (response?.data?.msg) {
        Toast.show({
          type: 'success',
          text1: response?.data?.msg,
          visibilityTime: 3000,
        });
      }
      if (response?.data?.error) {
        Toast.show({
          type: 'error',
          text1: response?.data?.error,
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        visibilityTime: 3000,
      });
    }
  };
  const handleSaveJob = async jobId => {
    let user = await AsyncStorage.getItem('user');
    try {
      let response = await saveJobById(jobId, JSON.parse(user).access_token);
      if (
        response?.data?.message == 'Job unsaved successfully' ||
        response?.data?.message == 'Job saved successfully'
      ) {
        Toast.show({
          type: 'success', // 'success', 'error', 'info', or any custom type you define
          // position: 'top',
          text1: response?.data?.message,
          visibilityTime: 3000, // Duration in milliseconds
        });
      }
      if (saved) {
        setTimeout(() => {
          getListOfSavedJobs();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  function toTitleCase(inputString) {
    if (inputString && typeof inputString === 'string') {
      let words = inputString.split(' ');
      let titleCaseWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });
      return titleCaseWords.join(' ');
    } else {
      return inputString;
    }
  }
  return (
    <>
      <View style={styles.main}>
        <Pressable
          style={styles.navTop}
          onPress={() =>
            props.navigation.navigate('Job Details', {
              jobId: saved? value?.JobPrimaryId : value.id,
              saved: saved,
              favroite: favroite,
              backTo:backTo,
              countryId:countryId,
              countryName:countryName,
              departmentName:departmentName,
              departmentId:departmentId,
              hraDetails:hraDetails
            })
          }>
          {/* <Text style={styles.jobName}>
            {value?.jobTitle.length > 30 ? (
              <>{toTitleCase(value?.jobTitle).substring(0, 30)}...</>
            ) : (
              toTitleCase(value?.jobTitle)
            )}
          </Text> */}
          <Text style={styles.jobName}>
            {value?.jobTitle.length > 30 ? (
              <>{value?.jobTitle.substring(0, 30)}...</>
            ) : (
              value?.jobTitle
            )}
          </Text>
        </Pressable>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.currencyText}>
            {value?.jobWages} {value?.jobLocationCountry?.currencyName} ={' '}
            {Math.round(
              value?.jobWages * value?.jobLocationCountry?.currencyValue,
            )}{' '}
            INR
          </Text>
          <Text style={styles.dateText}>
            {newTranslation.applyBefore} -{' '}
            {value?.jobDeadline ? value?.jobDeadline : 'No Deadline'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 7,
                marginTop: 3,
              }}>
              <Image
                source={{
                  uri: `https://overseas.ai/storage/uploads/countryFlag/${value?.jobLocationCountry?.countryFlag}`,
                }}
                style={{height: 20, width: 20}}
              />
              <Text style={[{marginLeft: 9}, styles.otherDetail]}>
                {favroite || saved
                  ? value?.jobCountry
                  : value?.country_location}
              </Text>
            </View>
            <Text style={styles.countryName}>
              {/* {translation.experience} - 3 {translation.years} */}
              {newTranslation?.ageLimit} : {value.jobAgeLimit}
            </Text>
            <Text style={styles.countryName}>
              {/* {translation.experience} - 3 {translation.years} */}
              {newTranslation?.passportType} : {value.passportType}
            </Text>
            <Text style={styles.countryName}>
              {/* {translation.experience} - 3 {translation.years} */}
              {newTranslation?.experieceType} : {value.jobExpTypeReq}
            </Text>
          </View>
          <View style={{marginTop: 'auto', paddingBottom: 15}}>
            <View>
              <Image
                style={{
                  height: 90,
                  width: 90,
                  marginBottom: 10,
                  borderRadius: 5,
                }}
                source={{
                  uri: value?.jobPhoto,
                }}
              />
            </View>
            {favroite && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  position: 'relative',
                  bottom: 98,
                  right: 5,
                }}>
                <Image
                  style={{
                    padding: 5,
                    borderRadius: 12,
                    backgroundColor: '#fff',
                    height: 15,
                    width: 15,
                    resizeMode: 'contain',
                  }}
                  source={require('../images/starIcon.png')}
                />
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: favroite ? -35 : -20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Button
              title={newTranslation.applyNow}
              onPress={() => handleApplyJob(value?.id)}
            />
            <Text
              style={{marginLeft: 13, color: '#5F90CA', fontSize: 12}}
              onPress={() =>
                props.navigation.navigate('Job Details', {
                  jobId: saved? value?.JobPrimaryId : value.id, backTo:backTo,countryId:countryId,
                  countryName:countryName,
                  departmentName:departmentName,
                   departmentId:departmentId,
                   hraDetails:hraDetails
                })
              }>
              {translation.readDetails}
            </Text>
          </View>
          <View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  handleSaveJob(saved ? value?.JobPrimaryId : value?.id)
                }>
                {saved ? (
                  <Image
                    source={require('../images/redHeart.png')}
                    style={{resizeMode: 'contain'}}
                  />
                ) : (
                  <Image
                    source={require('../images/emptyHeart.png')}
                    style={{resizeMode: 'contain'}}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.modalMain}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Image
                source={require('../images/correctIcon.png')}
                style={{height: 90, width: 90}}
              />
            </View>
            <View style={{marginTop: 15, marginBottom: 10}}>
              <Text style={styles.modelText}>Congratulations !!! </Text>
              <Text style={styles.modelText}>
                {' '}
                You have successfully applied for the job.
              </Text>
            </View>
            <View>
              <Text style={{color: '#4FB988', fontSize: 12, marginBottom: 5}}>
                We have sent your:
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Image source={require('../images/cvImage.png')} />
                  <Text style={styles.docText}>CV</Text>
                </View>
                <View>
                  <Image source={require('../images/passwordImg.png')} />
                  <Text style={styles.docText}>Passport</Text>
                </View>
                <View>
                  <Image source={require('../images/docImg.png')} />
                  <Text style={styles.docText}>Experie....</Text>
                </View>
              </View>
            </View>
            <View style={{marginTop: 15}}>
              <Button title="Done" onPress={() => setShowModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  main: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 5,
    paddingVertical: 15,
  },
  newText: {
    paddingHorizontal: 5,
    color: 'maroon',
    borderWidth: 0.5,
    borderRadius: 4,
    fontFamily: 'monospace',
    marginTop: 10,
    fontSize: 12,
  },
  navTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  jobName: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Noto Sans',
    color: '#000',
  },
  dateText: {
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Noto Sans',
    color: 'green',
  },
  currencyText: {
    fontSize: 14,
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
    marginBottom: 2,
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
