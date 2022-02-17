const request = require('supertest');

const { restore } = require('../../src/utils/fileHelpers');
const app = require('../../src/app');
const endFunction = require('./helpers/supertest-jasmine');

afterEach(() => {
  restore();
});

describe('test', () => {
  describe('GET', () => {
    it('200 OK', (done) => {
      request(app)
        .get('/pets')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(endFunction(done));
    });
    it('200 OK with new pet', async () => {
      //Arrange
      const newPet = {
        specie: "Dog",
        gender: "Male",
        name: "Ruff",
        description: "Meet Ruff, Ruff is a smaller breed - probably around 10 lbs at  6-7  months old and a complete mix...",
        url: "https://www.petfinder.com/dog/ruff-48555420/il/batavia/starfish-animal-rescue-il599/?referrer_id=5957d654-0b8d-4a02-bbae-6c7dd49e1074",
        photo: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/48555420/1/?bust=1595364732&width=300"
      }

      //Act
      await request(app)
        .post('/pets')
        .send(newPet)
        .set('Accept', 'application/json')

      const { status, body: pets } = await request(app)
        .get('/pets')
        .set('Accept', 'application/json')

      const foundPet = pets.some((pet) => pet.name === newPet.name)

      // Assert
      expect(status).toEqual(200);
      expect(foundPet).toBe(true);
    })
  })
});

/*
describe('test', () => {
  afterEach(() => {
    restore();
  });

  it('200 OK', (done) => {
    request(app)
      .get('/pets')
      .expect(200)
      .end(endFunction(done));
  });
}); */