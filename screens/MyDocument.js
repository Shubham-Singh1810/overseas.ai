import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native'
import React from 'react'
import { useGlobalState } from '../GlobalProvider';
import DocumentUploader from '../components/DocumentUploader';
const MyDocument = (props) => {
  const {translation } = useGlobalState();
  // function to upload passport 
  const uploadPassport= ()=>{
    console.warn('passport upload function')
  }

  // function to upload cv 
  const uploadCv= ()=>{
    console.warn('passport upload CV')
  }

  // function to upload EXPERIENCE 
  const uploadExperience= ()=>{
    console.warn('passport upload EXPERIENCE')
  }
  // function to upload dl 
  const uploadDl= ()=>{
    console.warn('passport upload dl')
  }
  return (
    <>
    <ScrollView style={{flex:1, backgroundColor:"white"}}>
      <View style={styles.main}>
        <Text style={styles.messageText}>{translation.saveAllYourImportantDocumentsHere}</Text>
        <View style={{ paddingBottom:6}}>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
            <View style={{alignItems:"flex-end", flexDirection:"row"}}>
                <View>
                <Text style={styles.text}>Overseas CV</Text>
                <Text style={styles.noteText}>{translation.noteThisIsAnAutoGeneratedCvByOurSystem}</Text>
                </View>
            </View>
            <Image source={require("../images/rectangle.png")}/>
        </View>
        <Text  style={styles.blueText}>{translation.clickEditToMakeChanges}</Text>
        </View>
        <View style={styles.buttonBox}>
            <Text style={styles.text}>Custom CV</Text>
            <Button title="Upload" onPress={uploadCv}/>
        </View>
        <View style={styles.buttonBox}>
            <Text style={styles.text}>{translation.passport}</Text>
            <Button title="Upload" onPress={uploadPassport}/>
        </View>
        <View style={styles.buttonBox}>
            <Text style={styles.text}>{translation.experienceCertificate}</Text>
            <Button title="Upload" onPress={uploadExperience}/>
        </View>
        <View style={styles.buttonBox}>
            <Text style={styles.text}>{translation.drivingLicense}</Text>
            <Button title="Upload" onPress={uploadDl}/>
        </View>
        {/* <View style={styles.buttonBox}>
            <Text style={styles.text}>{translation.jobPermit}</Text>
            <Button title={translation.uploadNow}/>
        </View> */}
        <View style={styles.buttonBox}>
            <Text style={styles.text}>Covid Certificate</Text>
            <Button title="Upload" onPress={uploadDl}/>
        </View>
        <View style={styles.buttonBox}>
            <Text style={styles.text}>Education Certificate</Text>
            <Button title="Upload" onPress={uploadDl}/>
        </View>
        
        <View style={styles.buttonBox}>
            <Text style={styles.text}>Medical</Text>
            <Button title="VIEW"/>
        </View>
        <View style={styles.buttonBox}>
            <Text style={styles.text}>PCC</Text>
            <Button title="View"/>
        </View>
        {/* <View style={styles.buttonBox}>
            <Text style={styles.text}>{translation.exitLetter}</Text>
            <Button title={translation.uploadNow}/>
        </View>
        <View style={styles.buttonBox}>
            <Text style={styles.text}>{translation.drivingLicense}</Text>
            <Button title={translation.uploadNow}/>
        </View> */}
        <Text style={styles.text}><Text>+</Text>{translation.addNewDocument}</Text>
        <Text style={styles.grayText}>{translation.allYourDocumentsAreSafeWithUs}</Text>
      </View>
      {/* <DocumentUploader showPopup={true} name="CV"/> */}
    </ScrollView>
    
      </>
  )
}

export default MyDocument

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 60,
        flex:1
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
      messageText:{
        color: '#0F0C0C',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Nato Sans',
        marginVertical:15
      },
      buttonBox:{
        paddingVertical:17,
        flexDirection:"row",
        justifyContent:"space-between",
        borderTopColor:"#B3B3B3",
        borderTopWidth:1,
        alignItems:"center"
      },
      text:{
        color: '#000',
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Nato Sans',
        width:"45%",
      },
      noteText:{
        color: '#EB4343',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Nato Sans',
      },
      blueText:{
        color: '#5F90CA',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Nato Sans',
      },
      grayText:{
        textAlign:"center",
        color: '#B3B3B3',
        fontSize: 10,
        fontWeight: '400',
        fontFamily: 'Nato Sans',
        marginVertical:20
      }

})