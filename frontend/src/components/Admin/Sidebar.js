// import React from "react";
// import "./sidebar.css";
// import logo from "../../images/smart-bg.png";
// import { Link } from "react-router-dom";
// // import { TreeView,TreeItem } from "@mui/x-tree-view"
// // import { TreeView, TreeItem } from "@mui/lab"; 
// // import TreeView from '@mui/lab/TreeView';
// // import TreeItem from '@mui/lab/TreeItem';
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import PostAddIcon from "@mui/icons-material/PostAdd";
// import AddIcon from "@mui/icons-material/Add";
// import ImportExportIcon from "@mui/icons-material/ImportExport";
// import ListAltIcon from "@mui/icons-material/ListAlt";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import PeopleIcon from "@mui/icons-material/People";
// import RateReviewIcon from "@mui/icons-material/RateReview";

// const Sidebar = () => {
//   return (
//     <div className="sidebar">
//       <Link to="/">
//         <img src={logo} alt="Ecommerce" />
//       </Link>
//       <Link to="/admin/dashboard">
//         <p>
//           <DashboardIcon /> Dashboard
//         </p>
//       </Link>
//       <Link>
//         <TreeView
//           defaultCollapseIcon={<ExpandMoreIcon />}
//           defaultExpandIcon={<ImportExportIcon />}
//         >
//           <TreeItem nodeId="1" label="Products">
//             <Link to="/admin/products">
//               <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
//             </Link>

//             <Link to="/admin/product">
//               <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
//             </Link>
//           </TreeItem>
//         </TreeView>
//       </Link>
//       <Link to="/admin/orders">
//         <p>
//           <ListAltIcon />
//           Orders
//         </p>
//       </Link>
//       <Link to="/admin/users">
//         <p>
//           <PeopleIcon /> Users
//         </p>
//       </Link>
//       <Link to="/admin/reviews">
//         <p>
//           <RateReviewIcon />
//           Reviews
//         </p>
//       </Link>
//     </div>
//   );
// };

// export default Sidebar;












import React, { useState } from "react";
import "./sidebar.css";
import logo from "../../images/smart-bg.png";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="SMART MART" style={{marginTop:"30px"}}/>
      </Link>
      <List component="nav">
        <Link to="/admin/dashboard">
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <ImportExportIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to="/admin/products">
              <ListItem button style={{ paddingLeft: 32 }}>
                <ListItemIcon>
                  <PostAddIcon />
                </ListItemIcon>
                <ListItemText primary="All" />
              </ListItem>
            </Link>
            <Link to="/admin/product">
              <ListItem button style={{ paddingLeft: 32 }}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Create" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
        <Link to="/admin/orders">
          <ListItem button>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
        </Link>
        <Link to="/admin/users">
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </Link>
        <Link to="/admin/reviews">
          <ListItem button>
            <ListItemIcon>
              <RateReviewIcon />
            </ListItemIcon>
            <ListItemText primary="Reviews" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
};

export default Sidebar;
