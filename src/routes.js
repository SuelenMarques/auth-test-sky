const express = require('express');
const routes = express.Router();
const bcrypt = require('./models/User');

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');


routes.post('/usuarios', UserController.store);
// routes.post('/session', SessionController.store);
routes.get('/usuarios', UserController.index);

module.exports = routes;