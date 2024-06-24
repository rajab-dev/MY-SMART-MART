import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import dp from "../../../images/dp1.jpg";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/the_smart_mart__";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={dp}
              alt="Founder"
            />
            <Typography>Mr.Rajab ALi Khan Mughal</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample ECOMMERCE wesbite made by <a style={{textDecoration:"none",color:"black"}} href="https://github.com/rajab-dev/">@rajab-dev</a>. I'm owner of The SMART MART
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://github.com/rajab-dev/"
              target="blank"
            >
              {/* <YouTubeIcon className="youtubeSvgIcon" /> */}
              <GitHubIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/the_smart_mart__" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
