const express = require('express');
const router = express.Router();

const UserController = require('../controller/UserController');
const ImageController = require('../controller/ImageController');
const UserCheck = require('../middleware/userCheck');

router.get('/', UserCheck.isAdmin, UserController.all);
router.get('/:userid', UserCheck.checkLoggedIn, UserController.one);
router.post('/userimage', UserCheck.checkLoggedIn, ImageController.uploadAll, ImageController.uploadUserImage, UserController.updateImage);

router.post('/search', UserCheck.checkLoggedIn, UserController.allLike);
router.get('/comments', UserCheck.checkLoggedIn, UserController.comments);
router.get('/tasks', UserCheck.checkLoggedIn, UserController.tasks);
router.post('/projects', UserCheck.checkLoggedIn, UserController.projects);
router.get('/created_tasks', UserCheck.checkLoggedIn, UserController.createdTasks);

export default router;
