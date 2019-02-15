import React from "react";

export default function RightTab(props) {
  return (
    <div className="right-tab app__right-container-generic__outer">
      {!props.mobile && (
        <ul
          onClick={e => props.handleNavClick(e, "right")}
          className="app__right-container-generic__outer__right-nav right-tab__right-nav"
        >
          <li className="right-tab__right-nav__element right-tab__right-nav__element--clicked">
            FEATURED
          </li>
          <li id="Charts" className="right-tab__right-nav__element">
            CHARTS
          </li>
          <li id="Genres" className="right-tab__right-nav__element">
            GENRES & MOODS
          </li>
          <li id="New Releases" className="right-tab__right-nav__element">
            NEW RELEASES
          </li>
          <li id="Discover" className="right-tab__right-nav__element">
            DISCOVER
          </li>
        </ul>
      )}
      <div class="wrapper" style={props.mobile ? { marginTop: "160px" } : null}>
        {props.children}
      </div>
    </div>
  );
}
