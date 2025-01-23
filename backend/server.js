// Importando dependências
const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database'); // Importa a configuração do banco de dados
const profissionalRoutes = require('./routes/profissionalRoutes'); // Importa as rotas do profissional

// Inicializa o app do Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rota para a raiz, serve o arquivo index.html da pasta frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Rotas de API
app.use('/api', profissionalRoutes);

// Conectar ao banco de dados e iniciar o servidor
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida!');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

app.use(express.static(path.join(__dirname, 'frontend')));

