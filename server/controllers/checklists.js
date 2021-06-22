const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const member = require('../middleware/member');
const { check, validationResult } = require('express-validator');

const Card = require('../models/Card');

// Adicionar item ao checklist

router.post('/:cardId',
  [auth, member, [check('text', 'Texto é obrigatório').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const card = await Card.findById(req.params.cardId);
      if (!card) {
        return res.status(404).json({ msg: 'Card não encontrado' });
      }

      card.checklist.push({ text: req.body.text, complete: false });
      await card.save();

      res.json(card);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  }
);

// Editar o texto de um item da checklist

router.patch('/:cardId/:itemId',
  [auth, member, [check('text', 'Texto é obrigatório').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const card = await Card.findById(req.params.cardId);
      if (!card) {
        return res.status(404).json({ msg: 'Card não encontrado' });
      }

      card.checklist.find((item) => item.id === req.params.itemId).text = req.body.text;
      await card.save();

      res.json(card);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  }
);

// Completar/Não completar item da checklist

router.patch('/:cardId/:complete/:itemId', [auth, member], async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).json({ msg: 'Card não encontrada' });
    }

    card.checklist.find((item) => item.id === req.params.itemId).complete =
      req.params.complete === 'true';
    await card.save();

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Deletar item da checklist

router.delete('/:cardId/:itemId', [auth, member], async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).json({ msg: 'Card não encontrado' });
    }

    const index = card.checklist.findIndex((item) => item.id === req.params.itemId);
    if (index !== -1) {
      card.checklist.splice(index, 1);
      await card.save();
    }

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;