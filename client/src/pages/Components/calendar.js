import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

function Cal() {
  const navigate = useNavigate();
  
  function selectedDate(e) {
    var date = e.target.attributes[0].value
    localStorage.setItem('date', date)
    navigate("/dinner");
  }
  
  window.addEventListener('click', selectedDate)


  return (
    <div>
      <Calendar />
    </div>
  );
}

export default Cal;
