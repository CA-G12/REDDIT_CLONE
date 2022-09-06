const joi = require('joi');

const schemaValidator = (object, schema) => new Promise((resolve, reject) => {
  if (!object) {
    reject(new Error('object not provided'));
  }
  if (!schema) {
    reject(new Error('schema not provided'));
  }

  const { error, value } = schema.validate(object, { abortEarly: false });

  if (error) {
    reject(error);
  }
  resolve(value);
});

module.exports = schemaValidator;
