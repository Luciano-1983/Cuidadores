const { Sequelize } = require('sequelize'); // Certifique-se de importar o Sequelize

// Configurações de conexão com o banco
const sequelize = new Sequelize('cuidadores_db', 'postgres', 'senha123', {
  host: 'localhost', // Use o host do banco de dados
  dialect: 'postgres', // Especifica o banco de dados como PostgreSQL
  logging: console.log, // Opcional: log das queries no console
});

// Testando a autenticação
sequelize.authenticate()
  .then(() => {
    console.log('Conexão autenticada com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao autenticar a conexão:', error.message);
  });

module.exports = sequelize; // Exporta o sequelize para ser usado em outros arquivos
