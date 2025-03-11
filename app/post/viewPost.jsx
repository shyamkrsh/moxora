import { View, Text, StyleSheet, Image, Dimensions, Pressable, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Comment from '../../components/Comment'
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");
let halfWidth = width / 2;

const ViewPost = () => {
    let baseUrl = `https://moxorabackend.onrender.com`;
    // let baseUrl = `http://192.168.228.18:8080`;
    const { itemInfo } = useLocalSearchParams();
    const parsedItemInfo = JSON.parse(itemInfo);

    const [postedBy, setPostedBy] = useState({});
    const [showComments, setShowComments] = useState(true);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState("");


    const router = useRouter();
    console.log(itemInfo);
    const isVideo = (url) => {
        return url?.match(/\.(mp4|mov|avi|wmv|flv|mkv|webm)$/i);
    };

    (async function () {
        let postedById = await parsedItemInfo.user?._id;
        console.log(postedById)
        await axios.get(`${baseUrl}/api/user/getPostOwner`, { params: { postedById } }).then((res) => {
            setPostedBy(res?.data?.data)
        }).catch((err) => {
            console.log(err);
        })
    })();
    let handleLikes = () => {
        console.log(postedBy);
        setLikes(likes + 1);
        setLiked(!liked);
    }

    let handleComment = async () => {
        const userId = await AsyncStorage.getItem("userId");
        const token = await AsyncStorage.getItem("token");
        const postId = itemInfo?._id;
        await axios.post(
            `${baseUrl}/api/post/comment`,
            { postId, comment, userId },
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
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {/* ScrollView to make the content scrollable */}
            <View style={styles.header}>
                <AntDesign name="left" size={24} color="black" onPress={() => router.back()} />
                <Ionicons name="search" size={24} color="#515452" style={styles.searchIcon} />
            </View>
            <View style={{ width: "100%", height: 1, backgroundColor: '#e8e6e1' }}></View>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}  // Allows scrolling
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.postCardContainer}>
                    {/* Header */}

                    {/* Post Owner Info */}
                    <View style={styles.postOwnerInfo}>
                        <Image source={{ uri: postedBy?.profilePic == null ? "https://i.ibb.co/7xx3DVQY/prof.jpg" : postedBy?.profilePic }} style={styles.profileImage} />
                        <View style={styles.ownerDetails}>
                            <Text style={styles.ownerName}>{postedBy?.username}</Text>
                            <Text style={styles.postedDate}>{postedBy?.createdAt}</Text>
                        </View>
                    </View>

                    {/* Post Content */}
                    <View style={styles.msg}>
                        <Text>
                            {parsedItemInfo?.caption}
                            <Text style={{ color: 'gray', fontSize: 16, fontWeight: '400' }}> more..</Text>
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            {isVideo(parsedItemInfo?.mediaUrl) ? (
                                <Video
                                    source={{ uri: parsedItemInfo?.mediaUrl }}
                                    style={styles.video}
                                    useNativeControls
                                    resizeMode="contain"
                                    shouldPlay={false}
                                />
                            ) : (
                                <Image source={{ uri: parsedItemInfo?.mediaUrl }} style={styles.img1} />
                            )}
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionBtn}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 50 }}>
                            <Pressable style={styles.btnWithCount} onPress={handleLikes}>
                                <AntDesign name={liked ? "like1" : "like2"} size={24} color="#8b8c8b" />
                                <Text>{likes}</Text>
                            </Pressable>
                            <Pressable style={styles.btnWithCount} onPress={() => setShowComments(!showComments)}>
                                <MaterialCommunityIcons name="comment-text-outline" size={24} color="#8b8c8b" />
                                <Text>25</Text>
                            </Pressable>
                        </View>
                        <MaterialCommunityIcons name="share-variant-outline" size={24} color='#8b8c8b' />
                    </View>

                    <View style={styles.commentContainer}>
                        <Comment profileImage={postedBy?.profilePic} />
                        <Comment profileImage={postedBy?.profilePic} />
                        <Comment profileImage={postedBy?.profilePic} />
                        <Comment profileImage={postedBy?.profilePic} />
                    </View>
                </View>
            </ScrollView>

            {/* Comment Input Section */}
            <View style={styles.createComment}>
                <Image source={{ uri: "https://i.ibb.co/7xx3DVQY/prof.jpg" }} style={styles.profileImage} />
                <TextInput placeholder='Write a comment...' style={styles.commentInput} onChangeText={(value) => setComment(value)} />
                <MaterialCommunityIcons name="send" size={30} color="gray" onPress={handleComment} />
            </View>
        </View>
    )
}

export default ViewPost;

const styles = StyleSheet.create({
    postCardContainer: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
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
    postOwnerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    ownerName: {
        fontSize: 17,
        fontWeight: '500',
    },
    postedDate: {
        fontSize: 12,
        color: 'gray',
        fontWeight: '500',
    },
    msg: {
        marginTop: 15,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 20,
    },
    btnWithCount: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    img1: {
        width: width - 19,
        height: 250,
        borderRadius: 10
    },
    commentContainer: {
        marginTop: 12,
        borderTopWidth: 0.5,
        borderTopColor: 'gray',
        paddingTop: 10,
    },
    createComment: {
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
    commentInput: {
        width: 250,
        backgroundColor: "#f0f5f4",
        borderRadius: 5,
        padding: 10,
    },
    video: {
        width: width - 19,
        height: 300,
        borderRadius: 10,
    },
});
