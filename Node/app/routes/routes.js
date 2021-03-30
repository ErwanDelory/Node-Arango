const express = require('express');
const router = express.Router();

const userController = require('../resources/user');
const coursController = require('../resources/cours');

// User
router.post('/user', userController.insertUser);
router.delete('/delete/:id', userController.deleteUser);
router.put('/edituser/:id', userController.editUser);

// Cours
router.get('/cours', coursController.getAllCours);
router.get('/cours/:id', coursController.getCoursById);
router.get('/coursalpha', coursController.getAllCoursAlpha);
router.post('/addcours', coursController.createCours);
router.get('/courspromo', coursController.getCoursByPromo);
router.get('/courspromoalpha', coursController.getCoursByPromoAlpha);
router.get('/coursuser/:id', coursController.getCoursByUser);

module.exports = router;
