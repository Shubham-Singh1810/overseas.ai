import {StyleSheet, ScrollView, Image, Button, Text, View} from 'react-native';
import React from 'react';
import FooterNav from '../components/FooterNav';
const Notifications = (props) => {
  return (
    <>
      <ScrollView>
        <View style={styles.main}>
          <View>
            <View style={{flexDirection:"row"}}>
            <Text style={[styles.newText, styles.borderBottom]}>New</Text>
            </View>
            <View style={[styles.navigationBox, styles.darkBackground]}>
              <Text style={styles.navText}>
                Rahul Kumar you are shortlisted for the interview at R. C
                Chandra Sons. Your interview is scheduled at 8 am. All the
                best!!
              </Text>
            </View>
            <Text style={styles.newText}>Older One</Text>
            <View style={[styles.navigationBox, styles.lightBackground]}>
              <Text style={styles.navText}>
                Rahul Kumar you are shortlisted for the interview at R. C
                Chandra Sons. Your interview is scheduled at 8 am. All the
                best!!
              </Text>
            </View>
            <View style={[styles.navigationBox, styles.lightBackground]}>
              <Text style={styles.navText}>
                Rahul Kumar you are shortlisted for the interview at R. C
                Chandra Sons. Your interview is scheduled at 8 am. All the
                best!!
              </Text>
            </View>
            <View style={[styles.navigationBox, styles.lightBackground]}>
              <Text style={styles.navText}>
                Rahul Kumar you are shortlisted for the interview at R. C
                Chandra Sons. Your interview is scheduled at 8 am. All the
                best!!
              </Text>
            </View>
            <View style={[styles.navigationBox, styles.lightBackground]}>
              <Text style={styles.navText}>
                Rahul Kumar you are shortlisted for the interview at R. C
                Chandra Sons. Your interview is scheduled at 8 am. All the
                best!!
              </Text>
            </View>
            <View style={[styles.navigationBox, styles.lightBackground]}>
              <Text style={styles.navText}>
                Rahul Kumar you are shortlisted for the interview at R. C
                Chandra Sons. Your interview is scheduled at 8 am. All the
                best!!
              </Text>
            </View>
            <View style={[styles.navigationBox, styles.lightBackground]}>
              <Text style={styles.navText}>
                Rahul Kumar you are shortlisted for the interview at R. C
                Chandra Sons. Your interview is scheduled at 8 am. All the
                best!!
              </Text>
            </View>
            <View style={[styles.navigationBox, styles.lightBackground]}>
              <Text style={styles.navText}>
                Rahul Kumar you are shortlisted for the interview at R. C
                Chandra Sons. Your interview is scheduled at 8 am. All the
                best!!
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <FooterNav props={props}/>
    </>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 60,
  },
  mainHeading: {
    color: '#0F0C0C',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Nato Sans',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginLeft: -5,
    marginBottom: 30,
  },
  navigationBox:{
    
    borderRadius:5,
    paddingVertical:15,
    paddingHorizontal:12,
    marginVertical:6,
    borderWidth:1,
    borderColor:"#B3B3B3"
  },
  darkBackground:{
    backgroundColor:"#E8E7E7"
  },
  lightBackground:{
    backgroundColor:"#F5F5FA",
  },
  text: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  },
  newText:{
    marginVertical:10,
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
    paddingHorizontal:3
  },
  borderBottom:{
    borderBottomWidth:1,
    borderBottomColor:"#B3B3B3"
  },
  noteText: {
    color: '#EB4343',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  },
  blueText: {
    color: '#5F90CA',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  },
  grayText: {
    textAlign: 'center',
    color: '#B3B3B3',
    fontSize: 10,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
    marginVertical: 20,
  },
  navText:{
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  }
});
