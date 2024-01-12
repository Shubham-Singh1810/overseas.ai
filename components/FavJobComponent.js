import {
  StyleSheet,
  Text,
  Image,
  Button,
  View,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import {useGlobalState} from '../GlobalProvider';
const FavJobComponent = ({props, value}) => {
  const {translation} = useGlobalState();
  const [showDetails, setShowDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.main}>
      <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
        <Image source={require("../images/starIcon.png")}/>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[styles.heading]}>
            {value?.jobTitle.length > 15 ? (
              <>{value?.jobTitle?.substring(0, 15)}...</>
            ) : (
              value?.jobTitle
            )}
          </Text>
          <Text style={styles.date}>Apply Before - {value?.jobDeadline}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={[styles.companyName, {maxWidth: 150, flexWrap: 'wrap'}]}>
              {value?.jobCompany
                ? value?.jobCompany
                : 'Company Name not provided'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Image
                source={{
                  uri: `https://overseas.ai/storage/uploads/countryFlag/${value?.countryFlag}`,
                }}
                style={{
                  marginRight: 8,
                  height: 26,
                  width: 26,
                  borderRadius: 13,
                }}
              />
              <Text style={styles.countryText}>{value?.jobCountry}</Text>
            </View>
            <Text style={styles.currency}>
              {value?.jobWages} {value?.jobWagesCurrencyType}
            </Text>
          </View>
          <View>
            <Image
              style={{
                height: 80,
                width: 80,
                marginBottom: 10,
                borderRadius: 10,
              }}
              source={{
                uri: value?.jobPhoto,
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
            justifyContent: 'space-between',
          }}>
          <Button
            title="Apply Now"
            // onPress={() => handleApplyJob(value?.id)}
          />
          <Text style={{marginLeft: 13, color: '#5F90CA', fontSize: 12}}>
            Hide Details
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FavJobComponent;

const styles = StyleSheet.create({
  main: {
    padding: 15,
    borderColor: '#B3B3B3',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  heading: {
    color: '#0F0C0C',
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'Nato Sans',
  },
  date: {
    color: '#000',
    fontSize: 10,
    fontWeight: '300',
    fontFamily: 'Nato Sans',
  },
  grayDot: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: 'gray',
    marginRight: 10,
    marginVertical: 3,
    marginLeft: 3,
  },
  highlight: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 7,
    borderColor: 'black',
    borderWidth: 1,
  },
  backgroundColorGreen: {
    backgroundColor: '#4FB988',
  },
  currency: {
    marginVertical: 10,
    color: '#0F0C0C',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Nato Sans',
  },
  countryText: {
    color: '#0F0C0C',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  },

  companyName: {
    color: '#0F0C0C',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
    marginTop: 10,
  },
  textGreen: {
    color: '#4FB988',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  },
});
