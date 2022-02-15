const Joi = require('joi');

const updatePet = Joi.object().keys({
  spice: Joi.string(),
  gender: Joi.string(),
  name: Joi.string().min(3),
  description: Joi.string(),
  url: Joi.string().uri(),
  photo: Joi.string().uri()
});

const createPet = updatePet.concat(Joi.object({
  name: Joi.required()
}))

module.exports = {updatePet, createPet};

