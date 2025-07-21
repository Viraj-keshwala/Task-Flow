const Project = require('../models/Project');

/* GET /api/projects  */
exports.getProjects = async (req, res, next) => {
  try {
    // admin gets all, manager gets created projects, team gets assigned
    let filter = {};
    if (req.user.role === 'manager') filter = { createdBy: req.user._id };
    if (req.user.role === 'team') filter = { members: req.user._id };

    const projects = await Project.find(filter)
      .populate('createdBy', 'username role')
      .populate('members', 'username role');

    res.json(projects);
  } catch (err) { next(err); }
};

/* POST /api/projects  */
exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create({
      ...req.body,
      createdBy: req.user._id
    });
    res.status(201).json(project);
  } catch (err) { next(err); }
};

/* PUT /api/projects/:id  */
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new:true });
    res.json(project);
  } catch (err) { next(err); }
};

/* DELETE /api/projects/:id  */
exports.deleteProject = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Project removed' });
  } catch (err) { next(err); }
};
