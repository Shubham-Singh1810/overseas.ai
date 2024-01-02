import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import {useState} from 'react';

const JobGola = ({value, props}) => {
  const [showFullOccupation, setShowFullOccupation] = useState(false);
  return (
    <TouchableOpacity onPress={()=>props.navigation.navigate('Jobs By Department', { departmentId: value?.id, departmentName:value?.occupation })}>
      <View style={styles.main} >
      <View style={styles.imgGola}>
        <Image
          source={{
            uri: `https://overseas.ai/storage/uploads/occupationImage/${value?.id}/${value?.occuIcon}`,
          }}
          style={styles.img}
        />
      </View>
      {showFullOccupation ? (
        <Text style={styles.text} onPress={()=>setShowFullOccupation(false)}>{value?.occupation}</Text>
      ) : (
        <Text style={styles.text}>
          {value?.occupation?.length > 15 ? (
            <Text onPress={() => setShowFullOccupation(true)}>
              {value?.occupation?.substring(0, 15)}{' '}
              <Text >...</Text>
            </Text>
          ) : (
            value?.occupation
          )}
        </Text>
      )}
    </View>
    </TouchableOpacity>
  );
};

export default JobGola;

const styles = StyleSheet.create({
  main: {
    marginTop: 8,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 60,
    width: 60,
  },
  imgGola: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    width: 90,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 45,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    marginBottom: 5,
  },
  text: {
    color: '#000',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Nato Sans',
  },
});
