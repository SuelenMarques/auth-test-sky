const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    select: false,
    required: true
  },
  senhaHash: {
    type: String,
  },
  telefones: [{
    numero: String,
    ddd: Number,
  }],
  data_criacao: {
    type: Date,
    default: Date.now,
  },
  data_atualizacao: {
    type: Date,
    default: Date.now,
  },
  ultimo_login: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function () {
  if (this.isNew) {
    this.senhaHash = await bcrypt.hash(this.senha, 8);
    this.senha = undefined;
  }
})

async function checkPassword(req, res, next) {
  const user = await user.findOne({ email: req.body.email });
  const senhaCorreta = await bcrypt.compare(req.body.senha, user.senhaHash);
  if (!senhaCorreta) {
    return res.status(400).json({ error: 'Senha não corresponde' });
  }
  return next();
}


// checkPassword(senha) {
//   return bcrypt.compare(senha, this.senhaHash);
// }

module.exports = mongoose.model('User', UserSchema)