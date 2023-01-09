const mongoose = require('mongoose')

// define a schema 
const Schema = mongoose.Schema

// define a author schema
const authorSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    country: {
        type: String,
        required: false
    },
    books: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdateAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('authors', authorSchema)