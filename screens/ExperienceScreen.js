import {StyleSheet, TextInput, Text, Button, View} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';

const ExperienceScreen = () => {
  return (
    <View style={styles.main}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button title="ADD MORE" />
      </View>
      <View style={{marginTop:15}}>
        <TextInput placeholder="Company Name" style={styles.input} />
        <View style={styles.picker}>
          <Picker
          // selectedValue={experienceForm.jobProfile}
          // onValueChange={(itemValue, itemIndex) => {
          //   getSkillListByOccuId(itemValue);
          //   setExperienceForm({
          //     ...experienceForm,
          //     jobProfile: itemValue,
          //   });
          // }}
          >
            <Picker.Item
              label="Working Department"
              value=""
              style={{color: 'gray'}}
            />
            {/* {occupations.map((v, i) => {
                    return (
                      <Picker.Item
                        label={v.occupation}
                        value={v.id}
                        style={{color: 'gray'}}
                      />
                    );
                  })} */}
            {/* Add more Picker.Item as needed */}
          </Picker>
        </View>
        <View style={styles.picker}>
                <Picker
                  // selectedValue={experienceForm.jobOccupation}
                  // onValueChange={(itemValue, itemIndex) => {
                  //   setExperienceForm({
                  //     ...experienceForm,
                  //     jobOccupation: itemValue,
                  //   });
                  // }}
                  >
                  <Picker.Item
                    label="Occupation"
                    value=""
                    style={{color: 'gray'}}
                  />
                  {/* {skills.map((v, i) => {
                    return (
                      <Picker.Item
                        label={v?.skill}
                        value={v.id}
                        style={{color: 'gray'}}
                      />
                    );
                  })} */}

                  {/* Add more Picker.Item as needed */}
                </Picker>
              </View>
              <View style={styles.picker}>
                <Picker
                  // selectedValue={experienceForm.experienceType}
                  // onValueChange={(itemValue, itemIndex) => {
                  //   setExperienceForm({
                  //     ...experienceForm,
                  //     experienceType: itemValue,
                  //   });
                  // }}
                  >
                  <Picker.Item
                    label="Experience Type"
                    value=""
                    style={{color: 'gray'}}
                  />

                  <Picker.Item
                    label="Inside India"
                    value="national"
                    style={{color: 'gray'}}
                  />
                  <Picker.Item
                    label="Outside India"
                    value="international"
                    style={{color: 'gray'}}
                  />

                  {/* Add more Picker.Item as needed */}
                </Picker>
              </View>
              <View style={styles.picker}>
                <Picker
                  // selectedValue={experienceForm.experienceType}
                  // onValueChange={(itemValue, itemIndex) => {
                  //   setExperienceForm({
                  //     ...experienceForm,
                  //     experienceType: itemValue,
                  //   });
                  // }}
                  >
                  <Picker.Item
                    label="Country"
                    value=""
                    style={{color: 'gray'}}
                  />

                  <Picker.Item
                    label="Inside India"
                    value="national"
                    style={{color: 'gray'}}
                  />
                  <Picker.Item
                    label="Outside India"
                    value="international"
                    style={{color: 'gray'}}
                  />

                  {/* Add more Picker.Item as needed */}
                </Picker>
              </View>
              <View style={styles.picker}>
                <Picker
                  // selectedValue={experienceForm.experienceType}
                  // onValueChange={(itemValue, itemIndex) => {
                  //   setExperienceForm({
                  //     ...experienceForm,
                  //     experienceType: itemValue,
                  //   });
                  // }}
                  >
                  <Picker.Item
                    label="State"
                    value=""
                    style={{color: 'gray'}}
                  />

                  <Picker.Item
                    label="Country"
                    value="national"
                    style={{color: 'gray'}}
                  />
                  <Picker.Item
                    label="State"
                    value="international"
                    style={{color: 'gray'}}
                  />

                  {/* Add more Picker.Item as needed */}
                </Picker>
              </View>
              <Button color="#5F90CA" title='Add '/>
      </View>
    </View>
  );
};

export default ExperienceScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 18,
  },
  input: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 18,
    backgroundColor: 'white',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    width: '100%',
    marginBottom: 18,
    backgroundColor: 'white',
  },
});
