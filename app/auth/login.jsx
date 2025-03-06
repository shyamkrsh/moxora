import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'

const Login = () => {
    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <Stack.Screen name='' options={{
                title: '',
                headerShown: false
            }} />
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'white'
            }}>
                <Text>Login</Text>
            </View>
        </>
    )
}

export default Login