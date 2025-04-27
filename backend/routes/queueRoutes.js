const express = require('express');
const { getMyQueues, addToQueue } = require('../controllers/queueController');
const router = express.Router();

router.get('/', getMyQueues);
router.get('/test', (req, res) => res.json({ message: 'Queue API working' }));
router.post('/', addToQueue);

module.exports = router;