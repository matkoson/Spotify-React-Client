import React from "react";
import logo from "../../assets/svg/logo.svg";
import search from "../../assets/svg/search.svg";
import home from "../../assets/svg/home.svg";
import lib from "../../assets/svg/lib.svg";
export default function LeftTab(props) {
  return (
    <div className="left-tab">
      <div
        className="left-tab__logo"
        style={{ cursor: "pointer" }}
        onClick={() => {
          props.handleReturnHome();
        }}
      >
        <img
          className="left-tab__logo__logo"
          src={logo}
          alt="spotify-logo+text"
        />
      </div>
      <div
        onClick={e => props.handleNavClick(e, "left")}
        className="left-tab__app-nav"
      >
        <div className="left-tab__app-nav__search left-tab__app-nav__icon-text">
          <img
            className="left-tab__app-nav__logo"
            src={search}
            alt="search icon"
          />
          <span className="left-tab__app-nav__search__text left-tab__app-nav__text">
            {"Search"}
          </span>
        </div>
        {/*  */}
        <div
          className="left-tab__app-nav__home left-tab__app-nav__icon-text left-tab__app-nav__icon-text--clicked"
          onClick={() => {
            props.handleReturnHome();
          }}
        >
          <img className="left-tab__app-nav__logo" src={home} alt="home icon" />
          <span className="left-tab__app-nav__home__text left-tab__app-nav__text">
            {"Home"}
          </span>
        </div>
        {/*  */}
        <div className="left-tab__app-nav__library left-tab__app-nav__icon-text">
          <img className="left-tab__app-nav__logo" src={lib} alt="lib icon" />
          <span className="left-tab__app-nav__library__text left-tab__app-nav__text">
            {"Your Library"}
          </span>
        </div>
        {/*  */}
      </div>
      {props.children}
      {/* <RecentlyPlayed
				handleNavClick={this.handleNavClick}
				rawRecPlayed={this.state.recentlyPlayed}
			/> */}
    </div>
  );
}
