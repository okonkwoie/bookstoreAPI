const express = require('express')
const bookValidatorMW = require('../validators/book_validator')
const bookModel = require('../models/books')

const bookRouter = express.Router()

bookRouter.get('/', (req, res) => {
    bookModel.find()
    .then(books => {
        res.send(books)
    })
    .catch(err => {
        res.send(err)
        console.log(err);
    })
})

bookRouter.get('/:id', (req, res) => {
    const bookID = req.params.id

    bookModel.findById(bookID)
    .then(book => {
        res.send(book)
    })
    .catch(err => {
        res.send(err)
        console.log(err);
    })
})

bookRouter.post('/', bookValidatorMW, (req, res) => {
    const book = req.body
    book.lastUpdateAt = new Date()

    bookModel.create(book)
    .then(book => {
        res.status(200).send(book)
    })
    .catch(err => {
        res.status(500).send(err)
    })
})

bookRouter.put('/:id', (req, res) => {
    const bookID = req.params.id
    const book = req.body 
    book.lastUpdateAt = new Date()

    bookModel.findByIdAndUpdate(book)
    .then(book => {
        res.status(200).send(book)
    })
    .catch(err => {
        res.status(500).send(err)
        console.log(err);
    })
})

