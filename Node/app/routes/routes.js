const express = require('express');
const router = express.Router();

const userController = require('../resources/user');
const coursController = require('../resources/cours');

// User
router.post('/user', userController.insertUser);

// Cours
router.post('/cours', coursController.createCours);
router.get('/cours', coursController.getAllCours);
router.get('/cours/:id', coursController.getCoursById);

// Topics

// Posts

module.exports = router;
