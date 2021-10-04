const express = require('express')
const { initClientDbConnection } = require('./db/database')
const userRouter = require('./router/user')
require('./db/database')

const app = express()
const port = process.env.PORT

app.use(express.json())

app.use(userRouter)


app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
