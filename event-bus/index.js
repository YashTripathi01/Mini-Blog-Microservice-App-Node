const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

// to store all the events
const events = []

app.post('/events', (req, res) => {
    const event = req.body

    events.push(event)

    // event bus broadcasting the received msg to all the services
    axios.post('http://127.0.0.1:3001/events', event)
        .catch((err) => { console.log(err.message); })  //posts
    axios.post('http://127.0.0.1:3002/events', event)
        .catch((err) => { console.log(err.message); }) //comments
    axios.post('http://127.0.0.1:3003/events', event)
        .catch((err) => { console.log(err.message); }) //query service
    axios.post('http://127.0.0.1:3004/events', event)
        .catch((err) => { console.log(err.message); }) //moderation service

    res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
    // to send all the events ever occurred
    res.send(events)
})

app.listen(3005, () => {
    console.log(`event-bus service listing on port 3005`);
})
