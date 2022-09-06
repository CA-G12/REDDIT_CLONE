const joi = require('joi');

const schemaValidator = (object, schema) => new Promise((resolve, reject) => {
  if (!object) {
    reject(new Error('object not provided'));
  }
  if (!schema) {
    reject(new Error('schema not provided'));
  }

  const { error, value } = schema.validate(object);

  if (error) {
    reject(new Error(error));
  }
  resolve(value);
});

module.exports = schemaValidator;
