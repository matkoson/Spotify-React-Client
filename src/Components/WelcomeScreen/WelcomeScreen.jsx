import React from "react";
import { Link } from "@reach/router";
import "../../Styles/Components/welcome-screen.scss";

export default function WelcomeScreen(props) {
  return (
    <div className="welcome-screen app__right-container-generic__outer  ">
      <h1 className="welcome-screen__hi-there">Hello there!</h1>
      <div className="welcome-screen__choose welcome-screen__choose--search">
        <div className="welcome-screen__choose-search welcome-screen__question">
          If you'd like to make a search, please click on the button below
        </div>
        <Link
          className="welcome-screen__button"
          to={process.env.PUBLIC_URL + "/search"}
        >
          <button className="welcome-screen__button-tag">Search</button>
        </Link>
      </div>

      <div className="welcome-screen__choose welcome-screen__choose--recommended">
        <div className="welcome-screen__choose-recommended welcome-screen__question">
          Otherwise, you can check musical recommendations we've prepared
        </div>
        <Link
          className="
				  welcome-screen__button"
          to={process.env.PUBLIC_URL + "/home"}
        >
          <button className="welcome-screen__button-tag">Recommended</button>{" "}
        </Link>
      </div>
      <div className="welcome-screen__choose">
        <div className="welcome-screen__choose-search welcome-screen__question">
          Lastly, the spinning atom in the top-right corner will provide you
          with more options
        </div>
      </div>
    </div>
  );
}
