import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import React from 'react';
import {useAndroidBackHandler} from 'react-navigation-backhandler';
const Career = props => {
  useAndroidBackHandler(() => {
    props.navigation.navigate('MyProfile');
    return true;
  });
  return (
    <View style={styles.main}>
      <ScrollView>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Suggested Graph
          </Text>

          <ScrollView horizontal={true}>
            <View style={{borderWidth: 1, borderRadius: 4, marginRight: 6}}>
              <Image
                source={require('../images/cg1.png')}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{borderWidth: 1, borderRadius: 4, marginRight: 6}}>
              <Image
                source={require('../images/c6.png')}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{borderWidth: 1, borderRadius: 4, marginRight: 6}}>
              <Image
                source={require('../images/cg3.png')}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{borderWidth: 1, borderRadius: 4, marginRight: 6}}>
              <Image
                source={require('../images/cg1.png')}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            marginTop: 20,
            paddingHorizontal: 8,
            borderRadius: 8,
            borderColor: 'gray',
          }}>
          <TextInput placeholderTextColor="gray" placeholder="Find Graph" />
          <Image
            source={require('../images/searchIcon.png')}
            style={{height: 20, width: 20, resizeMode: 'contain'}}
          />
        </View>

        <Pressable
          onPress={() => props.navigation.navigate('Create Career')}
          style={{
            backgroundColor: '#035292',
            padding: 13,
            borderRadius: 6,
            marginTop: 20,
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: '600',
              fontSize: 16,
            }}>
            Create Your Own{' '}
          </Text>
        </Pressable>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginBottom: 10,
              marginTop: 20,
            }}>
            Graph Added This Week
          </Text>
          <ScrollView horizontal={true}>
            <View style={{borderWidth: 1, borderRadius: 4, marginRight: 6}}>
              <Image
                source={require('../images/c10.png')}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{borderWidth: 1, borderRadius: 4, marginRight: 6}}>
              <Image
                source={require('../images/cg1.png')}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{borderWidth: 1, borderRadius: 4, marginRight: 6}}>
              <Image
                source={require('../images/cg2.png')}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{borderWidth: 1, borderRadius: 4, marginRight: 6}}>
              <Image
                source={require('../images/cg1.png')}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </ScrollView>
        </View>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginBottom: 10,
              marginTop: 20,
            }}>
            Most Viewed
          </Text>
          <ScrollView horizontal={true}>
            <View style={{borderWidth: 1, borderRadius: 4, marginRight: 6}}>
              <Image
                source={require('../images/CareerGraphImg.png')}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{borderWidth: 1, borderRadius: 4, marginRight: 6}}>
              <Image
                source={require('../images/c5.png')}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{borderWidth: 1, borderRadius: 4, marginRight: 6}}>
              <Image
                source={require('../images/cg3.png')}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{borderWidth: 1, borderRadius: 4, marginRight: 6}}>
              <Image
                source={require('../images/cg1.png')}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </ScrollView>
        </View>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '500',
              marginBottom: 10,
              marginTop: 20,
            }}>
            Bookmarked
          </Text>
          <ScrollView horizontal={true}>
            <View style={{borderWidth: 1, borderRadius: 4, marginRight: 6}}>
              <Image
                source={require('../images/cg1.png')}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{borderWidth: 1, borderRadius: 4, marginRight: 6}}>
              <Image
                source={require('../images/cg3.png')}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={{borderWidth: 1, borderRadius: 4, marginRight: 6}}>
              <Image
                source={require('../images/CareerGraphImg.png')}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode: 'contain',
                }}
              />
            </View>

            <View style={{borderWidth: 1, borderRadius: 4, marginRight: 6}}>
              <Image
                source={require('../images/cg3.png')}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Career;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    // paddingBottom:100
  },
});
