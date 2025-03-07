import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import MessageListCard from '../../components/messageListCard';


const Notifications = () => {
  return (
    <>
      <View style={styles.notifContainer}>
        <View style={styles.header}>
          <Text style={styles.pageTitleText}>Notifications</Text>
          <Ionicons name="search" size={24} color="#515452" style={styles.searchIcon} />
        </View>

        <View style={{ width: '100%', height: 0.5, backgroundColor: "gray" }}></View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15
        }}>
          <Pressable style={styles.allBtn}><Text style={{ fontSize: 15 }}>All</Text></Pressable>
          <Pressable style={styles.unreadBtn}><Text>Unread</Text></Pressable>
        </View>

        <View>
          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => <MessageListCard profileImage={"https://i.ibb.co/VYdnkZnj/profile.jpg"} name={"Rajesh Kumar"} message={"Hi, shyam how are you bro??"} date={"3d ago"} />}
          />
        </View>
      </View>
    </>
  )
}

export default Notifications
let styles = StyleSheet.create({
  notifContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white'
  },
  pageTitleText: {
    fontSize: 25,
    fontWeight: 500,
    color: '#454745'
  },
  allBtn: {
    backgroundColor: '#d9dedb',
    color: 'black',
    fontWeight: 500,
    width: 50,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  },
  unreadBtn: {
    backgroundColor: '#fff',
    color: 'black',
    fontWeight: 500,
    width: 70,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  }
})