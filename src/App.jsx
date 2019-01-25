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
import HomeScreen from "./Components/HomeScreen/HomeScreen";
import "./Components/HomeScreen/HomeScreen.sass";
import "./globalStyles.sass";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: "",
      recentlyPlayed: "",
      featured: "",
      topRelatedArtists: "",
      topArtist: ""
    };
    //
    //
    //
    this.clientID = "25be93ebc6a047cfbf6ed82187d766b4";
    this.getRecent = this.getRecent.bind(this);
    this.getFtrdPlay = this.getFtrdPlay.bind(this);
    this.getTopArtist = this.getTopArtist.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    const currAd = window.location.href;
    if (/callback/.test(currAd)) {
      const regexToken = /access_token=(.*)&token/g;
      const token = regexToken.exec(currAd)[1];
      return this.setState({
        auth: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      });
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
      window.location.href = accessReq;
    }
  }
  handleResize() {
    if (!this.state.windowWidth) {
      this.setState({ windowWidth: window.innerWidth });
    } else {
      if (this.state.windowWidth > 1000 && window.innerWidth < 1000) {
        this.setState({ windowWidth: window.innerWidth });
      }
      if (this.state.windowWidth < 1000 && window.innerWidth > 1000)
        this.setState({ windowWidth: window.innerWidth });
    }
  }
  componentDidUpdate() {
    if (this.state.auth) {
      if (!this.state.recentlyPlayed) this.getRecent();
      if (!this.state.featured) this.getFtrdPlay();
      if (!this.state.topRelatedArtists) this.getTopArtist();
    }
  }
  getFtrdPlay() {
    axios
      .get(
        "https://api.spotify.com/v1/browse/featured-playlists",
        this.state.auth
      )
      .then(res => this.setState({ featured: res.data }));
  }
  getRecent() {
    axios
      .get(
        "https://api.spotify.com/v1/me/player/recently-played",
        this.state.auth
      )
      .then(res => this.setState({ recentlyPlayed: res.data }));
  }
  getTopArtist() {
    // let name,topID,genres
    return axios
      .get("https://api.spotify.com/v1/me/top/artists", this.state.auth)
      .then(res => {
        var { id, name } = res.data.items[0];
        return axios
          .get(
            `https://api.spotify.com/v1/artists/${id}/related-artists`,
            this.state.auth
          )
          .then(res =>
            this.setState({
              topRelatedArtists: res.data.artists.slice(0, 6),
              topArtist: name
            })
          )
          .catch(err => console.error(err));
      });
  }
  handleNavClick(ele, navType) {
    let allNavElems = Array.from(ele.currentTarget.children);
    let chosenOne = ele.target.innerText;
    let basicClass, clickedClass;
    console.log(chosenOne, allNavElems.map(e => e.offsetTop), navType);
    if (navType === "right") {
      basicClass = "right-tab__right-nav__element";
      clickedClass = "right-tab__right-nav__element--clicked";
    } else if (navType === "left") {
      basicClass = "left-tab__app-nav__search left-tab__app-nav__icon-text";
      clickedClass = "left-tab__app-nav__icon-text--clicked";
    } else if (navType === "recent") {
      basicClass = "recently-played__element";
      clickedClass = "left-tab__app-nav__icon-text--clicked";
    }
    allNavElems = allNavElems.forEach(e => {
      if (e.innerText.substr(1, e.innerText.length - 2) === chosenOne) {
        e.className = `${basicClass} ${clickedClass}`;
      } else {
        e.className = basicClass;
      }
    });
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
          <div
            onClick={e => this.handleNavClick(e, "left")}
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
            <div className="left-tab__app-nav__home left-tab__app-nav__icon-text left-tab__app-nav__icon-text--clicked">
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
          <RecentlyPlayed
            handleNavClick={this.handleNavClick}
            rawRecPlayed={this.state.recentlyPlayed}
          />
        </div>
        {/*  */}
        {/*  */}
        {/*  */}
        <div className="right-tab">
          <ul
            onClick={e => this.handleNavClick(e, "right")}
            className="right-tab__right-nav"
          >
            <li className="right-tab__right-nav__element right-tab__right-nav__element--clicked">
              FEATURED
            </li>
            <li className="right-tab__right-nav__element">PODCASTS</li>
            <li className="right-tab__right-nav__element">CHARTS</li>
            <li className="right-tab__right-nav__element">GENRES & MOODS</li>
            <li className="right-tab__right-nav__element">NEW RELEASES</li>
            <li className="right-tab__right-nav__element">DISCOVER</li>
          </ul>
          <HomeScreen
            featured={this.state.featured}
            recent={this.state.recentlyPlayed}
            relatedTop={this.state.topRelatedArtists}
            topArtist={this.state.topArtist}
          />
        </div>
      </main>
    );
  }
}

export default App;

// window.location.href =
//   "https://accounts.spotify.com/authorize?client_id=230be2f46909426b8b80cac36446b52a&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback";

// http://localhost:3000/callback#access_token=BQDQWFwGEss__M3kawusvVJTeEBBt1mTKHHm6Gyy68jXvaHKz0lKuD3SxHHzFiUcCmKyI3j340utLFnDasrFOkZNRRtU_7uaMazZacbVN9vL4zmng1q8ZsPYHZ7IZGU9sr-CQ3NsVsKANihTOpRJj7LAG4YFaF4-VUI&token_type=Bearer&expires_in=3600
