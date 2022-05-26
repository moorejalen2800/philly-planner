import React, { useState } from "react";
import Calendar from "react-calendar";
import { useMutation, useQuery } from '@apollo/client';
import { ADD_OUTING } from '../../utils/mutations';

import "react-calendar/dist/Calendar.css";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import Auth from "../../utils/auth";

function Cal() {
  const navigate = useNavigate();
  window.addEventListener("click", selectedDate);
  const [addOuting, { error }] = useMutation(ADD_OUTING);
  const { state } = useLocation();
  const outingName = state.outingName;
  const outingCreator = state.outingCreator;

  async function selectedDate(e) {
    var date = e.target.attributes[0].value;
    const dateTime = date
    try {
      const { data } = await addOuting({
        variables: {
          dateTime,
          outingName,
          outingCreator,
        },
      });
    }
    catch (err) {
      console.error(err);
    }

    await localStorage.setItem("date", date);
    window.removeEventListener("click", selectedDate);
    return navigate("/dinner", {state: { outingName }});
  }


  if (!Auth.loggedIn()) {
    return <Navigate to="/signup" />;
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
