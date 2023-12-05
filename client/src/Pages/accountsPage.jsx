import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../allConstant/constant";

axios.defaults.withCredentials = true;

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [transHistory, setTransHistory] = useState([]);
  const containerStyle = {
    height: "70%",
    marginTop: "4rem",
    backgroundColor: "rgb(226 232 240)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  };

  const innerContainer = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    marginBottom: "1rem",
    overflowY: "hidden",
  };

  const navigate = useNavigate();

  const handleDelete = () => {
    axios
      .get(`${BASE_URL}/banker/logout`)
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          navigate("/bankerLogin");
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (userId) => {
    axios
      .get(`${BASE_URL}/banker/transactionHistory/${userId}`)
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setTransHistory(res.data.history);
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/banker/accounts`)
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setAccounts(res.data.accounts);
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="container-xxl shadow p-3 mb-5  rounded"
        style={containerStyle}
      >
        <div className="inner-container" style={innerContainer}>
          <button type="button" class="btn btn-danger" onClick={handleDelete}>
            logOut
          </button>
        </div>
        <div className="table table-container">
          <table className="table table-scroll table-striped">
            <thead className="table-dark">
              <th>SrNO</th>
              <th>userId</th>
              <th>Name</th>
              <th>Email</th>
              <th>Balance</th>
              <th></th>
            </thead>
            <tbody style={{ maxHeight: "90%", overflowY: "scroll" }}>
              {accounts?.map((data, idx) => (
                <tr>
                  <td>{idx + 1}</td>
                  <td>{data?.id}</td>
                  <td>{data?.name}</td>
                  <td>{data?.email}</td>
                  <td>{data?.balance}</td>
                  <td
                    class="link-underline-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => {
                      handleClick(data?.id);
                    }}
                  >
                    View transaction
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Transaction History
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="table table-container">
                  <table className="table table-scroll table-striped">
                    <thead className="table-dark">
                      <th>SrNO</th>
                      <th>UserId</th>
                      <th>Amount</th>
                      <th>Transactiontype</th>
                      <th>Transactiondate</th>
                    </thead>
                    <tbody style={{ maxHeight: "90%", overflowY: "scroll" }}>
                      {transHistory?.map((data, idx) => (
                        <tr>
                          <td>{idx + 1}</td>
                          <td>{data?.user_id}</td>
                          <td>{data?.amount}</td>
                          <td
                            className={
                              data?.transaction_type === "deposit"
                                ? "text-success text-capitalize"
                                : "text-danger text-capitalize"
                            }
                          >
                            {data?.transaction_type}
                          </td>
                          <td>{data?.transaction_date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountsPage;
