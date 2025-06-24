const Business = require('../models/Business');
const Queue = require('../models/Queue');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register business
exports.createBusiness = async (req, res) => {
  const { name, email, password, phone, address, description } = req.body;
  const exists = await Business.findOne({ email });
  if (exists) return res.status(400).json({ msg: 'Business already exists' });
  const hash = await bcrypt.hash(password, 10);
  const business = new Business({ name, email, password: hash, phone, address, description });
  await business.save();
  res.status(201).json({ msg: 'Business created', business: { id: business._id, name: business.name, email: business.email } });
};

// Login business
exports.loginBusiness = async (req, res) => {
  const { email, password } = req.body;
  const business = await Business.findOne({ email });
  if (!business) return res.status(400).json({ msg: 'Business not found' });
  const isMatch = await bcrypt.compare(password, business.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  const token = jwt.sign({ id: business._id, type: 'business' }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, business: { id: business._id, name: business.name, email: business.email } });
};

// Get all businesses
exports.getAllBusinesses = async (req, res) => {
  const businesses = await Business.find().select('-password');
  res.json(businesses);
};

// Get business profile (with queues)
exports.getBusinessProfile = async (req, res) => {
  const business = await Business.findById(req.business._id).select('-password').populate({
    path: 'queues',
    populate: { path: 'shopId', select: 'name address' }
  });
  res.json(business);
};

// Update business
exports.updateBusiness = async (req, res) => {
  const { name, email, password, phone, address, description } = req.body;
  const update = { name, email, phone, address, description };
  if (password) update.password = await bcrypt.hash(password, 10);
  const business = await Business.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
  if (!business) return res.status(404).json({ msg: 'Business not found' });
  res.json(business);
};

// Delete business
exports.deleteBusiness = async (req, res) => {
  const business = await Business.findByIdAndDelete(req.params.id);
  if (!business) return res.status(404).json({ msg: 'Business not found' });
  res.json({ msg: 'Business deleted' });
};