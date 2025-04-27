const Shop = require('../models/Shop');

exports.getAllShops = async (req, res) => {
  const shops = await Shop.find();
  res.json(shops);
};

exports.createShop = async (req, res) => {
  try {
    const { name, address, waitTime } = req.body;
    const shop = new Shop({ name, address, waitTime });
    await shop.save();
    res.status(201).json(shop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};