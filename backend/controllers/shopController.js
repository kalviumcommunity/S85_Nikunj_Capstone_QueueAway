const Shop = require('../models/Shop');

exports.getAllShops = async (req, res) => {
  const shops = await Shop.find();
  res.json(shops);
};