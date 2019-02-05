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
import Charts from "./Components/Charts/Charts";
import Genres from "./Components/Genres/Genres";
import "./globalStyles.sass";
import cdnLoader from "./loadScript";
import initSDK from "./APIconnection/initSDK";
import { countryCodes } from "./assets/countries";
import {
  setToken,
  getToken,
  getFtrdPlay,
  getRecent,
  getTopArtist,
  playerRequest
} from "./APIconnection/APImethods";

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
      playerState: "",
      shuffle: false,
      deviceName: "",
      deviceTabOn: false,
      getCategories: "",
      getCategoryPlaylists: [],
      PolandTop: "",
      currGrad:
        "linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)"
    };
    //
    //
    //
    this.clientID = "25be93ebc6a047cfbf6ed82187d766b4";
    this.initSDK = initSDK.bind(this);
    this.setToken = setToken.bind(this);
    this.getToken = getToken.bind(this);
    this.getRecent = getRecent.bind(this);
    this.getFtrdPlay = getFtrdPlay.bind(this);
    this.getTopArtist = getTopArtist.bind(this);
    this.playerRequest = playerRequest.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.gradientCarousel = this.gradientCarousel.bind(this);
    this.makeApropriateFetch = this.makeApropriateFetch.bind(this);
    this.handleDeviceTabClick = this.handleDeviceTabClick.bind(this);
    this.gradientArr = [
      "linear-gradient(to right, #f9d423 0%, #ff4e50 100%)",
      "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)",
      "linear-gradient(to right, #f9d423 0%, #ff4e50 100%)",
      "linear-gradient(45deg, #874da2 0%, #c43a30 100%)",
      "linear-gradient(to right, #434343 0%, black 100%)",
      "linear-gradient(to top, #f43b47 0%, #453a94 100%)",
      "linear-gradient(to top, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%)",
      "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)",
      "linear-gradient(to right, #2575fc 100%,#6a11cb 0%)",
      " linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%)"
    ];
    this.countryCodes = countryCodes;
  }
  componentDidMount() {
    // this.gradientCarousel();
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
  gradientCarousel() {
    this.gradientChange = setInterval(() => {
      console.log(
        "changing",
        this.gradientArr[Math.round(Math.random() * this.gradientArr.length)]
      );
      this.setState({
        currGrad: this.gradientArr[
          Math.round(Math.random() * this.gradientArr.length)
        ]
      });
    }, 1000 * 10);
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
  handleDeviceTabClick(e) {
    e.target.style.color === "rgb(255, 255, 255)"
      ? (e.target.style.color = "#1db954")
      : (e.target.style.color = "rgb(255, 255, 255)");
    this.setState({ deviceTabOn: !this.state.deviceTabOn });
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
  makeApropriateFetch(chosenView) {
    if (chosenView === "Charts") {
      this.playerRequest("getCategoryPlaylists", {
        category: "toplists",
        country: "PL"
      });
      console.log(this.countryCodes);
      let visited = [],
        index;
      for (let i = 0; i < 20; i += 1) {
        index = Math.round(Math.random() * (this.countryCodes.length - 1));
        while (
          visited.includes(index) //making sure to not fetch one country's playlists twice
        )
          index = Math.round(Math.random() * (this.countryCodes.length - 1));
        visited.push(index);
        console.log(visited, this.state.getCategoryPlaylists);
        this.playerRequest("getCategoryPlaylists", {
          category: "toplists",
          country: this.countryCodes[index].isoCode
        });
      }
    } else if (chosenView === "Genres") {
      this.playerRequest("getCategories");
    }
  }

  handleNavClick(ele, navType) {
    // eslint-disable-next-line
    let allNavElems = Array.from(ele.currentTarget.children);
    let chosenOne = ele.target;
    let basicClass, clickedClass, strategy, chosenView;
    if (navType === "right") {
      strategy = "innerText";
      basicClass = "right-tab__right-nav__element";
      clickedClass = "right-tab__right-nav__element--clicked";
      chosenView = ele.target.id;
      this.makeApropriateFetch(chosenView);
      //depending on the chosen view, make the right API request
      this.setState({
        rightTabView: chosenView,
        currGrad: this.gradientArr[
          Math.round(Math.random() * this.gradientArr.length)
        ]
      });
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
    let rightTabView;
    switch (this.state.rightTabView) {
      case "Charts":
        rightTabView = (
          <Charts
            APIrequest={this.playerRequest}
            getCategories={this.state.getCategories}
            getCategoryPlaylists={this.state.getCategoryPlaylists}
            currentlyPlaying={this.state.currentlyPlaying}
            playerState={this.state.playerState}
            PolandTop={this.state.PolandTop}
          />
        );
        break;
      case "Genres":
        rightTabView = (
          <Genres
            getCategories={this.state.getCategories}
            currentlyPlaying={this.state.currentlyPlaying}
            playerState={this.state.playerState}
            APIrequest={this.playerRequest}
          />
        );
        break;
      default:
        rightTabView = (
          <HomeScreen
            playerState={this.state.playerState}
            featured={this.state.featured}
            recent={this.state.recentlyPlayed}
            relatedTop={this.state.topRelatedArtists}
            topArtist={this.state.topArtist}
            APIrequest={this.playerRequest}
            currentlyPlaying={this.state.currentlyPlaying}
            player={this.player}
          />
        );
        break;
    }
    return (
      <main
        className="app"
        style={{
          backgroundImage: this.state.currGrad,
          transitionDuration: "1.5s"
        }}
        onClick={() =>
          this.state.deviceTabOn ? this.setState({ deviceTabOn: false }) : null
        }
        //click anywhere in the app to make deviceTab disappear
      >
        <LeftTab handleNavClick={this.handleNavClick}>
          <RecentlyPlayed
            handleNavClick={this.handleNavClick}
            rawRecPlayed={this.state.recentlyPlayed}
            player={this.player}
            APIrequest={this.playerRequest}
          />
        </LeftTab>
        <RightTab handleNavClick={this.handleNavClick}>{rightTabView}</RightTab>
        <PlayerBar
          recent={
            this.state.recentlyPlayed && this.state.recentlyPlayed.items[0]
          }
          handleDeviceTabClick={this.handleDeviceTabClick}
          isDeviceTabOn={this.state.deviceTabOn}
          player={this.player}
          deviceId={this.state.deviceID}
          deviceName={this.state.deviceName}
          APIrequest={this.playerRequest}
          currentlyPlaying={this.state.currentlyPlaying}
          currentPlayback={this.state.currentPlayback}
        />
      </main>
    );
  }
}

export default App;
