import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { Input, Button } from "@rneui/themed";
import axios from "axios";

const SignupPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleNameChange = (text) => {
    setName(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };
  const handleRePasswordChange = (text) => {
    setRePassword(text);
  };

  const handleSubmit = () => {
    if (password !== rePassword) {
      passToast("Password Mismatch");
    } else {

      axios.post('https://test.webyaparsolutions.com/auth/user/signup', {
            "name": name,
            "email": email,
            "password": password
        })
            .then(function (response) {
                passToast(response.data.message);
                if(response?.data?.message === true){
                navigation.replace('Login')
                }
            })
            .catch(function (error) {
                passToast(error.data.message)
                console.log(error);
            })
    }
       }

  const passToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  return (
    <>
      <KeyboardAvoidingView className="flex-1 justify-center p-6">
        <View>
          <Input
            value={name}
            onChangeText={handleNameChange}
            placeholder="Name"
          />
        </View>
        <View>
          <Input
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Email"
          />
        </View>
        <View>
          <Input
            value={password}
            onChangeText={handlePasswordChange}
            placeholder="Password"
            secureTextEntry
          />
        </View>
        <View className="pb-6">
          <Input
            value={rePassword}
            onChangeText={handleRePasswordChange}
            placeholder="Confirm Password"
            secureTextEntry
          />
        </View>
        <Button
          title="SignUp"
          onPress={handleSubmit}
          containerStyle={styles.buttonstyle}
          raised="true"
        />
        <Button
          title="Login"
          onPress={() => navigation.replace("Login")}
          containerStyle={styles.buttonstyle}
          type="outline"
        />
        <View className="w-full flex items-center">
          <Text>Already have a account?</Text>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  buttonstyle: {
    width: 200,
    marginTop: 10,
    alignSelf: "center",
  },
});

export default SignupPage;
