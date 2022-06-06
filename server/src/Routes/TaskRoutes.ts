const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const UserCheck = require('../middleware/userCheck');

// ProjectID on all routes when we need to check if the user has that project (id)..
router.get('/', UserCheck.checkLoggedIn, UserCheck.isAdmin, TaskController.all);
router.post('/:projectid/:taskid', UserCheck.checkLoggedIn, UserCheck.checkProject, TaskController.one);
router.patch('/:projectid/:taskid', UserCheck.checkLoggedIn, UserCheck.checkProject, TaskController.update);
router.post('/:projectid/', UserCheck.checkLoggedIn, UserCheck.checkProject, TaskController.save);
router.delete('/:projectid/:taskid', UserCheck.checkLoggedIn, UserCheck.checkProject, TaskController.remove);
router.post('/:projectid/:taskid/changeTimes', UserCheck.checkLoggedIn, UserCheck.checkProject, TaskController.changeTimes);

// Task Members
router.post('/:projectid/:taskid/members', UserCheck.checkLoggedIn, UserCheck.checkProject, TaskController.members);
router.patch('/:projectid/:taskid/members', UserCheck.checkLoggedIn, UserCheck.checkProject, TaskController.removeMember);

// Task Updates
router.get('/:projectid/:taskid/updates', UserCheck.checkLoggedIn, UserCheck.checkProject, TaskController.updates);

// Task commments
router.get('/:projectid/:taskid/comments', UserCheck.checkLoggedIn, UserCheck.checkProject, TaskController.comments);

export default router;
