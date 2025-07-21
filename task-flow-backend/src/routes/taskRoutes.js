const router = require('express').Router();
const taskCtrl = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router
  .route('/')
  .get(authorize('admin','manager','team'), taskCtrl.getTasks)
  .post(authorize('admin','manager'), taskCtrl.createTask);

router
  .route('/:id')
  .put(authorize('admin','manager','team'), taskCtrl.updateTask)
  .delete(authorize('admin','manager'), taskCtrl.deleteTask);

module.exports = router;
