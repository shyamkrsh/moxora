import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (

    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"  />
      <Stack>
        <Stack.Screen
          name="index"
          options={{headerShown : false}}
          
        />
      </Stack>
    </>
  )
}
