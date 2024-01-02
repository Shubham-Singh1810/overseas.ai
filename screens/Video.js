import {
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
} from 'react-native';
import {useEffect, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {useGlobalState} from '../GlobalProvider';
const Video = () => {
  const {globalState, setGlobalState} = useGlobalState();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setGlobalState({...globalState, currentScreen: 'Upload Video'});
  }, []);
  const pickMedia = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.video],
      });
      // Set the selected media URI
      setMediaUri(result.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('User cancelled media picker');
      } else {
        console.error('Error picking media', err);
      }
    }
  };
  return (
    <View style={styles.main}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.title}>Introductry Videos</Text>
        <Pressable
          onPress={() => setShowModal(true)}
          style={{
            backgroundColor:"#035292",
            padding:8,
            elevation:10,
            borderRadius:3
          }}>
          <Text style={{color:"white", fontWeight:"500"}}>Video Tutorial</Text>
        </Pressable>
      </View>

      <View>
        <ScrollView horizontal={true} style={{marginTop: 10}}>
          <View>
            <Image
              source={require('../images/candidate.png')}
              style={{
                height: 100,
                width: 120,
                borderRadius: 5,
                marginRight: 10,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 40,
                left: 50,
                padding: 6,
                backgroundColor: 'white',
                borderRadius: 11,
              }}>
              <Image
                source={require('../images/playVideoIcon.png')}
                style={{height: 10, width: 10}}
              />
            </View>
            <Text style={{textAlign: 'center'}}>English</Text>
          </View>
          <View>
            <Image
              source={require('../images/candidate.png')}
              style={{
                height: 100,
                width: 120,
                borderRadius: 5,
                marginRight: 10,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 40,
                left: 50,
                padding: 6,
                backgroundColor: 'white',
                borderRadius: 11,
              }}>
              <Image
                source={require('../images/playVideoIcon.png')}
                style={{height: 10, width: 10}}
              />
            </View>
            <Text style={{textAlign: 'center'}}>Hindi</Text>
          </View>

          <TouchableOpacity onPress={pickMedia}>
            <View>
              <Image
                source={require('../images/rectangle.png')}
                style={{
                  height: 100,
                  width: 120,
                  borderRadius: 5,
                  marginRight: 10,
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 40,
                  left: 50,
                  padding: 6,
                  backgroundColor: 'white',
                  borderRadius: 11,
                }}>
                <Image
                  source={require('../images/playVideoIcon.png')}
                  style={{height: 10, width: 10}}
                />
              </View>
              <Text style={{textAlign: 'center'}}>Upload in Bangla</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={{marginTop: 20}}>
        <Text style={styles.title}>Work Videos</Text>
        <View>
          <ScrollView horizontal={true} style={{marginTop: 10}}>
            <TouchableOpacity onPress={pickMedia}>
              <View>
                <Image
                  source={require('../images/rectangle.png')}
                  style={{
                    height: 100,
                    width: 120,
                    borderRadius: 5,
                    marginRight: 10,
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 40,
                    left: 50,
                    padding: 6,
                    backgroundColor: 'white',
                    borderRadius: 11,
                  }}>
                  <Image
                    source={require('../images/playVideoIcon.png')}
                    style={{height: 10, width: 10}}
                  />
                </View>
              </View>
              <Text style={{textAlign: 'center'}}>Upload Work</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      <Modal transparent={true} visible={showModal} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View style={styles.main}>
            <View>
              <Text style={styles.languagetext}>
                This video tutorial guides you through the process of utilizing
                this specific section.
              </Text>
            </View>
            <View style={{marginVertical: 10}}>
              <Image
                source={require('../images/hraDummyIcon.png')}
                style={{height: 180, width: 300}}
              />
            </View>
            <View
              style={{
                width: 300,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Button title="Close" onPress={() => setShowModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Video;

const styles = StyleSheet.create({
  main: {
    padding: 15,
  },
  title: {
    fontFamily: 'Noto Sans',
    fontSize: 20,
    fontWeight: '500',
  },
});
