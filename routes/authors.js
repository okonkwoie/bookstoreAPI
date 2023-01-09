const express = require('express')
const {AddAuthorValidatorMW, UpdateAuthorValidatorMW} = require('../validators/author_validator')
const authorController = require('../controllers/author_controller')

const authorRouter = express.Router()

authorRouter.get('/', authorController.getAllAuthors)

authorRouter.get('/:id', authorController.getAuthorByID)
   
authorRouter.post('/', AddAuthorValidatorMW, authorController.addAuthor)

authorRouter.put('/:id', UpdateAuthorValidatorMW, authorController.updateAuthorByID)

authorRouter.delete('/:id', authorController.deleteAuthor)


module.exports = authorRouter
