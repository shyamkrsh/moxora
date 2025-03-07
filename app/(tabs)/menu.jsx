import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg';

const Menu = () => {
  return (
    <>
      <View style={{flex : 1, backgroundColor : "white"}}>
        <View style={styles.header}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="black">
            <Path d="M3 4H21V6H3V4ZM3 11H15V13H3V11ZM3 18H21V20H3V18Z" />
          </Svg>
          <Image source={{ uri: "https://i.ibb.co/VYdnkZnj/profile.jpg" }} style={styles.profileImage} />
        </View>
        <View>
          <Text style={{fontSize : 18, fontWeight : 500, padding : 10, color : "gray"}}>General</Text>
        </View>
      </View>
    </>
  )
}

export default Menu

let styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white'
  },
  profWithLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  logoText: {
    fontSize: 25,
    fontWeight: '600',
    color: '#6e736f',
  },
  searchIcon: {
    backgroundColor: '#d9dbda',
    padding: 8,
    borderRadius: 100,
  },
})