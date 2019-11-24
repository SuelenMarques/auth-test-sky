const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');

routes.post('/usuarios', UserController.store);

module.exports = routes;