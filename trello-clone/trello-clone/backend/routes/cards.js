const express = require('express');
const router = express.Router();
const cardsController = require('../controllers/cardsController');

router.get('/list/:listId', cardsController.getCards);
router.post('/', cardsController.createCards);
router.put('/:id', cardsController.updateCard);
router.delete('/:id', cardsController.deleteCards);

module.exports = router;