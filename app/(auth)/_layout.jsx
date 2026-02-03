import { Stack } from 'expo-router'
import { StatusBar} from 'react-native'

export default function AuthLayout() {

  return (
    <>
      <StatusBar barStyle="auto" />
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
    </>
  )
}