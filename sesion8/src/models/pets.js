const Joi = require('joi');

const updatePet = Joi.object().keys({
  specie: Joi.string(),
  gender: Joi.string().valid('male', 'female','MALE', 'FEMALE'),
  name: Joi.string().min(3),
  description: Joi.string(),
  url: Joi.string().uri(),
  photo: Joi.string().uri()
});

const createPet = updatePet.concat(Joi.object({
  specie: Joi.required(),
  gender: Joi.required(),
  name: Joi.required(),
  url: Joi.string().required(),
  photo: Joi.string().required()
}))

module.exports = {updatePet, createPet};

