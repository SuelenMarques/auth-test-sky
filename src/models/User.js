const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema ({
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
        required: true
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
    token: {
      type: String,
    },
    ultimo_login:{
      type:Date,
      default: Date.now
    },
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 8)
    this.senha = hash;
  
    next();
  })


module.exports = mongoose.model('User', UserSchema);