const express = require('express');
const { newOrder, getsingleOrder, myorder, orders, updateOrder, deleteOrder } = require('../controllers/OrderController');
const router =  express.Router();
const {AuthenticateUser, authorizeRole} = require('../middlewares/authenticate')

router.route('/order/new').post(AuthenticateUser,newOrder);
router.route('/order/:id').get(AuthenticateUser,getsingleOrder);
router.route('/myorders').get(AuthenticateUser,myorder);

//admin routes
router.route('/orders').get(AuthenticateUser,authorizeRole('admin'),orders);
router.route('/orders/:id').put(AuthenticateUser,authorizeRole('admin'),updateOrder);
router.route('/orders/:id').delete(AuthenticateUser,authorizeRole('admin'),deleteOrder);

module.exports = router;