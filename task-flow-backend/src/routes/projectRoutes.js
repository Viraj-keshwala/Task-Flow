const router = require('express').Router();
const projCtrl = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router
  .route('/')
  .get(authorize('admin','manager','team'), projCtrl.getProjects)
  .post(authorize('admin','manager'), projCtrl.createProject);

router
  .route('/:id')
  .put(authorize('admin','manager'), projCtrl.updateProject)
  .delete(authorize('admin'), projCtrl.deleteProject);

module.exports = router;
