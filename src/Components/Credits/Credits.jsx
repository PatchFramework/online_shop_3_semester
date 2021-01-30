import React from "react";

import "./Credits.css";

export const Credits = () => {
  return (
    <div className="creditsContainer">
      <h1 className="creditsHeading">Credit goes to:</h1>
      <ol className="creditsList">
        <li className="creditsItem">
          <div>
            The rounded logo icon is made by{" "}
            <a href="http://www.freepik.com" title="Freepik">
              Freepik
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </li>
        <li className="creditsItem">
          <div>
            {" "}
            Credit for the cart icon goes to Font Awesome under{" "}
            <a href="https://fontawesome.com/license">
              Creative Commons Attribution 4.0 International license
            </a>
            .<br />
            It was modified to appear white instead of black.
          </div>
        </li>
        <li className="creditsItem">
          <div>
            The images in the product cards are fetched from{" "}
            <a href="https://unsplash.com">www.unsplash.com</a>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default Credits;
