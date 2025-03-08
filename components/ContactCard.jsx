import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const ContactCard = ({ profileImage, name, message, date }) => {

    const router = useRouter();

    return (
        <>
            <Pressable onPress={() => router.push({ pathname: "/message/message", params: { profileImage } })}>
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
            </Pressable>
        </>
    )
}

export default ContactCard

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