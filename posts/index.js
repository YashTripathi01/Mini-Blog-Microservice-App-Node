const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const { randomBytes } = require('crypto')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex')

    const { title } = req.body

    posts[id] = {
        id, title
    }

    // sending events to event bus
    await axios.post('http://127.0.0.1:3005/events', {
        type: 'postCreated',
        data: { id, title }
    })

    res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
    res.send({})
})

app.listen(3001, () => {
    console.log(`posts service listing on port 3001`);
})
