import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import ProductCard from "../Home/productCard";
import Loader from '../layout/Loader/Loader';
import { useParams } from 'react-router-dom';
import  Pagination  from "react-js-pagination";
import { Slider,Typography } from '@mui/material';
import toast from "react-hot-toast";
import MetaData from '../layout/MetaData';
// import Typography from '@mui/material';

const categories = ["All","laptop","samsung","mobiles","electronics"]


const Products = () => {

const dispatch = useDispatch();
const {products,loading,error,resultPerPage,productsCount,} = useSelector((state) => state.products);

const { keyword } = useParams();

const [currentPage, setCurrentPage] = useState(1);
const [price, setPrice] = useState([0,25000]);
const [category, setCategory] = useState();
const [ratings, setRatings] = useState(0);

const setCurrentPageNo = ( e ) => {

  setCurrentPage( e )
}

const priceHandler = (event, newPrice) => {
  setPrice(newPrice)
}


// let count = filteredProductsCount;


 useEffect(() => {

  
  
    dispatch(getProduct(keyword,currentPage,price,category,ratings));
  
 }, [dispatch,keyword,currentPage,price,category,ratings]);

 useEffect(() => {
  
  if(error){
    toast.error(error);
    dispatch(clearErrors());
  }

 }, [error]);

  return (
    <>
    {loading ? <Loader /> : 
    
    <>
    <MetaData title="PRODUCTS --SMART MART" />
     <h2 className='productsHeading'>Products</h2>
     <div className='products'>
      {products && 
       products.map((product)=>(
        <ProductCard key={product._id}  product={product} />
       ))
      }
     </div>

     <div className="filterBox">


            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

    <Typography>Categories</Typography>
       <ul className="categoryBox">
          {categories.map((category) => {

            if(category === "All"){
              return(<li
              className="category-link"
                key={category}
                onClick={() => setCategory()}
                >
                {category}
                </li>)
            }else{
              return(<li
              className="category-link"
                key={category}
                onClick={() => setCategory(category)}
                >
                {category}
                </li>)
            }

            
          })}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>

      </div>




     {resultPerPage <= products?.length && (
     <div className='paginationBox'>
      <Pagination 
        activePage={currentPage}
        itemsCountPerPage={resultPerPage}
        totalItemsCount={productsCount}
        onChange={setCurrentPageNo}
        nextPageText="Next"
        prevPageText="Prev"
        firstPageText="1st"
        lastPageText="Last"
        itemClass="page-item"
        linkClass="page-link"
        activeClass="pageItemActive"
        activeLinkClass="pageLinkActive"
      />
     </div> )}
    </> }
    
      
    </>
  )
}

export default Products