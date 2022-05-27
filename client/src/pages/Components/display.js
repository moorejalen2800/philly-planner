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
  // const outingName = location.state.outingName;
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
    navigate("/outing", { state: { outingId } });
  };

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {bus != null ? (
        bus.map((business) => {
          return (
            <div
              key={business.name}
              id="cardContain"
              style={{ display: "block" }}
            >
              <motion.div
                style={{
                  backgroundImage: `url(${business.image_url})`,
                  backgroundRepeat: "no-repeat",
                  width: 250,
                  height: 250,
                  backgroundSize: "cover",
                  color: "white",
                  fontWeight: "bolder",

                  // width: 100,
                  // height: 100,
                  // objectFit: contain,
                }}
                className="displayCards"
                whileHover={{
                  scale: 1.1,
                  textShadow: "5px 5px 4px gray",
                }}
              >
                <p styles={{ alignItems: "center" }}>{business.name}</p>
                <br></br>
                <label>Phone:</label>
                {business.phone}
                <br></br>
                <a href={business.url} target="_blank" rel="noreferer noopener">
                  Search
                </a>
                <button
                  className="btn btn-block btn-primary"
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
