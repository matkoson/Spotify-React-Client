import React, { Component } from "react";
import "./App.sass";
import logo from "./assets/svg/logo.svg";
import search from "./assets/svg/search.svg";
import home from "./assets/svg/home.svg";
import lib from "./assets/svg/lib.svg";
import "./assets/fonts/Rubik-Light.woff";
import RecentlyPlayed from "./Components/RecentlyPlayed";
import "./Components/RecentlyPlayed.sass";

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
            <div className="left-tab__app-nav__home left-tab__app-nav__icon-text">
              <img
                className="left-tab__app-nav__logo"
                src={home}
                alt="home icon"
              />
              <span className="left-tab__app-nav__home__text left-tab__app-nav__text">
                {"Home"}
              </span>
            </div>
            {/*  */}
            <div className="left-tab__app-nav__library left-tab__app-nav__icon-text">
              <img
                className="left-tab__app-nav__logo"
                src={lib}
                alt="lib icon"
              />
              <span className="left-tab__app-nav__library__text left-tab__app-nav__text">
                {"Your Library"}
              </span>
            </div>
            {/*  */}
          </div>
          <RecentlyPlayed />
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        <div className="right-tab">
          <ul className="right-tab__right-nav">
            <li className="right-tab__right-nav__element">FEATURED</li>
            <li className="right-tab__right-nav__element">PODCASTS</li>
            <li className="right-tab__right-nav__element">CHARTS</li>
            <li className="right-tab__right-nav__element">GENRES & MOODS</li>
            <li className="right-tab__right-nav__element">NEW RELEASES</li>
            <li className="right-tab__right-nav__element">DISCOVER</li>
          </ul>{" "}
        </div>
      </main>
    );
  }
}

export default App;

// window.location.href =
//   "https://accounts.spotify.com/authorize?client_id=230be2f46909426b8b80cac36446b52a&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback";
