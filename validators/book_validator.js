const Joi = require('joi')

const bookAddSchema = Joi.object({
    title: Joi.string()
            .min(5)
            .max(50)
            .required()
            .trim(),
    shortDescription: Joi.string()
            .min(5)
            .max(500)
            .trim()
            .optional(),
    longDescription: Joi.string()
            .min(10)
            .optional()
            .trim(),
    year: Joi.number()
            .integer()
            .required()
            .max(2022),
    isbn: Joi.string()
            .min(10)
            .max(13)
            .required()
            .trim(),
    price: Joi.number()
            .min(0)
            .required(),
    createdAt: Joi.date()
            .default(Date.now),
    lastUpdateAt: Joi.date()
            .default(Date.now)
}) 

const bookUpdateSchema = Joi.object({
    title: Joi.string()
            .min(5)
            .max(50)
            .trim(),
    shortDescription: Joi.string()
            .min(5)
            .max(500)
            .trim(),
    longDescription: Joi.string()
            .min(10)
            .trim(),
    year: Joi.number()
            .integer()
            .max(2022),
    isbn: Joi.string()
            .min(10)
            .max(13)
            .trim(),
    price: Joi.number()
            .min(0)
}) 

// turning the add book validator into a middleware
async function AddBookValidatorMW(req, res, next){
    const bookPayLoad = req.body

    try {
        await bookAddSchema.validateAsync(bookPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

// turning the update book validator into a middleware
async function UpdateBookValidatorMW(req, res, next){
    const bookPayLoad = req.body

    try {
        await bookUpdateSchema.validateAsync(bookPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}


module.exports = {
    AddBookValidatorMW,
    UpdateBookValidatorMW
}