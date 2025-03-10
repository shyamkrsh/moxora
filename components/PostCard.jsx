import { View, Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Comment from './Comment';
import { useRouter } from 'expo-router'
import axios from 'axios';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");
let halfWidth = width / 2;
const PostCard = ({ itemInfo, profileImage }) => {

    let baseUrl = `https://moxorabackend.onrender.com`;
    const router = useRouter();
    const [currUserId, setCurrUserId] = useState("");
    const [postedBy, setPostedBy] = useState({});
    const [showComments, setShowComments] = useState(false);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    let handleLikes = () => {
        setLikes(likes + 1);
        setLiked(!liked);
    }

    (async function () {
        const userId = await AsyncStorage.getItem("userId");
        setCurrUserId(userId);
        let postedById = await itemInfo.user?._id;
        axios.get(`${baseUrl}/api/user/getPostedBy`, { params: { postedById } }).then((res) => {
            setPostedBy(res.data.data)
        }).catch((err) => {
            console.log(err);
        })
    })();

    let handleDeletePost = async () => {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        let postedById = await itemInfo.user?._id;
        let postId = itemInfo._id;
        if (!token || !userId) {
            console.error("Error: User not authenticated.");
            return;
        }
        await axios.delete(
            `${baseUrl}/api/post/delete`,
            {
                headers: {
                    "Authorization": `${token}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
                data: { userId, postedById, postId }
            }
        ).then((res) => {
            console.log("User Demo Data - ", res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <Pressable onPress={() => router.push({ pathname: "/post/viewPost", params: { itemInfo } })}>
            <View style={styles.postCardContainer} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    <View style={styles.postOwnerInfo}>
                        <View>
                            <Image source={{ uri: postedBy?.profilePic == "" ? "https://i.ibb.co/7xx3DVQY/prof.jpg" : postedBy?.profilePic }} style={styles.profileImage} />
                        </View>
                        <View style={styles.ownerDetails}>
                            <Text style={styles.ownerName}>{postedBy?.username}</Text>
                            <Text style={styles.postedDate}>{itemInfo?.createdAt}</Text>
                        </View>
                    </View>
                    <Button mode="contained" onPress={handleDeletePost} style={{ display: itemInfo?.user?._id == currUserId ? "flex" : "none" }}>
                        Delete
                    </Button>
                </View>
                <View style={styles.msg}>
                    <Text>{itemInfo?.caption} &nbsp;<Text style={{ color: 'black', fontSize: 16, fontWeight: 400 }}>more..</Text>
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image source={{ uri: itemInfo?.mediaUrl }} style={styles.img1} />
                        </View>
                    </View>
                </View>
                <View style={styles.actionBtn}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 50 }}>
                        <View style={styles.btnWithCount}>
                            <AntDesign name="like2" size={24} color="#8b8c8b" onPress={handleLikes} style={{ display: liked ? "none" : "flex" }} />
                            <AntDesign name="like1" size={24} color="#8b8c8b" onPress={handleLikes} style={{ display: liked ? "flex" : "none" }} />
                            <Text>{likes}</Text>
                        </View>
                        <Pressable style={styles.btnWithCount} onPress={() => setShowComments(!showComments)}>
                            <MaterialCommunityIcons name="comment-text-outline" size={24} color="#8b8c8b" />
                            <Text>25</Text>
                        </Pressable>
                    </View>
                    <MaterialCommunityIcons name="share-variant-outline" size={24} color='#8b8c8b' />
                </View>

                <View style={[styles.commentContainer, { display: showComments ? "flex" : "none" }]}>
                    <Comment profileImage={profileImage} />
                    <Comment profileImage={profileImage} />
                    <Comment profileImage={profileImage} />
                    <Comment profileImage={profileImage} />
                </View>
            </View>
        </Pressable>
    )
}
export default PostCard
let styles = StyleSheet.create({
    postCardContainer: {
        width: width,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10
    },
    postOwnerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 15,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    ownerDetails: {},
    ownerName: {
        fontSize: 17,
        fontWeight: 500
    },
    postedDate: {
        fontSize: 12,
        color: 'gray',
        fontWeight: 500
    },
    msg: {
        marginTop: 15,
        width: width
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 20
    },
    btnWithCount: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    img1: {
        width: width - 19,
        height: 250,
        borderRadius: 10
    },

    commentContainer: {
        marginTop: 12,
        borderTopWidth: 0.5,  // Only top border
        borderTopColor: 'gray',
        paddingTop: 10,

    },
    commentInfo: {},
    commentOwner: {
        fontSize: 17,
        fontWeight: 500
    },
    commentContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        fontWeight: 400
    },
    commentDate: {
        fontSize: 15,
        fontWeight: 500,
        color: 'gray',
        paddingLeft: 10
    }
})