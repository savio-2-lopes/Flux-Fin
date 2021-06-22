const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const member = require('../middleware/member');

const User = require('../models/User');
const Kambam = require('../models/Kambam');
const Task = require('../models/Task');

// Adicionar a task

router.post('/',
  [auth, member, [check('title', 'Titulo é obrigatório').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const title = req.body.title;
      const kambamId = req.header('kambamId');

      // Criar e salvar a task

      const newTask = new Task({ title });
      const task = await newTask.save();

      // Atribuir a Tasks ao Kambam

      const kambam = await Kambam.findById(kambamId);
      kambam.tasks.push(task.id);

      // Logs da atividade

      const user = await User.findById(req.user.id);

      kambam.activity.unshift({
        text: `${user.name} adicionado '${title}' ao kambam`,
      });
      await kambam.save();

      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  }
);

// Obtenha todas as tasks de um kambam

router.get('/kambamTasks/:kambamId', auth, async (req, res) => {
  try {
    const kambam = await Kambam.findById(req.params.kambamId);
    if (!kambam) {
      return res.status(404).json({ msg: 'Kambam não encontrado' });
    }

    const tasks = [];
    for (const taskId of kambam.tasks) {
      tasks.push(await Task.findById(taskId));
    }

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Listar tasks por id

router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task não encontrada' });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Editar o título de uma task

router.patch('/rename/:id',
  [auth, member, [check('title', 'Titulo é obrigatório').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ msg: 'Task não encontrado' });
      }

      task.title = req.body.title;
      await task.save();

      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  }
);

// Arquivar/desarquivar task

router.patch('/archive/:archive/:id', [auth, member], async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task não encontrada' });
    }

    task.archived = req.params.archive === 'true';
    await task.save();

    // Logs da atividade

    const user = await User.findById(req.user.id);
    const kambam = await Kambam.findById(req.header('kambamId'));
    kambam.activity.unshift({
      text: task.archived
        ? `${user.name} arquivou a task '${task.title}'`
        : `${user.name} task '${task.title}' enviada para o kambam`,
    });
    await kambam.save();

    res.json(kambam);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// Mover task

router.patch('/move/:id', [auth, member], async (req, res) => {
  try {
    const toIndex = req.body.toIndex ? req.body.toIndex : 0;
    const kambamId = req.header('kambamId');
    const kambam = await Kambam.findById(kambamId);
    const taskId = req.params.id;

    if (!taskId) {
      return res.status(404).json({ msg: 'Task não encontrada' });
    }

    kambam.tasks.splice(kambam.tasks.indexOf(taskId), 1);
    kambam.tasks.splice(toIndex, 0, taskId);
    await kambam.save();

    res.send(kambam.tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;