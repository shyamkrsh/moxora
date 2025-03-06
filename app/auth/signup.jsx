import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'react-native'

const Signup = () => {
  const router = useRouter();
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
          {/* <Text style={{ color: '#130a52', fontSize: 25, fontWeight: 600 }}>Sign<Text style={{ color: '#20153d' }}>up</Text></Text> */}
        </View>

        <View>
          <View style={styles.input}>
            <TextInput placeholder='email' />
          </View>
          <View style={styles.input}>
            <TextInput placeholder='password' />
          </View>
          <View style={styles.input}>
            <TextInput placeholder='confirm password' />
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
  input : {
    
  }
})