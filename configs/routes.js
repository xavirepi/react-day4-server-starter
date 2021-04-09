const router = require('express').Router();
// const passport = require('passport');
const projectController = require('../controllers/project.controller');
const taskController = require('../controllers/task.controller');

// PROJECTS
router.post('/projects', projectController.createProject);
router.get('/projects', projectController.getAllProjects);
router.get('/projects/:id', projectController.getOneProject);
router.put('/projects/:id', projectController.updateProject);
router.delete('/projects/:id', projectController.deleteProject);

// TASKS
router.get('/projects/:projectId/tasks/:taskId', taskController.getOneTask);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;