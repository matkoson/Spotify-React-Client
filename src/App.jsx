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
import NewReleases from "./Components/NewReleases/NewReleases";
import Discover from "./Components/Discover/Discover";
import Search from "./Components/Search/Search";
import "./Components/Search/Search.sass";
import CatInnerView from "./Components/CatInnerView/CatInnerView";
import "./globalStyles.sass";
import "./Components/CatInnerView/CatInnerView.sass";
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
  handleMainRightChange
} from "./AppMethods/AppMethods";
import {
  setToken,
  getToken,
  getFtrdPlay,
  getRecent,
  getTopArtist,
  playerRequest,
  getContentFromMultiArtists
} from "./APIconnection/APImethods";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alreadyViewed: [],
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
      getCategory: "",
      getCategoryPlaylists: [],
      getMultipleArtistAlbums: [],
      PolandTop: "",
      currGrad: "linear-gradient(105deg, rgba(112,45,58,1) 25%, #282828 56%)"
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
    this.handleMainRightChange = handleMainRightChange.bind(this);
    this.makeApropriateFetch = makeApropriateFetch.bind(this);
    this.handleDeviceTabClick = handleDeviceTabClick.bind(this);
    this.getContentFromMultiArtists = getContentFromMultiArtists.bind(this);
    this.handleMainRightViewChange = handleMainRightViewChange.bind(this);
    this.gradientArr = [
      "linear-gradient(105deg, rgba(67,13,107,1) 25%, #282828 56%);",
      "linear-gradient(105deg, rgba(13,28,107,1) 25%, #282828 56%)",
      "linear-gradient(105deg, rgba(13,82,107,1) 25%, #282828 56%)",
      "linear-gradient(105deg, rgba(124,113,10,1) 25%, #282828 56%)",
      "linear-gradient(105deg, rgba(102,37,37,1) 25%, #282828 56%)",
      "linear-gradient(105deg, rgba(127,22,7,1) 25%, #282828 56%)",
      " linear-gradient(105deg, rgba(52,54,81,1) 25%, #282828 56%)",
      "linear-gradient(105deg, rgba(81,52,79,1) 25%, #282828 56%)",
      "linear-gradient(105deg, rgba(107,13,20,1) 25%, #282828 56%)"
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
    let rightOverride;
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
            makeApropriateFetch={this.makeApropriateFetch}
            getCategories={this.state.getCategories}
            currentlyPlaying={this.state.currentlyPlaying}
            playerState={this.state.playerState}
            APIrequest={this.playerRequest}
            handleMainRightViewChange={this.handleMainRightViewChange}
          />
        );
        break;
      case "New Releases":
        rightTabView = (
          <NewReleases
            getNewReleases={this.state.getNewReleases}
            playerState={this.state.playerState}
            APIrequest={this.playerRequest}
            PolandTop={this.state.PolandTop}
            getCategory={this.state.getCategory}
            currentlyPlaying={this.state.currentlyPlaying}
          />
        );
        break;
      case "Discover":
        rightTabView = (
          <Discover
            getMultipleArtistAlbums={this.state.getMultipleArtistAlbums}
            playerState={this.state.playerState}
            APIrequest={this.playerRequest}
            currentlyPlaying={this.state.currentlyPlaying}
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
    }

    switch (this.state.mainRightView) {
      case "Search":
        rightOverride = <Search />;

        break;
      default:
        rightOverride = (
          <CatInnerView
            APIrequest={this.playerRequest}
            PolandTop={this.state.PolandTop}
            getCategory={this.state.getCategory}
            currentlyPlaying={this.state.currentlyPlaying}
            getCategoryPlaylists={this.state.getCategoryPlaylists}
            playerState={this.state.playerState}
          />
        );
    }
    console.log(rightOverride, "OVERRIDE");
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
          handleMainRightChange={this.handleMainRightChange}
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
          <React.Fragment> {rightOverride}</React.Fragment>
        )}
        <PlayerBar
          recent={
            this.state.recentlyPlayed && this.state.recentlyPlayed.items[0]
          }
          handleDeviceTabClick={this.handleDeviceTabClick}
          isDeviceTabOn={this.state.deviceTabOn}
          player={this.player}
          playerState={this.state.playerState}
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
