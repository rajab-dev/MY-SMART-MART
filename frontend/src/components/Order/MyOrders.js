// // import React, { Fragment, useEffect } from "react";
// // import { DataGrid } from '@mui/x-data-grid';
// // import "./myOrders.css";
// // import { useSelector, useDispatch } from "react-redux";
// // import { clearErrors, myOrders } from "../../actions/orderAction";
// // import Loader from "../layout/Loader/Loader";
// // import { Link } from "react-router-dom";
// // import Typography from "@mui/material/Typography";
// // import MetaData from "../layout/MetaData";
// // import LaunchIcon from "@mui/icons-material/Launch";
// // import toast from "react-hot-toast";

// // const MyOrders = () => {
// //   const dispatch = useDispatch();


// //   const { loading, error, orders } = useSelector((state) => state.myOrders);
// //   const { user } = useSelector((state) => state.user);

// //   const columns = [
// //     { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

// //     {
// //       field: "status",
// //       headerName: "Status",
// //       minWidth: 150,
// //       flex: 0.5,
// //       cellClassName: (params) => {
// //         return params.getValue(params.id, "status") === "Delivered"
// //           ? "greenColor"
// //           : "redColor";
// //       },
// //     },
// //     {
// //       field: "itemsQty",
// //       headerName: "Items Qty",
// //       type: "number",
// //       minWidth: 150,
// //       flex: 0.3,
// //     },

// //     {
// //       field: "amount",
// //       headerName: "Amount",
// //       type: "number",
// //       minWidth: 270,
// //       flex: 0.5,
// //     },

// //     {
// //       field: "actions",
// //       flex: 0.3,
// //       headerName: "Actions",
// //       minWidth: 150,
// //       type: "number",
// //       sortable: false,
// //       renderCell: (params) => {
// //         return (
// //           <Link to={`/order/${params.getValue(params.id, "id")}`}>
// //             <LaunchIcon />
// //           </Link>
// //         );
// //       },
// //     },
// //   ];
// //   const rows = [];

// //   orders &&
// //     orders.forEach((item, index) => {
// //       rows.push({
// //         itemsQty: item.orderItems.length,
// //         id: item._id,
// //         status: item.orderStatus,
// //         amount: item.totalPrice,
// //       });
// //     });

// //   useEffect(() => {
// //     if (error) {
// //       toast.error(error);
// //       dispatch(clearErrors());
// //     }

// //     dispatch(myOrders());
// //   }, [dispatch, error]);

// //   return (
// //     <Fragment>
// //       <MetaData title={`${user.name} - Orders`} />

// //       {loading ? (
// //         <Loader />
// //       ) : (
// //         <div className="myOrdersPage">
// //           <DataGrid
// //             rows={rows}
// //             columns={columns}
// //             pageSize={10}
// //             disableSelectionOnClick
// //             className="myOrdersTable"
// //             autoHeight
// //           />

// //           <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
// //         </div>
// //       )}
// //     </Fragment>
// //   );
// // };

// // export default MyOrders;








// import React, { Fragment, useEffect } from "react";
// import { DataGrid } from '@mui/x-data-grid';
// import "./myOrders.css";
// import { useSelector, useDispatch } from "react-redux";
// import { clearErrors, myOrders } from "../../actions/orderAction";
// import Loader from "../layout/Loader/Loader";
// import { Link } from "react-router-dom";
// import Typography from "@mui/material/Typography";
// import MetaData from "../layout/MetaData";
// import LaunchIcon from "@mui/icons-material/Launch";
// import toast from "react-hot-toast";

// const MyOrders = () => {
//   const dispatch = useDispatch();

//   const { loading, error, orders } = useSelector((state) => state.myOrders);
//   const { user } = useSelector((state) => state.user);

//   const columns = [
//     { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
//     {
//       field: "status",
//       headerName: "Status",
//       minWidth: 150,
//       flex: 0.5,
//       cellClassName: (params) => {
//         return params.row.status === "Delivered" ? "greenColor" : "redColor";
//       },
//     },
//     {
//       field: "itemsQty",
//       headerName: "Items Qty",
//       type: "number",
//       minWidth: 150,
//       flex: 0.3,
//     },
//     {
//       field: "amount",
//       headerName: "Amount",
//       type: "number",
//       minWidth: 270,
//       flex: 0.5,
//     },
//     {
//       field: "actions",
//       flex: 0.3,
//       headerName: "Actions",
//       minWidth: 150,
//       type: "number",
//       sortable: false,
//       renderCell: (params) => {
//         return (
//           <Link to={`/order/${params.row.id}`}>
//             <LaunchIcon />
//           </Link>
//         );
//       },
//     },
//   ];

//   const rows = orders
//     ? orders.map((item) => ({
//         id: item._id,
//         status: item.orderStatus,
//         itemsQty: item.orderItems.length,
//         amount: item.totalPrice,
//       }))
//     : [];

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearErrors());
//     }

//     dispatch(myOrders());
//   }, [dispatch, error]);

//   return (
//         <Fragment>
//           <MetaData title={`${user.name} - Orders`} />
    
//           {loading ? (
//             <Loader />
//           ) : (
//             <div className="myOrdersPage">
//               <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 pageSize={10}
//                 disableSelectionOnClick
//                 className="myOrdersTable"
//                 autoHeight
//               />
    
//               <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
//             </div>
//           )}
//         </Fragment>
//       );

// };

// export default MyOrders;







import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";
import toast from "react-hot-toast";
import "./myOrders.css";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  const columns = [
    { field: "id", headerName: "Order ID", flex: 1, minWidth: 150 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      minWidth: 120,
      cellClassName: (params) =>
        params.value === "Delivered" ? "greenColor" : "redColor",
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      flex: 0.5,
      minWidth: 120,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      minWidth: 120,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.row.id}`}>
          <LaunchIcon />
        </Link>
      ),
    },
  ];

  const rows = orders
    ? orders.map((item) => ({
        id: item._id,
        status: item.orderStatus,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice.toFixed(2), // Format amount as fixed decimal
      }))
    : [];

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />
      <div className="myOrdersPage">
        <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        {loading ? (
          <Loader />
        ) : (
          <div className="myOrdersTable">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default MyOrders;




