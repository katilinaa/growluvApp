// import pg from 'pg'
// const {Client} = 'pg'

// // const app = express()
// // app.use(express.json())

// export const client = new pg.Client({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: "lunakuma0604",
//   database: "growluv_DB"
// })

// client.connect().then(() => console.log("Connected successfully"))

// //Register Users
// app.post('/registerUsers', (req, res) => {
//     const {email, password} = req.body
//     const insert_query=('INSERT INTO users(email, password) VALUES($1, $2)')
//     client.query(insert_query, [email, password], (err, result) =>{
//       if(err){
//         res.send(err)
//       }
//       else{
//         console.log(result)
//         res.send("User created successfully")
//       }
//     })
// })

// //Login Users
// app.post('/loginUsers', (req, res) => {
//     const {email, password} = req.body
//     const select_query=('SELECT * FROM users WHERE email=$1 AND password=$2')
//     client.query(select_query, [email, password], (err, result) =>{
//       if(err){
//         res.send(err)
//       }
//       else{
//         console.log(result)
//         res.send("User logged in successfully")
//       }
//     })
// })

// app.listen(3000, () => console.log('Server running on port 3000'))