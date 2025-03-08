import { View, Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Comment from './Comment';
import { useRouter } from 'expo-router'


const { width, height } = Dimensions.get("window");

let halfWidth = width / 2;

const PostCard = ({ profileImage }) => {

    const [showComments, setShowComments] = useState(false);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [commentCount, setCommentCount] = useState(0);

    const router = useRouter();

    let handleLikes = () => {
        setLikes(likes + 1);
        setLiked(!liked);
    }

    return (
        <Pressable onPress={() => router.push({ pathname: "/post/viewPost", params: { profileImage } })}>
            <View style={styles.postCardContainer} >
                <View style={styles.postOwnerInfo}>
                    <View>
                        <Image source={{ uri: profileImage }} style={styles.profileImage} />
                    </View>
                    <View style={styles.ownerDetails}>
                        <Text style={styles.ownerName}>Rakesh Kumar</Text>
                        <Text style={styles.postedDate}>March 06, 2025</Text>
                    </View>
                </View>
                <View style={styles.msg}>
                    <Text>Just landed in Bali, Indonesia, and I’m already in awe of this paradise! 🌴✨ From the breathtaking Tegallalang Rice Terraces to the crystal-clear waters of Nusa Penida, every corner of this island feels like a dream. <Text style={{ color: 'gray', fontSize: 16, fontWeight: 400 }}>more..</Text>
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image source={require("../assets/images/img1.jpg")} style={styles.img1} />
                        </View>
                        <View style={{ flexDirection: 'column', height: 180 }}>
                            <Image source={require("../assets/images/img2.jpg")} style={styles.img2} />
                            <Image source={require("../assets/images/img3.jpg")} style={styles.img3} />
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
        width: halfWidth - 20,
        height: 250
    },
    img2: {
        width: halfWidth,
        height: 125,
        resizeMode: "stretch"
    },
    img3: {
        width: halfWidth,
        height: 125,
        resizeMode: 'stretch'
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