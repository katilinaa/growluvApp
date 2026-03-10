import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { Colors } from '../../constants/Colors'

const PostLayout = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  return (
    <Stack screenOptions={{ headerShown: false, presentation: 'modal', backgroundColor: theme.background}} />
  )
}

export default PostLayout
