import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'

const Comment = ({profileImage}) => {
    return (
        <View style={styles.commentInfo}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View>
                    <Image  source={{ uri: profileImage }} style={styles.profileImage} />
                </View>
                <View >
                    <Text style={styles.commentOwner}>Rakesh Kumar</Text>
                </View>
            </View>
            <Text style={styles.commentContent}>Hi, Thank you for this opportunity, I am very happy right now</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 20 }}>
                <Text style={styles.commentDate}>17h</Text>
                <Text style={styles.commentDate}>1 like</Text>
                <Text style={styles.commentDate}>Reply</Text>
            </View>
        </View>
    )
}

export default Comment

let styles = StyleSheet.create({
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    commentInfo: {
        padding : 15
    },
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