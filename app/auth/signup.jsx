import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Signup = () => {
  let baseUrl = `https://moxorabackend.onrender.com`
  const [username, setUsername] = useState("");
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async function () {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        router.navigate("/home");
      }
    })();
  })

  let handleSubmit = () => {
    console.log(emailOrMobile, " ", password);
    axios.post(`${baseUrl}/api/user/register`,
      {
        username, emailOrMobile, password
      }
    ).then((res) => {
      console.log(res.data)
      router.push("/(tabs)/home");
    }).catch((err) => {
      console.log(err.message);
    })
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Stack.Screen options={{
        title: '',
        headerShown: false
      }} />
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image source={require("../../assets/images/bgImage.jpg")} style={styles.bgImage} />
        <View>
          <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
        </View>

        <View style={styles.signupForm}>

          <View style={styles.input}>
            <View style={styles.inputIcons}>
              <FontAwesome name="user-o" size={25} color="#4d5250" />
              <TextInput placeholder='username' style={styles.inputField} onChangeText={(value) => setUsername(value)} />
            </View>
          </View>
          <View style={styles.input}>
            <View style={styles.inputIcons}>
              <MaterialCommunityIcons name="email-outline" size={25} color="#4d5250" />
              <TextInput placeholder='email or mobile' style={styles.inputField} onChangeText={(value) => setEmailOrMobile(value)} />
            </View>
          </View>
          <View style={styles.input}>
            <View style={styles.inputIcons}>
              <Ionicons name="key-outline" size={25} color="black" />
              <TextInput placeholder='password' secureTextEntry={showPassword ? false : true} style={styles.inputField} onChangeText={(value) => setPassword(value)} />
            </View>
            <Ionicons name="eye-outline" size={24} color="black" onPress={() => setShowPassword(!showPassword)} style={{ display: showPassword ? "none" : 'flex' }} />
            <Ionicons name="eye-off-outline" size={24} color="black" onPress={() => setShowPassword(!showPassword)} style={{ display: showPassword ? "flex" : 'none' }} />
          </View>

          <View style={styles.input}>
            <View style={styles.inputIcons}>
              <Ionicons name="key-outline" size={25} color="black" />
              <TextInput placeholder='confirm password' secureTextEntry={showConfirmPassword ? false : true} style={styles.inputField} />
            </View>
            <Ionicons name="eye-outline" size={24} color="black" onPress={() => setshowConfirmPassword(!showConfirmPassword)} style={{ display: showConfirmPassword ? "none" : 'flex' }} />
            <Ionicons name="eye-off-outline" size={24} color="black" onPress={() => setshowConfirmPassword(!showConfirmPassword)} style={{ display: showConfirmPassword ? "flex" : 'none' }} />
          </View>
          <View >
            <TouchableOpacity style={styles.signupBtn} onPress={handleSubmit}>
              <Text style={styles.signupBtnText}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.text}>OR</Text>
            <View style={styles.line} />
          </View>
          <View >
            <TouchableOpacity style={styles.signupWithGoogleBtn}>
              <Image source={require("../../assets/images/google.png")} style={styles.googleImage} />
              <Text style={styles.signupWithGoogle}>Sign up with Google</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.already}>
            <Text style={{ fontSize: 15, fontWeight: 500 }}>Already an User ?</Text>
            <Pressable onPress={() => router.navigate("./login")}>
              <Text style={{ fontSize: 18, fontWeight: 600, color: '#301380' }}>Login</Text>
            </Pressable>
          </View>
          <View style={styles.terms}>
            <Text style={styles.text}>
              By signing up, you agree to our{' '}
              <Text style={styles.link}>terms of services</Text> and{' '}
              <Text style={styles.link}>privacy policy</Text>.
            </Text>
          </View>

        </View>
      </View>
    </>
  )
}

export default Signup

let styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: "100%",
    position: 'absolute',
    zIndex: -10
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 50
  },
  signupForm: {
    marginTop: 50,
    flexDirection: 'column',
    alignItems: 'center'
  },
  input: {
    width: 320,
    borderWidth: 1,
    borderColor: 'white',
    margin: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5
  },
  inputIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
  inputField: {
    width: 220,
    fontSize: 17
  },
  signupBtn: {
    width: 320,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: '#301380',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    margin: 8,
    borderRadius: 8
  },
  signupBtnText: {
    color: 'white',
    fontSize: 18,

  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#aaa',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 15,
    color: '#333',
    fontWeight: 500,
    padding: 10,
    marginTop: 10
  },
  signupWithGoogleBtn: {
    width: 320,
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: '#301380',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 20,
    height: 50,
    margin: 8,
    borderRadius: 8
  },
  googleImage: {
    width: 40,
    height: 40,
    borderRadius: 100
  },
  signupWithGoogle: {
    color: 'white',
    fontSize: 18,
  },
  already: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 10
  },
  link: {
    color: 'blue'
  }
})