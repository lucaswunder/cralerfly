const Joi = require('joi');

module.exports = () => Joi.object().keys({
    query: Joi.object().keys({
        text: Joi.string().length(80).required()
    })
});
