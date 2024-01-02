import {StyleSheet, ScrollView, Image, Text, View} from 'react-native';
import {useEffect} from 'react';
import NewsFeedComponent from '../components/NewsFeedComponent';
import {newsData} from '../services/migrating_workers (2) (1)';
import {useGlobalState} from '../GlobalProvider';
const NewsFeed = () => {
  const {globalState, translation, setGlobalState} = useGlobalState();
  useEffect(()=>{
    setGlobalState({...globalState, currentScreen:"Feed"})
  },[]);
  return (
    <ScrollView>
      <View style={styles.header}>
        {/* <Image
          source={require('../images/overseas-wrold.gif')}
          style={{height: 50, width: 50, borderRadius:25}}
        /> */}
        <Text style={styles.brandName}>Welcomes to Overseas</Text>
      </View>
      {newsData.map((v, i) => {
        return <NewsFeedComponent value={v} key={i}/>;
      })}
    </ScrollView>
  );
};

export default NewsFeed;

const styles = StyleSheet.create({
  header: {
    margin: 15,
    marginBottom: 0,
    justifyContent:"center",
    flexDirection:"row"
  },
  brandName: {
    marginBottom: 5,
    color: '#194a81',
    fontSize: 25,
    fontWeight: '700',
  },
  welcome: {
    color: '#194a81',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
    marginLeft: 5,
  },
});
