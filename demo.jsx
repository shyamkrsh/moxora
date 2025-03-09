import { View, Text, Button, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av'; // ✅ Correct way to import Video
import axios from 'axios';

const CameraScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [capturedFile, setCapturedFile] = useState(null);
    const [fileType, setFileType] = useState(null); // "image" or "video"

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const uploadToCloudinary = async (fileUri, fileType) => {
        const data = new FormData();
        const imageTypes = ["jpg", "jpeg", "png"];
        fileTypeFinal = fileType === "video" ? "video/mp4" :
            imageTypes.includes(fileType) ? `image/${fileType}` :
                "application/octet-stream";

        data.append("file", {
            uri: fileUri,
            type: fileTypeFinal,
            name: fileType === "video" ? "upload.mp4" : "upload.jpg"
        });

        data.append("upload_preset", "moxora"); // Replace with your Cloudinary preset

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dw6d0i4oi/${fileType === "video" ? "video" : "image"}/upload`,
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
            console.log("Uploaded File URL: ", response.data.secure_url);
        } catch (error) {
            console.error("Upload Error: ", error.response ? error.response.data : error.message);
        }
    };

    const pickFile = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow both images & videos
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setCapturedFile(result.assets[0].uri);
            setFileType(result.assets[0].type === "video" ? "video" : "image");
        }
    };

    if (hasPermission === null) {
        return <View><Text>Requesting camera permission...</Text></View>;
    }
    if (hasPermission === false) {
        return <View><Text>No access to camera</Text></View>;
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {capturedFile && (
                fileType === "image" ?
                    <Image source={{ uri: capturedFile }} style={{ width: '100%', height: '70%', marginTop: 20 }} />
                    :
                    <Video
                        source={{ uri: capturedFile }}
                        style={{ width: '100%', height: 300 }}
                        useNativeControls
                        resizeMode="contain"
                        shouldPlay
                        isLooping
                    />
            )}

            <Button title="Pick File" onPress={pickFile} />
            <Button title="Upload" onPress={() => uploadToCloudinary(capturedFile, fileType)} />
        </View>
    );
};

export default CameraScreen;
