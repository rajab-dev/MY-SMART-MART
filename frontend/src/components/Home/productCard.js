import React from "react";
import { Link } from "react-router-dom";
// import { Rating } from "@material-ui/lab";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import image from "../../images/camera 1.jpg";
import "./product.css"

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {/* {" "} */}
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`Rs.${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
