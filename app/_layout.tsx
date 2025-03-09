import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (

    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="profile"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="post/viewPost"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="message/message"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="post/createPost"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  )
}
