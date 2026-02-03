import { useColorScheme } from 'react-native'
import { Tabs } from "expo-router"
import { Colors } from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const DashboardLayout = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
   
  return (
    <Tabs
        screenOptions={{
        headershown: false, 
        tabBarStyle:{
            backgroundColor: theme.navBackground,
            paddingTop: 10,
            height: 90
        },
        tabBarActiveTintColor: theme.iconColorFocused,
        tabBarInactiveTintColor: theme.iconColor
    }}
    >
    <Tabs.Screen 
        name="feed" 
        options = {{ title: 'Feed', tabBarIcon: ({ focused }) => (
            <Ionicons
                size={24}
                name={focused ? 'home' : 'home-outline'}
                color={focused ? theme.iconColorFocused : theme.iconColor}
            />
    ) }}
    />
    <Tabs.Screen 
        name="class" 
        options = {{ title: 'Class', tabBarIcon: ({ focused }) => (
            <Ionicons
                size={24}
                name={focused ? 'book' : 'book-outline'}
                color={focused ? theme.iconColorFocused : theme.iconColor}
            />
    ) }}
    />
    <Tabs.Screen 
        name="club" 
        options = {{ title: 'Club', tabBarIcon: ({ focused }) => (
            <Ionicons
                size={24}
                name={focused ? 'people' : 'people-outline'}
                color={focused ? theme.iconColorFocused : theme.iconColor}
            />
    )}}
    />   
    <Tabs.Screen 
        name="profile" 
        options = {{ title: 'Profile' , tabBarIcon: ({ focused }) => (
            <Ionicons
                size={24}
                name={focused ? 'person' : 'person-outline'}
                color={focused ? theme.iconColorFocused : theme.iconColor}
            />
    )}}
    />
    </Tabs>
  )
}

export default DashboardLayout