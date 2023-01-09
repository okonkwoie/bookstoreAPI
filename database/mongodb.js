const mongoose = require('mongoose')
const config = require('../config/config')
const logger = require('../logging/logger')

function mongodbConnect(){
    mongoose.connect(config.MONGODB_URL)

    mongoose.connection.on('connected', () => {
        logger.info('mongodb connected successfully...');
    })

    mongoose.connection.on('error', (err) => {
        logger.error(err);
    })
}

module.exports = mongodbConnect()