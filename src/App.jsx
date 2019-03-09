import React, { Component, Suspense, lazy } from "react";
import { Router, navigate } from "@reach/router";
import RightTab from "./Components/RightTab/RightTab";
import PlayerBar from "./Components/PlayerBar/PlayerBar";

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
  faPause,
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
import "./Styles/Base/app.scss";

import { faReact } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import initSDK from "./APIconnection/initSDK";
import HomeScreen from "./Components/HomeScreen/HomeScreen";
import "./Styles/Components/left-tab.scss";

library.add(
  faPlay,
  faPause,
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

const Desktop = lazy(() => import("./Components/Desktop/Desktop"));
const Mobile = lazy(() => import("./Components/Mobile/Mobile"));
const Charts = lazy(() => import("./Components/Charts/Charts"));
const Album = lazy(() => import("./Components/Album/Album"));
const Library = lazy(() => import("./Components/Library/Library"));
const Genres = lazy(() => import("./Components/Genres/Genres"));
const NewReleases = lazy(() => import("./Components/NewReleases/NewReleases"));
const Discover = lazy(() => import("./Components/Discover/Discover"));
const Search = lazy(() => import("./Components/Search/Search"));
const CatInnerView = lazy(() =>
  import("./Components/CatInnerView/CatInnerView")
);
const RecentlyPlayed = lazy(() =>
  import("./Components/RecentlyPlayed/RecentlyPlayed")
);
export default class App extends Component {
  constructor(props) {
    super(props);
    this.clientID = "25be93ebc6a047cfbf6ed82187d766b4";
    this.initSDK = initSDK.bind(this);
    this.setToken = setToken.bind(this);
    this.getToken = getToken.bind(this);
    this.getRecent = getRecent.bind(this);
    this.getFtrdPlay = getFtrdPlay.bind(this);
    this.getTopArtist = getTopArtist.bind(this);
    this.getMinsSecs = this.getMinsSecs.bind(this);
    this.playerRequest = playerRequest.bind(this);
    this.importDeferredMethods = this.importDeferredMethods.bind(this);
    this.getContentFromMultiArtists = getContentFromMultiArtists.bind(this);
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
        currentlyPlaying: "",
        getMinsSecs: this.getMinsSecs
      }
    };
    this.homeRef = React.createRef();
  }
  componentDidMount() {
    // console.log("APPSTATE", this.state);
    import("./loadFonts");
    if (!this.state.auth) {
      const currAd = window.location.href;
      if (/access_token/.test(currAd)) {
        this.setToken(currAd);
        navigate("home");
      } else if (/access_denied/.test(currAd)) {
        console.error("Access denied by the user");
      } else {
        this.getToken();
      }
      // if (this.state.mainRightView === "Home" && this.homeRef.current) {
      //   this.homeRef.current.scrollIntoView();
      // }
      window.addEventListener("resize", this.state.handleResize);
      // console.log("here i am");
      this.importDeferredMethods();
      lazy(
        import("./assets/countries").then(res => {
          return this.setState({ countryCodes: res.default() });
        })
      );
    }
  }
  importDeferredMethods() {
    // console.log("called");
    let handleNavClick,
      handleMainRightChange,
      handleAlbumRightOverride,
      handleMainRightViewChange,
      handleDeviceTabClick,
      handleResize,
      handleMobileNavToggle;
    lazy(
      import("./AppMethods/AppMethods").then(res => {
        // console.log("2. Started", Date.now());
        handleNavClick = res.handleNavClick.bind(this);
        handleMainRightChange = res.handleMainRightChange.bind(this);
        handleAlbumRightOverride = res.handleAlbumRightOverride.bind(this);
        handleMainRightViewChange = res.handleMainRightViewChange.bind(this);
        handleDeviceTabClick = res.handleDeviceTabClick.bind(this);
        handleResize = res.handleResize.bind(this);
        handleMobileNavToggle = res.handleMobileNavToggle.bind(this);
        return this.setState(
          {
            handleNavClick,
            handleDeviceTabClick,
            handleResize,
            handleMobileNavToggle,
            handleMainRightChange,
            valueContext: {
              ...this.state.valueContext,
              handleAlbumRightOverride,
              handleMainRightViewChange
            }
          }
          // () => console.log("3. Setted", Date.now())
        );
      })
    );
  }
  componentDidUpdate() {
    if (this.state.auth) {
      if (!this.state.recentlyPlayed) this.getRecent();
      if (!this.state.featured) this.getFtrdPlay();
      if (!this.state.topRelatedArtists) this.getTopArtist();
      if (
        this.state.recentlyPlayed &&
        this.state.featured &&
        this.state.topRelatedArtists &&
        (Desktop || Mobile) &&
        !this.state.SDKloaded
      )
        lazy(
          import("./loadScript").then(res =>
            res.default({
              src: "https://sdk.scdn.co/spotify-player.js",
              id: "SDK",
              callback: () => {
                this.setState(
                  { SDKloaded: true }
                  // () =>
                  // console.log("SDK LOADED", Date.now())
                );
                return (window.onSpotifyWebPlaybackSDKReady = () => {
                  this.initSDK(this.state.tokenSDK);
                });
              }
            })
          )
        );
      //Initiate Spotify SDK Player through cdn script
      // import cdnLoader from "./loadScript";
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
        path={process.env.PUBLIC_URL + "/"}
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
          <Suspense
            fallback={
              <FontAwesomeIcon
                spin={"true"}
                icon="spinner"
                style={{
                  position: "absolute",
                  top: `calc(50% - 100px)`,
                  left: `calc(50% - 100px)`,
                  height: "200px",
                  width: "200px"
                }}
              />
            }
          >
            <div path={process.env.PUBLIC_URL + "/*"} className="left-tab">
              <Mobile
                path={process.env.PUBLIC_URL + "/*"}
                handleMainRightChange={this.state.handleMainRightChange}
                handleMobileNavToggle={this.state.handleMobileNavToggle}
                mobile={this.state.mobile}
              />
              <Desktop
                path={process.env.PUBLIC_URL + "/*"}
                handleNavClick={this.state.handleNavClick}
                handleMainRightChange={this.state.handleMainRightChange}
              >
                <RecentlyPlayed
                  path={process.env.PUBLIC_URL + "/*"}
                  handleNavClick={this.state.handleNavClick}
                  rawRecPlayed={this.state.recentlyPlayed}
                  player={this.player}
                  APIrequest={this.playerRequest}
                />
              </Desktop>
            </div>
            <Router primary={false}>
              <RightTab
                path={process.env.PUBLIC_URL + "/home"}
                mobile={this.state.mobile}
                handleNavClick={this.state.handleNavClick}
              >
                <HomeScreen
                  path={process.env.PUBLIC_URL + "/"}
                  featured={this.state.featured}
                  recent={this.state.recentlyPlayed}
                  relatedTop={this.state.topRelatedArtists}
                  topArtist={this.state.topArtist}
                  player={this.player}
                />
                <Charts
                  path={process.env.PUBLIC_URL + "charts"}
                  getCategoryPlaylists={this.state.getCategoryPlaylists}
                  PolandTop={this.state.PolandTop}
                  countryCodes={this.state.countryCodes}
                />
                <Genres
                  path={process.env.PUBLIC_URL + "genres-moods"}
                  getCategories={this.state.getCategories}
                />
                <NewReleases
                  path={process.env.PUBLIC_URL + "new-releases"}
                  getNewReleases={this.state.getNewReleases}
                />
                <Discover
                  path={process.env.PUBLIC_URL + "discover"}
                  getMultipleArtistAlbums={this.state.getMultipleArtistAlbums}
                  idList={
                    this.state.topRelatedArtists &&
                    this.state.topRelatedArtists.map(e => e.id)
                  }
                />
              </RightTab>
              <Search
                path={process.env.PUBLIC_URL + "/search"}
                searchQuery={this.state.searchQuery}
                player={this.player}
              />
              <Library
                path={process.env.PUBLIC_URL + "/library"}
                getUserPlaylists={this.state.getUserPlaylists}
                getUserSavedAlbums={this.state.getUserSavedAlbums}
                getUserSavedTracks={this.state.getUserSavedTracks}
              />
              <Album
                path={process.env.PUBLIC_URL + "/album"}
                ref={this.albumRef}
                getAlbum={this.state.getAlbum}
                getPlaylist={this.state.getPlaylist}
                getPlaylistCover={this.state.getPlaylistCover}
                getPlaylistTracks={this.state.getPlaylistTracks}
                albumViewOption={this.state.albumViewOption}
              />
              <CatInnerView
                path={process.env.PUBLIC_URL + "/category"}
                PolandTop={this.state.PolandTop}
                getCategory={this.state.getCategory}
              />
            </Router>
            <PlayerBar
              path={process.env.PUBLIC_URL + "/*"}
              recent={
                this.state.recentlyPlayed && this.state.recentlyPlayed.items[0]
              }
              handleDeviceTabClick={this.state.handleDeviceTabClick}
              isDeviceTabOn={this.state.deviceTabOn}
              player={this.player}
              deviceId={this.state.deviceID}
              deviceName={this.state.deviceName}
              currentPlayback={this.state.currentPlayback}
            />
          </Suspense>
        </Provider>
      </main>
    );
  }
}
