const PetController = require('../../../src/controllers/pet.controller');
const { NotFoundError } = require('../../../src/utils/errors');

const fileHelpers = jasmine.createSpyObj('MockedHelpers', ['save', 'get'])

const pets = [
  {
    "specie": "Dog",
    "gender": "Male",
    "name": "Ruff",
    "description": "Meet Ruff, Ruff is a smaller breed - probably around 10 lbs at  6-7  months old and a complete mix...",
    "url": "https://www.petfinder.com/dog/ruff-48555420/il/batavia/starfish-animal-rescue-il599/?referrer_id=5957d654-0b8d-4a02-bbae-6c7dd49e1074",
    "photo": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/48555420/1/?bust=1595364732&width=300"
  },
  {
    "specie": "Dog",
    "gender": "Male",
    "name": "Red",
    "description": "Okay people, prepare yourself for this face. Meet big Red! Red is a French mastiff, whose heart is as big...",
    "url": "https://www.petfinder.com/dog/red-48550360/nc/raleigh/freedom-ride-rescue-nc1092/?referrer_id=5957d654-0b8d-4a02-bbae-6c7dd49e1074",
    "photo": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/48550360/2/?bust=1597342229&width=300"
  }];

fileHelpers.get.and.returnValue([...pets]);

describe('Pet Controller', () => {
  let petContoller;
  beforeEach(() => {
    petContoller = new PetController(fileHelpers.save, fileHelpers.get);
  });

  it('Should list all available pets', () => {
    // Arrange
    const expectedPets = pets;

    // Act
    const actualPets = petContoller.list();

    // Assert
    expect(actualPets).toEqual(expectedPets);
  });

  it('Should return 1 index for pet "Red"', () => {
    // Arrange
    const expectedIndex = 1;
    const petName = 'Red';

    // Act
    const actualIndex = petContoller.getIndex(petName);

    // Assert
    expect(actualIndex).toBe(expectedIndex);
  });

  it('Should return pet "Ruff"', () => {
    // Arrange
    const expectedPet = pets[0];
    const petName = 'Ruff';

    // Act
    const actualPet = petContoller.get(petName);

    // Assert
    expect(actualPet).toEqual(expectedPet);
  });

  it('Should throw exception when getIndex for non existing pet', () => {
    // Arrange
    const petName = 'NonExistingPet';

    // Act & Assert
    expect(() => {
      petContoller.getIndex(petName);
    }).toThrow(new NotFoundError(`pet with the name: ${petName}`));
  });

  it('Should throw exception NotFoundError in get for NonExistingPet', () => {
    // Arrange
    const petName = 'NonExistingPet';

    // Act & Assert
    expect(() => {
      petContoller.get(petName);
    }).toThrow(new NotFoundError(`pet with the name: ${petName}`));
  });

  it('Should add a new pet', () => {
    // Arrange
    const newPet = {
      "specie": "Dog",
      "gender": "Male",
      "name": "Louie",
      "description": "Louie is 15 months old and 42 lbs. He is a German Shepherd/Black Mouth Curr mix. He is friendly and...",
      "url": "https://www.petfinder.com/dog/louie-48550730/oh/cincinnati/little-hills-of-kentucky-animal-rescue-inc-ky519/?referrer_id=5957d654-0b8d-4a02-bbae-6c7dd49e1074",
      "photo": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/48550730/1/?bust=1595361739&width=300"
    };
    const expectedPets = [...pets, newPet];

    // Act
    const actualPet = petContoller.create(newPet);

    // Assert
    expect(actualPet).toEqual(newPet);
    expect(fileHelpers.save).toHaveBeenCalledWith(expectedPets);
  });

  it('Should update an existing pet', () => {
    // Arrange
    const petName = 'Red';
    const updatedPet = {
      "specie": "Dog",
      "gender": "Male",
      "name": "Red",
      "description": "bla bla bla",
      "url": "https://www.petfinder.com/dog/louie-48550730/oh/cincinnati/little-hills-of-kentucky-animal-rescue-inc-ky519/?referrer_id=5957d654-0b8d-4a02-bbae-6c7dd49e1074",
      "photo": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/48550730/1/?bust=1595361739&width=300"
    };

    // Act
    const actualPet = petContoller.update(petName, updatedPet);

    // Assert
    expect(actualPet).toEqual(updatedPet);
  });

  it('Should throw when trying to update a non existing pet', () => {
    // Arrange
     // Arrange
     const petName = 'non existing pet';
     const updatedPet = {
       "specie": "Dog",
       "gender": "Male",
       "name": "Red",
       "description": "bla bla bla",
       "url": "https://www.petfinder.com/dog/louie-48550730/oh/cincinnati/little-hills-of-kentucky-animal-rescue-inc-ky519/?referrer_id=5957d654-0b8d-4a02-bbae-6c7dd49e1074",
       "photo": "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/48550730/1/?bust=1595361739&width=300"
     };

    // Act & Assert
    expect(() => {
      petContoller.update(petName, updatedPet);
    }).toThrow(new NotFoundError(`pet with the name: ${petName}`));
  });

  it('Should delete an existing pet', () => {
    // Arrange
    const petName = 'Red';

    // Act
    petContoller.delete(petName);

    // Assert
    expect(petContoller.list().length).toEqual(2);
  });

  it('Should throw on delete a non existing pet', () => {
    // Arrange
    const petName = 'Non existing pet';

    // Act & Assert
    expect(() => {
      petContoller.delete(petName);
    }).toThrow(new NotFoundError(`pet with the name: ${petName}`));
  
  });
});

