import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import tempImage from "../../images/camera 1.jpg"

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      {/* <img src={tempImage} alt="ssa" /> */}
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: Rs.${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;