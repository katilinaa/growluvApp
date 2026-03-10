import express from 'express'
import cors from 'cors'
import multer from 'multer'
import pg from 'pg'
const {Client} = pg
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import path from 'path' 

const app = express()
app.use(cors())
app.use(express.json({
  limit: '50mb'}))
app.use('/api/upload', express.static('uploads'))

export const client = new pg.Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "lunakuma0604",
  database: "growluv_DB"
})

client.connect().then(() => console.log("Connected successfully"))
const SECRET_KEY = 'bomboclaat'

// Register
app.post('/registerUsers', async (req, res) => {
  const { email, password, username } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(hashedPassword)
  
  try {
    const result = await client.query(
      'INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING id, email, username',
      [email, hashedPassword, username]
    )
    const token = jwt.sign({ userId: result.rows[0].id }, SECRET_KEY)
    res.json({ user: result.rows[0], token })
  } catch (error) {
    // Unique violation code for Postgres SQL
    if (error.code === '23505') {
      if (error.constraint === 'users_username_key') {
        return res.status(409).json({ error: 'Username already taken' });
      }
      if (error.constraint === 'users_email_key') {
        return res.status(409).json({ error: 'Email already registered' });
      }

      return res.status(409).json({ error: 'Username or email already exists' });
    }

    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
})

// Login
app.post('/loginUsers', async (req, res) => {
  const { email, password } = req.body
  
  try {
    const result = await client.query('SELECT * FROM users WHERE email=$1', [email])
    if (result.rows.length === 0){
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    const user = result.rows[0]
    const valid = await bcrypt.compare(password, user.password)
    
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
 
    const token = jwt.sign({ userId: user.id }, SECRET_KEY)
    res.json({ user: { id: user.id, email: user.email }, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Upload Media
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage }).single('file')
app.post('/api/upload', (req, res) => {
  upload(req, res, (err) => {
      if (err){
        return res.status(400).json({ error: 'File upload failed' })
      }
      else{
        console.log(req.file);
        res.json({ url: `http://192.168.1.133:3000/api/upload/${req.file.filename}` })
      }
    }) 
})

// Create post
app.post('/createPosts', async (req, res) => {
  const { text, userId, mediaUrl} = req.body
  const file = req.file

  let mediaType = null

  // Determine media type based on file extension
  if (mediaUrl) {
    if (
      mediaUrl.endsWith('.mp4') ||
      mediaUrl.endsWith('.mov') ||
      mediaUrl.endsWith('.avi')
    ) {
      mediaType = 'video'
    } else {
      mediaType = 'image'
    }
  }
  
  try {
    const result = await client.query(
      'INSERT INTO posts (text, user_id, timestamp, media_url, media_type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [text, userId, Date.now(), mediaUrl, mediaType]
    )
    res.json(result.rows[0])
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get posts
app.get('/getPosts', async (req, res) => {
  try {
    // Getting posts as well as user ID and username to display
    const userId = req.query.userId
    const result = await client.query(`
      SELECT 
        posts.*, users.username,
        COUNT(DISTINCT likes.id) as like_count,
        BOOL_OR(likes.user_id = $1) AS liked,
        COUNT(DISTINCT comments.id) AS comment_count
      FROM posts 
      JOIN users ON posts.user_id = users.id
      LEFT JOIN likes ON likes.post_id = posts.id
      LEFT JOIN comments ON posts.id = comments.post_id
      GROUP BY posts.id, users.username
      ORDER BY posts.timestamp DESC
    `, [userId])
    res.json(result.rows)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete post
app.delete('/api/deleteposts/:postId', async (req, res) => {
  const { postId } = req.params

  try {
    await client.query(
      'DELETE FROM posts WHERE id = $1',
      [postId]
    )

    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete post' })
  }
})

//Like posts
app.post('/api/likes', async (req, res) => {
  const { userId, postId } = req.body

  try {
    // Check if the user has already liked the post
    const existingLike = await client.query(
      'SELECT * FROM likes WHERE post_id = $1 AND user_id = $2',
      [postId, userId]
    )

    if (existingLike.rows.length > 0) {
      // If the user has already liked the post, remove the like
      await client.query(
        'DELETE FROM likes WHERE post_id = $1 AND user_id = $2',
        [postId, userId]
      )
      res.json({ liked: false })
    } else {
      // If the user hasn't liked the post yet, add the like
      await client.query(
        'INSERT INTO likes (post_id, user_id) VALUES ($1, $2)',
        [postId, userId]
      )
      res.json({ liked: true })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
  })

  // Get comments
  app.get('/api/comments/:postId', async (req, res) => {
    const { postId } = req.params

    try {
      const result = await client.query(
      `SELECT comments.*, users.username 
      FROM comments 
      JOIN users ON comments.user_id = users.id 
      WHERE comments.post_id = $1 
      ORDER BY comments.timestamp ASC
    `, [postId])
      res.json(result.rows)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })

  // Adding comments
  app.post('/api/comments', async (req, res) => {
    const { userId, postId, text } = req.body

    try {
      const result = await client.query(
        'INSERT INTO comments (user_id, post_id, content, timestamp) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, postId, text, Date.now()]
      )
      res.json(result.rows[0])
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  })

app.listen(3000, () => console.log('Server running on port 3000'))

