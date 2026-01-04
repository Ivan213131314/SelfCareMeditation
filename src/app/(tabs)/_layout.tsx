import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#7C9A92',
            headerShown: true,
        }}>
            <Tabs.Screen
                name="catalog"
                options={{
                    title: 'Каталог',
                    tabBarIcon: ({ color }) => <Ionicons name="apps-outline" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="meditation"
                options={{
                    title: 'Медитация',
                    tabBarIcon: ({ color }) => <Ionicons name="leaf-outline" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="journal"
                options={{
                    title: 'Дневник',
                    tabBarIcon: ({ color }) => <Ionicons name="book-outline" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
