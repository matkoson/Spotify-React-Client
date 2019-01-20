import React, { Component } from "react";
import "./App.sass";
import logo from "./assets/svg/logo.svg";
import search from "./assets/svg/search.svg";
import home from "./assets/svg/home.svg";
import lib from "./assets/svg/lib.svg";
import "./assets/fonts/Rubik-Light.woff";

class App extends Component {
  render() {
    return (
      <main className="app">
        <div className="left-tab">
          <div className="left-tab__logo">
            <img
              className="left-tab__logo__logo"
              src={logo}
              alt="spotify-logo+text"
            />
          </div>
          <div className="left-tab__app-nav">
            <div className="left-tab__app-nav__search left-tab__app-nav__icon-text">
              <img src={search} alt="search icon" />
              <span className="left-tab__app-nav__search__text left-tab__app-nav__text">
                {"Search"}
              </span>
            </div>
            {/*  */}
            <div className="left-tab__app-nav__home left-tab__app-nav__icon-text">
              <img src={home} alt="home icon" />
              <span className="left-tab__app-nav__home__text left-tab__app-nav__text">
                {"Home"}
              </span>
            </div>
            {/*  */}
            <div className="left-tab__app-nav__library left-tab__app-nav__icon-text">
              <img src={lib} alt="lib icon" />
              <span className="left-tab__app-nav__library__text left-tab__app-nav__text">
                {"Your Library"}
              </span>
            </div>
            {/*  */}
          </div>
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        <div className="right-tab" />
      </main>
    );
  }
}

export default App;
