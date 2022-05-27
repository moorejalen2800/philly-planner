import React, { useState } from "react";
import Calendar from "react-calendar";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_OUTING } from "../../utils/mutations";
import { QUERY_OUTING } from "../../utils/queries";
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
  console.log(outingCreator, outingName);
  const [value, onChange] = useState(new Date());
  // const [outingId, setOutId] = useState();

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

      const outId = data?.addOuting._id || {};
      return outId;
    } catch (err) {
      console.error(err);
    }

    await localStorage.setItem("date", value);
    // window.removeEventListener("click", selectedDate);
  }

  const takeToDinner = async () => {
    const outingId = await selectedDate();
    navigate("/dinner", { state: { outingId } });
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
    <motion.div
      initial={{ y: -250 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Calendar onChange={onChange} value={value} />

      {outingName && (
        <button
          className="btn btn-block btn-primary"
          onClick={takeToDinner}
          style={{ margin: "5px" }}
        >
          Now let's choose a restaurant!
        </button>
      )}
    </motion.div>
  );
}

export default Cal;
