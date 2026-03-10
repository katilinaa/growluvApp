import { useColorScheme, Platform } from 'react-native'
import { Tabs } from "expo-router"
import { Colors } from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import UserOnly from '../../components/auth/UserOnly'

const DashboardLayout = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
   
  return (
    <UserOnly>
        <Tabs
        //Fix to get vertical tab layout
            initialRouteName='feed'
            screenOptions={{
            headerShown: false, 
            tabBarStyle: Platform.OS === 'web' ? { //Web view
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 80,
                backgroundColor: theme.navBackground,
                paddingVertical: 20,
                borderRightWidth: 1,
                borderRightColor: '#e0e0e0',
                height: '100%',
            } : { //Mobile view
                backgroundColor: theme.navBackground,
                paddingTop: 10,
                paddingBottom: 10,
                paddingHorizontal: 40,
                height: 80,
                borderTopWidth: 0,
            },
            tabBarActiveTintColor: theme.iconColourFocused,
            tabBarInactiveTintColor: theme.iconColour,
            tabBarLabelPosition: Platform.OS === 'web' ? 'below-icon' : 'beside-icon',
            tabBarItemStyle: Platform.OS === 'web' ? {
                justifyContent: 'flex-end',
                marginVertical: 15,
                height: 60,
            } : undefined,
        }}
        >
        <Tabs.Screen 
            name="feed" 
            options = {{ title: '', href: '/feed', tabBarIcon: ({ focused, color }) => (
                <Ionicons
                    size={24}
                    name={focused ? 'home' : 'home-outline'}
                    color={color}
                    flexDirection='column'
                />
        ) }}
        />
        <Tabs.Screen 
            name="class" 
            options = {{ title: '', href: '/class', tabBarIcon: ({ focused, color }) => (
                <Ionicons
                    size={24}
                    name={focused ? 'book' : 'book-outline'}
                    color={color}
                    flexDirection='column'
                />
        ) }}
        />
        <Tabs.Screen 
            name="club" 
            options = {{ title: '', href: '/club', tabBarIcon: ({ focused, color }) => (
                <Ionicons
                    size={24}
                    name={focused ? 'people' : 'people-outline'}
                    color={color}
                    flexDirection='row'
                />
        )}}
        />   
        <Tabs.Screen 
            name="profile" 
            options = {{ title: '' , href: '/profile', tabBarIcon: ({ focused, color }) => (
                <Ionicons
                    size={24}
                    name={focused ? 'person' : 'person-outline'}
                    color={color}
                    flexDirection='row'
                />
        )}}
        />
        </Tabs>
    </UserOnly>
  )
}

export default DashboardLayout