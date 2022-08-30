const express = require('express')
const cors = require('cors')
const path = require('path')

// Allows use of environment variables
require('dotenv').config()

// Create express app
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))

const port = process.env.PORT | 7002;

// Serve the React Frontend
app.route('*').get((req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// Start Node server
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})