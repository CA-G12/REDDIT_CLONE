// const createError = require('http-errors');
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
            res.json(createError(400, 'This email is already exists'));
          } else {
            addUserQuery(req.body)
              .then((user) => {
                createToken({ id: user.id }).then((token) => {
                  res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                  }).json({ path: 'private/home.html' });
                }).catch((err) => { res.json(createError(500, `1server error ${err}`)); });
              })
              .catch((err) => { res.json(createError(500, `2 server error ${err}`)); });
          }
        })
        .catch((error) => console.log(error));
    })
    .catch((err) => console.log(err));
};
module.exports = addUser;

