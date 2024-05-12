import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet,Image,Alert } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const AdminAccess = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user="user";
    const pass="123";
    if (user===username && pass===password) {
        navigation.navigate('imageDownloader')
    }
    else
    {
      Alert.alert("Login Failed","Username or Password is wrong")
    }
  };

  return (
    <View style={styles.container}>
     <View>
      <Image source={require('../src/assests/image.png')} style={{marginTop:wp('-10'),marginLeft:wp('22')}}/>
      <Text style={[styles.titleText,{marginLeft:wp('5')}]}>Admin Login</Text>
      <Text style={styles.infoText}>Enter Username and Password for admin access</Text>
     </View>

      <TextInput
          style={[styles.input, { marginTop: wp('5') }]}
        placeholder="Username"
        placeholderTextColor={'yellow'}
        onChangeText={text => setUsername(text)}
        value={username}
        />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'yellow'}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry={true}
        />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#35374B',
  },
  input: {
    width: '80%',
    height: wp('12'),
    borderColor: 'yellow',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: wp('5'),
    color:'yellow',
    fontSize:wp('5')
  },
  button: {
    width: '80%',
    height: wp('12'),
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('10'),
  },
  buttonText: {
    color: '#35374B',
    fontSize:wp('5'),
    fontWeight: 'bold',
  },
  titleText: {
    color: 'yellow',
    fontSize: hp('5%'), 
    fontWeight: 'bold',
    fontFamily: "Roboto-Bold"
},
infoText: {
    marginTop: hp('2%'),
    width: wp('70%'),
    color: 'white',
    fontSize: hp('2%'),
    textAlign: 'center'
},
});

export default AdminAccess;
