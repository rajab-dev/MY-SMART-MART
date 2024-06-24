const express = require("express");

const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const { processPayment, sendStripeApiKey } = require("../controllers/payment.controller");


router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports=router;