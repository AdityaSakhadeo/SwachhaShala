#!/bin/sh
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/build/intermediates/res/merged/release/
 
cd android
./gradlew clean
./gradlew assembleRelease
 
current_datetime=$(date +"%Y-%m-%d_%H-%M-%S")
new_file_name="DEV_V3.1.1${current_datetime}.apk"
cp ./app/build/outputs/apk/release/app-release.apk ../${new_file_name}