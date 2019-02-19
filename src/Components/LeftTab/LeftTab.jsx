import React from "react";
import search from "../../assets/svg/search.svg";
import home from "../../assets/svg/home.svg";
import lib from "../../assets/svg/lib.svg";
import { Link } from "@reach/router";
export default function LeftTab(props) {
  return (
    <div className="left-tab">
      <div
        className="left-tab__logo"
        style={{ cursor: "pointer" }}
        onClick={() => {
          props.handleMainRightChange("Home");
        }}
      >
        <i className="fab fa-react left-tab__logo__main" />
        <div className="left-tab__logo__title"> Spotify</div>
        <div className="left-tab__logo__title-react">React</div>
      </div>
      <div
        onClick={e => props.handleNavClick(e, "left")}
        className="left-tab__app-nav"
      >
        {/*  */}
        <Link
          to="search"
          className="left-tab__app-nav__search left-tab__app-nav__icon-text"
          onClick={() => {
            props.handleMainRightChange("Search");
          }}
        >
          <img
            className="left-tab__app-nav__logo"
            src={search}
            alt="search icon"
          />
          <span className="left-tab__app-nav__search__text left-tab__app-nav__text">
            {"Search"}
          </span>
        </Link>
        {/*  */}
        <Link
          to="home"
          className="left-tab__app-nav__home left-tab__app-nav__icon-text left-tab__app-nav__icon-text--clicked"
          onClick={() => {
            props.handleMainRightChange("Home");
          }}
        >
          <img className="left-tab__app-nav__logo" src={home} alt="home icon" />
          <span className="left-tab__app-nav__home__text left-tab__app-nav__text">
            {"Home"}
          </span>
        </Link>
        {/*  */}
        <Link
          to="library"
          className="left-tab__app-nav__library left-tab__app-nav__icon-text"
          onClick={() => {
            props.handleMainRightChange("Library");
          }}
        >
          <img className="left-tab__app-nav__logo" src={lib} alt="lib icon" />
          <span className="left-tab__app-nav__library__text left-tab__app-nav__text">
            {"Your Library"}
          </span>
        </Link>
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
