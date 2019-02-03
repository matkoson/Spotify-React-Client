import React, { Component } from "react";
import "./App.sass";
import LeftTab from "./Components/LeftTab/LeftTab";
import RightTab from "./Components/RightTab/RightTab";
import "./assets/fonts/Rubik-Light.woff";
import RecentlyPlayed from "./Components/RecentlyPlayed/RecentlyPlayed";
import "./Components/RecentlyPlayed/RecentlyPlayed.sass";
import HomeScreen from "./Components/HomeScreen/HomeScreen";
import "./Components/HomeScreen/HomeScreen.sass";
import PlayerBar from "./Components/PlayerBar/PlayerBar";
import "./Components/PlayerBar/PlayerBar.sass";
import "./globalStyles.sass";
import cdnLoader from "./loadScript";
import initSDK from "./initSDK";
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
      currentlyPlaying: "",
      audio: "",
      tokenSDK: "",
      playbackSDK: "",
      shuffle: false
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
    this.initSDK = initSDK.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    //Initiate Spotify SDK Player through cdn script
    cdnLoader({
      src: "https://sdk.scdn.co/spotify-player.js",
      id: "SDK",
      callback: () => {
        this.setState({ SDKloaded: true });
        return (window.onSpotifyWebPlaybackSDKReady = () => {
          this.initSDK(this.state.tokenSDK);
        });
      }
    });
    //
    //
    const currAd = window.location.href;
    if (/callback/.test(currAd)) {
      this.setToken(currAd);
      if (this.state.SDK) {
        return this.checkSDK();
      } else {
        return;
      }
    } else if (/access_denied/.test(currAd)) {
      console.error("Access denied by the user");
    }
    //
    if (!this.state.auth) {
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
        // console.log(this.state.currentlyPlaying);
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
        <LeftTab handleNavClick={this.handleNavClick}>
          <RecentlyPlayed
            handleNavClick={this.handleNavClick}
            rawRecPlayed={this.state.recentlyPlayed}
          />
        </LeftTab>
        <RightTab handleNavClick={this.handleNavClick}>
          <HomeScreen
            featured={this.state.featured}
            recent={this.state.recentlyPlayed}
            relatedTop={this.state.topRelatedArtists}
            topArtist={this.state.topArtist}
            APIrequest={this.playerRequest}
            currentlyPlaying={this.state.currentlyPlaying}
          />
        </RightTab>
        <PlayerBar
          recent={
            this.state.recentlyPlayed && this.state.recentlyPlayed.items[0]
          }
          SDK={this.player}
          deviceId={this.state.deviceID}
          // playbackSDK={this.state.playbackSDK}
          APIrequest={this.playerRequest}
          currentlyPlaying={this.state.currentlyPlaying}
          currentPlayback={this.state.currentPlayback}
        />
      </main>
    );
  }
}

export default App;
