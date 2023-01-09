const joi = require('joi')

const bookSchema = Joi.object({
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
    price: Joi.number()
            .min(0)
            .required(),
    createdAt: Joi.date()
            .default(Date.now),
    lastUpdateAt: Joi.date()
            .default(Date.now)
}) 

// turning the validator into a middleware
async function bookValidatorMW(req, res, next){
    const bookPayload = req.body

    try {
        await bookSchema.validateAsync(bookPayload)
        next()
    } catch (error) {
        next(error.details[0].message)
    }
}

module.exports = bookValidatorMW()