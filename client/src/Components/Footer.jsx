import React from "react";

const Footer = () => {
  return (
    <>
      <footer
        class="bg-body-tertiary fixed-bottom text-center"
        data-bs-theme="dark"
      >
        <div class="container p-4 pb-0">
          <section class="mb-4">
            <a
              data-mdb-ripple-init
              class="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#3b5998" }}
              href="#!"
              role="button"
            >
              <i class="fab fa-facebook-f"></i>
            </a>

            <a
              data-mdb-ripple-init
              class="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#55acee" }}
              href="#!"
              role="button"
            >
              <i class="fab fa-twitter"></i>
            </a>

            <a
              data-mdb-ripple-init
              class="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#dd4b39" }}
              href="#!"
              role="button"
            >
              <i class="fab fa-google"></i>
            </a>

            <a
              data-mdb-ripple-init
              class="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#ac2bac" }}
              href="#!"
              role="button"
            >
              <i class="fab fa-instagram"></i>
            </a>

            <a
              data-mdb-ripple-init
              class="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#0082ca" }}
              href="#!"
              role="button"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a
              data-mdb-ripple-init
              class="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#333333" }}
              href="#!"
              role="button"
            >
              <i class="fab fa-github"></i>
            </a>
          </section>
        </div>

        <div
          class="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", color: "white" }}
        >
          © 2020 Copyright: <span> </span>
          <a class="text-body" href="https://binarynumbers.io/">
            binarynumbers.io
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
