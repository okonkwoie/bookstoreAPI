const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const mongodbConnect = require('./database/mongodb')

const app = express()

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// error handler middleware
app.use((err, req, res, next) => {
    console.log(err);
    const errorStatus = err.status || 500
    res.status(errorStatus).send(`There's an error!`)
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