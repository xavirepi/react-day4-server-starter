const mongoose = require('mongoose');
const { all } = require('../app');
const Project = require('../models/project-model');
const Task = require('../models/task-model');

module.exports.createProject = (req, res, next) => {
    console.log('req.body project', req.body);
    
    const { title, description } = req.body;
    Project.create({ title, description, tasks: [] })
        .then(response => res.json(response))
        .catch(err => res.json(err));
}

module.exports.getAllProjects = (req, res, next) => {
    Project.find()
        .populate('tasks')
        .then(allTheProjects => res.json(allTheProjects))
        .catch(err => res.json(err));
}

module.exports.getOneProject = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Please, provide a valid id.' });
        return;
    }

    Project.findById(req.params.id)
        .populate('tasks')
        .then(project => res.status(200).json(project))
        .catch(err => res.json(err));
}

module.exports.updateProject = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Please, provide a valid id.' });
        return;
    }

    Project.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ message: `Project with id ${req.params.id} successfully updated.` }))
        .catch(err => res.json(err));
}

module.exports.deleteProject = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Please, provide a valid id.' });
        return;
    }

    Project.findByIdAndRemove(req.params.id)
        .then(() => res.json({ message: `Project with id ${req.params.id} successfully removed.`}))
        .catch(err => res.json(err));
}