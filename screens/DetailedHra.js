import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useState} from 'react';
import {getJobByHra} from "../services/hra.service"
const DetailedHra = props => {
  const {params} = props.route;
  console.log(params);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const renderStars = numRatings => {
    const stars = [];
    for (let i = 0; i < numRatings; i++) {
      stars.push(
        <Image
          key={i}
          source={require('../images/starIcon.png')} // You might need to adjust the source based on your project structure
          style={{width: 20, height: 20, resizeMode: 'contain'}}
        />,
      );
    }
    return stars;
  };
  return (
    <ScrollView style={styles.main}>
      <View style={styles.flex}>
        {params?.cmpLogoS3 != 'placeholder/logo.png' ? (
          <Image
            source={{
              uri: params?.cmpLogoS3,
            }}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              resizeMode: 'contain',
              marginRight: 15,
              borderWidth: 0.5,
              borderColor: 'gray',
            }}
          />
        ) : (
          <Image
            source={require('../images/hraDummyIcon.png')}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              resizeMode: 'contain',
              marginRight: 15,
              borderWidth: 0.5,
              borderColor: 'gray',
            }}
          />
        )}

        <View>
          <View style={[styles.flex, {alignItems: 'center'}]}>
            <Text style={styles.hraName}>{params?.cmpName}</Text>
            <Text style={styles.countryName}>(Qatar)</Text>
          </View>
          <View style={[styles.flex, {alignItems: 'center'}]}>
            <Text style={styles.hraName}>45</Text>
            <Text style={styles.countryName}>followers</Text>
          </View>
          <View style={[styles.flex, {alignItems: 'center'}]}>
            <Text style={styles.lightText}>Since {params?.cmpWorkingFrom}</Text>
            <View style={[styles.flex, {marginLeft: 5}]}>
              {renderStars(params?.cmpRating)}
            </View>
          </View>
          <View style={[styles.flex]}>
            <Pressable>
              <Image
                source={require('../images/globleIcon.png')}
                style={{marginRight: 5}}
              />
            </Pressable>
            <Pressable>
              <Image source={require('../images/facebookLogo.png')} />
            </Pressable>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Follow</Text>
      </TouchableOpacity>
      <View style={styles.otherDetailsContainer}>
        <View style={[styles.tableItemPadding, styles.borderBottom]}>
          <Text style={[styles.tableText]}>Country Presence :</Text>
          <View style={[styles.flex, {marginTop: 5}]}>
            {params?.cmpWorkingCountryNames?.map((v, i) => {
              return (
                <Text
                  style={[
                    styles.tableText,
                    {
                      marginRight: 6,
                      paddingHorizontal: 4,
                      paddingVertical: 2,
                      elevation: 2,
                      backgroundColor: '#fff',
                      borderRadius: 4,
                    },
                  ]}>
                  {v}
                </Text>
              );
            })}
          </View>
        </View>

        <View
          style={[
            styles.flex,
            styles.tableItemPadding,
            styles.borderBottom,
            {justifyContent: 'space-between'},
          ]}>
          <Text style={styles.tableText}>Industries Served</Text>
          <TouchableOpacity onPress={() => setShowJobDetails(!showJobDetails)}>
            <Image
              source={
                !showJobDetails
                  ? require('../images/downArrow.png')
                  : require('../images/upArrow.png')
              }
            />
          </TouchableOpacity>
        </View>
        {showJobDetails &&
          params.cmpWorkingDepartmentNames.map((v, i) => {
            return (
              <View
                style={[
                  styles.tableItemPadding,
                  styles.borderBottom,
                  {backgroundColor: '#fff'},
                ]}>
                <Text style={styles.tableText}>{v}</Text>
              </View>
            );
          })}

        <View
          style={[
            styles.flex,
            styles.tableItemPadding,
            styles.borderBottom,
            {justifyContent: 'space-between'},
          ]}>
          <Text style={[styles.tableText]}>
            No. of average candidates {'\n'}placed yearly
          </Text>
          <Text style={[styles.tableText]}>{params?.cmpYearlyPlacement}</Text>
        </View>

        {/* <View
          style={[
            styles.flex,
            styles.tableItemPadding,
            styles.borderBottom,
            {justifyContent: 'space-between'},
          ]}>
          <Text style={[styles.tableText]}>
            Average salary for different job title
          </Text>
          <Text style={[styles.tableText]}>Rs. 10,000</Text>
        </View> */}
        <View
          style={[
            styles.flex,
            styles.tableItemPadding,
            styles.borderBottom,
            {justifyContent: 'space-between'},
          ]}>
          <Text style={[styles.tableText]}>Average service charge</Text>
          <Text style={[styles.tableText]}>Rs. 10,000</Text>
        </View>
        <View
          style={[
            styles.flex,
            styles.tableItemPadding,
            {justifyContent: 'space-between'},
          ]}>
          <Text style={[styles.tableText]}>Percentage of free job</Text>
          <Text style={[styles.tableText]}>60%</Text>
        </View>
      </View>
      <Text style={[{marginTop: 20}, styles.clientLink]}>
        List of Clients of the HRA
      </Text>
      <View style={{marginVertical: 20}}>
        <Text style={[styles.hraName, {marginBottom: 10}]}>
          Jobs posted by HRA
        </Text>
        <ScrollView horizontal={true}>
          <Image
            source={require('../images/hraDummyIcon.png')}
            style={{height: 60, width: 80, marginRight: 8}}
          />
          <Image
            source={require('../images/hraDummyIcon.png')}
            style={{height: 60, width: 80, marginRight: 8}}
          />
          <Image
            source={require('../images/hraDummyIcon.png')}
            style={{height: 60, width: 80, marginRight: 8}}
          />
          <Image
            source={require('../images/hraDummyIcon.png')}
            style={{height: 60, width: 80, marginRight: 8}}
          />
          <Image
            source={require('../images/hraDummyIcon.png')}
            style={{height: 60, width: 80, marginRight: 8}}
          />
          <Image
            source={require('../images/hraDummyIcon.png')}
            style={{height: 60, width: 80, marginRight: 8}}
          />
        </ScrollView>
      </View>
      <View>
        <Text style={[styles.hraName, {marginBottom: 8}]}>Rate HRA</Text>
        <View style={styles.flex}>
          <Image
            source={require('../images/whiteStar.png')}
            style={{marginRight: 3}}
          />
          <Image
            source={require('../images/whiteStar.png')}
            style={{marginRight: 3}}
          />
          <Image
            source={require('../images/whiteStar.png')}
            style={{marginRight: 3}}
          />
          <Image
            source={require('../images/whiteStar.png')}
            style={{marginRight: 3}}
          />
          <Image
            source={require('../images/whiteStar.png')}
            style={{marginRight: 3}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailedHra;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  flex: {
    flexDirection: 'row',
  },
  hraName: {
    fontSize: 16,
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    color: '#000',
    marginRight: 3,
  },
  countryName: {
    fontSize: 12,
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    color: '#000',
  },
  lightText: {
    fontSize: 10,
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    color: '#6F6F6F',
  },
  button: {
    backgroundColor: '#035292',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
  },
  otherDetailsContainer: {
    backgroundColor: '#F1F7FF',
    paddingVertical: 10,
  },
  tableItemPadding: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#A6A6A6',
  },
  tableText: {
    fontSize: 14,
    fontFamily: 'Noto Sans',
    fontWeight: '400',
    color: '#000',
  },
  clientLink: {
    fontSize: 16,
    fontFamily: 'Noto Sans',
    fontWeight: '500',
    color: '#1877F2',
    textDecorationLine: 'underline',
  },
});
