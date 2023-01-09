const mongoose = require('mongoose')
const config = require('../config/config')

function mongodbConnect(){
    mongoose.connect(config.MONGODB_URL)

    mongoose.connection.on('connected', () => {
        console.log('mongodb connected successfully...');
    })

    mongoose.connection.on('error', (err) => {
        console.log('unsuccessful connection...');
        console.log(err);
    })
}

module.exports = mongodbConnect()