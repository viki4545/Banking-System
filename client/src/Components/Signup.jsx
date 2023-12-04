import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ accountLoginLink, userType, linkType, navigationLink }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    usertype: userType,
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    axios
      .post(`http://localhost:5000/${linkType}/register`, values)
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          navigate(`${navigationLink}`);
        } else {
          alert(res.data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
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
                marginTop: "3.5rem",
                marginBottom: "10rem",
              }}
            >
              <div
                class="col-12 col-md-9 col-lg-7 col-xl-6"
                style={{ height: "90%" }}
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
                      Create an account
                    </h2>

                    <form onSubmit={handleSubmit} id="signup">
                      <div class="form-outline mb-4">
                        <input
                          type="text"
                          name="name"
                          id="form3Example1cg"
                          class="form-control form-control-lg"
                          onChange={(e) =>
                            setValues({ ...values, name: e.target.value })
                          }
                        />
                        <label class="form-label" for="form3Example1cg">
                          Your Name
                        </label>
                      </div>

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

                      {/* <div class="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cdg"
                          class="form-control form-control-lg"
                        />
                        <label class="form-label" for="form3Example4cdg">
                          Repeat your password
                        </label>
                      </div> */}

                      <div class="d-flex justify-content-center">
                        <button
                          type="submit"
                          class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          SignUp
                        </button>
                      </div>

                      <p class="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <a href={accountLoginLink} class="fw-bold text-body">
                          <u>Login here</u>
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

export default Signup;
