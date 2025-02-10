const express = require('express')
const UserController = require('../../controller/user-controller');
const {AuthValidatorMiddleware} = require('../../middleware/index')

const router = express.Router();

router.post('/signup',
    AuthValidatorMiddleware.validateUserSignup, 
    UserController.create);

router.post('/signin',
    AuthValidatorMiddleware.validateUserSignup,
    UserController.signIn);

router.get('/isAuthenticated', UserController.isAuthenticated);

router.get('/isAdmin',
    AuthValidatorMiddleware.validateAdminRequest,
     UserController.isAdmin
    )

module.exports = router