import { StyleSheet, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Text } from '@rneui/base'
import Moment from 'react-moment'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';


const HomeScreen = ({ navigation }) => {

  const isFocused = useIsFocused();
  const [list, setList] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetch("http://192.168.1.64:5000/api/todo/list")
      .then(res => res.json())
      .then(data => {
        return data.sort((a, b) => {
          return new Date(a.date) - new Date(b.date)
        }).reverse()
      })
      .then(data => setList(data))
  }, [isFocused, refreshKey])

  useEffect(() => {
    const getData = async () => {
      try {
        const email = await AsyncStorage.getItem("email")
        const password = await AsyncStorage.getItem("password")
        if (email !== null && password !== null) {
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
        }
      } catch (e) {
        setLoggedIn(false)
      }
    }
    getData()
  }, [refreshKey, isFocused])

  async function deleteTodo(item) {

    const token = await AsyncStorage.getItem("Access_Token")
    if (token !== null) {
      fetch(`http://192.168.1.64:5000/api/todo/deleteTodo/${item._id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access_Token": token
        }
      })
      .then(res => {
        if(res.ok) {
          Toast.show({
            type: "success",
            text1: "Todo delete is successfully!"
          })
          setRefreshKey(key => key + 1)
        }else{
          Toast.show({
            type: "success",
            text1: "Todo delete error!"
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

  async function logout() {
    try {
      await AsyncStorage.removeItem("email")
      await AsyncStorage.removeItem("password")
      await AsyncStorage.removeItem("Access_Token")
      setRefreshKey(key => key + 1)
      Toast.show({
        type: "success",
        text1: "Logout is successfully!"
      })
    } catch (e) {
      Toast.show({
        type: "success",
        text1: "Logout error!"
      })
    }
  }


  return (
    <View style={styles.mainContainer}>
      <Text h1 style={styles.title}>Todo List</Text>
      <Text style={styles.subTitle}>You can upgrade and delete if the todo is yours!</Text>
      <View style={styles.container}>
        <View>
          {loggedIn ? (
            <Button
              title="Logout"
              buttonStyle={{ backgroundColor: "#003f88" }}
              onPress={logout}
              containerStyle={styles.loginbtn}
            />
          ) : (
            <Button
              title="Login"
              buttonStyle={{ backgroundColor: "#003f88" }}
              onPress={() => navigation.navigate("Login")}
              containerStyle={styles.loginbtn}
            />
          )}
          <Button
            title="Add a new Todo!"
            buttonStyle={{ backgroundColor: "rgba(214, 61, 57, 1)" }}
            onPress={() => navigation.navigate("Add")}
            containerStyle={styles.addbtn}
          />
        </View>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <View style={styles.todo}>
              <View>
                <Text style={styles.todotext}>{item.todotext}</Text>
                <Moment style={styles.time} element={Text} format="YYYY.MM.DD - hh:mm:ss" date={item.date}></Moment>
              </View>
              <View style={styles.btngroup}>
                <Button
                  title="Update"
                  onPress={() => navigation.navigate("Update", {id: item._id})}
                  containerStyle={styles.button}
                />
                <Button
                  title="Delete"
                  onPress={() => deleteTodo(item)}
                  buttonStyle={{ backgroundColor: "rgba(214, 61, 57, 1)" }}
                  containerStyle={styles.button}
                />
              </View>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#00296b",
    flex: 1,
    alignItems: "center",
  },
  title: {
    color: "white",
    marginTop: 20
  },
  subTitle: {
    color: "white"
  },
  container: {
    width: "100%",
    padding: 20,
  },
  todo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: "100%",
    backgroundColor: "#003f88",
    marginVertical: 6,
    borderRadius: 5
  },
  todotext: {
    color: "white"
  },
  time: {
    color: "white",
    opacity: 0.5,
    fontSize: 10
  },
  btngroup: {
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 5
  },
  addbtn: {
    width: 200,
    alignSelf: "center",
    marginBottom: 20
  },
  loginbtn: {
    width: 200,
    alignSelf: "center",
    marginBottom: 10,
  }
})