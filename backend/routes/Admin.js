const express = require('express');
const {AuthenticateUser, authorizeRole} = require('../middlewares/authenticate');
const { GetallUser, singleUser, updateUser, DeleteUser } = require('../controllers/AdminContoller');
const router = express.Router();

router.route('/admin/User').get(AuthenticateUser,authorizeRole("admin"),GetallUser);
router.route('/admin/User/:id').get(AuthenticateUser,authorizeRole("admin"),singleUser);
router.route('/admin/User/:id').put(AuthenticateUser,authorizeRole("admin"),updateUser);
router.route('/admin/User/:id').delete(AuthenticateUser,authorizeRole("admin"),DeleteUser);

module.exports = router;