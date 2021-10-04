const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.DB_URL, {
    user: process.env.DB_USER_NAME,
    pass: process.env.DB_PASS,
    dbName: process.env.DB_Name,
    retryWrites: false,
    keepAlive: true
})