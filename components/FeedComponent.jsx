import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert, Platform, Modal, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import { useVideoPlayer, VideoView } from 'expo-video';
// import { useEvent } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ThemedView from './ThemedView'
import { LinearGradient } from 'expo-linear-gradient'
import CommentModal from './CommentModal'

const FeedComponent = () => {
    const quotes = [
    "Believe you can and you're halfway there.",
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal.",
    "Dream big and dare to fail.",
    "The future belongs to those who believe in their dreams."
    ]
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)
    const [dailyQuote, setDailyQuote] = useState('')
    const [commentModal, setCommentModal] = useState({visible: false, postId: null})
    const [imageModal, setImageModal] = useState({visible: false, uri: null})

    useEffect(() => {
        loadUser()
        fetchPosts()
        setDailyQuote(getDailyQuote())
    }, [])

    const getDailyQuote = () => {
        const today = new Date()
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24)
        return quotes[dayOfYear % quotes.length]
    }

    const loadUser = async () => {
        const userStr = await AsyncStorage.getItem('user')
        setUser(JSON.parse(userStr))
    }
    // Creating a video player
    const VideoPost = ({ url }) => {
    const player = useVideoPlayer(url, player => {
        player.loop = false
    })
    return (
        <VideoView
            style={styles.postImage}
            player={player}
            contentFit="cover"
        />
    )
    }
    //Function for retrieving posts from database
    const fetchPosts = async () => {
        try{
            const userStr = await AsyncStorage.getItem('user')
            const currentUser = JSON.parse(userStr)
            const response = await fetch(`http://192.168.1.133:3000/getPosts?userId=${currentUser.id}`)
            const data = await response.json()
            setPosts(data)
            console.log(data)
        } catch (error) {
            console.error('Error fetching posts:', error)
        }
    }
    // Function for deleting posts from database
    const deletePost = async (postId) => {
        const confirmDelete =
        // Web confirmation dialog
            Platform.OS === 'web'
            ? window.confirm('Are you sure you want to delete this post?')
            : await new Promise((resolve) => 
                // Mobile confirmation dialog
                Alert.alert(
                    'Delete Post',
                    'Are you sure you want to delete this post?',
                    [
                    { text: 'Cancel', style: 'cancel', onPress: () => resolve(false) },
                    { text: 'Delete', style: 'destructive', onPress: () => resolve(true) },
                    ],
                    { cancelable: true }
                )
                )

        if (!confirmDelete) return

        try {
            await fetch(`http://192.168.1.133:3000/api/deleteposts/${postId}`, {
            method: 'DELETE',
            })
            fetchPosts()
        } catch (error) {
            console.error('Error deleting post:', error)
        }
    }
    // Function for toggling likes on posts
    const toggleLike = async (postId) => {
    try {
        await fetch('http://192.168.1.133:3000/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, postId }),
        })
        fetchPosts()
    } catch (error) {
        console.error('Error toggling like:', error)
    }
    }   
    // Function for getting timestamp of post
    const getTimeAgo = (timestamp) => {
        const now = Date.now()
        const diff = now - timestamp
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days = Math.floor(diff / 86400000)

        if (minutes < 1) return 'Just now'
        if (minutes < 60) return `${minutes}m ago`
        if (hours < 24) return `${hours}h ago`
        if (days < 7) return `${days}d ago`
        return new Date(timestamp).toLocaleDateString()
    }
    // Function for displaying posts on feed
    const renderPost = ({ item }) => (
    <ThemedView style={styles.postContainer}>
      <View style={styles.profileContainer}>
        <Image style={styles.profile} source={require('../assets/cat.jpg')}/> 
            <View style={styles.infoContainer}>
            <Text style={styles.title}>{item.username}</Text>
            <Text style={styles.datePosted}>{getTimeAgo(item.timestamp)}</Text>
        </View>
            {user?.id === item.user_id && (
            <TouchableOpacity
            style={{ marginLeft: 'auto' }}
            onPress={() => deletePost(item.id)}
            >
            <Ionicons name="trash-outline" size={22} color="red" />
            </TouchableOpacity>
        )}
      </View>
      {item.text && <Text style={styles.postText}>{item.text}</Text>}
      {item.media_type === "video" ? (
        <VideoPost url={item.media_url} />
      ) : (
        <TouchableOpacity onPress={() => setImageModal({ visible: true, uri: item.media_url })}>
            <Image 
                style={styles.postImage} 
                source={{ uri: item.media_url }}
                onError={(e) => console.log('Image load error:', e.nativeEvent.error, 'URL:', item.media_url)}
                onLoad={() => console.log('Image loaded:', item.media_url)}
            />
        </TouchableOpacity>
      )}

      <View style={styles.reactionComment}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => toggleLike(item.id)}>
            <Ionicons name={item.liked ? "heart" : "heart-outline"} size={24} color={item.liked ? "#e9272b" : "#000000"} />
          </TouchableOpacity>
          <Text style={{fontSize: 12, color: '#000000', marginTop: 6, marginLeft: -2}}>{item.like_count}</Text>
          <TouchableOpacity onPress={() => setCommentModal({visible: true, postId: item.id})}>
            <Ionicons name="chatbubble-outline" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={{fontSize: 12, color: '#000000', marginTop: 6, marginLeft: -2}}>{item.comment_count || 0}</Text>
          <TouchableOpacity>
            <Ionicons name="send-outline" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  )
  return (
    <>
    <FlatList
      data={posts}
      renderItem={renderPost}
      keyExtractor={(item) => item.id.toString()}
      refreshing={false}
      onRefresh={fetchPosts}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ flexGrow: 1 }}
      ListHeaderComponent={
        <>
        <ThemedView style={styles.logoContainer}>
        <Image 
            source={require('../assets/growluvLogo.jpg')} 
            style={styles.logo}
            resizeMode="contain"
        />
        </ThemedView>
        <LinearGradient
        colors={['#e9272b', '#56cef9', '#f8c024']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.quoteContainer}
        >   
            <Text style={styles.quoteText}>"{dailyQuote}"</Text>
        </LinearGradient>
        </>
        }
    />
    <CommentModal
        visible={commentModal.visible}
        onClose={() => { 
            setCommentModal({ visible: false, postId: null })
            fetchPosts()
        }}
        postId={commentModal.postId}
        userId={user?.id}
    />
    <Modal
    visible={imageModal.visible}
    transparent={true}
    animationType="fade"
    onRequestClose={() => setImageModal({ visible: false, uri: null })}
    >
        <Pressable 
            style={styles.modalBackground} 
            onPress={() => setImageModal({ visible: false, uri: null })}
        >
            <Image
            style={styles.fullImage}
            source={{ uri: imageModal.uri }}
            resizeMode="contain"
            />
        </Pressable>
    </Modal>
    </>
  )
}

