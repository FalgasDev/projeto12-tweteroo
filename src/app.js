import express from "express"
import cors from "cors"

const server = express()
server.use(express.json())
server.use(cors())

const users = []
const tweets = []

server.post("/sign-up", (req, res) => {
  const user = req.body
  users.push(user)
  res.send('OK')
})

server.post("/tweets", (req, res) => {
  const tweet = req.body
  tweets.push({...tweet, avatar: users[users.length - 1].avatar})
  res.send('OK')
})

server.get("/tweets", (req, res) => {
  res.send(tweets)
})

const PORT = 5000

server.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`))