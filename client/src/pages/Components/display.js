import { useEffect, useState } from "react";

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
            <div id="cardContain">
              <card className="displayCards">
                {business.name}
                <br></br>
                <label>Phone:</label>
                {business.phone}
              </card>
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
