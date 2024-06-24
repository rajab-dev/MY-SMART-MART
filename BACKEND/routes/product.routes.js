const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getAllReviews, deleteReview, getAdminProducts } = require("../controllers/product.controller");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();


router.route("/products").get(getAllProducts)
router.route("/product/:id").get(getProductDetails)
router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)
router.route("/product/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)

router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts)

router.route("/review").put(isAuthenticatedUser,createProductReview)
router.route("/reviews")
.get(getAllReviews)
.delete(isAuthenticatedUser,deleteReview)

module.exports = router