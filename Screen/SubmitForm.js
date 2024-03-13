import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Input, Button } from "@rneui/themed";
import axios from "axios";

const SubmitForm = ({ navigation, route }) => {

  useEffect(()=>{
    navigation.setOptions({
      headerRight: ()=>(
        <Button className="bg-blue-500 rounded" onPress={()=>{

          passError("LogOut Successfully")
          // navigation.popToTop()
          navigation.replace("Login")
        }} title="Logout"/>
      )
    })
  },[navigation])
  const {name, token} = route.params;
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [image, setImage] = useState(null);
  
  const handleLongitudeChange = (text) => {
    setLongitude(text);
  };

  const handleLatitudeeChange = (text) => {
    setLatitude(text);
  };

  const handleSubmit = () => {
    let filename = image.split("/").pop();
    
    let match = /\.(\w+)$/.exec(filename);
    let allowedExtensions = ['jpg', 'jpeg', 'png'];
    let extension = match ? match[1].toLowerCase() : '';



    if (allowedExtensions.includes(extension)) {
      let type = `image/${extension}`;
      
      let formData = new FormData();
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("file", { uri: image, name: filename, type });
      

      axios({
        method: "POST",
        url: "https://test.webyaparsolutions.com/form",
        data: formData,
        headers:{
          "Authorization": token,
          "Content-Type": "multipart/form-data"
        }
      }).then((res)=> {
      
        if(res.data.success === true){
          
          passError(res.data.message);
          setLatitude("");
          setLongitude("");
          setImage(null)
         
        }
      }).catch((err)=> console.log(err))
  }
   
  };

  const passError = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });



    if (!result.canceled) {
      setImage(result?.assets[0]?.uri);
    }
  };

  const launchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      cameraType: "back",
    });
    if (!result.canceled) {
      setImage(result?.assets[0]?.uri);
    }
  };
  return (
    <KeyboardAvoidingView className="flex-1 justify-center p-6">
      <View>
        <Input
          value={longitude}
          onChangeText={handleLongitudeChange}
          placeholder="Longitude"
        />
      </View>
      <View>
        <Input
          value={latitude}
          onChangeText={handleLatitudeeChange}
          placeholder="Latitude"
        />
      </View>

      {image && (
        <Image
          source={{ uri: image }}
          style={{}}
          className="h-1/4 aspect-square items-center flex self-center rounded-lg"
        />
      )}
      <View className="flex flex-row self-center">
        <Button
          title="Select Image"
          onPress={pickImage}
          containerStyle={styles.spbutton}
          raised="true"
        />
        <Button
          title="Camera"
          onPress={launchCamera}
          containerStyle={styles.spbutton}
          raised="true"
        />
      </View>
      <Button
        title="Add"
        onPress={handleSubmit}
        containerStyle={styles.buttonstyle}
        raised="true"
      />

      <Button
        title="Get Data"
        onPress={() =>  navigation.navigate("Data", {
          token: token
        })}
        containerStyle={styles.buttonstyle}
        type="outline"
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  buttonstyle: {
    width: 200,
    marginTop: 10,
    alignSelf: "center",
  },
  spbutton: {
    marginTop: 10,
    marginHorizontal: 5,
    alignSelf: "center",
  },
});

export default SubmitForm;
