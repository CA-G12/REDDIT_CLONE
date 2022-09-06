// const createError = require('http-errors');
const { join } = require('path');
const createError = require('http-errors');

const { addUserQuery, checkUserQuery } = require('../../database/queries');
const { authSchema } = require('../../helpers/schemaValidation');
const schemaValidator = require('../../helpers/schemaValidator');
const createToken = require('../../helpers/createToken');
/*
validation input
hash password
query
give token
handle error
*/

const addUser = (req, res, next) => {
  schemaValidator(req.body, authSchema)
    .then(() => {
      checkUserQuery(req.body.email)
        .then((users) => {
          if (users.rows.length) {
            res.json({ msg: 'This email is already exists'});
          } else {
            addUserQuery(req.body)
              .then((user) => {
                createToken({ id: user.id }).then((token) => {
                  res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                  }).json({ path: 'private' });
                }).catch((err) => { next(createError(500, `server error ${err}`)); });
              })
              .catch((err) => { next(createError(500, `server error ${err}`)); });
          }
        })
        .catch((err) => { next(createError(500, `server error ${err}`)); });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // console.log(err);
        res.json({err});
      } else {
        next(createError(500, `server error ${err}`));
      }
    });
};
module.exports = addUser;
