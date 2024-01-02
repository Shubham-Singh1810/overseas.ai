import {
  Image,
  StyleSheet,
  Pressable,
  Text,
  TextInput,
  View,
  ScrollView
} from 'react-native';
import React from 'react';
import UpdateGola from '../components/UpdateGola';
import CandidateGola from '../components/CandidateGola';
import HiredCandidateGola from '../components/HiredCandidateGola';
import FooterNav from '../components/FooterNav';

const RaHome = () => {
  return (
    <View>
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.searchNav}>
          <View style={styles.searchInp}>
            <Image
              source={require('../images/searchIcon.png')}
              style={{ marginRight: 10 }}
            />
            <TextInput placeholder="|Search user profiles, companies etc" />
          </View>
          <View>
            <Image source={require('../images/bellIcon.png')} />
          </View>
        </View>
        <View style={styles.messageGroup}>
          <Text style={styles.greetText}>Hello</Text>
          <Text style={styles.nameText}>Manjeet Kumar</Text>
        </View>
        <View>
          <Pressable style={[styles.btnSuccess]}>
            <Text style={[styles.btnText, styles.btnTextWhite]}>Create new job</Text>
          </Pressable>
          <Pressable style={styles.btn}>
            <Text style={[styles.btnText, styles.btnTextBlack]}>View job application</Text>
          </Pressable>
          <Pressable style={[styles.btn, , styles.marginBottom24]}>
            <Text style={[styles.btnText, styles.btnTextBlack]}>View All created jobs</Text>
          </Pressable>
        </View>
        <View style={styles.scrollContainer}>
          <Text style={styles.scrollText}>New Update</Text>
          <ScrollView horizontal={true}>
            <UpdateGola />
            <UpdateGola />
            <UpdateGola />
            <UpdateGola />
            <UpdateGola />
            <UpdateGola />
          </ScrollView>
        </View>
        <View style={styles.scrollContainer}>
          <Text style={styles.scrollText}>Candidates with good profile</Text>
          <ScrollView horizontal={true}>
            <CandidateGola />
            <CandidateGola />
            <CandidateGola />
            <CandidateGola />
            <CandidateGola />
            <CandidateGola />
            <CandidateGola />
            <CandidateGola />
            <CandidateGola />
            <CandidateGola />
          </ScrollView>
        </View>
        <View style={styles.scrollContainer}>
          <Text style={styles.scrollText}>Previously Hired Candidates </Text>
          <ScrollView horizontal={true}>
            <HiredCandidateGola />
            <HiredCandidateGola />
            <HiredCandidateGola />
            <HiredCandidateGola />
            <HiredCandidateGola />
            <HiredCandidateGola />
            <HiredCandidateGola />
          </ScrollView>
        </View>
        
      </View>
    </ScrollView>
    <FooterNav/>
    </View>
  );
};

export default RaHome;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F5F5FA',
    paddingHorizontal: 16,
    marginBottom:35
  },
  searchInp: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 340,
    paddingHorizontal: 5,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: 'rgba(167, 167, 167, 0.50)',
    borderRadius: 5,
  },
  searchNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 35,
    marginBottom: 40,
  },
  messageGroup: {
    marginBottom: 34
  },
  greetText: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 16,
    fontWeight: '400',
  },
  nameText: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 16,
    fontWeight: '900',
  },
  btnSuccess: {
    backgroundColor: '#5F90CA',
    marginVertical: 3,
    borderRadius: 5,
    padding: 14,
    paddingLeft: 35
  },
  btn: {
    marginVertical: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 14,
    paddingLeft: 35
  },
  btnText: {
    fontFamily: 'Noto Sans',
    fontSize: 14,
    // textAlign: 'center',
  },
  btnTextWhite: {
    color: '#FFF',
  },
  btnTextBlack: {
    color: '#000',
  },
  marginBottom24: {
    marginBottom: 24,
  },
  scrollContainer: {
    marginVertical: 10
  },
  scrollText: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 10
  }
});
