import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from '../constants/Colors';
import { useRouter } from "expo-router";

export default function Index() {

  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white'
      }}
    >
      <View>
        <Image source={require("../assets/images/logo.png")} />
      </View>
      <View>
        <TouchableOpacity onPress={() => router.replace("./auth/signup")}>
          <Text style={styles.startBtn}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

let styles = StyleSheet.create({
  startBtn : {
    backgroundColor : Colors.BtnBgColor,
    paddingVertical : 10,
    paddingHorizontal : 40,
    color: 'white',
    borderRadius : 5,
    letterSpacing : 0.5,
    fontSize : 18,
    fontWeight : 'semibold'
  }
})
