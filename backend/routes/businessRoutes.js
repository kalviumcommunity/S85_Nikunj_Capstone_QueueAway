const express = require('express');
const {
  getAllBusinesses,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  loginBusiness,
  getBusinessProfile
} = require('../controllers/businessController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getAllBusinesses);
router.post('/', createBusiness);
router.post('/login', loginBusiness);
router.get('/profile', authMiddleware, getBusinessProfile);
router.put('/:id', updateBusiness);
router.delete('/:id', deleteBusiness);

module.exports = router;