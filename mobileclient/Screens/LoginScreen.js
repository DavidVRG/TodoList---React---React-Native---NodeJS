import { StyleSheet, View } from 'react-native'
import { Button, Text } from '@rneui/base'
import React, { useState } from 'react'
import { Input } from '@rneui/themed'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    fetch("http://192.168.1.64:5000/api/auth/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          Toast.show({
            type: "success",
            text1: "Login error!"
          })
        }
      })
      .then(data => {
        Toast.show({
          type: "success",
          text1: "Login is successfully!"
        })
        AsyncStorage.setItem("Access_Token", data.Access_Token)
        AsyncStorage.setItem("email", email)
        AsyncStorage.setItem("password", password)
        navigation.navigate("Home")
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text h1 style={styles.title}>Login</Text>
        <Input
          placeholder="Email"
          inputStyle={styles.inputStyle}
          placeholderTextColor="white"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          inputStyle={styles.inputStyle}
          placeholderTextColor="white"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          title="Login"
          containerStyle={styles.btn}
          buttonStyle={{ backgroundColor: "rgba(214, 61, 57, 1)" }}
          onPress={login}
        />
        <Button
          title="Register"
          containerStyle={styles.btn}
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  )
}

export default LoginScreen

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