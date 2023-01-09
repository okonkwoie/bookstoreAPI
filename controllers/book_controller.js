const bookModel = require('../models/books')

function getAllBooks(req, res){
    bookModel.find()
    .then(books => {
        res.send(books)
    })
    .catch(err => {
        res.send(err)
        console.log(err);
    })
}

function getBookByID(req, res){
    const bookID = req.params.id

    bookModel.findById(bookID)
    .then(book => {
        res.send(book)
    })
    .catch(err => {
        res.send(err)
        console.log(err);
    })
}

function addBook(req, res){
    const book = req.body
    book.lastUpdateAt = new Date()

    bookModel.create(book)
    .then(book => {
        res.status(201).send(book)
    })
    .catch(err => {
        res.status(500).send(err)
        console.log(err);
    })
}

function updateBookByID(req, res){
    const bookID = req.params.id
    const book = req.body 
    book.lastUpdateAt = new Date()

    bookModel.findByIdAndUpdate(bookID, book, {new: true})
    .then(newBook => {
        res.status(200).send(newBook)
    })
    .catch(err => {
        res.status(500).send(err)
        console.log(err);
    })
}

function deleteBook(req, res){
    const bookID = req.params.id
    const book = req.body
    book.lastUpdateAt = new Date()

    bookModel.findByIdAndDelete(bookID, book)
    .then(() => {
        res.status(200).send({
            message: "Book deleted successfully",
        })
    })
    .catch(err => {
        res.status(400).send(err)
        console.log(err);
    })
}

module.exports = {
    getAllBooks,
    getBookByID,
    addBook,
    updateBookByID,
    deleteBook
}