const express = require('express');
const router = express.Router();
const CardController = require('../controllers/cardController');

router.get('/', CardController.getCards);
router.get('/search', CardController.searchCards);
router.get('/:id', CardController.getCardById);

module.exports = router;
