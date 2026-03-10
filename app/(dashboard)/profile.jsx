import { StyleSheet, Text, ScrollView } from 'react-native'
import {useUser} from '../../contexts/UserContext'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedButton from '../../components/ThemedButton'
import { SafeAreaView } from 'react-native-safe-area-context'


const Profile = () => {
  const { logout, user } = useUser()
  return (
    // <ScrollView style={styles.container}
    //   contentContainerStyle={styles.scrollContent}
    //   showsVerticalScrollIndicator={false}>
    <ThemedView style={styles.container}>

      <ThemedText title={true} style={styles.heading}>
        {user?.email || 'No user logged in'}
      </ThemedText>
      <Spacer />

      <ThemedText>Let's make a difference</ThemedText>
      <Spacer />

      <ThemedButton onPress={logout}>
        <Text style= {{color: "#f2f2f2"}}>Logout</Text>
      </ThemedButton>

    </ThemedView>
    // </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // scrollContent: {
  //   flexGrow: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
})