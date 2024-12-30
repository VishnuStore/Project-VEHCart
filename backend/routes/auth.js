const express = require('express');
const { registerUser, userLogin, userLogout, ForgetPassword, resetPassword } = require('../controllers/Authcontroller');
const { GetUserProfile, changePassword, UpdateProfile}=require('../controllers/profileController')
const router = express.Router();
const {AuthenticateUser} = require('../middlewares/authenticate')

router.route('/register').post(registerUser);
router.route('/login').post(userLogin);
router.route('/logout').get(userLogout);
router.route('/password/forget').post(ForgetPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/myprofile').get(AuthenticateUser ,GetUserProfile);
router.route('/password/change').put(AuthenticateUser ,changePassword);
router.route('/update/profile').put(AuthenticateUser ,UpdateProfile);

module.exports = router;