const express = require('express');
const router = express.Router();
const {handleError} = require('../utils/errorHandlerHof');
const PetController = require('../controllers/pet.controller');
const {createPet, updatePet} = require('../models/pets');
const petController = new PetController();
// path prefix /pets

// GET pets
router.get('/', handleError((req, res) => {
  res.send(petController.list());
}));

// GET pets/:name
router.get('/:name', handleError((req, res) => {
  const { params: {name}} = req;
  res.send(petController.getPet(name));
}));

// POST pets/
router.post('/', handleError((req, res, next) => {
  const {body: {specie, gender, name, description, url, photo}} = req;
  const {error} = createPet.validate({specie, gender, name, description, url, photo});
  if(error) return next(error);
  res.send(petController.create(body));
}));

// PUT pets/:name
router.put('/:name', handleError((req, res, next) => {
  const {body, params: {name: petName}} = req;
  const {body: {specie, gender, name, description, url, photo}} = req;
  const {error} = updatePet.validate({specie, gender, name, description, url, photo});
  if(error) return next(error);
  res.send(petController.update(petName, body));
}));

// DELETE pets/:name
router.delete('/:name', handleError((req, res) => {
  const {params: {name}} = req;
  res.send(petController.delete(name));
}));

module.exports = router;
