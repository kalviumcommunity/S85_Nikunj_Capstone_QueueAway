const Queue = require('../models/Queue');
const Shop = require('../models/Shop');
const User = require('../models/User');
const Business = require('../models/Business');

// Get all queues for a user
exports.getMyQueues = async (req, res) => {
  const userId = req.user ? req.user._id : req.query.userId;
  if (!userId) return res.status(400).json({ message: "User not specified" });
  const queues = await Queue.find({ userId }).populate('shopId');
  res.json(queues);
};

// Get queue by ID
exports.getQueueById = async (req, res) => {
  const queue = await Queue.findById(req.params.id).populate('shopId');
  if (!queue) return res.status(404).json({ message: "Queue not found" });
  res.json(queue);
};

// Add to queue
exports.addToQueue = async (req, res) => {
  const userId = req.user ? req.user._id : req.body.userId;
  const { shopId, date, time } = req.body;
  const shop = await Shop.findById(shopId);
  if (!shop) return res.status(404).json({ message: "Shop not found" });

  const count = await Queue.countDocuments({ shopId, date, time });
  const position = count + 1;
  const waitTime = `${position * 10} mins`;

  const queue = new Queue({
    userId,
    shopId,
    shopName: shop.name,
    shopAddress: shop.address,
    date,
    time,
    position,
    waitTime
  });
  await queue.save();

  // Add queue to user's bookings
  if (userId) {
    await User.findByIdAndUpdate(userId, { $push: { bookings: queue._id } });
  }

  // Add queue to business's queues if needed (if you have businessId)
  res.status(201).json(queue);
};

// Update queue
exports.updateQueue = async (req, res) => {
  const { date, time, position } = req.body;
  const queue = await Queue.findByIdAndUpdate(
    req.params.id,
    { date, time, position },
    { new: true }
  );
  if (!queue) return res.status(404).json({ message: "Queue not found" });
  res.json(queue);
};

// Delete queue
exports.deleteQueue = async (req, res) => {
  const queue = await Queue.findByIdAndDelete(req.params.id);
  if (!queue) return res.status(404).json({ message: "Queue not found" });
  res.json({ message: "Queue deleted" });
};