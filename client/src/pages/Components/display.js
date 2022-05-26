import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import Auth from "../../utils/auth";
import {
  useNavigate,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_RESTAURANT } from "../../utils/mutations";

function Display() {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.state);
  const [bus, setBus] = useState();
  // const [outingId, setOutingId] = useState('');
  const outingId = location.state.outingId;

  // console.log("outing Id ", outingId);
  const outingName = location.state.outingName;
  const [addRestaurant, { error }] = useMutation(ADD_RESTAURANT);

  useEffect(() => {
    // setOutingId(location.state.outingId);
    // console.log("outing Id ", outingId);
    let arrayData = JSON.parse(localStorage.getItem("restArr"));
    console.log(arrayData);
    if (arrayData != null) {
      setBus(arrayData.businesses);
    }
  }, []);
  //Credit: https://www.pluralsight.com/guides/how-to-access-custom-attributes-from-aevent-object-in-react
  const handleClick = async (e) => {
    const restaurantName = e.target.getAttribute("data-business-name");
    const restaurantLocation = e.target.getAttribute("data-business-location");
    const restaurantURL = e.target.getAttribute("data-business-url");

    try {
      const { data } = await addRestaurant({
        variables: {
          outingId,
          restaurantName,
          restaurantURL,
          restaurantLocation,
        },
      });
    } catch (err) {
      console.error(err);
    }
    navigate("/outing", { state: { outingName } });
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {bus != null ? (
        bus.map((business) => {
          return (
            <div key={business.name} id="cardContain">
              <motion.div
                style={{
                  backgroundImage: `url(${business.image_url})`,
                  // width: 100,
                  // height: 100,
                  // objectFit: contain,
                }}
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
                <button
                  onClick={handleClick}
                  data-business-name={business.name}
                  data-business-location={business.location.address1}
                  data-business-url={business.url}
                >
                  {" "}
                  Add to Outing
                </button>
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
