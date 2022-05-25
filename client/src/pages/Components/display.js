import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import Auth from "../../utils/auth";
import { useNavigate, Navigate, useParams } from "react-router-dom";

function Display() {
  const [bus, setBus] = useState();

  useEffect(() => {
    let arrayData = JSON.parse(localStorage.getItem("restArr"));
    console.log(arrayData);
    if (arrayData != null) {
      setBus(arrayData.businesses);
    }
  }, []);

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {bus != null ? (
        bus.map((business) => {
          return (
            <div id="cardContain">
              <motion.div
                style={{ backgroundImage: `url(${business.image_url})` }}
                className="displayCards"
                whileHover={{
                  scale: 1.1,
                  textShadow: "0px 0px 4px gray",
                }}
              >
                {business.name}
                <br></br>
                <label>Phone:</label>
                {business.phone}
                <a href={business.url} target="_blank" rel="noreferer noopener">
                  Search
                </a>
                <button> Add to Outing</button>
              </motion.div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default Display;
