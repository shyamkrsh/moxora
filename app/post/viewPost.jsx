import { View, Text, StyleSheet, Image, Dimensions, Pressable, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Comment from '../../components/Comment'
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

const { width, height } = Dimensions.get("window");
let halfWidth = width / 2;

const ViewPost = () => {
    const { profileImage } = useLocalSearchParams();
    const [showComments, setShowComments] = useState(true);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [commentCount, setCommentCount] = useState(0);

    const router = useRouter();

    let handleLikes = () => {
        setLikes(likes + 1);
        setLiked(!liked);
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
                        <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        <View style={styles.ownerDetails}>
                            <Text style={styles.ownerName}>Rakesh Kumar</Text>
                            <Text style={styles.postedDate}>March 06, 2025</Text>
                        </View>
                    </View>

                    {/* Post Content */}
                    <View style={styles.msg}>
                        <Text>
                            Just landed in Bali, Indonesia, and I’m already in awe of this paradise! 🌴✨ From the breathtaking Tegallalang Rice Terraces to the crystal-clear waters of Nusa Penida, every corner of this island feels like a dream.
                            <Text style={{ color: 'gray', fontSize: 16, fontWeight: '400' }}> more..</Text>
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={require("../../assets/images/img1.jpg")} style={styles.img1} />
                            <View style={{ flexDirection: 'column', height: 180 }}>
                                <Image source={require("../../assets/images/img2.jpg")} style={styles.img2} />
                                <Image source={require("../../assets/images/img3.jpg")} style={styles.img3} />
                            </View>
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

                    {/* Comments Section */}
                    {showComments && (
                        <View style={styles.commentContainer}>
                            <Comment profileImage={profileImage} />
                            <Comment profileImage={profileImage} />
                            <Comment profileImage={profileImage} />
                            <Comment profileImage={profileImage} />
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* Comment Input Section */}
            <View style={styles.createComment}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                <TextInput placeholder='Write a comment...' style={styles.commentInput} />
                <MaterialCommunityIcons name="send" size={30} color="gray" />
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
        width: halfWidth - 20,
        height: 250,
    },
    img2: {
        width: halfWidth,
        height: 125,
        resizeMode: "stretch",
    },
    img3: {
        width: halfWidth,
        height: 125,
        resizeMode: 'stretch',
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
});
