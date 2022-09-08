// const { join } = require('path');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const app = express();
require('dotenv').config();
const router = require('./router');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.use(express.static('public'));
app.use('/private',express.static('private'));

app.use(router);

module.exports = app;
