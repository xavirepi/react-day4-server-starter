const mongoose = require('mongoose');
const Project = require('../models/project-model');
const Task = require('../models/task-model');

module.exports.getOneTask = (req, res, next) => {
    Task.findById(req.params.taskId)
        .then(task => res.json(task))
        .catch(err => res.json(err));
}

module.exports.createTask = (req, res, next) => {
    // const { title, description, projectId } = req.body
    console.log('req.body crateTask', req.params);
    Task.create({
        title: req.body.title,
        description: req.body.description,
        project: req.body.projectID
    })
        .then(createdTask => {
            return Project.findByIdAndUpdate(req.body.projectID, { $push: { tasks: createdTask._id }})
        })
        .then(response => res.json(response))
        .catch(err => res.json(err));
}

module.exports.updateTask = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Please, provide a valid id.' });
        return;
    }

    Task.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ message: `Task with id ${req.params.id} successfully updated.`}))
        .catch(err => res.json(err))
}

module.exports.deleteTask = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Please, provide a valid id.' });
        return;
    }

    Task.findByIdAndRemove(req.params.id)
        .then(() => res.json({ message: `Task with id ${req.params.id} successfully updated.` }))
        .catch(err => res.json(err));
}