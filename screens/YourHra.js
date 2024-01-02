import {
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
const YourHra = (props) => {
  const [showModal, setShowModal] = useState(false);
  const hraData = [
    {id: '1', color: 'red'},
    {id: '2', color: 'green'},
    {id: '3', color: 'blue'},
    {id: '4', color: 'yellow'},
    {id: '5', color: 'purple'},
    {id: '6', color: 'orange'},
    {id: '7', color: 'pink'},
    {id: '8', color: 'brown'},
    {id: '9', color: 'cyan'},
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
      <View style={{marginHorizontal: -12, marginTop: 10}}>
        <FlatList
          data={hraData}
          numColumns={3}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('DetailedHra')}>
              <View style={styles.hraBox}>
                <Image source={require('../images/hraDummyIcon.png')} />
                <Text style={styles.name}>Ambey International</Text>
                <Text style={styles.experience}>5 years in business</Text>
                <View style={{flexDirection: 'row', marginTop: -3}}>
                  <Image source={require('../images/starIcon.png')} />
                  <Image source={require('../images/starIcon.png')} />
                  <Image source={require('../images/starIcon.png')} />
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
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
