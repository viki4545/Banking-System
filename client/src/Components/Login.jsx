import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({
  loginName,
  accountCreationLink,
  userType,
  linkType,
  navigationLink,
}) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    usertype: userType,
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/${linkType}/login`, values)
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          if (values.usertype == "User") {
            navigate(`${navigationLink}/${values.email}/${values.usertype}`);
          } else {
            navigate(`${navigationLink}`);
          }
        } else {
          alert(res.data.error);
        }
      });
  };

  return (
    <>
      <section
        class="vh-50 bg-image"
        style={{
          backgroundImage:
            "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
        }}
      >
        <div class=" d-flex align-items-center gradient-custom-3">
          <div class="container">
            <div
              class="row d-flex justify-content-center align-items-center"
              style={{
                height: "100%",
                marginTop: "5rem",
                marginBottom: "25rem",
              }}
            >
              <div
                class="col-12 col-md-9 col-lg-7 col-xl-6"
                style={{
                  height: "90%",
                  // height: "75%",
                  // marginTop: "1rem",
                  // marginBottom: "3rem",
                }}
              >
                <div
                  class="card"
                  style={{
                    borderRadius: "15px",
                    height: "100%",
                    marginTop: "1rem",
                  }}
                >
                  <div class="card-body p-5" style={{ overflowY: "scroll" }}>
                    <h2 class="text-uppercase text-center mb-5">
                      {loginName} Login
                    </h2>

                    <form onSubmit={handleSubmit}>
                      <div class="form-outline mb-4">
                        <input
                          type="email"
                          name="email"
                          id="form3Example3cg"
                          class="form-control form-control-lg"
                          onChange={(e) =>
                            setValues({ ...values, email: e.target.value })
                          }
                        />
                        <label class="form-label" for="form3Example3cg">
                          Your Email
                        </label>
                      </div>

                      <div class="form-outline mb-4">
                        <input
                          type="password"
                          name="password"
                          id="form3Example4cg"
                          class="form-control form-control-lg"
                          onChange={(e) =>
                            setValues({ ...values, password: e.target.value })
                          }
                        />
                        <label class="form-label" for="form3Example4cg">
                          Password
                        </label>
                      </div>

                      <div class="d-flex justify-content-center">
                        <button
                          type="submit"
                          class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Login
                        </button>
                      </div>

                      <p class="text-center text-muted mt-5 mb-0">
                        Doesn't have account?{" "}
                        <a href={accountCreationLink} class="fw-bold text-body">
                          <u>Create an account</u>
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
