const express = require('express');
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserProfile
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;