const express = require('express');
const routes = express.Router();
const bcrypt = require('./models/User');

const UserController = require('./controllers/UserController');

async function checkPassword(req, res, next) {
  const user = await user.findOne({ email: req.body.email });
  const senhaCorreta = await bcrypt.compare(req.body.senha, user.senhaHash);
  if (!senhaCorreta) {
    return res.status(400).json({ error: 'Senha não corresponde' });
  }
  return next();
}


routes.post('/usuarios', UserController.store);
// routes.post('/session', SessionController.store);
routes.get('/usuarios', UserController.index);

module.exports = routes;