const Usuario = require('../models/Usuario');

class UsuarioController {
  static async cadastrar(req, res) {
    try {
      const novoUsuario = await Usuario.create(req.body);
      res.status(201).json(novoUsuario);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao cadastrar usuário.' });
    }
  }
}

module.exports = UsuarioController;
