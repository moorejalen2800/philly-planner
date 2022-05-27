import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import { QUERY_OUTING } from "../../utils/queries";

// const cors = "https://cors-anywhere.herokuapp.com/";

async function getApi(budget, dinnerOption) {
  const dinnerChoice = dinnerOption.toLowerCase();
  var requestUrl =
    // cors +
    `https://api.yelp.com/v3/businesses/search?latitude=39.9526&longitude=-75.1652&price=${budget}&categories=${dinnerChoice}&radius=5000`;
  console.log(requestUrl);
  try {
    const response = await fetch(requestUrl, {
      headers: {
        Authorization:
          "Bearer W-eebFqTOLTYpgPotccq23VelfCknRoGWvXDz11dCTmdLDPEmv-WoFHHCNvxyIllQ46TgW7TVznFsJE38TC5r78MUgJ7j_rPOGfP3Wgeqc_NcbzCJ5asnKvL19SLYnYx",
      },
    });
    const data = await response.json();
    console.log(data);
    localStorage.setItem("restArr", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

const Dinner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const outingId = location.state.outingId;

  const [formState, setFormState] = useState({
    budget: "",
    dinnerOption: "",
  });

  const { loading, data } = useQuery(QUERY_OUTING, {
    // pass URL parameter
    variables: { outingId: outingId },
  });

  const outing = data?.outing || {};
  console.log(outing);
  const outingName = outing.outingName;

  // useEffect(() => {
  //   getApi(formState.budget, formState.dinnerOption);
  // }, []);

  // let resPrice = this.menu.value;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({ ...formState, [name]: value });
  };

  // const searchForm = (query) =>
  // dinnerOption.search(query)
  //   .then((res) => setFormState(res.data))
  //   .catch((err) => console.log(err));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await getApi(formState.budget, formState.dinnerOption);
    navigate("/display", { state: { outingId } });
  };

  // user names event date
  // populate calendar and select date
  // fill out budgert and ethiccnic food
  // needs banner at top with login logout info
  return (
    <motion.div
      id="dinner"
      className="card card-rounded w-50"
      initial={{ y: -250 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="card-header bg-dark text-center">
        <h1>Plan The Perfect Philly Night!</h1>
      </div>
      <form>
        <div className="card-body m-5">
          <label className="text-center">Select Budget Range</label>
          <select
            name="budget"
            value={formState.budget}
            onChange={handleChange}
          >
            {" "}
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
          </select>
        </div>
      </form>
      <div className="dinnerCard card-body m-5">
        <label className="dinnerText text-center">
          Whatcha Feelin' For Dinner?
        </label>
        <br></br>
        <input
          onChange={handleChange}
          name="dinnerOption"
          value={formState.dinnerOption}
          placeholder="Italian, Mexican, etc.."
        ></input>
      </div>

      <div className="card-footer text-center m-3 text-center">
        <h2>Ready to Move To The Next Step?</h2>
        {/* <Link to="/matchup"> */}
        <button onClick={handleFormSubmit} className="btn btn-lg btn-danger">
          Plan Your Next Step
        </button>
        {/* </Link> */}
      </div>
    </motion.div>
  );
};

export default Dinner;
