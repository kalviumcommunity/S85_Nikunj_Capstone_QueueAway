const express = require('express');
const { getAllUsers, createUser, updateUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', getAllUsers);
router.post('/', createUser);      // <-- Add this line for POST /api/users
router.put('/:id', updateUser);

module.exports = router;