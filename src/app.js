const express = require('express');
const router = require('./routes');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

module.exports = app;