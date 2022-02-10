// import { Date } from "mongoose";
import React from "react";
import "./style.css";


function Footer() {

  const year = new Date().getFullYear()

  return (
   <footer >
   <div className="span" >
      <span><a href="/" taget="_self"className="footer-link">© {year} Created by Jeorge Donato, Amir Ashkan S.Dardashti, Lauren Goettsch, Duyen Pham and Raymond Tieu.</a></span>
   </div>
    </footer>
  );
}

export default Footer;



