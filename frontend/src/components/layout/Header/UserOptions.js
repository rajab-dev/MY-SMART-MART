import React, { useState } from 'react';
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@mui/lab";
import Backdrop from "@mui/material/Backdrop"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";




const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);

const [open, setOpen] = useState(false)
const navigate = useNavigate();
const dispatch = useDispatch();

const options = [
  {icon:<ListAltIcon />, name:"Orders",func:orders},
  {icon:<PersonIcon />, name:"Profile",func:account},
  {
    icon: (
      <ShoppingCartIcon
        style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
      />
    ),
    name: `Cart(${cartItems.length})`,
    func: cart,
  },
  {icon:<ExitToAppIcon />, name:"Logout",func:logoutUser},
]

if(user.role === "admin"){
  
  options.unshift({icon:<DashboardIcon />, name:"Dashboard",func:dashboard},)
}

function dashboard(){
   navigate("/admin/dashboard")
}

function cart(){
  navigate("/cart")
}

function orders(){
  navigate("/orders")
} 


function account(){ 
   navigate("/account")
}

function logoutUser() {
   dispatch(logout())
   toast.success("LogOut Successfully")
}

  return (
    <>
      <Backdrop open={open}  style={{zIndex:"10"}} /> 
      <SpeedDial
       ariaLabel='SpeedDial tooltip example' 
       onClose={()=>setOpen(false)}
       onOpen={()=>setOpen(true)}
       open={ open }
       direction='down'
       className='speedDial'
       style={{zIndex:"11"}}
       icon={
        <img  className='speedDialIcon'
          src={user.avatar.url ? user.avatar.url : "/Profile.png"}
          alt='Profile'
        />
       }
      
      >

      

      {options.map((item)=>(
        <SpeedDialAction 
        key={item.name} 
        icon={item.icon} 
        tooltipTitle={item.name} 
        tooltipOpen={window.innerWidth <= 600 ? true : false}
        onClick={item.func} />
      ))}

    </SpeedDial>
    </>
  )
}

export default UserOptions