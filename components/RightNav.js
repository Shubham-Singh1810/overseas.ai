import {
  StyleSheet,
  Image,
  Text,
  View,
  Pressable,
  Touchable,
  TouchableOpacity,
  Button,
  Modal
} from 'react-native';
import {useState} from 'react';
import {useGlobalState} from '../GlobalProvider';
const RightNav = props => {
  const {globalState, setGlobalState} = useGlobalState();
  const[showModal, setShowModal] = useState(false)
  return (
    <>
      <View style={styles.topNav}>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            onPress={() => props.navigation.navigate('Notifications')}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginRight: 0,
            }}>
            <Image source={require('../images/bellIcon.png')} />
            <View
              style={{
                backgroundColor: 'orangered',
                position: 'relative',
                right: 6,
                top: 8,
                borderRadius: 6,
                height: 12,
                width: 12,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 6, color: '#fff'}}>1</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => setShowModal(true)}
            style={{alignItems: 'center', flexDirection: 'row'}}>
            <Image
              source={require('../images/language.jpeg')}
              style={{height: 30, width: 30, borderRadius: 10}}
            />
          </Pressable>
        </View>
      </View>
      <Modal transparent={false} visible={showModal} animationType="slide">
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"rgba(0,0,0,0.5)"}}>
          <View style={styles.main}>
            <View>
              <Text style={styles.languagetext}>
                Please select your language
              </Text>
              <Text style={styles.languagetext}>कृपया अपनी भाषा चुनें</Text>
              <Text style={styles.languagetext}>আপনার ভাষা নির্বাচন করুন</Text>
            </View>
            <View style={{marginTop: 20}}>
              <TouchableOpacity
                style={styles.selectBox}
                onPress={() => {
                  setShowModal(false);
                  setGlobalState({...globalState, selectedLanguage: 'english'});
                }}>
                <Text style={styles.textCenter}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.selectBox}
                onPress={() => {
                  setShowModal(false);
                  setGlobalState({...globalState, selectedLanguage: 'hindi'});
                }}>
                <Text style={styles.textCenter}>हिंदी </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.selectBox}
                onPress={() => {
                  setShowModal(false);
                  setGlobalState({...globalState, selectedLanguage: 'bangla'});
                }}>
                <Text style={styles.textCenter}>বাংলা</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: 250,
                marginTop: -15,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Button title="Close" onPress={() => setShowModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default RightNav;

const styles = StyleSheet.create({
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
  main: {
    backgroundColor: '#fff',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:6
  },
  languagetext: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Noto Sans',
    fontSize: 16,
    marginBottom: 17,
  },
  textCenter: {
    textAlign: 'center',
  },
  selectBox: {
    borderWidth: 1,
    borderColor: 'rgba(167, 167, 167, 0.50)',
    padding: 12,
    borderRadius: 5,
    width: 250,
    marginBottom: 35,
  },
  topNav: {
    paddingHorizontal: 10,
  },
});
