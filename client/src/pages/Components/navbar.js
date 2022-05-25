import React from "react";
// import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function NavBar({ currentPage, handlePageChange }) {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item nav-link-custom" whileHover={{ scale: 1.1 }}>
          <Link
            //   to={"/portfolio/"}
            // onClick={() => handlePageChange("About")}
            className={currentPage === "Home" ? "nav-link active" : "nav-link"}
          >
            Home
          </Link>
        </li>
        <li className="nav-item nav-link-custom">
          <Link
            to={"/portfolio/myPortfolio"}
            // onClick={() => handlePageChange("Portfolio")}
            className={
              currentPage === "Portfolio" ? "nav-link active" : "nav-link"
            }
          >
            Login
          </Link>
        </li>

        <li className="nav-item nav-link-custom">
          <a
            href="https://drive.google.com/file/d/1urxbviHRClUhQ-CDShzgh8uHnOhDxtoL/view?usp=sharing"
            target="_blank"
            rel="noreferer noopener"
            // onClick={() => handlePageChange("Resume")}
            className={
              currentPage === "Resume" ? "nav-link active" : "nav-link"
            }
          >
            Resume
          </a>
        </li>
        <li className="nav-item nav-link-custom">
          <Link
            to={"/portfolio/contact"}
            // onClick={() => handlePageChange("Contact")}
            className={
              currentPage === "Contact" ? "nav-link active" : "nav-link"
            }
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
