import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Modal from "../Components/Modal.js";
import { BASE_URL } from "../allConstant/constant.js";

axios.defaults.withCredentials = true;

const TransactionPage = () => {
  const [isDeposit, setIsDeposit] = useState(false);
  const [isWithDraw, setIsWithDraw] = useState(false);
  const [values, setValues] = useState({ userId: "", balance: "" });
  const [transactionList, setTransactionList] = useState([]);
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

  const { email, usertype } = useParams();

  const handleDelete = () => {
    axios
      .get(`${BASE_URL}/user/logout`)
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          navigate("/");
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => {
    axios
      .post(`${BASE_URL}/user/getUserByEmail`, {
        email: email,
        usertype: usertype,
      })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          setValues({
            ...values,
            userId: res.data.user_id,
            balance: res.data.balance,
          });
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .post(`${BASE_URL}/user/getUserByEmail`, {
        email: email,
        usertype: usertype,
      })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          axios
            .get(`${BASE_URL}/user/transaction/${res.data.user_id}`)
            .then((res) => {
              if (res.data.status === "SUCCESS") {
                const transactions = res.data.transactions;
                if (transactions && transactions.length > 0) {
                  setTransactionList(transactions);
                } else {
                  alert(res.data.error);
                }
              } else {
                console.error(res.data.error);
              }
            })
            .catch((err) => console.log(err));
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
          <button
            type="button"
            class="btn btn-success"
            style={{ marginRight: "1rem" }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@getbootstrap"
            onClick={handleClick}
          >
            Deposit
          </button>

          <button
            type="button"
            class="btn btn-primary"
            style={{ marginRight: "1rem" }}
            data-bs-toggle="modal"
            data-bs-target="#withDrawModal"
            data-bs-whatever="@getbootstrap"
            onClick={handleClick}
          >
            WithDraw
          </button>

          <button type="button" class="btn btn-danger" onClick={handleDelete}>
            logOut
          </button>
          <Modal
            heading={"Deposit"}
            modalClass={"modal"}
            modalId={"exampleModal"}
            linkType={"deposit"}
            userId={values.userId}
            balance={values.balance}
          />
          <Modal
            heading={"Withdraw"}
            modalClass={"modal"}
            modalId={"withDrawModal"}
            linkType={"withdraw"}
            userId={values.userId}
            balance={values.balance}
          />
        </div>
        <div className="table table-container">
          <table className="table table-scroll table-striped">
            <thead className="table-dark">
              <th>SrNO</th>
              <th>userId</th>
              <th>Amount</th>
              <th>Transactiontype</th>
              <th>Transactiondate</th>
            </thead>
            <tbody style={{ maxHeight: "90%", overflowY: "scroll" }}>
              {transactionList?.map((data, idx) => (
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
      <Footer />
    </>
  );
};

export default TransactionPage;
