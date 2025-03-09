import { View, Text, StyleSheet, Image, Pressable, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

const Message = () => {

    const { profileImage } = useLocalSearchParams();

    const router = useRouter();
    return (
        <>
            <View style={{
                flex: 1,
                backgroundColor: '#d5f0dc'
            }}>
                <View style={styles.header}>
                    <View style={styles.leftPart}>
                        <View>
                            <AntDesign name="left" size={24} color="black" onPress={() => router.back()} />
                        </View>
                        <Pressable onPress={() => router.push({ pathname: '/profile' })}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                                <View>
                                    <Image source={{ uri: "https://i.ibb.co/VYdnkZnj/profile.jpg" }} style={styles.profileImage} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: 500 }}>Rahul Kumar</Text>
                                    <Text>Active now</Text>
                                </View>
                            </View>
                        </Pressable>
                    </View>
                    <View style={styles.rightPart}>
                        <Ionicons name="videocam-outline" size={28} color="black" style={styles.callIcon} onPress={() => router.push("/calling/videoCall")} />
                        <Ionicons name="call-outline" size={25} color="black" style={styles.callIcon} />
                    </View>
                </View>
                <View style={{ width: "100%", height: 1, backgroundColor: '#bab7b6' }}></View>


                <ScrollView style={{ flex: 1, paddingHorizontal: 10, marginBottom: 70}} showsVerticalScrollIndicator = {false}>
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: 500, color: 'gray', textAlign: 'center', padding: 5 }}>Today</Text>
                    </View>
                    



                </ScrollView>




                <View style={styles.createMessage}>
                    <Feather name="camera" size={24} color="black" />
                    <TextInput placeholder='Write a message...' style={styles.msgInput} />
                    <MaterialCommunityIcons name="send" size={30} color="white" style={{ backgroundColor: "#41a65c", padding: 6, borderRadius: 100 }} />
                </View>

            </View>

        </>
    )
}

export default Message

let styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 35,
        padding: 10,
        backgroundColor: 'white'
    },
    leftPart: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    rightPart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 100
    },
    callIcon: {
        padding: 5,
        fontWeight: '600',
        color: '#575655'
    },

    createMessage: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        paddingHorizontal: 15,
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        elevation: 5, // Adds shadow for Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    msgInput: {
        width: 250,
        backgroundColor: "#f0f5f4",
        borderRadius: 5,
        padding: 10,
    },
})