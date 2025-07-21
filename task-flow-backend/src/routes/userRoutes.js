const router = require('express').Router();
const userCtrl = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');
const User = require('../models/User');

// 🔐 All routes below require authentication
router.use(protect);

// ✅ Route to get all team members (for project/task creation dropdown)
router.get('/team', async (req, res, next) => {
  try {
    const teamMembers = await User.find({ role: 'team' }).select('_id username');
    res.json(teamMembers);
  } catch (err) {
    next(err);
  }
});

// Admin-only routes
router.get('/', authorize('admin'), userCtrl.getAllUsers);
router.delete('/:id', authorize('admin'), userCtrl.deleteUser);

module.exports = router;
