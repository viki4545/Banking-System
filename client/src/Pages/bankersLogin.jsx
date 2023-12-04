import React from "react";
import Navbar from "../Components/Navbar";
import Login from "../Components/Login";
import Footer from "../Components/Footer";

const BankerLogin = () => {
  return (
    <>
      <Navbar />
      <Login
        loginName={"Banker"}
        accountCreationLink={"/bankerSignup"}
        userType={"Banker"}
        linkType={"banker"}
        navigationLink={"/accountsPage"}
      />
      <Footer />
    </>
  );
};

export default BankerLogin;
