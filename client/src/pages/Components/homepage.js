import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import Auth from "../../utils/auth";

function Home() {
  const navigate = useNavigate();
  //   const [value, onChange] = useState(new Date());
  navigate("/");
  function handleClick(e) {
    e.preventDefault();
    navigate("/create");
  }
  if (!Auth.loggedIn()) {
    return <Navigate to="/signup" />;
  }
  return (
    <div>
      <motion.div
        className="displayCards"
        initial={{ y: -250 }}
        animate={{ y: 0 }}
        //   transition={{ type: "spring", stiffness: 100 }}
      >
        <h1> Welcome to Philly Planner</h1>
        <p>
          {" "}
          We know it's over whelming to plan a night out in a city with so many
          options. Let us take the guess work out. Follow our simple prompts{" "}
        </p>
      </motion.div>

      <motion.button onClick={(e) => handleClick(e)} className="homeBtn">
        Let's Get Started!
      </motion.button>
    </div>
  );
}

export default Home;
