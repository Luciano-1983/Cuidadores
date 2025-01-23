const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Profissional = sequelize.define('Profissional', {
  nome: { type: DataTypes.STRING, allowNull: false },
  especialidade: { type: DataTypes.STRING, allowNull: false },
  registroProfissional: { type: DataTypes.STRING, allowNull: false },
  endereco: { type: DataTypes.STRING, allowNull: false },
  telefone: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  disponibilidade: { type: DataTypes.STRING, allowNull: true },
});

module.exports = Profissional;
