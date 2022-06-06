const express = require('express');
const router = express.Router();

const CommentController = require('../controller/CommentController');
const UserCheck = require('../middleware/userCheck');

router.get('/', UserCheck.checkLoggedIn, UserCheck.isAdmin, CommentController.all);
router.get('/:commentid', UserCheck.checkLoggedIn, UserCheck.checkProject, CommentController.one);
router.post('/add/:projectid/:taskid', UserCheck.checkLoggedIn, UserCheck.checkProject, CommentController.addComment);

export default router;
