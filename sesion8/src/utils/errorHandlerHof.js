const {NotFoundError} = require('../utils/errors');

function handleError(fn) {
  return function(req, res, next) {
    try {
      fn(req, res, next);
    } catch (err) {
      console.log('Something went wrong', err);
      next(err);
    }
  }
}

module.exports = {handleError};