const express = require('express')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const config = require('./config/config')
const bookRouter = require('./routes/books')
const authorRouter = require('./routes/authors')
const mongodbConnect = require('./database/mongodb')
const logger = require('./logging/logger')

const app = express()

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
// Apply the rate limiting middleware to all requests
app.use(limiter)

// security middleware
app.use(helmet())

// for the router
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/authors', authorRouter)

// error handler middleware
app.use((err, req, res, next) => {
    logger.error(err.message)
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
    logger.info(`server is running on port ${config.PORT}...`);
})