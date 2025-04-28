const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // For demo, use a static user or session
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  shopName: String,
  shopAddress: String,
  date: String,
  time: String,
  position: Number,
  waitTime: String
});

module.exports = mongoose.model('Queue', queueSchema);