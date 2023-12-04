import React from "react";
import Signup from "../Components/Signup";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const CustomerSignup = () => {
  return (
    <>
      <Navbar />
      <Signup
        accountLoginLink={"/"}
        userType={"User"}
        linkType={"user"}
        navigationLink={"/"}
      />
      <Footer />
    </>
  );
};

export default CustomerSignup;
