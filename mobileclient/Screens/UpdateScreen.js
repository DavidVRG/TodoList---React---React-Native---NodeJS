import { StyleSheet, View } from 'react-native'
import { Button, Input, Text } from '@rneui/base'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message';


const AddScreen = ({ route, navigation }) => {

  const [text, setText] = useState('')

  async function submit() {

    const token = await AsyncStorage.getItem("Access_Token")

    if (token !== null) {
      fetch(`http:/192.168.1.64:5000/api/todo/updateTodo/${route.params.id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access_Token": token
        },
        body: JSON.stringify({ todotext: text })
      })
        .then(res => {
          if (res.ok) {
            Toast.show({
              type: "success",
              text1: "Todo is updated!"
            })
            navigation.navigate("Home")
          } else {
            Toast.show({
              type: "success",
              text1: "Todo update error!"
            })
          }
        })
    } else {
      Toast.show({
        type: "success",
        text1: "You are not logged in!"
      })
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text h2 style={styles.title}>Update Todo</Text>
        <Input
          placeholder="Todo Text"
          inputStyle={styles.inputStyle}
          placeholderTextColor="white"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Button
          title="Submit"
          containerStyle={styles.btn}
          onPress={submit}
        />
      </View>
    </View>
  )
}

export default AddScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00296b",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "white",
    marginVertical: 20,
    textAlign: "center"
  },
  inputContainer: {
    width: "80%",
    backgroundColor: "#003f88",
    padding: 20,
    borderRadius: 10
  },
  inputStyle: {
    backgroundColor: "#00296b",
    color: "white",
    padding: 10
  },
  btn: {
    marginVertical: 10,
    width: 200,
    alignSelf: "center"
  },
})