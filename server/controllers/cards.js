const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const member = require('../middleware/member');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Kambam = require('../models/Kambam');
const Task = require('../models/Task');
const Card = require('../models/Card');

// Adicionar card

router.post('/',
  [auth, member, [check('title', 'Titulo é obrigatório').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, taskId } = req.body;
      const kambamId = req.header('kambamId');

      // Criar e salvar os cards

      const newCard = new Card({ title });
      const card = await newCard.save();

      // Atribuir o card a task

      const task = await Task.findById(taskId);
      task.cards.push(card.id);
      await task.save();

      // Logs da atividade

      const user = await User.findById(req.user.id);
      const kambam = await Kambam.findById(kambamId);

      kambam.activity.unshift({
        text: `${user.name} adicionou '${title}' a '${task.title}'`,
      });

      await kambam.save();

      res.json({ cardId: card.id, taskId });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  }
);

// Obtenha todos os card de uma task

router.get('/taskCards/:taskId', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ msg: 'Task não encontrada' });
    }

    const cards = [];

    for (const cardId of task.cards) {
      cards.push(await Task.findById(cardId));
    }

    res.json(cards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Pegue um card por id

router.get('/:id', auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: 'Card não encontrado' });
    }

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Editando titulo e descrição do card
router.patch('/edit/:id', [auth, member], async (req, res) => {
  try {
    const { title, description, label } = req.body;
    if (title === '') {
      return res.status(400).json({ msg: 'Titulo é obrigatório' });
    }

    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: 'Card não encontrado' });
    }

    card.title = title ? title : card.title;
    if (description || description === '') {
      card.description = description;
    }
    if (label || label === 'none') {
      card.label = label;
    }
    await card.save();

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Arquivar/Desarquivar o card

router.patch('/archive/:archive/:id', [auth, member], async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: 'Card não encontrado' });
    }

    card.archived = req.params.archive === 'true';
    await card.save();

    // Logs da atividade

    const user = await User.findById(req.user.id);
    const kambam = await Kambam.findById(req.header('kambamId'));

    kambam.activity.unshift({
      text: card.archived
        ? `${user.name} arquivou o card '${card.title}'`
        : `${user.name} enviou o card '${card.title}' para o kambam`,
    });

    await kambam.save();

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Mover o card

router.patch('/move/:id', [auth, member], async (req, res) => {
  try {
    const { fromId, toId, toIndex } = req.body;
    const kambamId = req.header('kambamId');

    const cardId = req.params.id;
    const from = await Task.findById(fromId);
    let to = await Task.findById(toId);

    if (!cardId || !from || !to) {
      return res.status(404).json({ msg: 'Task/card não encontrados' });
    } else if (fromId === toId) {
      to = from;
    }

    const fromIndex = from.cards.indexOf(cardId);
    if (fromIndex !== -1) {
      from.cards.splice(fromIndex, 1);
      await from.save();
    }

    if (!to.cards.includes(cardId)) {
      if (toIndex === 0 || toIndex) {
        to.cards.splice(toIndex, 0, cardId);
      } else {
        to.cards.push(cardId);
      }
      await to.save();
    }

    // Logs da atividade

    if (fromId !== toId) {
      const user = await User.findById(req.user.id);
      const kambam = await Kambam.findById(kambamId);
      const card = await Card.findById(cardId);

      kambam.activity.unshift({
        text: `${user.name} moveu '${card.title}' para '${from.title}' o '${to.title}'`,
      });

      await kambam.save();
    }

    res.send({ cardId, from, to });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Adicionar/Remover membro

router.put('/addMember/:add/:cardId/:userId', [auth, member], async (req, res) => {
  try {
    const { cardId, userId } = req.params;
    const card = await Card.findById(cardId);
    const user = await User.findById(userId);

    if (!card || !user) {
      return res.status(404).json({ msg: 'Card/usuário não encotrado' });
    }

    const add = req.params.add === 'true';
    const members = card.members.map((member) => member.user);
    const index = members.indexOf(userId);

    if ((add && members.includes(userId)) || (!add && index === -1)) {
      return res.json(card);
    }

    if (add) {
      card.members.push({ user: user.id, name: user.name, avatar: user.avatar });
    } else {
      card.members.splice(index, 1);
    }
    await card.save();

    // Logs da atividade

    const kambam = await Kambam.findById(req.header('kambamId'));
    kambam.activity.unshift({
      text: `${user.name} ${add ? 'se juntou a' : 'saiu de'} '${card.title}'`,
    });
    await kambam.save();

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Remover card

router.delete('/:taskId/:id', [auth, member], async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    const task = await Task.findById(req.params.taskId);

    if (!card || !task) {
      return res.status(404).json({
        msg: 'Task/card não encontrada'
      });
    }

    task.cards.splice(task.cards.indexOf(req.params.id), 1);
    await task.save();
    await card.remove();

    // Logs da atividade

    const user = await User.findById(req.user.id);
    const kambam = await Kambam.findById(req.header('kambamId'));

    kambam.activity.unshift({
      text: `${user.name} deletado '${card.title}' por '${task.title}'`,
    });

    await kambam.save();

    res.json(req.params.id);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro do servidor');
  }
});

module.exports = router;