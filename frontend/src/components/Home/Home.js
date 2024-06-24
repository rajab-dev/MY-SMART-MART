import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./productCard";
// import MetaData from "../layout/MetaData";
// import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction"
import toast from "react-hot-toast";



const Home = () => {


 const dispatch = useDispatch();
 
  const { loading, error, products } = useSelector((state) => state.products);

    
useEffect(() => {
 

dispatch(getProduct())


}, [dispatch]);

useEffect(() => {
  
  if(error){
    toast.error(error)
    dispatch(clearErrors());
  }

}, [error]);


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="SMART MART" />

          <div className="banner">
            <p></p>
            <h1></h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;


