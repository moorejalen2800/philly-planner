import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

function Cal() {
  const navigate = useNavigate();
  window.addEventListener('click', selectedDate)
  
  async function selectedDate(e) {
    var date = e.target.attributes[0].value
    await localStorage.setItem('date', date)
    window.removeEventListener('click', selectedDate)
    return navigate("/dinner");
  }

  return (
    // <motion.div
    //   initial={{ y: -250 }}
    //   animate={{ y: 0 }}
    //   transition={{ type: "spring", stiffness: 100 }}
    // >
    //   <Calendar onChange={onChange} value={value} />
    // </motion.div>
    <div>
      <Calendar />
    </div>
  );
}

export default Cal;
