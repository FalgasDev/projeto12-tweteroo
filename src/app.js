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
  const names = users.map(item => item.username)
  if (names.includes(tweet.username)) {
    tweets.push({...tweet, avatar: users[users.length - 1].avatar})
    res.send('OK')
  } else {
    res.send('UNAUTHORIZED')
  }
})

server.get("/tweets", (req, res) => {
  let lastTweets = []
  for (let i = tweets.length - 1; i >= 0; i--) {
    lastTweets = [...lastTweets, tweets[i]]
  }
  if (lastTweets.length > 10) {
    lastTweets = lastTweets.slice(0, 10)
  }
  res.send(lastTweets)
})

const PORT = 5000

server.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`))