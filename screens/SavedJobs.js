import {StyleSheet, ScrollView, Pressable, Text, View} from 'react-native';
import React from 'react';
import JobApplied from './JobApplied';
import SearchResult from '../components/SearchResult';
import FooterNav from '../components/FooterNav';
import FavJobComponent from '../components/FavJobComponent';

const SavedJobs = props => {
  return (
    <>
      <ScrollView>
        <View style={{padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.messageText}>Job you haved saved earlier</Text>
            <Pressable
              // onPress={() => setShowModal(true)}
              style={{
                backgroundColor: '#035292',
                padding: 8,
                elevation: 10,
                borderRadius: 3,
              }}>
              <Text style={{color: 'white', fontWeight: '500'}}>
                Video Tutorial
              </Text>
            </Pressable>
          </View>

          <FavJobComponent saved={true} />
        </View>
      </ScrollView>
    </>
  );
};

export default SavedJobs;

const styles = StyleSheet.create({
  messageText: {
    color: '#0F0C0C',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Nato Sans',
    marginVertical: 15,
  },
});
