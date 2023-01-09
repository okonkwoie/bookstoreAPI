const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const bookRouter = require('./routes/books')
const authorRouter = require('./routes/authors')
const mongodbConnect = require('./database/mongodb')

const app = express()

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// for the router
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/authors', authorRouter)

// error handler middleware
app.use((err, req, res, next) => {
    console.log(err);
    const errorStatus = err.status || 500
    res.status(errorStatus).send(err.message)
    next()
})

// mongodb connection 
mongodbConnect


// home route
app.get('/', (req, res) => {
    res.send('book store is working!')
})





app.listen(config.PORT, () => {
    console.log(`server is running on port ${config.PORT}...`);
})