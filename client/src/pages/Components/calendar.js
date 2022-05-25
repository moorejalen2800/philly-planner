import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

function Cal() {
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());
  navigate("/dinner");
  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default Cal;
