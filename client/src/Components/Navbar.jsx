import React from "react";

const Navbar = () => {
  return (
    <>
      <nav
        class="navbar fixed-top navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Binary Bank
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul class="navbar-nav ">
              <li class="nav-item">
                <a class="nav-link " aria-current="page" href="/">
                  Customer's Login
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/bankerLogin">
                  Banker's Login
                </a>
              </li>
              {/* <li class="nav-item">
                <a class="nav-link" href="/transactionPage">
                  transactionPage
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/accountsPage">
                  accountsPage
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
