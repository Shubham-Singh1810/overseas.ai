import {
  Button,
  Modal,
  Animated,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from 'react-native';
import {useState, useEffect, useRef} from 'react';
const BuildProfile = () => {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {showWelcomeScreen ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.welcomeText}>
            " This section is your personalized guide to improve your profile
            and let you stand out from the crowd "
          </Text>
          <Button
            title="Learn More !"
            onPress={() => setShowWelcomeScreen(false)}
          />
        </View>
      ) : (
        <ScrollView>
          <View style={{padding: 15}}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                justifyContent: 'space-between',
                alignItems:"center"
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins',
                  fontSize: 18,
                  marginBottom: 10,
                  color: '#555555',
                  textDecorationLine: 'underline',
                  padding: 2,
                }}>
                Follow the steps to build {'\n'} your profile strong!
              </Text>
              <Pressable
                // onPress={() => setShowModal(true)}
                style={{
                  backgroundColor: '#035292',
                  padding: 8,
                  elevation: 10,
                  borderRadius:3
                }}>
                <Text style={{color: 'white', fontWeight: '500'}}>
                  Video Tutorial
                </Text>
              </Pressable>
            </View>

            <TouchableOpacity
              style={{
                padding: 10,
                marginBottom: 15,
                backgroundColor: '#F1F7FF',
                elevation: 5,
                borderRadius: 3,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 17}}>Upload Passport</Text>
                <Text style={{fontSize: 17}}>20%</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              style={{
                padding: 10,
                marginBottom: 15,
                backgroundColor: 'lightgray',
                elevation: 5,
                borderRadius: 3,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 17}}>Upload medical</Text>
                <Image
                  style={{height: 22, width: 15, marginRight: 10}}
                  source={require('../images/lockIcon.png')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              style={{
                padding: 10,
                marginBottom: 15,
                backgroundColor: 'lightgray',
                elevation: 5,
                borderRadius: 3,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 17}}>Upload medical</Text>
                <Image
                  style={{height: 22, width: 15, marginRight: 10}}
                  source={require('../images/lockIcon.png')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              style={{
                padding: 10,
                marginBottom: 15,
                backgroundColor: 'lightgray',
                elevation: 5,
                borderRadius: 3,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 17}}>Upload medical</Text>
                <Image
                  style={{height: 22, width: 15, marginRight: 10}}
                  source={require('../images/lockIcon.png')}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              style={{
                padding: 10,
                marginBottom: 15,
                backgroundColor: 'lightgray',
                elevation: 5,
                borderRadius: 3,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 17}}>Upload medical</Text>
                <Image
                  style={{height: 22, width: 15, marginRight: 10}}
                  source={require('../images/lockIcon.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      <Modal transparent={true} visible={showModal} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: 15,
              }}>
              <Image
                source={require('../images/close.png')}
                style={{height: 24, width: 24}}
              />
            </TouchableOpacity>

            <Text style={{color: '#000', textAlign: 'center', fontSize: 22}}>
              We suggest you to follow the steps in order mentioned above!
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 30,
              }}>
              <Button
                title="Processed Anyway"
                onPress={() => {
                  console.warn('This action will redirect the screen required');
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BuildProfile;

const styles = StyleSheet.create({
  welcomeText: {
    color: 'gray',
    fontFamily: 'Poppins',
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 20,
    marginTop: -50,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  },
  modalBox: {
    width: 350,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 6,
    elevation: 10,
  },
});
