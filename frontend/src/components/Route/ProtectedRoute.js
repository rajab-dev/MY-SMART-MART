// import React, { Fragment } from 'react'
// import { useSelector } from 'react-redux'
// import { Route, redirect } from 'react-router-dom'

// const ProtectedRoute = ({Component, ...rest}) => {
// const {user, loading, isAuthenticated} = useSelector((state)=>state.user)

//   return (
//       <Fragment>
//       {!loading && (
//         <Route 
//           {...rest}
//           render={(prop)=>{
//             if(!isAuthenticated){
//               return redirect("/login")
//             }

//            return <Component {...prop} /> 
//           }}
//         />
//       )}
//       </Fragment>
//   )
// }

// export default ProtectedRoute




// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({isAdmin, children }) => {
//   const { user, loading, isAuthenticated } = useSelector((state) => state.user);

//  if(!loading && isAuthenticated===false){
//   return <Navigate to="/login" />
// }


// if(isAdmin===true && user?.role!=="admin"){
//   return <Navigate to="/login" />
// }




// if((!loading && isAuthenticated===true)||(isAdmin===true && user?.role==="admin")){
//   return   children
// }
 

// }

// export default ProtectedRoute;




import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({isAdmin, children }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  if(loading===false){

 
 if( isAuthenticated===false){
  return <Navigate to="/login" />
}


if(isAdmin===true && user?.role!=="admin"){
  return <Navigate to="/login" />
}




if((isAuthenticated===true)||(isAdmin===true && user?.role==="admin")){
  return   children
}
 

}
}

export default ProtectedRoute;