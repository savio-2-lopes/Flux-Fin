const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

const User = require('../models/User');

// Cadastrar usuário

router.post('/', [
  check('name', 'Nome é obrigatório').not().isEmpty(),
  check('email', 'Por favor, inclua um email válido').isEmail(),
  check('password', 'Por favor, entre com uma senha de 6 ou mais caracteres').isLength({ min: 6, }),
  check('avatar', 'Link da foto é obrigatório').not().isEmpty(),
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, avatar } = req.body;

    try {
      // Caso o usuário já esteja cadastrado
      if (await User.findOne({ email })) {
        return res.status(400).json({ errors: [{ msg: 'Usuário já cadastrado' }] });
      }

      // Cadastrar novo usuário

      const user = new User({
        name,
        email,
        avatar,
        password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
      });

      await user.save();

      // Retornar Token em JSON

      jwt.sign({
        user: {
          id: user.id,
        },
      },
        process.env.SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  }
);

// Obtenha usuários com regex de e-mail

router.get('/:input', auth, async (req, res) => {
  try {
    const regex = new RegExp(req.params.input, 'i');
    const users = await User.find({
      email: regex,
    }).select('-password');

    res.json(users.filter((user) => user.id !== req.user.id));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;