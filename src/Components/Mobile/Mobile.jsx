import React from "react";
import search from "../../assets/svg/search.svg";
import home from "../../assets/svg/home.svg";
import lib from "../../assets/svg/lib.svg";
import { useTransition, animated } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Mobile(props) {
  const { mobile, handleMobileNavToggle, handleMainRightChange } = props;
  const transitions = useTransition(mobile, null, {
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: { opacity: 0 }
  });
  const mobileNav = [
    { name: "Search", src: search },
    { name: "Home", src: home },
    { name: "Library", src: lib }
  ].map(e => (
    <div
      className="mobile__nav__ul__li"
      onClick={() => {
        handleMainRightChange(e.name);
      }}
    >
      {e.name}
      <img src={e.src} alt="" className="mobile__nav__ul__li__img" />
    </div>
  ));
  return transitions.map(({ item, key, props }) => (
    <div className="mobile">
      {item ? (
        <animated.div style={props} className="mobile__nav">
          <div className="mobile__nav__ul">{mobileNav}</div>
        </animated.div>
      ) : (
        <animated.div style={props}>{}</animated.div>
      )}

      <div
        style={
          mobile
            ? { background: "rgba(0,0,0,0)" }
            : {
                background:
                  "linear-gradient( 225deg, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.6) 35%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.1) 45%, rgba(0, 0, 0, 0) 56% )"
              }
        }
        className="mobile__logo"
      >
        <FontAwesomeIcon
          icon={["fab", "react"]}
          onClick={handleMobileNavToggle}
          className="mobile__logo__pic"
        />{" "}
      </div>
    </div>
  ));
}
