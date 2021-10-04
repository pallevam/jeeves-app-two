const express = require('express')
const userRouter = require('./router/user')
const topicRouter = require('./router/topic')
require('./db/database')

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())

app.use(userRouter)
app.use(topicRouter)


app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
