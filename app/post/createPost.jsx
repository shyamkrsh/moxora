import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostForm = () => {
    let baseUrl = `https://moxorabackend.onrender.com`
    const [caption, setCaption] = useState('');
    const [capturedFile, setCapturedFile] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState(null);

    const router = useRouter();

    const uploadToCloudinary = async (fileUri, fileType) => {
        const data = new FormData();
        const imageTypes = ["jpg", "jpeg", "png"];
        const fileTypeFinal = fileType === "video" ? "video/mp4" :
            imageTypes.includes(fileType) ? `image/${fileType}` :
                "application/octet-stream";

        data.append("file", {
            uri: fileUri,
            type: fileTypeFinal,
            name: fileType === "video" ? "upload.mp4" : "upload.jpg"
        });
        data.append("upload_preset", "moxora");

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dw6d0i4oi/${fileType === "video" ? "video" : "image"}/upload`,
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            console.log("Upload Successful: ", response?.data?.secure_url);
            return response?.data?.secure_url;  // Return URL
        } catch (error) {
            console.error("Upload Error: ", error.response ? error.response.data : error.message);
            return null;
        }
    };

    let pickMedia = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setCapturedFile(result.assets[0].uri);
            setFileType(result.assets[0].type === "video" ? "video" : "image");
        }
    };
    const handlePost = async () => {
        if (!caption.trim() && !capturedFile) return;

        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        if (!token || !userId) {
            console.error("Error: User not authenticated.");
            return;
        }

        // Wait for the upload to complete and get the URL
        let uploadedFileUrl = null;
        if (capturedFile) {
            uploadedFileUrl = await uploadToCloudinary(capturedFile, fileType);
            console.log("Uploaded File URL: ", uploadedFileUrl);
            if (!uploadedFileUrl) {
                console.error("Error: Upload failed.");
                return;
            }
        }

        try {
            await axios.post(
                `${baseUrl}/api/post/create`,
                { caption, uploadedUrl: uploadedFileUrl, userId },
                {
                    headers: {
                        "Authorization": `${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            ).then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })

            // Reset state after successful post
            setCaption('');
            setCapturedFile(null);
            setUploadedUrl(null);
            router.back();
        } catch (error) {
            console.error("Error posting:", error.response?.data || error.message);
        }
    };



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AntDesign name="left" size={24} color="black" onPress={() => router.back()} />
                <Text style={{ fontSize: 20, fontWeight: 500 }}>Create Post</Text>
                <Ionicons name="search" size={24} color="#515452" style={styles.searchIcon} />
            </View>
            <View style={{ width: "100%", height: 1, backgroundColor: '#e8e6e1' }}></View>
            <Card style={styles.card}>
                <Text style={{ fontSize: 18, fontWeight: 500, marginBottom: 2 }}>Write Captions</Text>
                <TextInput
                    style={styles.input}
                    placeholder="What's on your mind?"
                    value={caption}
                    onChangeText={setCaption}
                    multiline={true}
                    numberOfLines={5}
                    textAlignVertical="top"
                />
                {capturedFile && <Image source={{ uri: capturedFile }} style={styles.media} />}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={pickMedia} style={styles.uploadButton}>
                        <Text style={styles.uploadText}>Upload media</Text>
                    </TouchableOpacity>
                    <Button mode="contained" onPress={handlePost} style={{ marginTop: 10 }}>
                        Post
                    </Button>
                </View>
            </Card >
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'white',
    },
    searchIcon: {
        backgroundColor: '#d9dbda',
        padding: 8,
        borderRadius: 100,
    },
    card: {
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderRadius: 12,
        backgroundColor: 'white'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        height: 120,
        textAlignVertical: 'top',
        backgroundColor: '#f8f8f8',
    },
    media: {
        width: '100%',
        height: 200,
        marginTop: 12,
        borderRadius: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        alignItems: 'center'
    },
    uploadButton: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16
    },
    uploadText: {
        color: 'white',
        fontSize: 17,
    },
});

export default PostForm;
