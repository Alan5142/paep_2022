const pets = require('../data/pets.json');
const {saveJSON, getJSON} = require('../utils/fileHelpers');
const {NotFoundError} = require('../utils/errors');

class PetController {
  constructor(saverFunction = saveJSON, getterFunction = getJSON) {
    this.saverFunction = saverFunction;
    this.getterFunction = getterFunction;
  }

  list() {
    return this.getterFunction();
    // return pets;
  }

  getIndex(name) {
    const pets = this.getterFunction();
    const foundIndex = pets.findIndex(pet => pet.name == name);
    if (foundIndex >= 0) return foundIndex;
    throw new NotFoundError(`pet with the name: ${name}`);
  }

  get(name) {
    const pets = this.getterFunction();
    const foundPet = pets.find(pet => pet.name == name); 
    if (foundPet !== undefined) return foundPet;
    throw new NotFoundError(`pet with the name: ${name}`);
  }

  create(pet) {
    const pets = this.getterFunction();
    pets.push(pet);
    this.saverFunction(pets);
    return pet;
  }

  update(name, petProperties) {
    const pets = this.getterFunction();
    const petIndex = this.getIndex(name);
    if (petIndex < 0) throw new NotFoundError(`pet with the name: ${name}`);
    pets[petIndex] = petProperties;
    this.saverFunction(pets);
    return pets[petIndex];
  }

  delete(name) {
    const pets = this.getterFunction();
    const petIndex = this.getIndex(name);
    if (petIndex < 0) throw new NotFoundError(`pet with the name: ${name}`);
    const copyPet = {...pets[petIndex]};
    delete pets[petIndex];
    pets.splice(petIndex, 1);
    this.saverFunction(pets);
    return copyPet;
  }
};

module.exports = PetController;
