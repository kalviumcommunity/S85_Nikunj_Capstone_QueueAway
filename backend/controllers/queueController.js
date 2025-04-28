const Queue = require('../models/Queue');
const Shop = require('../models/Shop');

exports.getMyQueues = async (req, res) => {
  // For demo, use a static userId
  const userId = "demoUser";
  const queues = await Queue.find({ userId });
  res.json(queues);
};

exports.addToQueue = async (req, res) => {
  const userId = "demoUser"; // Replace with real user logic
  const { shopId, date, time } = req.body;
  const shop = await Shop.findById(shopId);
  if (!shop) return res.status(404).json({ message: "Shop not found" });

  // Count current queue for this shop/date/time
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
  res.status(201).json(queue);
};