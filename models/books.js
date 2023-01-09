const mongoose = require('mongoose')

// define a schema 
const Schema = mongoose.Schema

// define a book schema
const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: false
    },
    longDescription: {
        type: String,
        required: false
    },
    year: {
        type: Number,
        required: true,
        max: [2022, 'Year must be less than or equal to 2022']
    }, 
    isbn: {
        type: String,
        required: true,
        unique: [true, 'isbn must be unique']
    }, 
    price: {
        type: Number,
        required: true,
        min: [0, 'price must be greater than or equal to 0']
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

module.exports = mongoose.model('books', bookSchema)