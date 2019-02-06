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
import CatInnerView from "./Components/CatInnerView/CatInnerView";
import "./globalStyles.sass";
import cdnLoader from "./loadScript";
import initSDK from "./APIconnection/initSDK";
import { countryCodes } from "./assets/countries";
import {
  makeApropriateFetch,
  handleNavClick,
  handleDeviceTabClick,
  handleResize,
  gradientCarousel,
  handleMainRightViewChange,
  handleReturnHome
} from "./AppMethods/AppMethods";
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
      mainRightView: "Home",
      rightTabView: "",
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
    this.handleResize = handleResize.bind(this);
    this.playerRequest = playerRequest.bind(this);
    this.handleNavClick = handleNavClick.bind(this);
    this.gradientCarousel = gradientCarousel.bind(this);
    this.handleReturnHome = handleReturnHome.bind(this);
    this.makeApropriateFetch = makeApropriateFetch.bind(this);
    this.handleDeviceTabClick = handleDeviceTabClick.bind(this);
    this.handleMainRightViewChange = handleMainRightViewChange.bind(this);
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
            handleMainRightViewChange={this.handleMainRightViewChange}
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
        <LeftTab
          handleNavClick={this.handleNavClick}
          handleReturnHome={this.handleReturnHome}
        >
          <RecentlyPlayed
            handleNavClick={this.handleNavClick}
            rawRecPlayed={this.state.recentlyPlayed}
            player={this.player}
            APIrequest={this.playerRequest}
          />
        </LeftTab>
        {this.state.mainRightView === "Home" ? (
          <RightTab handleNavClick={this.handleNavClick}>
            {rightTabView}
          </RightTab>
        ) : (
          <CatInnerView
            getCategories={this.state.getCategories}
            APIrequest={this.playerRequest}
          />
        )}
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
