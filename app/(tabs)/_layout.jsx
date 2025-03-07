import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'react-native';


const Badge = ({ count }) => {
    if (count <= 0) return null;
    return (
        <View style={{
            position: 'absolute',
            right: -8,
            top: -2,
            backgroundColor: '#e0101e',
            borderRadius: 10,
            paddingHorizontal: 3,
            paddingVertical: 2,
            minWidth: 16,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>{count}</Text>
        </View>
    );
}

const _layout = () => {
    return (
        <>
        <StatusBar backgroundColor="#fff" barStyle="dark-content"  />
            <Tabs screenOptions={{
                headerShown: false, tabBarStyle: {
                    height: 70,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12
                }
            }}>
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="home" size={size} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="chat"
                    options={{
                        title: "Chat",
                        tabBarIcon: ({ color, size }) => (
                            <View>
                                <MaterialCommunityIcons name="comment-text-outline" size={size} color={color} />
                                <Badge count={10} />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="notifications"
                    options={{
                        title: "Notifications",
                        tabBarIcon: ({ color, size }) => (
                            <View>
                                <Ionicons name="notifications-outline" size={size} color={color} />
                                <Badge count={13} />
                            </View>
                        )
                    }}
                />
                <Tabs.Screen
                    name="menu"
                    options={{
                        title: "Menu",
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="menu" size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </>
    )
}

export default _layout