import {
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {getHraList} from '../services/hra.service';
import {TextInput} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import {useFocusEffect} from '@react-navigation/native';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
import {useGlobalState} from '../GlobalProvider.js'
const YourHra = props => {
  useAndroidBackHandler(() => {
    props.navigation.navigate("Home") 
    return true;
  });
  const [showModal, setShowModal] = useState(false);
  const {newTranslation} = useGlobalState()
  const [hraList, setHraList] = useState([]);
  const getHraFunc = async () => {
    setShowLoader(true)
    try {
      let response = await getHraList();
      setHraList(response?.data?.cmpData);
    } catch (error) {
      console.log(error);
    }
    setShowLoader(false)
  };
  const [searchKey, setSearchKey] = useState('');
  const [ratingOrd, setRatingOrd] = useState('');
  const [sinceOrd, setSinceOrd] = useState('');
  const [nameOrd, setNameOrd] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      getHraFunc();
    }, []),
  );
  const [filteredArray, setFilteredArray] = useState([]);
  const searchResultFunc = key => {
    if (key.length != 0) {
      setFilteredArray(
        hraList.filter(item =>
          item?.cmpName.toLowerCase().includes(key.toLowerCase()),
        ),
      );
    } else {
      setFilteredArray(hraList);
    }
  };
  const alphaSort = order => {
    setShowModal(false);
    setSearchKey('');
    setSinceOrd('');
    setRatingOrd('');
    if (order == 'asc') {
      setHraList(hraList.sort((a, b) => a.cmpName.localeCompare(b.cmpName)));
    } else if (order == 'desc') {
      setHraList(hraList.sort((b, a) => a.cmpName.localeCompare(b.cmpName)));
    } else {
      setFilteredArray(hraList);
    }
  };
  const ratingSort = order => {
    setShowModal(false);
    setSearchKey('');
    setNameOrd('');
    setSinceOrd('');
    if (order == 'asc') {
      setHraList(
        hraList.sort((a, b) => {
          const ratingA = a.cmpRating || ''; // Use an empty string if cmpRating is null
          const ratingB = b.cmpRating || '';

          return ratingA.localeCompare(ratingB);
        }),
      );
    } else if (order == 'desc') {
      setHraList(
        hraList.sort((b, a) => {
          const ratingA = a.cmpRating || ''; // Use an empty string if cmpRating is null
          const ratingB = b.cmpRating || '';

          return ratingA.localeCompare(ratingB);
        }),
      );
    } else {
      setFilteredArray(hraList);
    }
  };
  const sinceSort = order => {
    setShowModal(false);
    setSearchKey('');
    setNameOrd('');
    setRatingOrd('');
    if (order == 'asc') {
      setHraList(
        hraList.sort((a, b) => {
          // Handle null values for cmpWorkingFrom
          const workingFromA = a.cmpWorkingFrom || '0000-00-00'; // Use a default date if cmpWorkingFrom is null
          const workingFromB = b.cmpWorkingFrom || '0000-00-00';

          // Compare dates
          return workingFromA.localeCompare(workingFromB);
        }),
      );
    } else if (order == 'desc') {
      setHraList(
        hraList.sort((b, a) => {
          // Handle null values for cmpWorkingFrom
          const workingFromA = a.cmpWorkingFrom || '0000-00-00'; // Use a default date if cmpWorkingFrom is null
          const workingFromB = b.cmpWorkingFrom || '0000-00-00';

          // Compare dates
          return workingFromA.localeCompare(workingFromB);
        }),
      );
    } else {
      setFilteredArray(hraList);
    }
  };
  const renderStars = numRatings => {
    const stars = [];
    for (let i = 0; i < numRatings; i++) {
      stars.push(
        <Image
          key={i}
          source={require('../images/starIcon.png')} // You might need to adjust the source based on your project structure
          style={{width: 20, height: 20, resizeMode: 'contain'}}
        />,
      );
    }
    return stars;
  };
  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TextInput
          placeholder={newTranslation?.searchByName}
          placeholderTextColor="gray"
          value={searchKey}
          style={styles.input}
          onChangeText={text => {
            searchResultFunc(text);
            setSearchKey(text);
          }}
        />
        <TouchableOpacity
          style={styles.sortOption}
          onPress={() => setShowModal(!showModal)}>
          <Text style={{color: 'white'}}>{newTranslation?.sortBy}</Text>
          <Image source={require('../images/whiteDownArrow.png')} />
        </TouchableOpacity>
      </View>
      {showModal && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            position: 'relative',
          }}>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              zIndex: 1,
              justifyContent: 'flex-end',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.modalMain}>
                <TouchableOpacity
                  style={[
                    {
                      paddingVertical: 10,
                      paddingLeft: 5,
                      marginBottom: 10,
                      backgroundColor: '#EFF8FF',
                    },
                    ratingOrd !== '' && {
                      borderWidth: 1,
                      borderColor: '#035292',
                      borderRadius: 3,
                    },
                  ]}
                  onPress={() => {
                    ratingSort(ratingOrd == 'asc' ? 'desc' : 'asc');
                    setRatingOrd(ratingOrd == 'asc' ? 'desc' : 'asc');
                  }}>
                  <Text style={{fontWeight: '500', color:"black"}}>
                    {newTranslation?.rating} :{' '}
                    {ratingOrd == 'asc' ? newTranslation?.highToLow : newTranslation?.lowToHigh}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {
                      paddingVertical: 10,
                      paddingLeft: 5,
                      marginBottom: 10,
                      backgroundColor: '#EFF8FF',
                    },
                    sinceOrd !== '' && {
                      borderWidth: 1,
                      borderColor: '#035292',
                      borderRadius: 3,
                    },
                  ]}
                  onPress={() => {
                    sinceSort(sinceOrd == 'asc' ? 'desc' : 'asc');
                    setSinceOrd(sinceOrd == 'asc' ? 'desc' : 'asc');
                  }}>
                  <Text style={{fontWeight: '500', color:"black"}}>
                    {newTranslation?.since} :{' '}
                    {sinceOrd == 'asc'
                      ? newTranslation?.newestToOldest
                      : newTranslation?.oldestToNewest}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {
                      paddingVertical: 10,
                      paddingLeft: 5,
                      marginBottom: 10,
                      backgroundColor: '#EFF8FF',
                    },
                    nameOrd !== '' && {
                      borderWidth: 1,
                      borderColor: '#035292',
                      borderRadius: 3,
                    },
                  ]}
                  onPress={() => {
                    alphaSort(nameOrd == 'asc' ? 'desc' : 'asc');
                    setNameOrd(nameOrd == 'asc' ? 'desc' : 'asc');
                  }}>
                  <Text style={{fontWeight: '500', color:"black"}}>
                    {newTranslation?.name} : {nameOrd == 'asc' ? 'Z To A' : 'A To Z'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
      <View style={{marginHorizontal: -8, marginTop: 10, paddingBottom: 40}}>
        <ScrollView>
          {searchKey && (
            <Text style={styles.searchKey}>
              {newTranslation?.showingResultesFor} : {searchKey}
            </Text>
          )}
          {showLoader ? (
            <View
              style={{
                height:500,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {(searchKey.length == 0 ? hraList : filteredArray).map((v, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() =>
                      props.navigation.navigate(
                        'DetailedHra',
                        (detailedHra = v),
                      )
                    }
                    style={{width: '50%'}}>
                    <View style={[styles.hraBox]}>
                      {v?.cmpLogoS3 != 'placeholder/logo.png' ? (
                        <Image
                          source={{
                            uri: v?.cmpLogoS3,
                          }}
                          style={{
                            height: 100,
                            width: '100%',
                            borderRadius: 2,
                            resizeMode: 'contain',
                          }}
                        />
                      ) : (
                        <Image
                          source={require('../images/hraDummyIcon.png')}
                          style={{
                            height: 100,
                            width: '100%',
                            borderRadius: 2,
                            resizeMode: 'contain',
                          }}
                        />
                      )}

                      <View>
                        <Text style={styles.name}>{v?.cmpName}</Text>
                        <Text style={styles.experience}>
                          {newTranslation?.since} {v?.cmpWorkingFrom}
                        </Text>
                        <View style={{flexDirection: 'row', marginTop: -3}}>
                          {renderStars(v?.cmpRating)}
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default YourHra;

const styles = StyleSheet.create({
  main: {
    padding: 15,
    backgroundColor:"#fff",
    flex:1
  },
  sortOption: {
    width: '25%',
    padding: 5.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#035292',
    borderRadius: 2,
  },
  modalMain: {
    width: 200,
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
    width: '70%',
    padding: 3,
    paddingLeft: 10,
  },
  hraBox: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 10,
    elevation: 10,
  },
  experience: {
    fontSize: 10,
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    color: '#6F6F6F',
  },
  name: {
    fontSize: 11,
    fontFamily: 'Noto Sans',
    marginVertical: 2,
    fontWeight: '400',
    color: 'black',
  },
  searchKey: {
    color: '#000',
    marginLeft: 10,
    marginVertical: 10,
    fontSize: 17,
  },
});
