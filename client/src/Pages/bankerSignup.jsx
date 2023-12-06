import React from "react";
import Navbar from "../Components/Navbar";
import Signup from "../Components/Signup";
import Footer from "../Components/Footer";

const BankerSignup = () => {
  return (
    <>
      <Navbar />
      <Signup
        accountLoginLink={"/bankerLogin"}
        userType={"Banker"}
        linkType={"banker"}
        navigationLink={"/bankerLogin"}
      />
      <Footer />
    </>
  );
};

export default BankerSignup;
