import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

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
    <div>
      <Calendar />
    </div>
  );
}

export default Cal;
