import React from 'react'
import "./Footer.css"
import logo from "../../../images/smart-bg.png"
import { Link } from "react-router-dom";



const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>SMART MART</h4>
        <Link to={"/"}><p>Home</p></Link>
        <Link to={"/products"}><p>Products</p></Link>
        <Link to={"/about"}><p>About Us</p></Link>
        <Link to={"/contact"}><p>Contact Us</p></Link>

      </div>

      <div className="midFooter">
        {/* <h1>ECOMMERCE.</h1> */}
        <img src={logo} alt='SMART MART' width={"50%"}/>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2024 &copy; smartmart</p>
        <a href='https://github.com/rajab-dev/'><p>developed by @rajab-dev</p></a>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://instagram.com/the_smart_mart__">Instagram</a>
        <a href="https://github.com/rajab-dev/">GitHub</a>
        {/* <a href="">Facebook</a> */}
      </div>
    </footer>
  )
}

export default Footer