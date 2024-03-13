import React, { useState } from 'react';
import { View,  KeyboardAvoidingView, StyleSheet, ToastAndroid, Text } from 'react-native';
import {  Input, Button } from '@rneui/themed';
import axios from 'axios';

const LoginPage = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (text) => {
        setEmail(text);
    };
    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const passToast = (text) =>{
        ToastAndroid.show(text, ToastAndroid.SHORT);
      }


    const handleSubmit = async() => {
        axios({
        method: 'POST',
        url: "https://test.webyaparsolutions.com/auth/user/login",
        data:  {
            "email": email,
            "password": password
          }
        }).then((res)=>{
            passToast(res.data.message)
            if(res.data.success === true){
                navigation.replace('Form', {
                    name: res.data.name,
                    token: res.data.token
                })
            }
        }).catch((err)=> console.log(err))
    };

    return (
        <KeyboardAvoidingView className ="flex-1 justify-center p-6">
            <View>
    
                <Input
                    value={email}
                    onChangeText={handleEmailChange}
                    placeholder="Email"
                />
            </View>
            <View className="pb-6">
                
                <Input
                    value={password}
                    onChangeText={handlePasswordChange}
                    placeholder="Password"
                    secureTextEntry
                />
            </View>
            <Button title="Login" onPress={handleSubmit} containerStyle={styles.buttonstyle} raised="true"/>
            <Button title="Register"  onPress={()=>navigation.replace('Register')} containerStyle={styles.buttonstyle}  type="outline"/>
            <View className="w-full flex items-center">
            <Text>Are you not Registered?</Text>
            </View>
            
        </KeyboardAvoidingView>

    );
};


const styles = StyleSheet.create({
    buttonstyle: {
        width:200,
        marginTop: 10,
        alignSelf: 'center',
    }
})

export default LoginPage
