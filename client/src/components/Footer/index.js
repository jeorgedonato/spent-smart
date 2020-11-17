import React from "react";
import "./style.css";


function Footer() {
  return (
    <footer className="footer">
      <div className="container">
         <div className="row contact">
             <div className="colum">
                <a className="gather-link" href="/" taget="_self">
                CONTACT US
                </a>
              </div>

             <div className="colum">
                <a className="gather-link" href="/" taget="_self">
                GUIDE
                </a>
             </div>

             <div className="colum">
                <a className="gather-link" href="/" taget="_self">
                PREMIUM
                </a>
             </div>
          </div>

          <div className="container">
           <div className="row about">

             <div className="colum">
                <a className="about-link" href="/" taget="_self">
                ABOUT US
                </a>
             </div>

               <div className="colum">
                  <a className="about-link" href="/" taget="_self">
                    CONNECT WITH US
                  </a>

                <div className="row">
                  <div className="colum">
                     <a className="about-link" href="/" taget="_self">
  
                     </a>
                  </div>
                 <div className="colum">
                     <a className="about-link" href="/" taget="_self">
                       
                     </a>
                  </div>
                  <div className="colum">
                      <a className="about-link" href="/" taget="_self">
                      
                     </a>
                  </div>
                </div>
               </div>

           </div>
          </div>

         
         <div className="span" >
            <span ><a href="/" taget="_self"className="footer-link">© 2020 Spent Smart</a></span>
         </div>

     </div>
      <span>© Created by Amir Ashkan, Jeorge Donato, Lauren Goettsch, Duyen Pham, and Raymond Tieu © 2020</span>
    </footer>
  );
}

export default Footer;
