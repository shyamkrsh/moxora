import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';


const Index = () => {
    let baseUrl = `https://moxorabackend.onrender.com`
    const [currUserInfo, setCurrUserInfo] = useState({});
    const [editingBio, setEditingBio] = useState(false);
    const [capturedFile, setCapturedFile] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState(null);


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
                `${baseUrl}/api/user/userDetails`,
                { userId },
                {
                    headers: {
                        "Authorization": `${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            ).then((res) => {
                console.log(res.data.data)
                setCurrUserInfo(res.data.data)
            }).catch((err) => {
                console.log(err);
            })
        })();

    }, []);
    const [userBio, setUserBio] = useState(currUserInfo?.bio);
    const router = useRouter();
    let handleLogout = async () => {
        await AsyncStorage.removeItem("token");
        router.navigate("/");
    }
    let handleUpdateBio = async () => {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        if (!token || !userId) {
            console.error("Error: User not authenticated.");
            return;
        }
        setEditingBio(!editingBio);
        await axios.patch(
            `${baseUrl}/api/user/updateBio`,
            { userId, userBio },
            {
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        ).then((res) => {
            console.log("User Demo Data - ", res.data.data);
            setCurrUserInfo(res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    // profile update functionality added

    const pickMedia = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const fileUri = result.assets[0].uri;
            const fileExtension = fileUri.split('.').pop().toLowerCase(); // Extracts "jpg", "png", etc.
            console.log("Externsion - ", fileExtension)
            if (!["jpg", "jpeg", "png"].includes(fileExtension)) {
                console.error("Invalid file type selected.");
                return;
            }
            setCapturedFile(fileUri);
            console.log(fileUri)
            setFileType(fileExtension);
            await uploadToCloudinary(capturedFile, fileType);
        }
    };

    const uploadToCloudinary = async (fileUri, fileType) => {
        const imageTypes = ["jpg", "jpeg", "png"];
        if (!imageTypes.includes(fileType)) {
            console.error("Invalid file type. Only JPG, JPEG, and PNG images are allowed.");
            return;
        }
        const data = new FormData();
        data.append("file", {
            uri: fileUri,
            type: `image/${fileType}`,
            name: `upload.${fileType}`
        });
        data.append("upload_preset", "moxora");
        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dw6d0i4oi/image/upload`, // Only for images
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            console.log(response?.data?.secure_url)
            await setUploadedUrl(response?.data?.secure_url);
            await handleUpdatePic();
        } catch (error) {
            console.error("Upload Error: ", error.response ? error.response.data : error.message);
        }
    };

    async function handleUpdatePic() {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        if (!token || !userId) {
            console.error("Error: User not authenticated.");
            return;
        }
        await axios.patch(
            `${baseUrl}/api/user/updatePic`,
            { userId, uploadedUrl },
            {
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        ).then((res) => {
            console.log("User Demo Data - ", res.data.data);
            setCurrUserInfo(res.data.data)
        }).catch((err) => {
            console.log(err);
        })

    }




    return (
        <>
            <View style={styles.profileMainContainer}>
                <View style={styles.header}>
                    <AntDesign name="left" size={24} color="black" onPress={() => router.back()} />
                    <Text style={styles.name}>My Profile</Text>
                    <Pressable onPress={handleLogout}>
                        <Text style={styles.logoutBtn}>Logout</Text>
                    </Pressable>
                </View>
                <View style={styles.profileImages}>
                    <Image source={{ uri: "https://i.ibb.co/VkGpbMw/3607424.jpg" }} style={styles.profileBgImg} />
                    <Pressable style={styles.profileImg} onPress={pickMedia}>
                        <Image source={{ uri: currUserInfo?.profilePic == null ? "https://i.ibb.co/7xx3DVQY/prof.jpg" : currUserInfo?.profilePic }} style={{ width: '95%', height: '95%', borderRadius: 100 }} />
                    </Pressable>
                </View>
                <View style={styles.userBio}>
                    <Text style={styles.name}>{currUserInfo?.username}</Text>
                    <TextInput style={{ color: 'gray', fontSize: 18, fontWeight: 500, width: "70%", textAlign: 'center', borderWidth: 0.5, borderColor: editingBio ? 'black' : "white" }} value={currUserInfo?.bio ? currUserInfo?.bio : "Not available"}
                        editable={editingBio} onChangeText={(value) => setUserBio(value)} ></TextInput>
                    <TouchableOpacity onPress={() => setEditingBio(!editingBio)}>
                        <Text style={{ display: editingBio ? "none" : 'flex', backgroundColor: "blue", color: 'white', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, marginTop: 5 }}>Edit Bio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleUpdateBio}>
                        <Text style={{ display: editingBio ? "flex" : 'none', backgroundColor: "green", color: 'white', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5, marginTop: 5 }}>save</Text>
                    </TouchableOpacity>
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
        fontSize: 15,
        fontWeight: '500'
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