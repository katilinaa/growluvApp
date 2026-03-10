import { StyleSheet, TouchableOpacity, Text, Image, Alert, KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import Spacer from "../../components/Spacer"
import ThemedView from "../../components/ThemedView"
import ThemedTextInput from '../../components/ThemedTextInput'
import * as ImagePicker from 'expo-image-picker'
import { Ionicons } from '@expo/vector-icons'
import ThemedButton from '../../components/ThemedButton'
import AsyncStorage from '@react-native-async-storage/async-storage'

//Content to be displayed on the post creation screen
  const Content = ({
    value, onChangeText,
    image, setImage,
    uploadMedia, uploadPost, router
  }) => (
  <ThemedView style={styles.container} safe = {true}>
      <Spacer />
        {/* Input for post content */}
          <ThemedView style={styles.inputContainer}>
          <TouchableOpacity 
              style={styles.backButton}
              onPress={() =>router.push('../(dashboard)/feed')}>
              <Ionicons name="close-outline" size={32} color="black"/>
          </TouchableOpacity>

          <ThemedTextInput
            maxLength={500}
            editable={true}
            multiline={true}
            style={styles.textInput}
            placeholder="What's your purpose today?"
            keyboardType="text"
            onChangeText={text => onChangeText(text)}
            value={value}
          />
        {/* Image/video preview */}
          {image && (
            <ThemedView style={styles.imagePreviewContainer}>
              <Image 
                source={{ uri: image }} 
                style={styles.imagePreview} 
              />
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => setImage(null)}
              >
                <Ionicons name="close-outline" size={30} color="#fff" />
              </TouchableOpacity>
            </ThemedView>
          )}
        {/* Toolbar for media upload */}
          <ThemedView style={styles.toolbar}>
            <ThemedView style= {styles.iconRow}>
              <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={uploadMedia}>
                  <Ionicons name="image-outline" size={32} color="black" />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView> 
        {/* Post button */}
        <ThemedButton 
            style={{width: '30%', left: 100, marginTop: 20}}
            onPress={uploadPost}>
            <Text style= {{color: "#f2f2f2"}}>Post</Text>
        </ThemedButton>
    </ThemedView>
  </ThemedView>
  )

const Post = () => {
  const [value, onChangeText] = useState('')
  const [image, setImage] = useState(null)
  const [error, setError] = useState(null)
  const [asset, setAsset] = useState(null)
  const router = useRouter()

  // Web media upload handler
  const uploadMediaWeb = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*,video/*'
  input.onchange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setAsset(file)
      setImage(URL.createObjectURL(file))
      setError(null)
    }
  }
  input.click()
}

  const uploadMedia = async () => {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined') uploadMediaWeb() // ensure client
    return
  } else {
    // mobile flow
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permission required!')
      return
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4,3],
      quality: 0.7
    })

    if (!result.canceled) {
      setAsset(result.assets[0])
      setImage(result.assets[0].uri)
      setError(null)
    }
  }
}

  const uploadPost = async () => {
    try{
      let mediaUrl = null;
      if (asset) {
        const formData = new FormData();
        // Web upload flow
        if (Platform.OS === 'web') {
        formData.append('file', asset);
        console.log(formData); // Debugging statement to check formData content
      } else {
        // Mobile upload flow
        const isVideo = asset?.type === 'video';
        formData.append('file', {
          uri: asset.uri,
          type: isVideo ? 'video/mp4' : 'image/jpeg',
          name: `${Date.now()}.${isVideo ? 'mp4' : 'jpg'}`
        })
        console.log(formData); // Debugging statement to check formData content
        }
        // Upload media to server
      const uploadRes = await fetch('http://192.168.1.133:3000/api/upload', {
          method: 'POST',
          body: formData
        })
        //Debugging statement:
        const uploadData = await uploadRes.json()
        console.log('Upload response:', uploadData)
        mediaUrl = uploadData.url
        console.log(mediaUrl)
        
        const token = await AsyncStorage.getItem('token')
        const userStr = await AsyncStorage.getItem('user')
        const user = JSON.parse(userStr)
        
        await fetch('http://192.168.1.133:3000/createPosts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: value, userId: user.id, mediaUrl: mediaUrl })
        })
        
        onChangeText('')
        setImage(null)
        router.push('../(dashboard)/feed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      Alert.alert('Error', 'Failed to upload post')
     }
    }
  if (Platform.OS !== 'web') {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={-10}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1}} keyboardShouldPersistTaps="handled">
          <Content />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }

  return <Content 
  value={value} onChangeText={onChangeText}
  image={image} setImage={setImage}
  uploadMedia={uploadMedia} uploadPost={uploadPost}
  router={router}
  />
}

export default Post

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    bottom: 150, 
    right: 120
  },
  backButton: {
    position: 'absolute',
    top: -40,
    left: 10, 
    zIndex: 10,
  },
  removeButton: {
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: 'rgba(0,0,0,0.5)',
  borderRadius: 15,
 },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    right: 140,
    padding: 15,
    backgroundColor: 'transparent',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 20,
    backgroundColor: 'transparent',
  },
  textInput: {
    flex: 1,
    width: '100%',
    textAlignVertical: 'top',
    padding: 15
  },
    inputContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginBottom: 10,  
},
    imagePreviewContainer: {
      borderRadius: 10,
      width: 200,
      height: 200,
      overflow: 'hidden',
      marginVertical: 10,
},
    imagePreview: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },
})