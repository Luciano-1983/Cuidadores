const Profissional = require('../models/Profissional');
const { Op } = require('sequelize'); // Para busca com filtros

class ProfissionalController {
  // Cadastrar um profissional
  static async cadastrar(req, res) {
    try {
      const { nome, especialidade, registroProfissional, endereco, telefone, email, disponibilidade } = req.body;

      // Validação básica
      if (!nome || !especialidade || !registroProfissional || !endereco || !telefone || !email) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
      }

      const novoProfissional = await Profissional.create({
        nome,
        especialidade,
        registroProfissional,
        endereco,
        telefone,
        email,
        disponibilidade,
      });

      res.status(201).json(novoProfissional);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao cadastrar profissional.', details: error.message });
    }
  }

  // Buscar profissionais com filtros
  static async listar(req, res) {
    try {
      const { especialidade, cidade } = req.query;

      // Construir filtro condicional
      const filtros = {};
      if (especialidade) filtros.especialidade = { [Op.like]: `%${especialidade}%` };
      if (cidade) filtros.endereco = { [Op.like]: `%${cidade}%` };

      const profissionais = await Profissional.findAll({ where: filtros });

      res.status(200).json(profissionais);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar profissionais.', details: error.message });
    }
  }

  // Detalhes de um profissional específico
  static async detalhes(req, res) {
    try {
      const profissional = await Profissional.findByPk(req.params.id);
      if (!profissional) {
        return res.status(404).json({ error: 'Profissional não encontrado.' });
      }
      res.status(200).json(profissional);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar detalhes do profissional.', details: error.message });
    }
  }
}

module.exports = ProfissionalController;
