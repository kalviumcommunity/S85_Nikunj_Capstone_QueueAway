const express = require('express');
const {
  getMyQueues,
  addToQueue,
  updateQueue,
  deleteQueue,
  getQueueById
} = require('../controllers/queueController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getMyQueues);
router.get('/:id', getQueueById);
router.post('/', authMiddleware, addToQueue);
router.put('/:id', updateQueue);
router.delete('/:id', deleteQueue);

module.exports = router;