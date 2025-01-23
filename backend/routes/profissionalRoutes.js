const express = require('express');
const ProfissionalController = require('../controllers/ProfissionalController');
const router = express.Router();

// Rotas para profissionais
router.post('/profissionais', ProfissionalController.cadastrar); // Cadastro
router.get('/profissionais', ProfissionalController.listar); // Busca com filtros
router.get('/profissionais/:id', ProfissionalController.detalhes); // Detalhes

module.exports = router;
