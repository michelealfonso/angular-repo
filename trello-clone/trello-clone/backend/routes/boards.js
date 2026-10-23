const express = require('express');
const router = express.Router();
const boardsController = require('../controllers/boardsController');

router.get('/', boardsController.getBoards);
router.post('/', boardsController.createBoards);
router.put('/', boardsController.updateBoards);
router.delete('/', boardsController.deleteBoards);

module.exports = router;