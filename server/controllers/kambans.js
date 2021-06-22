const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const member = require('../middleware/member');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Kambam = require('../models/Kambam');

// Adicionar kanbam

router.post('/', [auth, [check('title', 'Titulo é obrigatório').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title } = req.body;

      // Criar e salvar o kanbam

      const newKambam = new Kambam({ title });
      const kambam = await newKambam.save();

      // Adicionar kanbam para o usuário

      const user = await User.findById(req.user.id);
      user.kambans.unshift(kambam.id);
      await user.save();

      // Adicionar usuario e membros ao kanbam

      kambam.members.push({ user: user.id, name: user.name, avatar: user.avatar });

      // Atividades ocorridas no kanbam (seu log)

      kambam.activity.unshift({
        text: `${user.name} criou este kanbam`,
      });
      await kambam.save();

      res.json(kambam);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  }
);

// Verificar usuários no kanbam

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const kambans = [];
    for (const kambamId of user.kambans) {
      kambans.push(await Kambam.findById(kambamId));
    }

    res.json(kambans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Listar kambam por id

router.get('/:id', auth, async (req, res) => {
  try {
    const kambam = await Kambam.findById(req.params.id);
    if (!kambam) {
      return res.status(404).json({ msg: 'Kambam não encontrado' });
    }

    res.json(kambam);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Listar kambans por atividades

router.get('/activity/:kambamId', auth, async (req, res) => {
  try {
    const kambam = await Kambam.findById(req.params.kambamId);
    if (!kambam) {
      return res.status(404).json({ msg: 'Kambam não encontrado' });
    }

    res.json(kambam.activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Listar titulos do kambam

router.patch('/rename/:id',
  [auth, member, [check('title', 'Titulo é obrigatório').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const kambam = await Kambam.findById(req.params.id);
      if (!kambam) {
        return res.status(404).json({ msg: 'Kambam não encontrado' });
      }

      // Logs da atividade

      if (req.body.title !== kambam.title) {
        const user = await User.findById(req.user.id);
        kambam.activity.unshift({
          text: `${user.name} renomeou este kambam (para '${kambam.title}')`,
        });
      }

      kambam.title = req.body.title;
      await kambam.save();

      res.json(kambam);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  }
);

// Adicionar membro ao kambam

router.put('/addMember/:userId', [auth, member], async (req, res) => {
  try {
    const kambam = await Kambam.findById(req.header('kambamId'));
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    // Visualizar membros ao kambam

    if (kambam.members.map((member) => member.user).includes(req.params.userId)) {
      return res.status(400).json({ msg: 'Usuário já é membro do kambam' });
    }

    // Adicionar usuarios ao kambam

    user.kambans.unshift(kambam.id);
    await user.save();

    // Adicionar usuário ao kambam

    kambam.members.push({
      user: user.id,
      name: user.name,
      avatar: user.avatar,
      role: 'normal'
    });

    // Logs de atividades

    kambam.activity.unshift({
      text: `${user.name} foi adicionado a equipe`,
    });
    await kambam.save();

    res.json(kambam.members);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;