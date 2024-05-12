import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'; // For downloading files
import { firebase } from '../config'; // Assuming your config file is in the same directory
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const DownloadImagesScreen = () => {
    const [loading,setLoading] = useState(false)
  useEffect(() => {
    // Initialize Firebase app if not already initialized
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);


  const downloadImagesInFolder = async (folderName) => {
    try {
      setLoading(true)
      const storageRef = firebase.storage().ref(folderName);
      const { items } = await storageRef.listAll();

      // Create a subdirectory in the device's Download directory
      const downloadDir = `${RNFetchBlob.fs.dirs.DownloadDir}/${folderName}`;
      await RNFetchBlob.fs.mkdir(downloadDir);

      // Iterate through each item in the folder
      for (const item of items) {
        const url = await item.getDownloadURL();

        // Extract the file name from the full path
        const fileName = item.name.split('/').pop();

        // Use RNFetchBlob to download the image
        await RNFetchBlob.config({
          fileCache: true,
          appendExt: 'jpg', // or whatever extension the image has
          path: `${downloadDir}/${fileName}`
        }).fetch('GET', url);
      }
      setLoading(false)
      Alert.alert('Success', `All images in ${folderName} downloaded successfully!`);
    } catch (error) {
      setLoading(false)
      console.error('Error downloading images:', error);
      Alert.alert('Error', `Failed to download images from ${folderName}. Please try again.`);
    }
  };

  return (
    <View style={[{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: "#35374B"}]}>
        {loading && (
        <View >
        <ActivityIndicator size={'large'} color={'yellow'} />
        <Text style={[{color:'yellow'}]}>Downloading Images</Text>
        </View>
        )}
        <Text style={[styles.titleText,loading&&{color:'#35374B'}]}>Download Images</Text>
      <TouchableOpacity onPress={() => downloadImagesInFolder('clean')} style={[{ backgroundColor: 'yellow', padding: wp('5'), borderRadius: wp('5%') },loading&&{backgroundColor:'#35374B'}]}>
        <Text style={{ fontWeight: 'bold',color:'#35374B',fontSize:wp('4') }}>Download Clean Images</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => downloadImagesInFolder('dirty')} style={[{ backgroundColor: 'yellow', padding: wp('5'), borderRadius: wp('5%'), marginTop: wp('5') },loading&&{backgroundColor:'#35374B'}]}>
        <Text style={{ fontWeight: 'bold' ,fontSize:wp('4'),color:'#35374B'}}>Download Dirty Images</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    titleText: {
        color: 'yellow',
        fontSize: hp('4%'), 
        fontWeight: 'bold',
        fontFamily: "Roboto-Bold",
        marginBottom:wp('10'),
    },

})
export default DownloadImagesScreen;
