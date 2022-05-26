import React, { useState } from "react";
import Calendar from "react-calendar";
import { useMutation } from "@apollo/client";
import { ADD_OUTING } from "../../utils/mutations";
import "react-calendar/dist/Calendar.css";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import Auth from "../../utils/auth";

function Cal() {
  const navigate = useNavigate();
  // window.addEventListener("click", selectedDate);
  const [addOuting, { error }] = useMutation(ADD_OUTING);
  const location = useLocation();
  const outingName = location.state.outingName;
  const outingCreator = location.state.outingCreator;

  const [value, onChange] = useState(new Date());

  // const onDateChange = (event) => {
  //   const {value} = event.target
  //   setDate(value);
  //   console.log(value);
  // }

  async function selectedDate() {
    // var date = e.target.attributes[0].value;
    const dateTime = value;
    try {
      const { data } = await addOuting({
        variables: {
          dateTime,
          outingName,
          outingCreator,
        },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    await localStorage.setItem("date", value);
    // window.removeEventListener("click", selectedDate);
  }

  const takeToDinner = () => {
    selectedDate();
    navigate("/dinner", { state: { outingName } });
  };

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
      <Calendar onChange={onChange} value={value} />

      {outingName && (
        <button onClick={takeToDinner}>Now let's choose a restaurant!</button>
      )}
    </div>
  );
}

export default Cal;
