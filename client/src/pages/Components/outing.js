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
  const outingId = location.state.outingId;
  const { loading, data } = useQuery(QUERY_OUTING, {
    // pass URL parameter
    variables: { outingId: outingId },
  });

  const outing = data?.outing || {};
  console.log(outing);
  const outId = outing._id;
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
    navigate("/dinner", { state: { outingId } });
  }
  return (
    <motion.div
      className="card card-rounded w-50"
      style={{ backgroundColor: "rgba(162, 161, 164, 0.4) " }}
      initial={{ y: -250 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <h1 className="text-center">Hey, {outingMaker}!</h1>
      <p style={{ fontWeight: "bolder" }}>
        Can't wait for {outingNames}, on {outingDate}
      </p>
      {restList.map((restaurant) => {
        return (
          <div key={restaurant._id}>
            <p style={{ fontWeight: "bolder" }}>
              We heard that {restaurant.restaurantName} is pretty good, so be
              sure to check out their menu at{" "}
              <a href={restaurant.restaurantURL}> their website</a> before you
              head over to {restaurant.restaurantLocation}.
            </p>
          </div>
        );
      })}

      <p className="text-center" style={{ fontWeight: "bolder" }}>
        Would you like to add another location to your outing?
      </p>
      <button
        onClick={(e) => handleClick(e)}
        className="btn btn-lg btn-danger text-center"
        style={{ justifyContent: "center", width: "100%" }}
      >
        Choose another location!
      </button>
    </motion.div>
  );
}

export default Outing;
