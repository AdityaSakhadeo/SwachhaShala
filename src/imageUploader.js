import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Alert, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import { firebase } from '../config';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { checkOrRequestPermissionForLocation } from './utils/permissionUtil';
import Geolocation from '@react-native-community/geolocation';
import { getUserPosition } from './utils/locationUtil';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ImageUploader = ({ navigation }) => {
    const [schoolName, setSchoolName] = useState('');
    const [image, setImage] = useState(null);
    const [selectedOption, setSelectedOption] = useState('clean');
    const [isLoading, setIsLoading] = useState(false);
    const [userLocation,setUserLocation] = useState('');



    const getLatLong = () => {
        return new Promise((resolve, reject) => {
            if (Platform.OS === 'android') {
                Geolocation.getCurrentPosition(
                    (position) => {
                        const location = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        };
                        // console.log(typeof(formattedLatLong))
                        resolve(location);
                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                        reject(error);
                    },
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                );
            } else {
                Geolocation.requestAuthorization();
                Geolocation.getCurrentPosition(
                    (position) => {
                        const location = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        };
                        const formattedLatLong = `${location.latitude},${location.longitude}`;
                        resolve(formattedLatLong);
                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                        reject(error);
                    },
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                );
            }
        });
    };

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const latlong = await getLatLong();
                // console.log("Lat long", latlong.latitude);
                const location = await getUserPosition(String(latlong.latitude), String(latlong.longitude));
                let address = String(location.results[0].formatted_address);
                setUserLocation(address);
                Alert.alert("Location",address);
            } catch (error) {
                console.error('Error fetching user location:', error);
            }
        };
        fetchLocation();
                }
    , []);

    const handleChoosePhoto = async () => {
        // await requestCameraPermission();
        // await requestStoragePermission();
        Alert.alert(
            'Choose Photo',
            'Select photo from:',
            [
                {
                    text: 'Take Photo',
                    onPress:takePhoto,
                },
                {
                    text: 'Choose from Library',
                    onPress: chooseFromLibrary
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };

    const chooseFromLibrary = async () => {
        const result = await launchImageLibrary();
        setImage(result.assets[0].uri);
    };

    const takePhoto = async () => {
        const result = await launchCamera();
        setImage(result?.assets[0]?.uri);
    };

    const handleUploadImage = async () => {
        if (!schoolName) {
            Alert.alert('Alert', 'Please Enter School Name');
            setIsLoading(false);
            return;
        }
    
        try {
            setIsLoading(true);
            const response = await fetch(image);
            const blob = await response.blob();
            const folder = selectedOption === 'clean' ? 'clean' : 'dirty';
            const fileName = `${schoolName}_${selectedOption}.jpg`;
            
            // Upload image to Firebase Storage
            const storageRef = firebase.storage().ref().child(folder);
            const fileRef = storageRef.child(fileName);
            await fileRef.put(blob);
    
            // Get download URL of uploaded image
            const downloadURL = await fileRef.getDownloadURL();
            // console.log("before firestoreref")
            // // Get reference to the Firestore database
            // console.log("Firestore ref")
            // // Check if the 'imageDetails' collection exists
            // const imageDetailsRef = firestore().collection('imageDetails').get();
            // console.log("checking ::",imageDetailsRef);
            // const doc = await imageDetailsRef.doc('dummyDoc').get();
    
            // if (!doc.exists) {
            //     // If the collection doesn't exist, create it
            //     console.log("Table does not exist")
            //     await imageDetailsRef.doc('dummyDoc').set({});
            // }
    
            // // Upload data to Firestore
            // await imageDetailsRef.add({
            //     imageName: fileName,
            //     schoolName: schoolName,
            //     location: userLocation, // Replace with actual location string
            //     label: selectedOption
            // });
    
            setIsLoading(false);
            Alert.alert('Image and Data Uploaded Successfully', 'Thank you for your contribution!');
            navigation.goBack();
        } catch (error) {
            setIsLoading(false);
            Alert.alert('Error', 'Failed to upload image and data');
        }
    };
    
    



    const handleRemoveClick = () => {
        setImage(null);
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#35374B' }}>
            <Text style={{ color: 'yellow', fontSize: windowHeight * 0.025, fontWeight: 'bold', marginTop: windowHeight * 0.01 }}>School Bathroom Cleanliness Initiative</Text>
            <View style={{ marginTop: windowHeight * 0.01 }}>
                <Image source={require('../src/assests/image.png')} style={{ width: windowWidth * 0.3, height: windowWidth * 0.3 }} />
            </View>
            <View style={{ alignItems: 'center', marginTop: windowHeight * 0.02 }}>
                <Text style={{ color: 'yellow', fontSize: windowHeight * 0.025, fontWeight: 'bold' }}>Enter School Name:</Text>
                <TextInput
                    style={{ height: windowHeight * 0.05, width: windowWidth * 0.9, borderColor: 'gray', borderWidth: 1, marginBottom: windowHeight * 0.01, marginTop: windowHeight * 0.02, borderRadius: windowHeight * 0.04, color: 'yellow' }}
                    placeholder="Enter School Name"
                    onChangeText={(text) => setSchoolName(text)}
                    value={schoolName}
                    placeholderTextColor={'yellow'}
                />
                {image && (
                    <Image
                        source={{ uri: image }}
                        style={{ width: windowWidth * 0.3, height: windowWidth * 0.3 }}
                    />
                )}
                {image && (
                    <TouchableOpacity style={{ marginTop: windowHeight * 0.02, backgroundColor: 'white', padding: windowHeight * 0.010, borderRadius: windowHeight * 0.02 }} onPress={handleRemoveClick}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>remove</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleChoosePhoto} style={{ marginTop: windowHeight * 0.025, width: windowWidth * 0.5, height: windowHeight * 0.06, backgroundColor: '#704264', borderRadius: windowHeight * 0.04, alignItems: 'center', justifyContent: 'center', opacity: image ? 0.5 : 1 }} disabled={image ? true : false}>
                    <Text style={{ color: 'white' }}>Choose Image</Text>
                </TouchableOpacity>

                <Text style={{ marginTop: windowHeight * 0.025, color: 'yellow', fontSize: windowHeight * 0.025 }}>Your review about the Bathroom</Text>
                <View style={{ flexDirection: 'row', marginTop: windowHeight * 0.025 }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', marginRight: windowWidth * 0.05 }}
                        onPress={() => setSelectedOption('clean')}
                    >
                        <View style={{ width: windowWidth * 0.06, height: windowWidth * 0.06, borderRadius: windowWidth * 0.03, borderWidth: 2, marginRight: windowWidth * 0.02, backgroundColor: selectedOption === 'clean' ? 'green' : 'white' }}>
                            {selectedOption === 'clean' && <View style={{ flex: 1, backgroundColor: 'green', borderRadius: windowWidth * 0.03 }} />}
                        </View>
                        <Text style={{ fontSize: windowHeight * 0.025, color: 'yellow' }}>Clean</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center', marginLeft: windowWidth * 0.05 }}
                        onPress={() => setSelectedOption('dirty')}
                    >
                        <View style={{ width: windowWidth * 0.06, height: windowWidth * 0.06, borderRadius: windowWidth * 0.03, borderWidth: 2, marginRight: windowWidth * 0.02, backgroundColor: selectedOption === 'dirty' ? 'red' : 'white' }}>
                            {selectedOption === 'dirty' && <View style={{ flex: 1, backgroundColor: 'red', borderRadius: windowWidth * 0.03 }} />}
                        </View>
                        <Text style={{ fontSize: windowHeight * 0.025, color: 'yellow' }}>Dirty</Text>
                    </TouchableOpacity>
                </View>
                {isLoading && (
                    <View style={styles.overlay}>
                        <ActivityIndicator size="large" color="yellow" />
                    </View>
                )}
                <TouchableOpacity onPress={handleUploadImage} disabled={!image} style={{ marginTop: windowHeight * 0.025, width: windowWidth * 0.5, height: windowHeight * 0.06, backgroundColor: '#704264', borderRadius: windowHeight * 0.04, alignItems: 'center', justifyContent: 'center', opacity: !image ? 0.5 : 1 }}>
                    <Text style={{ color: 'white' }}>Upload Image</Text>
                </TouchableOpacity>
                <Text style={{ color: 'yellow', marginTop: hp('5%') }}>Powered By Chinar Deshpande</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        // backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default ImageUploader;