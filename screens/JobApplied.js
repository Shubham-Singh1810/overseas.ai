import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Modal,
  Button,
  View,
} from 'react-native';
import React from 'react';
import AppliedJob from '../components/AppliedJob';
import FooterNav from '../components/FooterNav';
import { useGlobalState } from '../GlobalProvider';
const JobApplied = props => {
  const {translation } = useGlobalState();
  return (
    <>
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.messageText}>
            {translation.checkUpdatesOnYourApplication}
          </Text>
          <View>
            <AppliedJob />
            <AppliedJob />
            <AppliedJob />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default JobApplied;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F5F5FA',
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
  messageText: {
    color: '#0F0C0C',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Nato Sans',
    marginVertical: 15,
  },
});
