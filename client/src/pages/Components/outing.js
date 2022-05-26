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
  const restname = outing.restaurants.restaurantName;
  const restLoc = outing.restaurants.restaurantLocation;
  const restWeb = outing.restaurants.restaurantURL;
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
      <p>
        We heard that {restname} is pretty good, so be sure to check out their
        menu before hand at <a href={restWeb}></a>
      </p>
    </motion.div>
  );
}

export default Outing;
