const express = require('express');
const { getAllShops, createShop } = require('../controllers/shopController');
const router = express.Router();
router.get('/', getAllShops);
module.exports = router;