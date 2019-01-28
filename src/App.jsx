import React, { Component } from "react";
import "./App.sass";
import logo from "./assets/svg/logo.svg";
import search from "./assets/svg/search.svg";
import home from "./assets/svg/home.svg";
import lib from "./assets/svg/lib.svg";
import "./assets/fonts/Rubik-Light.woff";
import RecentlyPlayed from "./Components/RecentlyPlayed/RecentlyPlayed";
import "./Components/RecentlyPlayed/RecentlyPlayed.sass";
import HomeScreen from "./Components/HomeScreen/HomeScreen";
import "./Components/HomeScreen/HomeScreen.sass";
import PlayerBar from "./Components/PlayerBar/PlayerBar";
import "./Components/PlayerBar/PlayerBar.sass";
import "./globalStyles.sass";
import {
  setToken,
  getToken,
  getFtrdPlay,
  getRecent,
  getTopArtist,
  playerRequest
} from "./APImethods";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: "",
      recentlyPlayed: "",
      featured: "",
      topRelatedArtists: "",
      topArtist: "",
      currentlyPlaying: ""
    };
    //
    //
    //
    this.clientID = "25be93ebc6a047cfbf6ed82187d766b4";
    this.setToken = setToken.bind(this);
    this.getToken = getToken.bind(this);
    this.getRecent = getRecent.bind(this);
    this.getFtrdPlay = getFtrdPlay.bind(this);
    this.getTopArtist = getTopArtist.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.playerRequest = playerRequest.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    //
    const currAd = window.location.href;
    if (/callback/.test(currAd)) {
      return this.setToken(currAd);
    } else if (/access_denied/.test(currAd)) {
      console.error("Access denied by the user!");
    }
    //
    if (!this.state.token) {
      this.getToken();
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
      if (!this.state.currentlyPlaying) {
        this.playerRequest("currentlyPlaying");
      } else {
        console.log(this.state.currentlyPlaying);
      }
      if (!this.state.recentlyPlayed) this.getRecent();
      if (!this.state.featured) this.getFtrdPlay();
      if (!this.state.topRelatedArtists) this.getTopArtist();
    }
  }

  handleNavClick(ele, navType) {
    // eslint-disable-next-line
    let allNavElems = Array.from(ele.currentTarget.children);
    let chosenOne = ele.target;
    let basicClass, clickedClass, strategy;
    if (navType === "right") {
      strategy = "innerText";
      basicClass = "right-tab__right-nav__element";
      clickedClass = "right-tab__right-nav__element--clicked";
    } else if (navType === "left") {
      strategy = "offsetTop";
      basicClass = "left-tab__app-nav__search left-tab__app-nav__icon-text";
      clickedClass = "left-tab__app-nav__icon-text--clicked";
      chosenOne = chosenOne.offsetParent;
    } else if (navType === "recent") {
      strategy = "offsetTop";
      basicClass = "recently-played__element ";
      clickedClass =
        "left-tab__app-nav__icon-text--clicked recently-played__element--modified";
    }

    allNavElems = allNavElems.forEach(e => {
      if (e[strategy] === chosenOne[strategy]) {
        e.className = `${basicClass} ${clickedClass}`;
      } else if (
        navType === "recent" &&
        e.className === chosenOne.parentNode.className
      ) {
        e.className = `${basicClass} ${clickedClass}`;
        e.dataset.clicked = true;
      } else {
        e.className = basicClass;
        if (e.dataset && e.dataset.clicked) e.dataset.clicked = false;
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
        <PlayerBar
          currentlyPlaying={this.state.currPlay || this.state.currentlyPlaying}
        />
      </main>
    );
  }
}

export default App;

// window.location.href =
//   "https://accounts.spotify.com/authorize?client_id=230be2f46909426b8b80cac36446b52a&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback";

// http://localhost:3000/callback#access_token=BQDQWFwGEss__M3kawusvVJTeEBBt1mTKHHm6Gyy68jXvaHKz0lKuD3SxHHzFiUcCmKyI3j340utLFnDasrFOkZNRRtU_7uaMazZacbVN9vL4zmng1q8ZsPYHZ7IZGU9sr-CQ3NsVsKANihTOpRJj7LAG4YFaF4-VUI&token_type=Bearer&expires_in=3600
