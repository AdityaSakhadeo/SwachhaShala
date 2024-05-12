import { Platform, Alert, Linking } from "react-native"
import { check, request, PERMISSIONS, PermissionStatus } from 'react-native-permissions';
import AsyncStorage from "@react-native-async-storage/async-storage";

const updateDenyCount = async (type) => {
    try {
        if (type==='camera') {
        let permissionDenied = await AsyncStorage.getItem("permissionsDeniedCamera");
        permissionDenied = Number(permissionDenied) || 0;
        permissionDenied += 1;
        console.log("Permission Denied Camera: ", permissionDenied)
        await AsyncStorage.setItem("permissionsDeniedCamera", permissionDenied.toString())
        if (permissionDenied >=3) {
            Alert.alert(
                "Permission Denied",
                "You have denied camera access 2 or more times now you have to enable access manually",
                [{
                    text: "Enable", onPress: () => {
                        if (Platform.OS === 'ios') {
                            Linking.openURL('app-settings:')
                        }
                        else {
                            Linking.openSettings()
                        }
                    }
                },
                {
                    text:"Cancel",
                    style:"cancel"
                }
            ]
            )
        }
    }
    else if (type==='location') 
    {
        let permissionDenied = await AsyncStorage.getItem("permissionsDeniedLocation");
        permissionDenied = Number(permissionDenied) || 0;
        permissionDenied += 1;
        console.log("Permission Denied Library: ", permissionDenied)
        await AsyncStorage.setItem("permissionsDeniedLibrary", permissionDenied.toString())
        if (permissionDenied >=3) {
            Alert.alert(
                "Permission Denied",
                "You have denied image library access 2 or more times now you have to enable access manually",
                [{
                    text: "Enable", onPress: () => {
                        if (Platform.OS === 'ios') {
                            Linking.openURL('app-settings:')
                        }
                        else {
                            Linking.openSettings()
                        }
                    }
                },
                {
                    text:"Cancel",
                    style:"cancel"
                }
            ]
            )
        }
    }
    }
    catch {
        console.log(error);
    }
}
const PERMISSION_OUTPUT_MAP = Object.freeze({
    UNAVAILABLE: 'unavailable',
    BLOCKED: 'blocked',
    DENIED: 'denied',
    GRANTED: 'granted',
    LIMITED: 'limited',
});

/**
 * @param void
 * @returns {boolean}
 * @description 
 *  Fist checks the permission or otherwise requests 
 *  the permission for both android and IOS.
 */
export const checkOrRequestPermissionForCamera = async () => {
    let hasPermission = true;
    const cameraPermission = Platform.OS === "android"
        ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;

    const checkPermissionResult = await check(cameraPermission);
    hasPermission = checkPermissionResult === PERMISSION_OUTPUT_MAP.GRANTED || checkPermissionResult === PERMISSION_OUTPUT_MAP.LIMITED

    if (!hasPermission) {
        console.log("INSIDE IF ", hasPermission)

        const requestPermissionResult = await request(cameraPermission, {
            title: "App Camera Permission",
            message: "App needs access to your camera ",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
        });
        if (requestPermissionResult === PERMISSION_OUTPUT_MAP.DENIED|| PERMISSION_OUTPUT_MAP.BLOCKED) {
            await updateDenyCount('camera');
        }
        hasPermission = requestPermissionResult === PERMISSION_OUTPUT_MAP.GRANTED || requestPermissionResult === PERMISSION_OUTPUT_MAP.LIMITED

    }
    return hasPermission
}
/**
 * @param void
 * @returns {boolean}
 * @description 
 *  Fist checks the permission or otherwise requests 
 *  the permission for both android and IOS.
 */
export const checkOrRequestPermissionForLocation=async()=>
    {
        let hasPermission = true;
        const locationPermission = Platform.OS === "android"
            ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
    
        const checkPermissionResult = await check(locationPermission);
        hasPermission = checkPermissionResult === PERMISSION_OUTPUT_MAP.GRANTED || checkPermissionResult === PERMISSION_OUTPUT_MAP.LIMITED
    
        if (!hasPermission) {    
            const requestPermissionResult = await request(locationPermission, {
                title: "App Camera Permission",
                message: "App needs access to your camera ",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            });
            if (requestPermissionResult === PERMISSION_OUTPUT_MAP.DENIED|| PERMISSION_OUTPUT_MAP.BLOCKED) {
                await updateDenyCount('location');
            }
            hasPermission = requestPermissionResult === PERMISSION_OUTPUT_MAP.GRANTED || requestPermissionResult === PERMISSION_OUTPUT_MAP.LIMITED
    
        }
        return hasPermission
    }

/**
 * @param void
 * @returns {boolen}
 * @description 
 *  Fist checks the permission or otherwise requests 
 *  the permission for both android and IOS.
 */
// export const checkOrRequestPermissionForImageLibrary = async () => {
//     let hasPermission = true;
//     const libraryPermission = Platform.OS === "android"
//         ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE : PERMISSIONS.IOS.PHOTO_LIBRARY;
//     console.log("library permission: ",libraryPermission)
//     const checkPermissionResult = await check(libraryPermission);
//     console.log("Permission result library",checkPermissionResult)
//     hasPermission = checkPermissionResult === PERMISSION_OUTPUT_MAP.GRANTED || checkPermissionResult === PERMISSION_OUTPUT_MAP.LIMITED
//     console.log("HAS PERMISSION LIBRARY",hasPermission)
//     if (!hasPermission) {
//         console.log("HERE")
//         const requestPermissionResult = await request(libraryPermission, {
//             title: "App photo library Permission",
//             message: "App needs access to  photo library",
//             buttonNegative: "Cancel",
//             buttonPositive: "OK"
//         });
//         if (requestPermissionResult === PERMISSION_OUTPUT_MAP.DENIED|| PERMISSION_OUTPUT_MAP.BLOCKED) {
//             await updateDenyCount('library');
//         }
//         hasPermission = requestPermissionResult === PERMISSION_OUTPUT_MAP.GRANTED || requestPermissionResult === PERMISSION_OUTPUT_MAP.LIMITED
//     }
//     return hasPermission;
// }

