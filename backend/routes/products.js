const express = require('express');
const { getproduct, newProduct, singleProduct, updateProduct, deleteProduct, CreateReview, getReviews, deleteReview } = require('../controllers/productcontroller');
const {AuthenticateUser, authorizeRole} = require('../middlewares/authenticate')
const router = express.Router();
router.route('/products').get(getproduct);
router.route('/product/:id').get(singleProduct);
router.route('/product/:id').put(updateProduct);
router.route('/product/:id').delete(deleteProduct);
router.route('/review').put(AuthenticateUser,CreateReview)
router.route('/reviews').get(getReviews)
router.route('/review').delete(deleteReview)
//Admin:create Product
router.route('/product/new').post(AuthenticateUser,authorizeRole('admin'),newProduct);
module.exports = router;