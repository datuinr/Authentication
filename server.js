const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express();

// database
require('./server/config/mongoose.config')

// middleware
app.use(cookieParser())
app.use(cors({credentials:true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
require('./server/routes/user.route')(app)

const port = process.env.port
app.listen(port, () => console.log('server is runnin yo')) 