const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cardController');

// Rota para listar todas as cartas (com suporte a filtro de idioma ?lang=pt ou ?lang=en)
router.get('/', CardController.getCards);

// Rota para pesquisar cartas por parâmetros (ex: /api/cards/search?q=nome&type=champion)
router.get('/search', CardController.searchCards);

// Rota para buscar uma carta específica por ID ou número
router.get('/:id', CardController.getCardById);

module.exports = router;
