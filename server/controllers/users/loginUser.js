const createError = require('http-errors');
const bcrypt = require('bcryptjs');

const { getUserQuery } = require('../../database/queries');
const { loginSchema } = require('../../helpers/schemaValidation');
const schemaValidator = require('../../helpers/schemaValidator');
const createToken = require('../../helpers/createToken');

// validation login input
// write query using email
// check if there is email
// check if email and password valid user

const loginUser = (req, res, next) => {
  schemaValidator({ email: req.body.email }, loginSchema)
    .then(() => {
      getUserQuery(req.body.email)
        .then((rows) => {
          if (rows.length) {
            bcrypt.compare(req.body.password, rows[0].password)
              .then((result) => {
                if (result) {
                  createToken({ id: rows[0].id }).then((token) => {
                    res.cookie('token', token, {
                      httpOnly: true,
                      secure: true,
                    }).json({ path: 'private' });
                  }).catch((err) => { next(createError(500, `server error in giving token: ${err}`)); });
                } else {
                  res.json({ msg: 'Incorrect Password' });
                }
              })
              .catch((err) => { next(createError(500, `server error in comparing password: ${err}`)); });
          } else {
            res.json({ msg: 'This email is not exists' });
          }
        })
        .catch((err) => { next(createError(500, `server error in getting user ${err}`)); });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.json({ err });
      } else {
        next(createError(500, `server error ${err}`));
      }
    });
};

module.exports = loginUser;
