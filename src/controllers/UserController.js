const mongoose = require('mongoose');
const User = mongoose.model('User');
const yup = require('yup');

module.exports = {
    async index(req,res) {
        const usuarios = await User.find();
        return res.json(usuarios);
    },

    async store(req, res) {
        const schema = yup.object().shape({
            nome: yup.string().required(),
            email: yup.string()
                .email()
                .required(),
            senha: yup.string()
                .required()
                .min(6),
        });

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação'});
        }

        const userExists = await User.findOne({ email: req.body.email });

        if (userExists) {
            return res.status(400).json({ error: "E-mail já existente" });
        }

        const { nome, email} = await User.create(req.body);

        return res.json({
            nome,
            email
        });
    }
    // async update(req, res) {
    //     return req.json({ ok: true});
    // }
};
