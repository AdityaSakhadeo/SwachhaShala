import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FirstPage from './src/firstPage'; // Replace with the correct path
import ImageUploader from './src/imageUploader'; // Replace with the correct path
import { View } from 'react-native';
import ImageDownloader from './src/imageDownloader';
import AdminAccess from './src/AdminAccess'
const Stack = createNativeStackNavigator();

const App = () => {
    return (
      <View style={{backgroundColor:"#35374B",flex:1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Welcome' options={{headerShown:false}} component={FirstPage}/>
          <Stack.Screen name="imageUploader" options={{headerShown:true,title:"Image Upload"}} component={ImageUploader} />
          <Stack.Screen name="imageDownloader" options={{headerShown:true,title:"Image Download"}} component={ImageDownloader} />
          <Stack.Screen name="AdminAccess" options={{headerShown:true,title:"Admin Login"}} component={AdminAccess}/>
        </Stack.Navigator>
      </NavigationContainer>
      </View>
    );
}

export default App;
