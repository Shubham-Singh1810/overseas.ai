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
import {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
const YourHra = props => {
  const [showModal, setShowModal] = useState(false);
  const hraData = [
    {
      id: '1',
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
      id: '2',
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
      title: 'AI Taher Liaison Pvt Ltd',
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

  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TextInput placeholder="Search By Name" style={styles.input} />
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
                  style={{
                    paddingVertical: 10,
                    paddingLeft: 5,
                    marginBottom: 10,
                    backgroundColor: '#EFF8FF',
                  }}
                  onPress={() => setShowModal(false)}>
                  <Text style={{fontWeight: '500'}}>Country</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingLeft: 5,
                    marginBottom: 10,
                    backgroundColor: '#EFF8FF',
                  }}
                  onPress={() => setShowModal(false)}>
                  <Text style={{fontWeight: '500'}}>Ratting</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingLeft: 5,
                    marginBottom: 10,
                    backgroundColor: '#EFF8FF',
                  }}
                  onPress={() => setShowModal(false)}>
                  <Text style={{fontWeight: '500'}}>Years in Business</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
      <View style={{marginHorizontal: -12, marginTop: 10, paddingBottom: 100}}>
        <ScrollView>
          <View>
            {hraData.map((v, i) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('DetailedHra', (detailedHra = v))
                  }>
                  <View>
                    <View
                      style={[
                        styles.hraBox,
                        {flexDirection: 'row', alignItems: 'center'},
                      ]}>
                      <Image
                        source={{
                          uri: v.logoUrl,
                        }}
                        style={{
                          height: 100,
                          width: 150,
                          borderRadius: 40,
                          resizeMode: 'contain',
                          marginRight: 10,
                        }}
                      />
                      <View>
                        <Text style={styles.name}>
                          {v.title.length > 25 ? (
                            <>{v.title.substring(0, 25)}...</>
                          ) : (
                            v.title
                          )}
                        </Text>
                        <Text style={styles.experience}>Since {v.since}</Text>
                        <View style={{flexDirection: 'row', marginTop: -3}}>
                          {v.ratting.map((v, i) => {
                            return (
                              <Image
                                source={require('../images/starIcon.png')}
                              />
                            );
                          })}
                        </View>
                      </View>
                    </View>
                    <View>
                      {/* {v.industriesServed.map((v, i) => {
                      return(
                        <Text>{v}</Text>
                      )
                    })} */}
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
    marginHorizontal: 15,
    marginVertical: 8,
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
});
