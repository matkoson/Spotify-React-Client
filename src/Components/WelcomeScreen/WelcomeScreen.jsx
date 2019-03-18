import React from "react";
import { Link } from "@reach/router";
import "../../Styles/Components/welcome-screen.scss";
import { animated, useTrail, config } from "react-spring";

export default function WelcomeScreen(props) {
  const elements = [
    <animated.h1 className="welcome-screen__hi-there welcome-screen__gradient-text">
      Spotify React Client
    </animated.h1>,
    <animated.div className="welcome-screen__choose welcome-screen__choose--search">
      <div className="welcome-screen__choose-search welcome-screen__question">
        If you'd like to make a search, please click on the button below
      </div>
      <Link
        className="welcome-screen__button 
welcome-screen__gradient-text"
        to={process.env.PUBLIC_URL + "/search"}
      >
        <button className="welcome-screen__button-tag welcome-screen__button-tag--search ">
          <span>Search</span>
        </button>
      </Link>
    </animated.div>,
    <animated.div className="welcome-screen__choose welcome-screen__choose--recommended">
      <div className="welcome-screen__choose-recommended welcome-screen__question">
        Otherwise, you can check musical recommendations we've prepared
      </div>
      <Link
        className="
        welcome-screen__button welcome-screen__gradient-text"
        to={process.env.PUBLIC_URL + "/home"}
      >
        <button className="welcome-screen__button-tag welcome-screen__button-tag--recommended ">
          Recommended
        </button>
      </Link>
    </animated.div>,
    props.mobile ? (
      <animated.div className="welcome-screen__choose">
        <div className="welcome-screen__choose-search welcome-screen__question">
          Lastly, the spinning atom in the{" "}
          <strong className="welcome-screen__gradient-text">top-right</strong>{" "}
          corner will provide you with more options
        </div>
      </animated.div>
    ) : null
  ];
  const trail = useTrail(elements.length, {
    config: config.molasses,
    opacity: 1,
    from: { opacity: 0 }
  });

  return (
    <div className="welcome-screen app__right-container-generic__outer">
      {trail.map(({ ...rest }, i) => (
        <animated.div style={{ ...rest }}>{elements[i]}</animated.div>
      ))}
    </div>
  );
}
