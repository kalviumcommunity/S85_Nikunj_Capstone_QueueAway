const User = require('../models/User');
const Queue = require('../models/Queue');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hash });
  await user.save();
  res.status(201).json({ msg: 'User created', user: { id: user._id, name: user.name, email: user.email } });
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'User not found' });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, type: 'user' }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
};

// Get all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

// Get user profile (with bookings)
exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password').populate({
    path: 'bookings',
    populate: { path: 'shopId', select: 'name address' }
  });
  res.json(user);
};

// Update user
exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  const update = { name, email };
  if (password) update.password = await bcrypt.hash(password, 10);
  const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.json(user);
};

// Delete user
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.json({ msg: 'User deleted' });
};