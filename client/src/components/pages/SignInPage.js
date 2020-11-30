import React from "react";
// import { Link } from "react-router-dom";
import purpleLogo from "../../icons/purplelogo.png";
import SignUp from "../ui/SignUp";
import LogIn from "../ui/LogIn";

export default function SignInPage() {
  return (
    <div className="container">
      <div className="row mb-7">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <img src={purpleLogo} width="40px" alt="Matchmake Me Logo" />
          <h2 className="text-brand text-primary d-inline mt-2 ml-2">
            Matchmake Me
          </h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <SignUp />
        <LogIn />
      </div>
    </div>
  );
}
