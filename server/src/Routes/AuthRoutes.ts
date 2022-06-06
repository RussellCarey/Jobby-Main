const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');
const UserCheck = require('../middleware/userCheck');

router.post('/login', AuthController.login);
router.post('/logout', UserCheck.checkLoggedIn, AuthController.logout);
router.post('/check', UserCheck.checkLoggedIn, AuthController.isUserLoggedIn);
router.post('/forgottenPassword', AuthController.forgottenPassword);
router.post('/signup', AuthController.signup);
router.get('/verifyAccount/:verificationtoken', AuthController.authorize);

export default router;
