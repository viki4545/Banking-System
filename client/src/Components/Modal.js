import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../allConstant/constant";

const Modal = ({ heading, modalId, linkType, userId, balance }) => {
  const [values, setValues] = useState({
    user_id: "",
    transaction_type: "",
    amount: "",
  });

  console.log(balance);
  const handleSubmit = () => {
    axios
      .post(`${BASE_URL}/user/${linkType}`, values)
      .then((res) => {
        if (res.data.status === "SUCCESS") {
          let frm = document.getElementsByName("depositForm")[0];
          frm.reset();
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => {
        console.error("Error submitting form:", err);
      });
  };

  return (
    <>
      <div
        class="modal fade"
        id={modalId}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                {heading}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form name="depositForm" onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    Available Balance: {balance}
                  </label>
                </div>
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">
                    {heading} Amount:
                  </label>
                  <input
                    type="number"
                    name="amount"
                    min={0}
                    class="form-control"
                    id="recipient-name"
                    onChange={(e) =>
                      setValues({
                        ...values,
                        user_id: userId,
                        transaction_type: heading,
                        amount: e.target.value,
                      })
                    }
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                data-bs-dismiss="modal"
                onClick={handleSubmit}
                class={
                  heading == "Deposit" ? "btn btn-success" : "btn btn-primary"
                }
              >
                {heading}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
