import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

function Display() {
  const [bus, setBus] = useState();

  useEffect(() => {
    let arrayData = JSON.parse(localStorage.getItem("restArr"));
    console.log(arrayData);
    if (arrayData != null) {
      setBus(arrayData.businesses);
    }
  }, []);

  return (
    <div>
      {bus != null ? (
        bus.map((business) => {
          return (
            <div
              id="cardContain"

              // style={backgroundImage={business.image_url}}
            >
              <motion.card
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
              </motion.card>
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
