const express = require('express');
const router = express.Router();

const ProjectController = require('../controller/ProjectController');
const ImageController = require('../controller/ImageController');

// Uses user on req obj and projectid from the body.
const UserCheck = require('../middleware/userCheck');

router.get('/', UserCheck.checkLoggedIn, UserCheck.checkProject, ProjectController.all);
router.get('/:projectid', UserCheck.checkLoggedIn, UserCheck.checkProject, ProjectController.one);
router.post('/new', UserCheck.checkLoggedIn, ImageController.uploadAll, ImageController.uploadProjectImages, ProjectController.saveNew);
router.delete('/:projectid', UserCheck.checkLoggedIn, ProjectController.remove);
router.patch('/:projectid/update', UserCheck.checkLoggedIn, UserCheck.checkProject, ProjectController.update);

router.get('/:projectid/comments', UserCheck.checkLoggedIn, UserCheck.checkProject, ProjectController.comments);
router.get('/:projectid/members', UserCheck.checkLoggedIn, UserCheck.checkProject, ProjectController.members);
router.get('/:projectid/tasks', UserCheck.checkLoggedIn, UserCheck.checkProject, ProjectController.tasks);
router.get('/:projectid/updates', UserCheck.checkLoggedIn, UserCheck.checkProject, ProjectController.updates);

router.post('/:projectid/addmember/:userid', UserCheck.checkLoggedIn, UserCheck.checkProject, ProjectController.addMember);
router.post('/:projectid/removemember/:userid', UserCheck.checkLoggedIn, UserCheck.checkProject, ProjectController.removeMember);

export default router;
