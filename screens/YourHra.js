import {
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getHraList} from '../services/hra.service';
import {TextInput} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import {useFocusEffect} from '@react-navigation/native';
const YourHra = props => {
  const [showModal, setShowModal] = useState(false);
  const [hraList, setHraList] = useState([]);
  const hraData = [
    {
      id: '92',
      title: 'AGHA CARAVAN INTERNATIONAL',
      since: '1993',
      industriesServed: [
        'Construction, Operation & Maintenance',
        'Oil & Gas',
        ' Petrochemicals',
      ],
      ratting: [1, 2, 3],
      logoUrl: 'https://www.aghacaravan.com/images/logo-new.png',
    },
    {
      id: '91',
      title: 'F Gheewala Human Resources Consultants',
      since: '1993',
      industriesServed: [
        'Construction, Operation & Maintenance',
        'Oil & Gas',
        ' Petrochemicals',
      ],
      ratting: [1, 2, 3, 4],
      logoUrl:
        'https://scontent.fccu18-1.fna.fbcdn.net/v/t39.30808-6/340083876_775271717594393_8868350241745272052_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=R0-4q7dW4IkAX-sAOze&_nc_ht=scontent.fccu18-1.fna&oh=00_AfDh2-eze7lJqmiEij1ETQhIwYKZ4424KTGPxu9p4aoCIA&oe=659CB05E',
    },
    {
      id: '3',
      title: 'SEAGULL INTERNATIONAL Human Resource Consultants',
      since: '1985',
      industriesServed: [
        'Construction, Operation & Maintenance',
        'Oil & Gas',
        ' Petrochemicals',
      ],
      ratting: [1, 2, 3, 4, 5],
      logoUrl:
        'https://www.seagullgroup.in/theme/web/assets/img/logo/seagull_logo.png',
    },
    {
      id: '4',
      title: 'AS INTERNATIONAL Manpower Consultant',
      since: '1993',
      industriesServed: [
        'Construction, Operation & Maintenance',
        'Oil & Gas',
        ' Petrochemicals',
      ],
      ratting: [1, 2, 3, 4],
      logoUrl:
        'https://scontent.fccu18-1.fna.fbcdn.net/v/t39.30808-6/278575641_107147161976296_705445604654072841_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=MiopBfKzLc0AX8Iu6yJ&_nc_ht=scontent.fccu18-1.fna&oh=00_AfCMI2be90I6Eskr7w_DqNEDoFsosmLzAt2J4bL4FibAdQ&oe=659D1038',
    },
    {
      id: '5',
      title: 'International Trade Links',
      since: '1970',
      industriesServed: [
        'Construction, Operation & Maintenance',
        'Oil & Gas',
        ' Petrochemicals',
      ],
      ratting: [1, 2, 3, 4],
      logoUrl: 'https://itlservice.net/images/logo.png',
    },
    {
      id: '6',
      title: 'AALA Enterprises',
      since: '1992',
      industriesServed: [
        'Construction, Operation & Maintenance',
        'Oil & Gas',
        ' Petrochemicals',
      ],
      ratting: [1, 2, 3],
      logoUrl:
        'https://scontent.fccu18-1.fna.fbcdn.net/v/t39.30808-6/304130995_196611942715411_9122416916455865261_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=783fdb&_nc_ohc=VvB19W-cBCsAX9jfeck&_nc_ht=scontent.fccu18-1.fna&oh=00_AfB-W8whxzVcsl0D0OASrmvcg0h0YWhPpUiZtPqfiDKG4w&oe=659BD875',
    },
    {
      id: '7',
      title: 'AL Taher Liaison Pvt Ltd',
      since: '1979',
      industriesServed: [
        'Oil and Gas',
        'Construction',
        'Operation and Maintenance',
        'Hospitality',
        'Power Sector',
        'Engineering ',
        'Mining',
        'Healthcare',
        'Infrastructure and logistics',
        'Banking and Finance',
        'Shipping and Marine Industry',
        'Education',
        'Office Administration',
        'Ancillary and Support Services',
        'Facility Management',
        'Hospitality',
        'IT and Telecom',
      ],
      ratting: [1, 2, 3, 4, 5],
      logoUrl: 'https://altaher.in/wp-content/uploads/2022/11/altaher-logo.png',
    },
    {
      id: '8',
      title: 'PeopleFeed HR Pvt Ltd',
      since: '1993',
      industriesServed: [
        'Construction, Operation & Maintenance',
        'Oil & Gas',
        ' Petrochemicals',
      ],
      ratting: [1, 2, 3, 4],
      logoUrl: 'https://peoplefeedhr.com/assets/images/image-4-272x139.png',
    },
    {
      id: '9',
      title: 'Naif International',
      since: '1993',
      industriesServed: [
        'Construction, Operation & Maintenance',
        'Oil & Gas',
        ' Petrochemicals',
      ],
      ratting: [1, 2, 3, 4],
      logoUrl: 'https://www.naifinternational.com/img/logo.png',
    },
    {
      id: '10',
      title: 'Bismillah Enterprises',
      since: '1995',
      industriesServed: [
        'Construction, Operation & Maintenance',
        'Oil & Gas',
        ' Petrochemicals',
      ],
      ratting: [1, 2, 3],
      logoUrl:
        'https://bismillahenterprises.net/wp-content/uploads/2023/04/bismillah_enterprises_logo.png',
    },
  ];
  const getHraFunc = async () => {
    try {
      let response = await getHraList();
      setHraList(response?.data?.cmpData);
    } catch (error) {
      console.log(error);
    }
  };
  const [searchKey, setSearchKey] = useState('');
  const [ratingOrd, setRatingOrd] = useState("");
  const [sinceOrd, setSinceOrd] = useState("");
  const [nameOrd, setNameOrd] = useState("");
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
  const alphaSort = (order) =>{
    setShowModal(false);
    setSearchKey("");
    setSinceOrd("");
    setRatingOrd("")
    if(order=="asc"){
      setHraList(hraList.sort((a, b) => a.cmpName.localeCompare(b.cmpName)));
    }
    else if(order=="desc"){
      setHraList(hraList.sort((b, a) => a.cmpName.localeCompare(b.cmpName)));
    }
    else{
      setFilteredArray(hraList);
    }
  }
  const ratingSort = (order) =>{
    setShowModal(false);
    setSearchKey("");
    setNameOrd("");
    setSinceOrd("");
    if(order=="asc"){
      setHraList(hraList.sort((a, b) => {
        const ratingA = a.cmpRating || ''; // Use an empty string if cmpRating is null
        const ratingB = b.cmpRating || '';
      
        return ratingA.localeCompare(ratingB);
      }));
    }
    else if(order=="desc"){
      setHraList(hraList.sort((b, a) => {
        const ratingA = a.cmpRating || ''; // Use an empty string if cmpRating is null
        const ratingB = b.cmpRating || '';
      
        return ratingA.localeCompare(ratingB);
      }));
    }
    else{
      setFilteredArray(hraList);
    }
  }
  const sinceSort = (order) =>{
    setShowModal(false);
    setSearchKey("");
    setNameOrd("");
    setRatingOrd("")
    if(order=="asc"){
      setHraList(hraList.sort((a, b) => {
        // Handle null values for cmpWorkingFrom
        const workingFromA = a.cmpWorkingFrom || '0000-00-00'; // Use a default date if cmpWorkingFrom is null
        const workingFromB = b.cmpWorkingFrom || '0000-00-00';
      
        // Compare dates
        return workingFromA.localeCompare(workingFromB);
      }));
    }
    else if(order=="desc"){
      setHraList(hraList.sort((b, a) => {
        // Handle null values for cmpWorkingFrom
        const workingFromA = a.cmpWorkingFrom || '0000-00-00'; // Use a default date if cmpWorkingFrom is null
        const workingFromB = b.cmpWorkingFrom || '0000-00-00';
      
        // Compare dates
        return workingFromA.localeCompare(workingFromB);
      }));
    }
    else{
      setFilteredArray(hraList);
    }
  }
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
          placeholder="Search By Name"
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
          <Text style={{color: 'white'}}>Sort By</Text>
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
                    ratingOrd !== "" && {borderWidth:1, borderColor:"#035292", borderRadius:3}
                  ]}
                  onPress={() =>{ratingSort(ratingOrd=="asc"? "desc": "asc"); setRatingOrd(ratingOrd=="asc"? "desc": "asc")} }>
                  <Text style={{fontWeight: '500'}}>Rating : {ratingOrd=="asc"? "High To Low": "Low To High"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {
                      paddingVertical: 10,
                      paddingLeft: 5,
                      marginBottom: 10,
                      backgroundColor: '#EFF8FF',
                    },
                    sinceOrd !== "" && {borderWidth:1, borderColor:"#035292", borderRadius:3}
                  ]}
                  onPress={() =>{sinceSort(sinceOrd=="asc"? "desc": "asc"); setSinceOrd(sinceOrd=="asc"? "desc": "asc")}}>
                  <Text style={{fontWeight: '500'}}>
                    Since : {sinceOrd=="asc"? "Newest To Oldest": "Oldest To Newest"}
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
                    nameOrd !== "" && {borderWidth:1, borderColor:"#035292", borderRadius:3}
                  ]}
                  onPress={() =>{alphaSort(nameOrd=="asc"? "desc": "asc"); setNameOrd(nameOrd=="asc"? "desc": "asc")} }>
                  <Text style={{fontWeight: '500'}}>Name : {nameOrd=="asc"? "Z To A": "A To Z"}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
      <View style={{marginHorizontal: -8, marginTop: 10, paddingBottom: 100}}>
        <ScrollView>
          {searchKey && (
            <Text style={styles.searchKey}>
              Showing resultes for : {searchKey}
            </Text>
          )}

          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {(searchKey.length == 0 ? hraList  : filteredArray).map((v, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() =>
                    props.navigation.navigate('DetailedHra', (detailedHra = v))
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
                        Since {v?.cmpWorkingFrom}
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
        </ScrollView>
      </View>
    </View>
  );
};

export default YourHra;

const styles = StyleSheet.create({
  main: {
    padding: 15,
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
