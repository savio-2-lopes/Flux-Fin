const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conexão com o banco de dados
mongoose.connect('mongodb://localhost/fluxfin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
}, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Banco de dados MongoDB conectado com sucesso!')
  }
});

app.use(cors());
app.use(express.json());

// Definindo as rotas

app.use('/users', require('./controllers/users'));
app.use('/auth', require('./controllers/auth'));
app.use('/kambans', require('./controllers/kambans'));
app.use('/tasks', require('./controllers/tasks'));
app.use('/cards', require('./controllers/cards'));
app.use('/checklists', require('./controllers/checklists'));

app.listen(PORT, () => console.log('Parabéns\nServidor iniciado na porta http://localhost:' + PORT));
