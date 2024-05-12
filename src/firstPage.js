import { Text, View, StyleSheet, TouchableOpacity, Image, DrawerLayoutAndroid, Platform } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PermissionsAndroid } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import { checkOrRequestPermissionForCamera, checkOrRequestPermissionForLocation } from './utils/permissionUtil';
const FirstPage = ({ navigation }) => {
    const drawerRef = useRef(null);

    const openDrawer = () => {
        drawerRef.current.openDrawer();
    };


    useEffect(() => {
        // const requestCameraPermission = async () => {
        //     if (Platform.OS === 'android') {
        //         try {
        //             const granted = await PermissionsAndroid.requestMultiple([
        //                 PermissionsAndroid.PERMISSIONS.CAMERA,
        //                 PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        //                 PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        //             ]);
        //             console.log("WRITE_STORAGE", granted['android.permission.WRITE_EXTERNAL_STORAGE'])
        //             if (
        //                 granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
        //                 granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        //                 granted['android.permission.ACCESS_FINE_LOCATION'] ===  PermissionsAndroid.RESULTS.GRANTED
        //             ) {
        //                 console.log('Both CAMERA & STORAGE permissions granted');
        //             } else {
        //                 console.log('One or both permissions denied');
        //             }
        //         } catch (err) {
        //             console.warn(err);
        //         }
        //     }
        // };

        // requestCameraPermission();

        checkOrRequestPermissionForLocation().then((res)=>{console.log(res)});
        checkOrRequestPermissionForCamera().then((res)=>{console.log(res)});
        
        return () => { };
    }, []);

    return (
        <DrawerLayoutAndroid
            ref={drawerRef}
            drawerWidth={wp('75%')} // Adjust based on screen width
            drawerPosition="left"
            renderNavigationView={() => (
                <View style={{ flex: 1, backgroundColor: '#35374B' }}>
                    <Image source={require('../src/assests/image.png')} style={{marginLeft:wp('22'),marginTop:wp('20')}}/>
                    <Text style={{color:'yellow',fontWeight:'bold',fontSize:wp('6'),marginLeft:wp('15')}}>Swachha Shala</Text>
                    <View style={{marginTop:wp('10')}}>
                    <TouchableOpacity onPress={() => drawerRef.current.closeDrawer()} style={{borderBottomColor:'yellow',borderBottomWidth:1,borderTopWidth:1,borderTopColor:'yellow'}}>
                        <Text style={{ padding: 20,fontWeight:'bold',fontSize:wp(5),color:'yellow'}}>Upload Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AdminAccess')} style={{borderBottomColor:'yellow',borderBottomWidth:1}}>
                        <Text style={{ padding: 20,fontWeight:'bold',fontSize:wp(5),color:'yellow'}}>Admin Access</Text>
                    </TouchableOpacity>
                    </View>
                    {/* Add more drawer items here if needed */}
                </View>
            )}
        >
            <View style={styles.container}>
                <TouchableOpacity onPress={openDrawer} style={{ marginRight: wp('85'), marginTop: wp('-20') }}>
                    <Image source={require('../src/assests/bars.png')} style={{ width: wp('10'), height: wp('10') }} />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Image source={require('../src/assests/image.png')} style={styles.logo} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.cityText}>Pune</Text>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Knowledge </Text>
                        <Text style={styles.titleText}>Cluster</Text>
                    </View>
                </View>
                <Text style={styles.infoText}>School Bathroom Cleanliness Initiative</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('imageUploader')}>
                    <Text style={styles.buttonText}>Upload Image</Text>
                </TouchableOpacity>
                <Text style={styles.poweredBy}>Powered By Chinar Deshpande</Text>
            </View>
        </DrawerLayoutAndroid>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#35374B',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        marginTop: hp('17%'), // Adjust based on screen height
        alignItems: 'center'
    },
    logo: {
        width: wp('40%'), // Adjust based on screen width
        height: wp('40%'), // Adjust based on screen width
    },
    textContainer: {
        alignItems: 'center'
    },
    cityText: {
        color: 'white',
        fontSize: hp('4%'), // Adjust based on screen height
        fontFamily: "Roboto-Bold",
        fontWeight: 'bold'
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: {
        color: 'yellow',
        fontSize: hp('5%'), // Adjust based on screen height
        fontWeight: 'bold',
        fontFamily: "Roboto-Bold"
    },
    infoText: {
        marginTop: hp('2%'), // Adjust based on screen height
        width: wp('70%'), // Adjust based on screen width
        color: 'white',
        fontSize: hp('2%'), // Adjust based on screen height
        textAlign: 'center'
    },
    button: {
        backgroundColor: 'yellow',
        marginVertical: hp('3%'), // Adjust based on screen height
        paddingVertical: hp('2%'), // Adjust based on screen height
        paddingHorizontal: wp('8%'), // Adjust based on screen width
        borderRadius: wp('5%'), // Adjust based on screen width
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: hp('2.5%') // Adjust based on screen height
    },
    poweredBy: {
        color: 'yellow',
        marginTop: hp('5%') // Adjust based on screen height
    }
});

export default FirstPage;
