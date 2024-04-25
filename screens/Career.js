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

const Career = (props) => {
  const arr1 =[
    "../images/CareerGraphImg.png",
    "../images/cg1.png",
    "../images/cg2.png",
    "../images/cg3.png"
  ]
  const arr4 =[
    "https://hrtrendinstitute.b-cdn.net/wp-content/uploads/2018/11/career-path-03-copy.jpg",
    "https://powerslides.com/wp-content/uploads/2021/01/Career-Path-Template-4.png",
    "https://powerslides.com/wp-content/uploads/2021/01/Career-Path-Template-1.png",
    "https://www.slideteam.net/media/catalog/product/cache/960x720/c/a/career_path_upward_graph_powerpoint_template_Slide01.jpg",
  ]
  const arr2 =[
    "https://st2.depositphotos.com/4282501/12300/i/950/depositphotos_123006104-stock-photo-hand-with-marker-writing-career.jpg",
    "https://slidebazaar.com/wp-content/uploads/2023/03/career-map-template.jpg",
    "https://powerslides.com/wp-content/uploads/2021/01/Career-Path-Template-1.png",
    "https://hrtrendinstitute.b-cdn.net/wp-content/uploads/2018/11/career-path-03-copy.jpg",
  ]
  const arr3 =[
    "https://tse4.mm.bing.net/th?id=OIP.YDqDf5PFYN3tnKEmYOqCOgHaFj&pid=Api&P=0&h=180",
    "https://www.pngplay.com/wp-content/uploads/7/Business-Growth-Chart-PNG-Clipart-Background.png",
    "https://st2.depositphotos.com/4282501/12300/i/950/depositphotos_123006104-stock-photo-hand-with-marker-writing-career.jpg",
    "https://hrtrendinstitute.b-cdn.net/wp-content/uploads/2018/11/career-path-03-copy.jpg",
  ]
  return (
    <View style={styles.main}>
<ScrollView >
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
          
          <View style={{borderWidth:1, borderRadius:4, marginRight:6}}>
            <Image
            source={require("../images/cg1.png")}
            style={{
              marginRight: 10,
              height: 100,
              width: 110,
              borderRadius: 6,
              resizeMode:"contain"
            }}
          />
          </View>
          <View style={{borderWidth:1, borderRadius:4, marginRight:6}}>
            <Image
            source={require("../images/c6.png")}
            style={{
              marginRight: 10,
              height: 100,
              width: 110,
              borderRadius: 6,
              resizeMode:"contain"
            }}
          />
          </View>
          <View style={{borderWidth:1, borderRadius:4, marginRight:6}}>
            <Image
            source={require("../images/cg3.png")}
            style={{
              marginRight: 10,
              height: 100,
              width: 110,
              borderRadius: 6,
              resizeMode:"contain"
            }}
          />
          </View>
          <View style={{borderWidth:1, borderRadius:4, marginRight:6}}>
            <Image
            source={require("../images/cg1.png")}
            style={{
              marginRight: 10,
              height: 100,
              width: 110,
              borderRadius: 6,
              resizeMode:"contain"
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
      
      <Pressable onPress={()=>props.navigation.navigate('Create Career')} style={{backgroundColor:"#035292", padding:13, borderRadius:6, marginTop:20}}>
        <Text style={{color:"white", textAlign:"center", fontWeight:"600", fontSize:16}}>Create Your Own </Text>
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
          
              <View style={{borderWidth:1, borderRadius:4, marginRight:6}}>
                <Image
                source={require("../images/c10.png")}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode:"contain"
                }}
              />
              </View>
              <View style={{borderWidth:1, borderRadius:4, marginRight:6}}>
                <Image
                source={require("../images/cg1.png")}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode:"contain"
                }}
              />
              </View>
              <View style={{borderWidth:1, borderRadius:4, marginRight:6}}>
                <Image
                source={require("../images/cg2.png")}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode:"contain"
                }}
              />
              </View>
              <View style={{borderWidth:1, borderRadius:4, marginRight:6}}>
                <Image
                source={require("../images/cg1.png")}
                style={{
                  marginRight: 10,
                  height: 100,
                  width: 110,
                  borderRadius: 6,
                  resizeMode:"contain"
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
          
          <View style={{borderWidth:1, borderRadius:4, marginRight:6}}>
            <Image
            source={require("../images/CareerGraphImg.png")}
            style={{
              marginRight: 10,
              height: 100,
              width: 110,
              borderRadius: 6,
              resizeMode:"contain"
            }}
          />
          </View>
          <View style={{borderWidth:1, borderRadius:4, marginRight:6}}>
            <Image
            source={require("../images/c5.png")}
            style={{
              marginRight: 10,
              height: 100,
              width: 110,
              borderRadius: 6,
              resizeMode:"contain"
            }}
          />
          </View>
          <View style={{borderWidth:1, borderRadius:4, marginRight:6}}>
            <Image
            source={require("../images/cg3.png")}
            style={{
              marginRight: 10,
              height: 100,
              width: 110,
              borderRadius: 6,
              resizeMode:"contain"
            }}
          />
          </View>
          <View style={{borderWidth:1, borderRadius:4, marginRight:6}}>
            <Image
            source={require("../images/cg1.png")}
            style={{
              marginRight: 10,
              height: 100,
              width: 110,
              borderRadius: 6,
              resizeMode:"contain"
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
        <View style={{borderWidth:1, borderRadius:4, marginRight:6}}>
            <Image
            source={require("../images/cg1.png")}
            style={{
              marginRight: 10,
              height: 100,
              width: 110,
              borderRadius: 6,
              resizeMode:"contain"
            }}
          />
          </View>
          <View style={{borderWidth:1, borderRadius:4, marginRight:6}}>
            <Image
            source={require("../images/cg3.png")}
            style={{
              marginRight: 10,
              height: 100,
              width: 110,
              borderRadius: 6,
              resizeMode:"contain"
            }}
          />
          </View>
          <View style={{borderWidth:1, borderRadius:4, marginRight:6}}>
            <Image
            source={require("../images/CareerGraphImg.png")}
            style={{
              marginRight: 10,
              height: 100,
              width: 110,
              borderRadius: 6,
              resizeMode:"contain"
            }}
          />
          </View>
          
          <View style={{borderWidth:1, borderRadius:4, marginRight:6}}>
            <Image
            source={require("../images/cg3.png")}
            style={{
              marginRight: 10,
              height: 100,
              width: 110,
              borderRadius: 6,
              resizeMode:"contain"
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
