import React, { useState } from "react";
import Calendar from "react-calendar";
import { useMutation } from "@apollo/client";
import { ADD_OUTING } from "../../utils/mutations";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_OUTING } from "../../utils/queries";

function Outing() {
  const navigate = useNavigate();
  const location = useLocation();
  const outingName = location.state.outingName;
  const { loading, data } = useQuery(QUERY_OUTING, {
    // pass URL parameter
    variables: { outingName: outingName },
  });

  const outing = data?.outing || {};
  console.log(outing);
  const outingId = outing._id;
  const outingDate = outing.dateTime;
  const outingNames = outing.outingName;
  const outingMaker = outing.outingCreator;
  const restList = outing.restaurants;
  console.log(restList);
  // const restname = outing.restaurants[0].restaurantName;
  // const restLoc = outing.restaurants[0].restaurantLocation;
  // const restWeb = outing.restaurants[0].restaurantURL;

  function handleClick(e) {
    e.preventDefault();
    navigate("/dinner", { state: { outingName } });
  }
  return (
    <motion.div
      initial={{ y: -250 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <h1>Hey, {outingMaker}!</h1>
      <p>
        Can't wait for {outingNames}, on {outingDate}
      </p>
      {restList.map((restaurant) => {
        return (
          <div key={restaurant._id}>
            <p >
            We heard that {restaurant.restaurantName} is pretty good, so be sure to check out their
            menu at <a href={restaurant.restaurantURL}> their website</a> before you head over to {restaurant.restaurantLocation}.
            </p>
          </div>
        );
      })}
      
      <p>
        Would you like to add another location to your outing?
      </p>
     <button onClick={(e) => handleClick(e)} className="btn btn-lg btn-danger">Choose another location!</button>
    </motion.div>
  );
}

export default Outing;
