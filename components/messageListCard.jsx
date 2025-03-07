import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const MessageListCard = ({ profileImage, name, message, date }) => {
    return (
        <View style={styles.contactCard}>
            <View style={styles.part1}>
                <View>
                    <Image source={{ uri: profileImage }} style={styles.contactProfileImage} />
                </View>
                <View>
                    <Text style={styles.contactName}>{name}</Text>
                    <Text style={{ color: "gray" }}>{message}</Text>
                </View>
            </View>
            <View style={styles.part2}>
                <Text style={{ color: "gray" }}>{date}</Text>
            </View>
        </View>
    )
}

export default MessageListCard

let styles = StyleSheet.create({
    contactCard: {
        width: "100%",
        // borderWidth : 1,
        // borderColor : 'red',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10
    },
    contactProfileImage: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    part1: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    contactName: {
        fontSize: 17,
        fontWeight: 500,
        color: ''
    }
})