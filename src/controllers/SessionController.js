const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authConfig = require('../config/auth')

class SessionController {
  async store(req, res) {
    const schema = yup.object().shape({
      nome: yup.string().required(),
      email: yup.string()
          .email()
          .required(),
      senha: yup.string()
          .required()
  });
  
    const {email, senha } = req.body;

    const user = await User.findOne({ email });
 
    if(!user) {
      return res.status(401).json({ error: 'Usuário não encontrado'});
    }

    // if(!(await user.checkPassword(senha))) {
    //   return res.status(401).json({ error: 'Senha não corresponde'});
    // }

    const { id, nome } = user;

    return res.json({
      user: {
        id,
        nome,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = SessionController;