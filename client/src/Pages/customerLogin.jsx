import React from "react";
import Navbar from "../Components/Navbar";
import Login from "../Components/Login";
import Footer from "../Components/Footer";

const CustomerLogin = () => {
  return (
    <>
      <Navbar />
      <Login
        loginName={"Customer"}
        accountCreationLink={"/customerSignup"}
        userType={"User"}
        linkType={"user"}
        navigationLink={"/transactionPage"}
      />
      <Footer />
    </>
  );
};

export default CustomerLogin;
