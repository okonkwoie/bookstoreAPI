const authorModel = require('../models/authors')

function getAllAuthors(req, res){
    authorModel.find()
    .then(authors => {
        res.send(authors)
    })
    .catch(err => {
        res.send(err)
        console.log(err);
    })
}

function getAuthorByID(req, res){
    const authorID = req.params.id

    authorModel.findById(authorID)
    .then(author => {
        res.send(author)
    })
    .catch(err => {
        res.send(err)
        console.log(err);
    })
}

function addAuthor(req, res){
    const author = req.body
    author.lastUpdateAt = new Date()

    authorModel.create(author)
    .then(author => {
        res.status(201).send(author)
    })
    .catch(err => {
        res.status(500).send(err)
        console.log(err);
    })
}

function updateAuthorByID(req, res){
    const authorID = req.params.id
    const author = req.body 
    author.lastUpdateAt = new Date()

    authorModel.findByIdAndUpdate(authorID, author, {new: true})
    .then(newAuthor => {
        res.status(200).send(newAuthor)
    })
    .catch(err => {
        res.status(500).send(err)
        console.log(err);
    })
}

function deleteAuthor(req, res){
    const authorID = req.params.id
    const author = req.body
    author.lastUpdateAt = new Date()

    authorModel.findByIdAndDelete(authorID, author)
    .then(() => {
        res.status(200).send({
            message: "Author deleted successfully",
        })
    })
    .catch(err => {
        res.status(400).send(err)
        console.log(err);
    })
}

module.exports = {
    getAllAuthors,
    getAuthorByID,
    addAuthor,
    updateAuthorByID,
    deleteAuthor
}