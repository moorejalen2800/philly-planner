import React from "react";
// import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
// import ReactBootstrapStyle from "@bit/react-bootstrap.react-bootstrap.internal.style-links";
import { useNavigate, useLocation } from "react-router-dom";

function Create() {
  const navigate = useNavigate();
  //   const [value, onChange] = useState(new Date());
  navigate("/");
  function handleClick(e) {
    e.preventDefault();
    navigate("/calendar", {state: { outingName, outingCreator }});
  }
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
        <div className="dinnerCard text-center card-body m-5">
          <h1>What's The Occasion?</h1>
          <br></br>
          <input
            // onChange={handleChange}
            name="dinnerOption"
            // value={formState.dinnerOption}
            placeholder="Bach Brunch.."
          ></input>
        </div>
      </form>

      <div className="card-footer text-center m-3">
        <h4>Ready to Move To The Next Step?</h4>
        {/* <Link to="/matchup"> */}
        {/* onClick={handleFormSubmit}  */}
        <button
          onClick={(e) => handleClick(e)}
          className="btn btn-lg btn-danger"
        >
          Create Date!
        </button>
        {/* </Link> */}
      </div>
    </motion.div>
  );
}

export default Create;

// function Create() {
//     function handleClick(e) {
//         e.preventDefault();
//         navigate("/create");
//   return (
//     <motion.div
//       id="dinner"
//       className="card card-rounded w-50"
//       initial={{ y: -250 }}
//       animate={{ y: 0 }}
//       transition={{ type: "spring", stiffness: 100 }}
//     >
//       <div className="card-header bg-dark text-center">
//         <h1>Plan The Perfect Philly Night!</h1>
//       </div>
//       <form>
//         <div className="dinnerCard text-center card-body m-5">
//           <h1>What's The Occasion?</h1>
//           <br></br>
//           <input
//             // onChange={handleChange}
//             name="dinnerOption"
//             // value={formState.dinnerOption}
//             placeholder="Bach Brunch.."
//           ></input>
//         </div>
//       </form>

//       <div className="card-footer text-center m-3">
//         <h4>Ready to Move To The Next Step?</h4>
//         {/* <Link to="/matchup"> */}
//         {/* onClick={handleFormSubmit}  */}
//         <button onClick={(e) => handleClick(e)} className="btn btn-lg btn-danger">Create Date!</button>
//         {/* </Link> */}
//       </div>
//     </motion.div>
//   );
// }

// export default Create;
