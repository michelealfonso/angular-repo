const express = require('express');
const router = express.Router();
const listController = require('../controllers/listsController');

router.get('/:boardId', listController.getLists);
router.post('/', listController.createLists);
router.put('/', listController.updateLists);
router.delete('/', listController.deleteLists);

module.exports = router;