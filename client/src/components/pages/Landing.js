import React from "react";
import whiteAppLogo from "../../icons/white.png";
import { Link } from "react-router-dom";

export default function Landing() {
   return (
      <div className="background-image">
         <div className="container">
            <div className="row">
               <div className="col-12 d-flex justify-content-center align-items-center mt-2 mb-9">
                  <img
                     src={whiteAppLogo}
                     width="70px"
                     className="logo-image mr-2"
                     alt="Matchmake Me Logo"
                  />
                  <h1 className="text-brand text-light mt-1">Matchmake Me</h1>
               </div>

               <div className="col-12 d-flex justify-content-center mt-9">
                  <Link to="/sign-in" className="btn btn-primary btn-lg">
                     Create free account
                  </Link>
               </div>
               <div className="col-12 d-flex justify-content-center mt-4">
                  <Link
                     to="/sign-in"
                     className="btn btn-link float-right text-light mt-1"
                  >
                     <h4>Log in</h4>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}
