import React, { Fragment, useEffect } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from "../../actions/orderAction.js";
import toast from "react-hot-toast";


const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const navigate = useNavigate();



  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // const shippingCharges = subtotal > 1000 ? 0 : 200;
  const shippingCharges = 0;

  // const tax = subtotal * 0.18;
  const tax = 0;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
    };
   const payId=user._id+(Date.now()*60*60*1000)
    order.paymentInfo = {
      id: payId,
      status: "UnPaid",
    };

    dispatch(createOrder(order))
    localStorage.setItem("cartItems", JSON.stringify([]))
    navigate("/success");




  };

  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch(clearErrors())
    }
}, [dispatch,error]);

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X Rs.{item.price} ={" "}
                      <b>Rs.{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>Rs.{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>Rs.{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>Rs.{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>Rs.{totalPrice}</span>
            </div>

            <button onClick={proceedToPayment}>Place Order</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
