// import React, { useEffect, useState } from 'react'
// import Carousel from "react-material-ui-carousel";
// import "./ProductDetails.css";
// import { useSelector, useDispatch } from "react-redux";
// import { getProductDetails, clearErrors } from "../../actions/productAction"
// import toast from 'react-hot-toast';
// import { useParams } from 'react-router-dom';
// import Rating from '@mui/material/Rating';
// import Loader from '../layout/Loader/Loader';
// import ReviewCard from "./ReviewCard.js"
// import MetaData from '../layout/MetaData.js';
// import { addItemsToCart } from '../../actions/cartAction.js';



// const ProductDetails = () => {

//   const {product,loading,error} = useSelector((state) => state.productDetails)

//   const [quantity, setQuantity] = useState(1)


//   const options = {
//     value: 3.5 || product?.ratings,
//     readOnly: true,
//     precision: 0.5,
//   };

//   let { id } = useParams()
// const dispatch = useDispatch();
  
 


// const decreaseQuantity = () => {
//     if(quantity <= 1) return
//     const qty = quantity - 1;
//     setQuantity(qty)
// }


// const increaseQuantity = () => {
//    if(!(product.stock > quantity)) return
    
//    const qty = quantity + 1;
//    setQuantity(qty)
// }


// const addToCartHandler = () => {
//     dispatch(addItemsToCart(id,quantity))
//     toast.success("Item Added To Cart!!!🎉")
// }






//   useEffect(() => {

//     if(error){
//       toast.error(error);
//     // dispatch(clearErrors());

//     }
//       dispatch(getProductDetails(id))
    
//   }, [dispatch,error,id]);

  
  
//   return (
//     <>
//     {loading ? <Loader />:(
//     <>
//     <MetaData title={`${product?.name} --SMART MART`} />
//       <div className='ProductDetails'>
//         <div>
//           <Carousel>
//             {product  &&
//             product?.images?.map((item,i)=>(
//                <img style={{width:"100%"}} className="CarouselImage"
//                 key={item.url}
//                 src="https://blogger.googleusercontent.com/img/a/AVvXsEhqzeTOTJm2J-wrSe9kAj3DlAphY5RzFw3W4xf25OPT1AEktfD1Z70sYBclrMDeuD6jAeZzJPByXgH272iG3hxS7AGppznCwS1yzioR77m4J03rVdFLmL3TtLjVmUfaCk-p1D3Jdkj6fp-9U64Tnqg1EMKT9OXpclfVjKrYeqT-OJWdnq9JBh_8ZZKWpsM=w1600"
//                 alt={`${i} Slide`}
//                />
//             )) 
//             }
//           </Carousel>
//         </div>


//         <div>
//           <div className='detailsBlock-1'>
//             <h2>{product?.name}</h2>
//             <p>Product # {product?._id}</p>
//           </div>

//           <div className='detailsBlock-2'>
//             <Rating  {...options} />
//             <span>( { product?.numOfReviews } Reviews)</span>
//           </div>

//           <div className="detailsBlock-3">
//                 <h1>{`Rs.${product?.price}`}</h1>
//                 <div className="detailsBlock-3-1">
//                   <div className="detailsBlock-3-1-1">
//                     <button onClick={ decreaseQuantity }>-</button>
//                     <input readOnly type="number" value={quantity} />
//                     <button onClick={ increaseQuantity }>+</button>
//                   </div>
//                   <button
//                   disabled={product?.stock < 1 ? true : false}
//                   onClick={addToCartHandler}
//                     >
//                     Add to Cart
//                   </button>
//                 </div>

//                 <p>
//                   Status:
//                   <b className={product?.stock < 1 ? "redColor" : "greenColor"}>
//                     {product?.stock < 1 ? "OutOfStock" : "InStock"}
//                   </b>
//                 </p>
//               </div>

//               <div className="detailsBlock-4">
//                 Description : <p>{product?.description}</p>
//               </div>

//               <button className="submitReview">
//                 Submit Review
//               </button>
//         </div>
//       </div>

//       <h3 className="reviewsHeading">REVIEWS</h3>

//       {product?.reviews && product?.reviews[0] ? (
//             <div className="reviews">
//               {product?.reviews &&
//                 product?.reviews.map((review) => (
//                   <ReviewCard key={review._id} review={review} />
//                 ))}
//             </div>
//           ) : (
//             <p className="noReviews">No Reviews Yet</p>
//           )}
     


      
//     </>
//     )}
//     </>
    
//   )
// }

// export default ProductDetails











import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Rating from '@mui/material/Rating';
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const dispatch = useDispatch();

  let { id } = useParams();


  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img 
                    // style={{marginLeft:"20px"}}
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`Rs.${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
