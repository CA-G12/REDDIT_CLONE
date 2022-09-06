const { join } = require('path');
const privateRouter = require('express').Router();

privateRouter.get('/', (req, res) => {
 res.status(200).sendFile(join(__dirname, '..', '..', 'private', 'index.html'));
});

module.exports = privateRouter;
