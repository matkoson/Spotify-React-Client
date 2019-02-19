import React, { useEffect, useRef } from "react";
import { Link } from "@reach/router";

export default function RightTab(props) {
  // const rightTabRef = useRef(null);
  // console.log(rightTabRef.current);
  // useEffect(() => rightTabRef.current.scrollIntoView());
  return (
    <div
      // ref={rightTabRef}
      className="right-tab app__right-container-generic__outer"
    >
      {!props.mobile && (
        <ul
          onClick={e => props.handleNavClick(e, "right")}
          className="app__right-container-generic__outer__right-nav right-tab__right-nav"
        >
          <Link
            to="./"
            className="right-tab__right-nav__element right-tab__right-nav__element--clicked"
          >
            FEATURED
          </Link>
          <Link
            to="charts"
            id="Charts"
            className="right-tab__right-nav__element"
          >
            CHARTS
          </Link>
          <Link
            to="genres-moods"
            id="Genres"
            className="right-tab__right-nav__element"
          >
            GENRES & MOODS
          </Link>
          <Link
            to="new-releases"
            id="New Releases"
            className="right-tab__right-nav__element"
          >
            NEW RELEASES
          </Link>
          <Link
            to="discover"
            id="Discover"
            className="right-tab__right-nav__element"
          >
            DISCOVER
          </Link>
        </ul>
      )}
      <div
        className="wrapper"
        style={props.mobile ? { marginTop: "203.922px" } : null}
      >
        {props.children}
      </div>
    </div>
  );
}
