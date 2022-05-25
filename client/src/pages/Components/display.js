import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import Auth from "../../utils/auth";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { useMutation } from '@apollo/client';

import { ADD_RESTAURANT } from '../../utils/mutations';


function Display({ outingId }) {
  const [bus, setBus] = useState();

  const [addRestaurant, { error }] = useMutation(ADD_RESTAURANT);

  useEffect(() => {
    let arrayData = JSON.parse(localStorage.getItem("restArr"));
    console.log(arrayData);
    if (arrayData != null) {
      setBus(arrayData.businesses);
    }
  }, []);
//Credit: https://www.pluralsight.com/guides/how-to-access-custom-attributes-from-aevent-object-in-react
  const handleClick = async (e) => {
    const restaurantName = e.target.getAttribute('data-business-name')
    const restaurantLocation = e.target.getAttribute('data-business-location')
    const restaurantURL = e.target.getAttribute('data-business-url')

    try {
      const { data } = await addRestaurant({
        variables: {
          outingId,
          restaurantName,
          restaurantURL,
          restaurantLocation,
        },
      });
    }
    catch (err) {
      console.error(err);
    }



  }

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
                <a href={business.url} onClick={handleClick} data-business-name={business.name} data-business-location={business.location} data-business-url={business.URL} target="_blank" rel="noreferer noopener">
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
