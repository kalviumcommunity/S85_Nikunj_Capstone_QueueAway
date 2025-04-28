const express = require('express');
const { getAllShops, createShop, updateShop, getShopById } = require('../controllers/shopController');
const router = express.Router();

router.get('/', getAllShops);           // GET all shops
router.get('/:id', getShopById);        // GET shop by ID
router.post('/', createShop);           // POST a new shop
router.put('/:id', updateShop);         // PUT (update) a shop by ID

module.exports = router;