import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const FollowerIconCard = ({profileImage, name}) => {
    return (
        <View style={styles.cardContainer}>
            <Image source={{ uri: profileImage }} style={styles.followerImage} />
            <Text style={{color : '#6b6e6c', fontWeight : 400}}>{name}</Text>
        </View>
    )
}

export default FollowerIconCard

let styles = StyleSheet.create({
    cardContainer : {
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'center'
    },
    followerImage : {
        width : 50,
        height : 50,
        borderRadius : 100,
    }
})