import { StyleSheet, View } from 'react-native'
import { Button, Text } from '@rneui/base'
import React, { useState } from 'react'
import { Input } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message';



const AddScreen = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  async function register() {
    fetch("http://192.168.1.64:5000/api/auth/register", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: name,
        email: email,
        password: password
      })
    })
      .then(async res => {
        if (res.ok) {
          Toast.show({
            type: "success",
            text1: "Register is successfully!"
          })
          navigation.navigate("Login")
        } else {
          Toast.show({
            type: "success",
            text1: "Register error!"
          })
        }
      })
  }


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text h1 style={styles.title}>Register</Text>
        <Input
          placeholder="Email"
          inputStyle={styles.inputStyle}
          placeholderTextColor="white"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Name"
          inputStyle={styles.inputStyle}
          placeholderTextColor="white"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Password"
          inputStyle={styles.inputStyle}
          placeholderTextColor="white"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          title="Register"
          containerStyle={styles.btn}
          buttonStyle={{ backgroundColor: "rgba(214, 61, 57, 1)" }}
          onPress={register}
        />
        <Button
          title="Login"
          containerStyle={styles.btn}
          onPress={() => navigation.navigate("Login")}
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
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
    backgroundColor: "#003f88",
    padding: 10,
    borderRadius: 10
  },
  title: {
    color: "white",
    textAlign: "center",
    marginBottom: 20
  },
  inputStyle: {
    backgroundColor: "#00296b",
    color: "white",
    padding: 10
  },
  btn: {
    marginBottom: 10,
    width: 200,
    alignSelf: "center"
  },
})