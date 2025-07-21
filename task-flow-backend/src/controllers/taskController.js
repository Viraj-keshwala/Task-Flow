const Task = require('../models/Task');
const Project = require('../models/Project');

/* GET /api/tasks */
exports.getTasks = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user.role === 'manager') filter = { createdBy: req.user._id };
    if (req.user.role === 'team') filter = { assignedTo: req.user._id }; // ✅ key line

    const tasks = await Task.find(filter)
      .populate('assignedTo', 'username')
      .populate('projectId', 'name');

    res.json(tasks);
  } catch (err) {
    next(err);
  }
};



/* POST /api/tasks */
/*exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user._id,
      history: [{ status: 'to-do', updatedBy: req.user._id }]
    });
    res.status(201).json(task);
  } catch (err) { next(err); }
};*/
// POST /tasks
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, project, members } = req.body;

    const newTask = new Task({
      title,
      description,
      projectId: project,
      assignedTo: members,  // ✅ Must be array of user IDs
      createdBy: req.user._id
    });

    await newTask.save();
    res.status(201).json({ message: "Task created", task: newTask });

  } catch (err) {
    next(err);
  }
};


/* PUT /api/tasks/:id */
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // update fields
    Object.assign(task, req.body);
    // push to history if status changed
    if (req.body.status) {
      task.history.push({ status: req.body.status, updatedBy: req.user._id });
    }
    await task.save();
    res.json(task);
  } catch (err) { next(err); }
};

/* DELETE /api/tasks/:id */
exports.deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task deleted' });
  } catch (err) { next(err); }
};
