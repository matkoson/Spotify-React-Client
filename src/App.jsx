import React, { Component } from "react";
import "./App.sass";
import logo from "./assets/svg/logo.svg";
import search from "./assets/svg/search.svg";
import home from "./assets/svg/home.svg";
import lib from "./assets/svg/lib.svg";
import "./assets/fonts/Rubik-Light.woff";
import RecentlyPlayed from "./Components/RecentlyPlayed";
import "./Components/RecentlyPlayed.sass";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { token: "" };
    this.clientID = "25be93ebc6a047cfbf6ed82187d766b4";
    this.getPlaylists = this.getPlaylists.bind(this);
  }
  componentDidMount() {
    console.log(this.state);
    const currAd = window.location.href;
    if (/callback/.test(currAd)) {
      const regexToken = /access_token=(.*)&token/g;
      const token = regexToken.exec(currAd)[1];
      this.setState({ token });
      return this.getPlaylists(token);
    } else if (/access_denied/.test(currAd)) {
      console.error("Access denied by the user!");
    }
    if (!this.state.token) {
      const scopes =
        "playlist-read-private playlist-read-collaborative user-modify-playback-state user-top-read user-read-recently-played user-read-playback-state user-read-currently-playing user-modify-playback-state";
      const accessReq = `https:accounts.spotify.com/authorize?client_id=${
        this.clientID
      }&scope=${encodeURIComponent(
        scopes
      )}&response_type=token&redirect_uri=http://localhost:3000/callback`;
      console.log("hopla w nieznane");
      window.location.href = accessReq;
    }
  }
  getPlaylists(token) {
    console.log("on", this.state);
    const auth = `Bearer ${token}`;
    console.log(auth);
    const playlists = axios
      .get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: auth
        }
      })
      .then(res => console.log(res.data.items.map(e => e.name)));
  }
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

// http://localhost:3000/callback#access_token=BQDQWFwGEss__M3kawusvVJTeEBBt1mTKHHm6Gyy68jXvaHKz0lKuD3SxHHzFiUcCmKyI3j340utLFnDasrFOkZNRRtU_7uaMazZacbVN9vL4zmng1q8ZsPYHZ7IZGU9sr-CQ3NsVsKANihTOpRJj7LAG4YFaF4-VUI&token_type=Bearer&expires_in=3600
