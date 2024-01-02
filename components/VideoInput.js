import React, { useState } from 'react';
import { View, Image, Button, Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const VideoInput = () => {
  const [mediaUri, setMediaUri] = useState(null);

  const pickMedia = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.video],
      });

      // Set the selected media URI
      setMediaUri(result.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('User cancelled media picker');
      } else {
        console.error('Error picking media', err);
      }
    }
  };

  return (
    <View>
      {mediaUri && (
        <View>
          {/* Display the media (image or video) */}
          <Text>Media Preview Placeholder</Text>
        </View>
      )}
      <Button title="Pick a media file" onPress={pickMedia} />
    </View>
  );
};

export default VideoInput;
