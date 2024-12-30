const express = require('express');
const { getproduct, newProduct, singleProduct, updateProduct, deleteProduct } = require('../controllers/productcontroller');
const {AuthenticateUser, authorizeRole} = require('../middlewares/authenticate')
const router = express.Router();
router.route('/products').get(AuthenticateUser,getproduct);
router.route('/product/:id').get(singleProduct);
router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct);

//Admin:create Product
router.route('/product/new').post(AuthenticateUser,authorizeRole('admin'),newProduct);
module.exports = router;