export default FeedComponent

const styles = StyleSheet.create({
    postContainer:{
        marginHorizontal: 15,
        marginVertical: 8,
        borderRadius: 12,
        padding: 15,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        maxWidth: 600,
        alignSelf: 'center',
        width: '100%',
    },
    profileContainer:{
        flexDirection:'row',
        gap:10,
        marginBottom:10
    },
    infoContainer:{
        justifyContent:'center'
    },
    title:{
        fontWeight:'bold',
        fontSize:16
    },
    datePosted:{
        fontSize:12,
        color:'gray'
    },
    profile:{
        width:40,
        height:40,
        borderRadius:50
    },
    postImage:{
        width:'100%',
        height:300,
        resizeMode:'contain',
        borderRadius:10
    },
    reactionComment:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10
    },
    reactionContainer:{
        flexDirection:'row',
        gap:10
    },
    iconContainer:{
        flexDirection:'row',
        gap:10,
        padding:5,
        borderRadius:50,
    },
    postText: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 10
    },
    logoContainer: {
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff',
        maxWidth: 600,
        alignSelf: 'center',
        width: '100%',
    },
    logo: {
        width: 200,
        height: 50,
    },
    quoteContainer: {
        padding: 20,
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 20,
        maxWidth: 600,
        alignSelf: 'center',
        width: '100%',
    },
    quoteText: {
        fontSize: 15,
        fontStyle: 'italic',
        fontWeight: 'bold', 
        color: '#ffffff',
        lineHeight: 24,
    },
    modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    },
    fullImage: {
    width: '90%',
    height: '90%',
    borderRadius: 10,
    }
})