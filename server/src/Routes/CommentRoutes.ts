const express = require('express');
const router = express.Router();
const UserCheck = require('../middleware/userCheck');
const CommentController = require('../controller/CommentController');

router.get('/', UserCheck.checkLoggedIn, UserCheck.isAdmin, CommentController.all);
router.get('/:commentid', UserCheck.checkLoggedIn, UserCheck.checkProject, CommentController.one);
router.post('/add/:projectid/:taskid', UserCheck.checkLoggedIn, UserCheck.checkProject, CommentController.addComment);

export default router;
