const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

routes.post('/usuarios', UserController.store);
// routes.post('/session', SessionController.store);
// routes.put('/usuarios', UserController.update);

module.exports = routes;