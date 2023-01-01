const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/events', async (req, res) => {
    const { type, data } = req.body

    if (type === 'commentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved'

        await axios.post('http://127.0.0.1:3005/events', {
            type: 'commentModerated',
            data: {
                postId: data.postId,
                id: data.id,
                content: data.content,
                status
            }
        })
    }

    res.send({})
})

app.listen(3004, () => {
    console.log(`moderation service listing on port 3004`);
})
