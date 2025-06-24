const Shop = require('../models/Shop');

exports.getAllShops = async (req, res) => {
  const shops = await Shop.find();
  res.json(shops);
};

exports.getShopById = async (req, res) => {
  const shop = await Shop.findById(req.params.id);
  if (!shop) return res.status(404).json({ message: 'Shop not found' });
  res.json(shop);
};

exports.createShop = async (req, res) => {
  const { name, address, waitTime } = req.body;
  const shop = new Shop({ name, address, waitTime });
  await shop.save();
  res.status(201).json(shop);
};

exports.updateShop = async (req, res) => {
  const { name, address, waitTime } = req.body;
  const shop = await Shop.findByIdAndUpdate(
    req.params.id,
    { name, address, waitTime },
    { new: true }
  );
  if (!shop) return res.status(404).json({ message: 'Shop not found' });
  res.json(shop);
};

exports.deleteShop = async (req, res) => {
  const shop = await Shop.findByIdAndDelete(req.params.id);
  if (!shop) return res.status(404).json({ message: "Shop not found" });
  res.json({ message: "Shop deleted" });
};