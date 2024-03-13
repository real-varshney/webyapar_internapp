import React, { useEffect, useState } from "react";
import { View, Text, Image, ToastAndroid, FlatList } from "react-native";
import { Button } from "@rneui/themed";
import axios from "axios";

const GetForm = ({ route }) => {
  const { token } = route.params;
  const [data, setData] = useState(null);

  const getData = (token) => {
    axios({
      method: "GET",
      url: "https://test.webyaparsolutions.com/data",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        passToast(res.data.message);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const passToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };
  useEffect(() => {
    getData(token);
  }, []);

  return (
    <>
      {data === null ? (
        <View className="flex-1 items-center justify-center">
          <Button title="Solid" type=" " loading disabled />
        </View>
      ) : (
        <View className="flex-1 overflow-scroll ">
        <FlatList
        keyExtractor={(item)=> item.createdAt}
          data={data}
          renderItem={(item, index) => (
            <View
              className="flex flex-row justify-around bg-gray-200 p-5 m-2 rounded-2xl"
              key={index}
            >
              <View>
                <Text className="text-sm font-bold">Longitude</Text>
                <Text className="text-xl font-thin">
                  {item?.item?.location?.longitude}
    
                </Text>

                <Text className="text-sm font-bold">Latitude</Text>
                <Text className="text-xl font-thin">
                  {item?.item?.location?.latitude}
                </Text>
              </View>
              <Image
                source={{
                  uri: `https://test.webyaparsolutions.com` + item?.item?.file,
                }}
                style={{ width: 100, height: 100, borderRadius: 10 }}
              />
            </View>
          )}
        />
        </View>
      )}
    </>
  );
};

export default GetForm;
