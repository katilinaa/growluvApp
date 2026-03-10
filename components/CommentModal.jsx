import { Modal, StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import ThemedView from './ThemedView'

const CommentModal = ({ visible, onClose, postId, userId }) => {
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')

  useEffect(() => {
    if (visible && postId) fetchComments()
  }, [visible, postId])

  const fetchComments = async () => {
    const res = await fetch(`http://192.168.1.133:3000/api/comments/${postId}`)
    const data = await res.json()
    setComments(data)
  }

  const addComment = async () => {
    if (!text.trim()) return
    await fetch('http://192.168.1.133:3000/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, userId, text })
    })
    setText('')
    fetchComments()
  }

  return (
    <Modal visible={visible} animationType="slide">
      <ThemedView style={styles.container} safe = {true}>
        <ThemedView style={styles.header}>
          <Text style={styles.title}>Comments</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={28} />
          </TouchableOpacity>
        </ThemedView>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Text style={styles.username}>{item.username}</Text>
              <Text>{item.content}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{padding: 20, textAlign: 'center'}}>No comments yet</Text>}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity onPress={addComment}>
            <Ionicons name="send" size={24} color="#56cef9" />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
},
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 15, 
    borderBottomWidth: 1, 
    borderColor: '#eee' 
},
  title: { 
    fontSize: 18, 
    fontWeight: 'bold' 
},
  comment: { 
    padding: 15, 
    borderBottomWidth: 1, 
    borderColor: '#eee' 
},
  username: { 
    fontWeight: 'bold', 
    marginBottom: 5 
},
  inputContainer: { 
    flexDirection: 'row', 
    padding: 15, 
    borderTopWidth: 1, 
    borderColor: '#eee', 
    alignItems: 'center' 
},
  input: { 
    flex: 1, 
    padding: 10, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 20, 
    marginRight: 10 
}
})

export default CommentModal
