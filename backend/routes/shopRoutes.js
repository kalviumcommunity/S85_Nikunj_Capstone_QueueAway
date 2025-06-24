const express = require('express');
const {
  getAllShops,
  createShop,
  updateShop,
  getShopById,
  deleteShop
} = require('../controllers/shopController');
const router = express.Router();

router.get('/', getAllShops);
router.get('/:id', getShopById);
router.post('/', createShop);
router.put('/:id', updateShop);
router.delete('/:id', deleteShop);

module.exports = router;