import React from 'react'
import { ReactNavbar } from "overlay-navbar"
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
// import logo from "../../../images/smart4.png"
// import logo from "../../../images/camera 1.jpg"
import logo from "../../../images/cart.png"


const options = {
  burgerColor:"gray",
  burgerColorHover: "#eb4034",
  logoWidth: "5vw",
  logoHeight:"9vh",
  navColor1: "white",
  logo,
  // logoTransition:"2",
  logoHoverSize: "10px",
  logoHoverColor: "sky",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIcon:true,
  SearchIconElement:FaSearch,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  profileIcon:true,
  ProfileIconElement:CgProfile,
  searchIconColorHover: "#eb4034",
  cartIcon:true,
  CartIconElement:FaShoppingCart,
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};



const Header = () => {
  return (
    <ReactNavbar {...options} />
  )
}

export default Header