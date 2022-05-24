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
            <card className="displayCards">
              {business.name}
              <br></br>
              <label>Phone:</label>
              {business.phone}
            </card>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default Display;

// import { data } from "./dinner";

// let businesses = data;

// for (let i = 0; i < businesses.length; i++) {
//   const element = businesses[i];
//   console.log(element);
// }

// console.log("really stupid statement");
// var cardRowEl = document.getElementById("cardRow");

// var recipes = JSON.parse(localStorage.getItem("recipeArray"));
// console.log({ recipes });
// for (var i = 0; i < 8; i++) {
//   var recipeEl = recipes[i];
//   console.log(recipeEl);
//   var ingredients = recipes[i].recipe.ingredientLines;
//   console.log({ ingredients });
//   for (var j = 0; j < ingredients.length; j++) {
//     var ingList = ingredients[j];
//     console.log({ ingList });
//     // }
//   }

//   // var ingString = JSON.stringify(ingredients);
//   var thumbnails = recipes[i].recipe.images.THUMBNAIL.url;

//   var label = recipes[i].recipe.label;
//   console.log(label);
//   var cardsEL = document.createElement("div");
//   console.log(cardsEL);
//   var cardHeadEl = document.createElement("div");
//   cardsEL.setAttribute("class", "card");
//   console.log(cardHeadEl);
//   cardHeadEl.setAttribute("class", "card-header");
//   var cardLabel = document.createElement("h3");
//   var thumbs = document.createElement("img");
//   thumbs.setAttribute("src", thumbnails);
//   thumbs.setAttribute("class", "cardThumbnail")
//   var cardContentEl = document.createElement("div");
//   cardContentEl.setAttribute("class", "card-content");
//   console.log(cardContentEl);
//   var p1 = document.createElement("p");
//   p1.setAttribute("class", "card-content");
//   console.log(p1);
//   cardRowEl.appendChild(cardsEL);
//   cardsEL.appendChild(cardHeadEl);
//   cardHeadEl.append(cardLabel);
//   cardLabel.textContent = label;

//   cardHeadEl.appendChild(cardContentEl);
//   cardContentEl.appendChild(p1);
//   p1.textContent = ingredients;
//   cardHeadEl.append(thumbs);
//   thumbs.append(thumbnails)
// }
