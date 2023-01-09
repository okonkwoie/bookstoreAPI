const express = require('express')
const {AddBookValidatorMW, UpdateBookValidatorMW} = require('../validators/book_validator')
const bookController = require('../controllers/book_controller')

const bookRouter = express.Router()

bookRouter.get('/', bookController.getAllBooks)

bookRouter.get('/:id', bookController.getBookByID)
   
bookRouter.post('/', AddBookValidatorMW, bookController.addBook)

bookRouter.put('/:id', UpdateBookValidatorMW, bookController.updateBookByID)

bookRouter.delete('/:id', bookController.deleteBook)


module.exports = bookRouter
