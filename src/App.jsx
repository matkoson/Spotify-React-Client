import React, { Component, Suspense, lazy } from "react";
import "./Styles/Styles.scss";
import { Router, navigate } from "@reach/router";
import Desktop from "./Components/Desktop/Desktop";
import RightTab from "./Components/RightTab/RightTab";
import "./assets/fonts/Rubik-Light.woff";
import HomeScreen from "./Components/HomeScreen/HomeScreen";
import PlayerBar from "./Components/PlayerBar/PlayerBar";
import Library from "./Components/Library/Library";
import cdnLoader from "./loadScript";
import initSDK from "./APIconnection/initSDK";
import { countryCodes } from "./assets/countries";
import {
  handleNavClick,
  handleDeviceTabClick,
  handleResize,
  gradientCarousel,
  handleMainRightViewChange,
  handleMainRightChange,
  handleAlbumRightOverride,
  handleMobileNavToggle
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
import { Provider } from "./Context/Context";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faStepForward,
  faStepBackward,
  faRandom,
  faTablet,
  faVolumeUp,
  faVolumeMute,
  faRedo,
  faSearch,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";
library.add(
  faPlay,
  faStepForward,
  faStepBackward,
  faRandom,
  faTablet,
  faVolumeUp,
  faVolumeMute,
  faRedo,
  faSearch,
  faReact,
  faSpinner
);
// import Mobile from "./Components/Mobile/Mobile";
const Mobile = lazy(() => import("./Components/Mobile/Mobile"));
// import Charts from "./Components/Charts/Charts";
const Charts = lazy(() => import("./Components/Charts/Charts"));
// import Album from "./Components/Album/Album";
const Album = lazy(() => import("./Components/Album/Album"));
// import Genres from "./Components/Genres/Genres";
const Genres = lazy(() => import("./Components/Genres/Genres"));
// import NewReleases from "./Components/NewReleases/NewReleases";
const NewReleases = lazy(() => import("./Components/NewReleases/NewReleases"));
// import Discover from "./Components/Discover/Discover";
const Discover = lazy(() => import("./Components/Discover/Discover"));
// import Search from "./Components/Search/Search";
const Search = lazy(() => import("./Components/Search/Search"));
// import CatInnerView from "./Components/CatInnerView/CatInnerView";
const CatInnerView = lazy(() =>
  import("./Components/CatInnerView/CatInnerView")
);
// import RecentlyPlayed from "./Components/RecentlyPlayed/RecentlyPlayed";
const RecentlyPlayed = lazy(() =>
  import("./Components/RecentlyPlayed/RecentlyPlayed")
);

export default class App extends Component {
  constructor(props) {
    super(props);
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
    this.getMinsSecs = this.getMinsSecs.bind(this);
    this.playerRequest = playerRequest.bind(this);
    this.handleNavClick = handleNavClick.bind(this);
    this.gradientCarousel = gradientCarousel.bind(this);
    this.handleMobileNavToggle = handleMobileNavToggle.bind(this);
    this.handleAlbumRightOverride = handleAlbumRightOverride.bind(this);
    this.handleMainRightChange = handleMainRightChange.bind(this);
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
    this.state = {
      alreadyViewed: [],
      mobile: false,
      mainRightView: "Home",
      searchQuery: "",
      rightTabView: "",
      auth: "",
      recentlyPlayed: "",
      featured: "",
      topRelatedArtists: "",
      topArtist: "",
      getAlbum: "",
      getUserPlaylists: "",
      getUserSavedAlbums: "",
      getUserSavedTracks: "",
      audio: "",
      tokenSDK: "",
      playerState: "",
      shuffle: false,
      albumViewOption: "",
      deviceName: "",
      deviceTabOn: false,
      getCategories: "",
      getCategory: "",
      getCategoryPlaylists: [],
      getMultipleArtistAlbums: [],
      getPlaylist: "",
      getPlaylistTracks: "",
      getPlaylistCover: "",
      PolandTop: "",
      currGrad: "linear-gradient(105deg, rgba(112,45,58,1) 25%, #282828 56%)",
      valueContext: {
        playerState: "",
        APIrequest: this.playerRequest,
        handleAlbumRightOverride: this.handleAlbumRightOverride,
        currentlyPlaying: "",
        getMinsSecs: this.getMinsSecs,
        handleMainRightViewChange: this.handleMainRightViewChange
      }
    };
    this.homeRef = React.createRef();
  }
  componentDidMount() {
    import("./fontBundle");
    if (this.state.mainRightView === "Home" && this.homeRef.current)
      this.homeRef.current.scrollIntoView();
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
      navigate("home");
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
      if (!this.state.recentlyPlayed) this.getRecent();
      if (!this.state.featured) this.getFtrdPlay();
      if (!this.state.topRelatedArtists) this.getTopArtist();
    }
  }
  getMinsSecs = (ms = 0) => {
    ms = (ms - (ms % 1000)) / 1000;
    return {
      min: String(
        Math.floor(ms / 60) < 10
          ? `0${Math.floor(ms / 60)}`
          : Math.floor(ms / 60)
      ),
      sec: String(ms % 60 < 10 ? `0${ms % 60}` : ms % 60)
    };
  };

  render() {
    return (
      <main
        path="/"
        ref={this.homeRef}
        className="app"
        style={{
          backgroundImage: this.state.currGrad,
          transitionDuration: "1.5s"
        }}
        onClick={() =>
          this.state.deviceTabOn || this.state.mobile
            ? this.setState({ deviceTabOn: false, mobile: false })
            : null
        }
        //click anywhere in the app to make deviceTab disappear + same thing with mobile-nav
      >
        <Provider value={this.state.valueContext}>
          <Suspense fallback={<div>Loading...</div>}>
            <div path="/*" class="left-tab">
              <Mobile
                path="/*"
                handleMainRightChange={this.handleMainRightChange}
                handleMobileNavToggle={this.handleMobileNavToggle}
                mobile={this.state.mobile}
              />
              <Desktop
                path="/*"
                handleNavClick={this.handleNavClick}
                handleMainRightChange={this.handleMainRightChange}
              >
                <RecentlyPlayed
                  path="/*"
                  handleNavClick={this.handleNavClick}
                  rawRecPlayed={this.state.recentlyPlayed}
                  player={this.player}
                  //
                  APIrequest={this.playerRequest}
                />
              </Desktop>
            </div>
            {/*  */}
            {/*  */}
            {/*  */}

            <Router primary={false}>
              <RightTab
                path="home"
                mobile={this.state.mobile}
                handleNavClick={this.handleNavClick}
              >
                <HomeScreen //refactored
                  path="/"
                  featured={this.state.featured}
                  recent={this.state.recentlyPlayed}
                  relatedTop={this.state.topRelatedArtists}
                  topArtist={this.state.topArtist}
                  player={this.player}
                  //
                />
                <Charts //refactored
                  path="charts"
                  getCategories={this.state.getCategories}
                  getCategoryPlaylists={this.state.getCategoryPlaylists}
                  PolandTop={this.state.PolandTop}
                  countryCodes={this.countryCodes}
                  //
                />
                <Genres //refactored
                  path="genres-moods"
                  getCategories={this.state.getCategories}
                  //
                />
                <NewReleases //refactored
                  path="new-releases"
                  getNewReleases={this.state.getNewReleases}
                />
                <Discover //refactored
                  path="discover"
                  getMultipleArtistAlbums={this.state.getMultipleArtistAlbums}
                  idList={
                    this.state.topRelatedArtists &&
                    this.state.topRelatedArtists.map(e => e.id)
                  }
                />
              </RightTab>

              {/*  */}
              {/*  */}
              {/*  */}
              <Search
                path="search"
                searchQuery={this.state.searchQuery}
                player={this.player}
                //
              />
              <Library
                path="library" //refactored
                getUserPlaylists={this.state.getUserPlaylists}
                getUserSavedAlbums={this.state.getUserSavedAlbums}
                getUserSavedTracks={this.state.getUserSavedTracks}
                //
              />
              <Album
                path="album"
                ref={this.albumRef}
                getAlbum={this.state.getAlbum}
                getPlaylist={this.state.getPlaylist}
                getPlaylistCover={this.state.getPlaylistCover}
                getPlaylistTracks={this.state.getPlaylistTracks}
                albumViewOption={this.state.albumViewOption}
              />
              <CatInnerView
                path="category"
                PolandTop={this.state.PolandTop}
                getCategory={this.state.getCategory}
                getCategoryPlaylists={this.state.getCategoryPlaylists}
                //
                currentlyPlaying={this.state.currentlyPlaying}
                playerState={this.state.playerState}
                APIrequest={this.playerRequest}
              />
              {/*  */}
              {/*  */}
              {/*  */}
            </Router>
            <PlayerBar
              path="/*" //refactored
              recent={
                this.state.recentlyPlayed && this.state.recentlyPlayed.items[0]
              }
              handleDeviceTabClick={this.handleDeviceTabClick}
              isDeviceTabOn={this.state.deviceTabOn}
              player={this.player}
              deviceId={this.state.deviceID}
              deviceName={this.state.deviceName}
              currentPlayback={this.state.currentPlayback}
              // + context
            />
          </Suspense>
        </Provider>
      </main>
    );
  }
}
