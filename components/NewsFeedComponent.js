import {Image, StyleSheet,Linking, Text, View} from 'react-native';
import {useState} from 'react';
import {WebView} from 'react-native-webview';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useGlobalState} from '../GlobalProvider';
const NewsFeedComponent = ({value}) => {
  const [showFullArticle, setShowFullArticle] = useState(false);
  const {newTranslation} = useGlobalState();
  return (
    <>
      <View style={styles.main}>
        <Text style={styles.title}>
          {value.ArticleTitle.split(' ')[0][0].toUpperCase()}
          {value.ArticleTitle.substring(1)}
        </Text>
        {value?.ArticleTitle ==null && <Text style={styles.title}>
          Overseas News
          </Text>}
        
        <Image
          source={{
            uri: value?.image,
          }}
          style={{
            height: 200,
            width: '100%',
            borderRadius: 3,
          }}
        />
        <Text style={styles.summery}>
          {value.summary?.split(' ')[0][0].toUpperCase()}
          {value.summary?.substring(1)}
        </Text>
        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'flex-end'}}
          onPress={() => Linking.openURL(value.Link)
            .then(supported => {
              if (!supported) {
                console.warn(`Cannot handle URL: ${value.Link}`);
              }
            })
            .catch(err => console.error('An error occurred', err))}>
          <Text style={styles.link}>
            {showFullArticle
              ? newTranslation?.hideDetails
              : newTranslation?.readDetails}
          </Text>
        </TouchableOpacity>
      </View>
      {showFullArticle && (
        <View
          style={{
            height: 2500,
            marginHorizontal: 15,
            paddingBottom: 10,
            backgroundColor: 'white',
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
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
            style={{flexDirection: 'row', padding: 10}}
            onPress={() => setShowFullArticle(!showFullArticle)}>
            <Text style={styles.link}>
              {showFullArticle
                ? newTranslation?.hideDetails
                : newTranslation?.readDetails}
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
    padding: 12,
    borderRadius: 3,
    backgroundColor: '#fff',
    elevation: 4,
    marginVertical: 10,
  },
  title: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'justify',
  },
  summery: {
    marginVertical: 12,
    color: '#00111F',
    fontFamily: 'mono-space',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'justify',
  },
  link: {
    color: '#007bff',
    borderColor: '#007bff',
    borderBottomWidth: 0.2,
  },
});
