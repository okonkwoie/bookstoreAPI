const Joi = require('joi')

const authorAddSchema = Joi.object({
    firstname: Joi.string()
            .max(50)
            .required(),
    lastname: Joi.string()
            .max(50)
            .required(),
    dob: Joi.date()
            .greater('1-1-1900')
            .less('1-1-2023')
            .required(),
    country: Joi.string()
            .optional(),
    books: Joi.array()
            .items(Joi.string())
            .optional(),
    createdAt: Joi.date()
            .default(Date.now),
    lastUpdateAt: Joi.date()
            .default(Date.now)
}) 

const authorUpdateSchema = Joi.object({
    firstname: Joi.string()
            .max(50),
    lastname: Joi.string()
            .max(50),
    dob: Joi.date()
            .greater('1-1-1900')
            .less('1-1-2023'),
    country: Joi.string(),
    books: Joi.array()
            .items(Joi.string()),
    createdAt: Joi.date()
            .default(Date.now),
    lastUpdateAt: Joi.date()
            .default(Date.now)
}) 

// turning the add book validator into a middleware
async function AddAuthorValidatorMW(req, res, next){
    const authorPayLoad = req.body

    try {
        await authorAddSchema.validateAsync(authorPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}

// turning the update book validator into a middleware
async function UpdateAuthorValidatorMW(req, res, next){
    const authorPayLoad = req.body

    try {
        await authorUpdateSchema.validateAsync(authorPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: 400
        })
    }
}


module.exports = {
    AddAuthorValidatorMW,
    UpdateAuthorValidatorMW
}