import React from "react";
import search from "../../assets/svg/search.svg";
import home from "../../assets/svg/home.svg";
import lib from "../../assets/svg/lib.svg";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Styles/Components/desktop.scss";
import { animated, useTransition } from "react-spring";
export default function Desktop(props) {
  const transition = useTransition(null, "desktop", {
    from: { opacity: 0, transform: "translate3d(-40px,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    unique: true
  });
  return transition.map(({ key, props }) => (
    <div data-testid="navDesktop" className="desktop">
      <animated.div
        key={key}
        className="desktop__logo"
        style={props}
        onClick={() => {
          props.handleMainRightChange("Home");
        }}
      >
        <FontAwesomeIcon
          icon={["fab", "react"]}
          className="desktop__logo__main"
        />
        <div className="desktop__logo__title"> Spotify</div>
        <div className="desktop__logo__title-react">React</div>
      </animated.div>
      <div
        onClick={e => props.handleNavClick(e, "left")}
        className="desktop__app-nav"
      >
        {/*  */}
        <Link
          to={process.env.PUBLIC_URL + "/search"}
          className="desktop__app-nav__search desktop__app-nav__icon-text"
          onClick={() => {
            props.handleMainRightChange("Search");
          }}
        >
          <img
            className="desktop__app-nav__logo"
            src={search}
            alt="search icon"
          />
          <span className="desktop__app-nav__search__text desktop__app-nav__text">
            {"Search"}
          </span>
        </Link>
        {/*  */}
        <Link
          to={process.env.PUBLIC_URL + "/home"}
          className="desktop__app-nav__home desktop__app-nav__icon-text desktop__app-nav__icon-text--clicked"
          onClick={() => {
            props.handleMainRightChange("Home");
          }}
        >
          <img className="desktop__app-nav__logo" src={home} alt="home icon" />
          <span className="desktop__app-nav__home__text desktop__app-nav__text">
            {"Home"}
          </span>
        </Link>
        {/*  */}
        <Link
          to={process.env.PUBLIC_URL + "/library"}
          className="desktop__app-nav__library desktop__app-nav__icon-text"
          onClick={() => {
            props.handleMainRightChange("Library");
          }}
        >
          <img className="desktop__app-nav__logo" src={lib} alt="lib icon" />
          <span className="desktop__app-nav__library__text desktop__app-nav__text">
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
  ));
}
