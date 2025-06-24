const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  address: String,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  queues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Queue' }]
});

module.exports = mongoose.model('Business', businessSchema);