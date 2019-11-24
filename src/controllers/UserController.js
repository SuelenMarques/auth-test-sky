const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    async store(req, res) {
        const userExists = await User.findOne({ where: { email: req.body.email } });

        if (userExists) {
            return res.status(400).json({ error: "E-mail já existente" });
        } 

        const usuarios = await User.create(req.body);

        return res.json(usuarios);
    }
};
