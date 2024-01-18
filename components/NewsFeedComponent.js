import {StyleSheet, Text, View} from 'react-native';
import {useState} from 'react';
import {WebView} from 'react-native-webview';
import {TouchableOpacity} from 'react-native-gesture-handler';
const NewsFeedComponent = ({value}) => {
  const [showFullArticle, setShowFullArticle] = useState(false);
  return (
    <>
      <View style={styles.main}>
        <Text style={styles.title}>
        {value.Title.split(" ")[0][0].toUpperCase()}{value.Title.substring(1)}
        </Text>
        <Text style={styles.summery}>
        {value.Summary?.split(" ")[0][0].toUpperCase()}{value.Summary?.substring(1)}
        </Text>
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent:"flex-end"}}
          onPress={() => setShowFullArticle(!showFullArticle)}>
          <Text style={styles.link}>
            {showFullArticle ? 'Hide Details' : 'Read More'}
          </Text>
        </TouchableOpacity>
      </View>
      {showFullArticle && (
        <View style={{height: 2500, marginHorizontal: 15, paddingBottom:10, backgroundColor:"white", borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
          <WebView
            source={{uri: value?.link}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            useWebKit={true} // Enable the use of WebKit
            originWhitelist={['*']}
            allowsLinkPreview={true}
            allowsBackForwardNavigationGestures={true}
            sharedCookiesEnabled={true}
            thirdPartyCookiesEnabled={true}
            startInLoadingState={true}
            renderLoading={() => (
              <View style={{flex: 1}}>
                <Text
                  style={{
                    backgroundColor: 'white',
                    paddingBottom: 200,
                    textAlign: 'center',
                  }}>
                  Loading Web View
                </Text>
              </View>
            )} // Add your loading indicator component
            style={{flex: 1}}
          />
          <TouchableOpacity
            style={{flexDirection: 'row', padding:10}}
            onPress={() => setShowFullArticle(!showFullArticle)}>
            <Text style={styles.link}>
              {showFullArticle ? 'Hide Details' : 'Read More'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default NewsFeedComponent;

const styles = StyleSheet.create({
  main: {
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 12,
    borderRadius: 3,
    backgroundColor: '#fff',
    elevation: 4,
  },
  title: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '400',
    letterSpacing:1
    // textAlign:"justify"
  },
  summery: {
    marginVertical: 12,
    // color: '#00111F',
    fontFamily: 'mono-space',
    fontSize: 18,
    lineHeight:25,
    textAlign:"justify"
  },
  link: {
   color:"#007bff",
    borderColor: '#007bff',
    borderBottomWidth: 0.2,
    
  },
});