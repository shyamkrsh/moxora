import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Index = () => {

    const [currUserInfo, setCurrUserInfo] = useState({});


    useEffect(() => {

        (async function () {
            const token = await AsyncStorage.getItem('token');
            const userId = await AsyncStorage.getItem('userId');
            if (!token || !userId) {
                console.error("Error: User not authenticated.");
                return;
            }
            console.log("UserId - ", userId, "  ", token);
            await axios.post(
                "http://192.168.152.18:8080/api/user/userDetails",
                { userId },
                {
                    headers: {
                        "Authorization": `${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            ).then((res) => {
                setCurrUserInfo(res.data.data)
            }).catch((err) => {
                console.log(err);
            })
        })();

    }, []);
    const router = useRouter();


    let handleLogout = async() => {
        await AsyncStorage.removeItem("token");
        router.navigate("/");
    }

    return (
        <>
            <View style={styles.profileMainContainer}>
                <View style={styles.header}>
                    <AntDesign name="left" size={24} color="black" onPress={() => router.back()} />
                    <Text style={styles.name}>{currUserInfo?.emailOrMobile}</Text>
                    <Pressable onPress={handleLogout}>
                        <Text style={styles.logoutBtn}>Logout</Text>
                    </Pressable>
                </View>
                <View style={styles.profileImages}>
                    <Image source={{ uri: "https://i.ibb.co/VkGpbMw/3607424.jpg" }} style={styles.profileBgImg} />
                    <View style={styles.profileImg}>
                        <Image source={{ uri: "https://i.ibb.co/VYdnkZnj/profile.jpg" }} style={{ width: '95%', height: '95%', borderRadius: 100 }} />
                    </View>
                </View>
                <View style={styles.userBio}>
                    <Text style={styles.name}>{currUserInfo?.emailOrMobile}</Text>
                    <Text style={{ color: 'gray', fontSize: 18, fontWeight: 500, width: "70%", textAlign: 'center' }}>{currUserInfo?.bio}</Text>
                </View>
                <View style={styles.followActions}>
                    <TouchableOpacity style={[styles.followActionsBtn, { backgroundColor: 'transparent' }]}>
                        <MaterialCommunityIcons name="check-all" size={24} color="black" />
                        <Text>Connections</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.followActionsBtn, { backgroundColor: '#316ac4' }]}>
                        <AntDesign name="message1" size={24} color="white" />
                        <Text style={{ color: 'white' }}>Message</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.followActionsBtn}>
                        <Feather name="more-vertical" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.postDetails}>
                    <Pressable style={styles.seeDetails}>
                        <MaterialCommunityIcons name="post-outline" size={24} color="#316ac4" />
                        <Text style={styles.BtnText}>Posts</Text>
                    </Pressable>
                    <Pressable style={styles.seeDetails}>
                        <Ionicons name="image-outline" size={24} color="#316ac4" />
                        <Text style={styles.BtnText}>Photos</Text>
                    </Pressable>
                    <Pressable style={styles.seeDetails}>
                        <Ionicons name="videocam-outline" size={24} color="#316ac4" />
                        <Text style={styles.BtnText}>Videos</Text>
                    </Pressable>
                </View>

                <View>
                    <Text>All posts will goes here</Text>
                </View>

            </View>
        </>
    )
}

export default Index

let styles = StyleSheet.create({
    profileMainContainer: {
        width: '100%',
        alignItems: 'center'
    },
    header: {
        width: '100%',
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: 'white'
    },
    name: {
        fontSize: 23,
        fontWeight: 600
    },
    logoutBtn: {
        backgroundColor: '#fc0345',
        padding: 6,
        borderRadius: 10,
        color: 'white',
        fontSize : 15,
        fontWeight : '500'
    },
    profileImages: {
        width: "95%",
        height: 210,
        borderRadius: 10,

    },
    profileBgImg: {
        width: '100%',
        height: 150,
        borderRadius: 10
    },
    profileImg: {
        width: 130,
        height: 130,
        borderRadius: 100,
        position: 'absolute',
        top: '65%',
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderWidth: 2,
        borderColor: "red",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    userBio: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    followActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        marginTop: 30
    },
    followActionsBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'blue'
    },
    postDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: 50,
        marginTop: 20,
        padding: 5,
    },
    seeDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        borderBottomWidth: 2,
        borderBottomColor: '#316ac4',
        padding: 5
    },
    BtnText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#316ac4'
    }

})